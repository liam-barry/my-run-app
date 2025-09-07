import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '../constants/theme'
import {wp, hp} from '../helpers/common'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Loading from './Loading'

const Button = ({
    ButtonStyle,
    TextStyle,
    title='',
    onPress=()=>{},
    loading=false,
    hasShadow=true
}) => {

    const shadowStyle = {
      shadowColor: theme.colors.dark,
      shadowOffset: {width: 0, height: 10},
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4
    }


    if (loading) {
      return (
        <View style={[styles.button, ButtonStyle, {backgroundColor: theme.colors.defaultBackgroundDark}]}>
          <Loading />
        </View>
      )
    }


  return (
    <Pressable onPress = {onPress} style={[styles.button, ButtonStyle, hasShadow && shadowStyle]}>
      <Text style={[styles.text, TextStyle]}>{title}</Text>
    </Pressable>
  )
}

export default Button

const styles = StyleSheet.create({
    button: {
        backgroundColor: theme.colors.primaryLight,
        height: hp(6.6),
        justifyContent: 'center',
        alignItems: 'center',
        borderCurve: 'continuous',
        borderRadius: theme.radius.xl
    },
    text: {
        fontSize: hp(2.5),
        color: theme.colors.darkLight,
        fontWeight: theme.fonts.bold
    }
})