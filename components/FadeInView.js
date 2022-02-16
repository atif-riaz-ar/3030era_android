import React, { useRef, useEffect } from 'react';
import { Animated, Text, View } from 'react-native';

const FadeInView = (props) => {
	const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

	useEffect(() => {
		Animated.timing(
			fadeAnim,
			{
				toValue: 1,
				duration: 10000,
			}
		).start();
	}, [fadeAnim])

	return (
		<Animated.View
			style={{
				...props.style,
				opacity: fadeAnim,
			}}
		>
			{props.children}
		</Animated.View>
	);
}

export default FadeInView;