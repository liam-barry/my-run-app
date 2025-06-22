import { Image, StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import ScreenWrapper from '../components/ScreenWrapper'
import { StatusBar } from 'expo-status-bar'
import { wp, hp } from '../helpers/common'
import { theme } from '../constants/theme'
import Button from '../components/Button'

const Welcome = () => {

  const router = useRouter();

  return (
    <ScreenWrapper bg = '#36393f'>
      <StatusBar style='dark' />
      <View style={styles.container}>
        {/* welcome image */}
        <Image style={styles.welcomeImage} resizeMode='contain' source={require('../assets/images/welcomeImage.png')}/>

        {/* title  */}
        <View style={{gap: 20}}>
          <Text style={styles.title}>Everstride</Text>
          <Text style={styles.punchline}>Your social running journey starts here.</Text>
        </View>

      {/* footer */}
      <View style={styles.footer}>
        <Button
          title='Getting Started'
          ButtonStyle={{ marginHorizontal: wp(3)}}
          onpress={() => router.push('signUp')}
        />
        <View style={styles.bottomTextContainer}>
          <Text style={styles.loginText}>
            Already have an account?
          </Text>
          <Pressable onPress={() => router.push('login')}>
            <Text style={[styles.loginText, {color: theme.colors.textOrange, fontWeight: theme.fonts.semibold}]}>
              Login
            </Text>
          </Pressable>
        </View>
      </View>

      </View>
    </ScreenWrapper>
  )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent:  'space-around',
        backgroundColor: theme.colors.defaultBackgroundDark,
        paddingHorizontal: wp(4)
    },
    welcomeImage: {
        height: hp(30),
        width: wp(100),
        alignSelf: 'center'
    },
    title: {
        color: theme.colors.textWhite,
        fontSize: hp(4),
        textAlign: 'center',
        fontWeight: theme.fonts.extraBold
    },
    punchline: {
        textAlign: 'center',
        paddingHorizontal: wp(10),
        fontSize: hp(1.7),
        color: theme.colors.textWhite
    },
    footer: {
        gap: 30,
        width: '100%',
        alignSelf: 'center'
    },
    bottomTextContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 6
    },
    loginText: {
      textAlign: 'center',
      color: theme.colors.textWhite,
      fontSize: hp(1.6),
      fontWeight: theme.fonts.semiBold
    }
})