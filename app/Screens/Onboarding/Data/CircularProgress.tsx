import { Animated, StyleSheet, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import Svg, { G, Circle } from 'react-native-svg'
import { Text } from '../../../../components';
import colors from '../../../../constants/Colors';
import { Icons } from '../../../../assets/Icons';
interface CircularProgressProps {
  percentage: number; // Corrected the prop name to match usage
}
const CircularProgress: React.FC<CircularProgressProps> = ({ percentage }) => {
  const size = 50;
  const strokeWidth = 2;
  const center = size / 2
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  useEffect(() => {
    animation(percentage)
  }, [percentage])

  useEffect(() => {
    progressAnimation.addListener((value) => {
      const strokeDashoffset = circumference - (circumference * value.value) / 100
      if (progressRef?.current) {
        progressRef.current.setNativeProps({
          strokeDashoffset
        })
      }
    })
  }, [percentage])

  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef<Circle>(null);
  const animation = (toValue: number) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true
    }).start()
  }


  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <G fill={colors.primaryBlue} rotation="-90" origin={center}>
          <Circle stroke={colors.white} cx={center} strokeWidth={strokeWidth} r={radius} cy={center} />
          <Circle ref={progressRef} stroke={colors.fill} cx={center} strokeWidth={strokeWidth} r={radius} strokeDasharray={circumference} cy={center} />
        </G>
      </Svg>
      <View style={styles.btn}>
        <Icons size={16} name='angle' />
      </View>
    </View>
  )
}

export default CircularProgress

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    height: 40,
    width: 40,
    borderRadius: 40,
  }
})