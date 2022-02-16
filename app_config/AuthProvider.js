import React, {useState} from 'react';
import AsyncStorage from "@react-native-community/async-storage";
import {api_url, app_id, languages} from "../globals/vars";

export const AuthContext = React.createContext({
    user: null,
    appVars: "",
    appLang: languages,
    lang: "en",
    login: () => null,
    trans: () => null,
    logout: () => null,
    app_settings: () => null,
    get_profile: () => null,
    setAppLanguage: () => null,
});
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [appVars, setAppVars] = useState('');
    const [appLang, setLanguage] = useState(languages);
    const [lang, setLang] = useState('en');

    return (
        <AuthContext.Provider value={{
            user,
            appVars,
            appLang,
            setAppLanguage: (lng) => {
                if(lng == null){
                    lng = 'en';
                }
                setLang(lng);
                AsyncStorage.setItem("app_lang", lng);
            },
            login: (nav, usr) => {
                AsyncStorage.setItem("user", JSON.stringify(usr)).then(() => {
                    let p_data = new FormData();
                    p_data.append("access_token", usr.access_token);
                    p_data.append("build_number", '1.0');
                    p_data.append("app_id", app_id);
                    p_data.append("security_key", appVars.sky);
                    p_data.append("os", 'android');
                    fetch(api_url + "member_profile_api/get_profile", {
                        method: "POST",
                        body: p_data,
                        headers: new Headers({
                            'Content-Type': 'multipart/form-data'
                        }),
                    }).then((responseData) => {
                        return responseData.json();
                    }).then(responseJson => {
                        let new_user = usr;
                        for (const [key, value] of Object.entries(responseJson.response_data)) {
                            new_user[key] = value;
                        }
                        setUser(new_user);
                        AsyncStorage.getItem('Vars').then((Vrs) => {
                            setAppVars(JSON.parse(Vrs));
                            if(nav) {
                                let screen = user ? "Home" : "Splash";
                                nav.navigate(screen);
                            }
                        });
                    }).catch(error => {
                    });
                });
            },
            app_settings: (param) => {
                setAppVars(param);
            },
            trans: (word) => {
                if (appLang[word]) {
                    return appLang[word][lang];
                } else {
                    return word;
                }
            },
            logout: () => {
                AsyncStorage.setItem("user", "").then(() => {
                    let p_data = new FormData();
                    p_data.append("access_token", user.access_token);
                    p_data.append("app_id", app_id);
                    p_data.append("security_key", appVars.sky);
                    fetch(api_url + "member_api/logout", {
                        method: "POST",
                        body: p_data,
                        headers: new Headers({
                            'Content-Type': 'multipart/form-data'
                        }),
                    });
                    setUser(null);
                });
            }
        }}>{children}</AuthContext.Provider>
    );
}

export default AuthProvider;
