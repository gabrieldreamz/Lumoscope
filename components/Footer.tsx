import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Icons } from '../assets/Icons'
import { Text } from './Text'
import colors from '../constants/Colors'

const Footer = () => {
  return (
    <View style={styles.container}>
      <Text color={colors.textFoot} fontWeight='400' fontSize={12} >Swipe to refresh</Text>
      <Icons name='refresh' size={120} />
    </View>
  )
}

export default Footer

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})