import { Image, StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import ScreenWrapper from '../components/ScreenWrapper'
import { StatusBar } from 'expo-status-bar'
import { wp, hp } from '../helpers/common'
import { theme } from '../constants/theme'
import Button from '../components/Button'
import { useFonts } from '@expo-google-fonts/instrument-serif'
import { InstrumentSerif_400Regular } from '@expo-google-fonts/instrument-serif'

const Welcome = () => {
  const router = useRouter()

  // Load Instrument Serif font
  const [fontsLoaded] = useFonts({
    InstrumentSerif_400Regular,
  })

  if (!fontsLoaded) {
    return null // or a loading spinner
  }

  return (
    <ScreenWrapper bg={theme.colors.defaultBackgroundDark}>
      <StatusBar style='dark' />
      <View style={styles.container}>
        {/* welcome image */}
        <Image
          style={styles.welcomeImage}
          resizeMode='contain'
          source={require('../assets/images/welcomeImage.png')}
        />

        {/* title  */}
        <View style={{ gap: 20 }}>
          <Text
  style={[
    styles.title,
    {
      fontFamily: 'InstrumentSerif_400Regular',
      color: '#7beebc',
      textShadowColor: '#3a6b5a',
      textShadowOffset: { width: 0, height: 2 },
      textShadowRadius: 6,
    },
  ]}
>
  Everstride
</Text>
          <Text style={styles.punchline}>
            Your social running journey starts here.
          </Text>
        </View>

        {/* footer */}
        <View style={styles.footer}>
          <Button
            title='Getting Started'
            ButtonStyle={{ marginHorizontal: wp(3) }}
            onPress={() => router.push('signUp')}
          />
          <View style={styles.bottomTextContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <Pressable onPress={() => router.push('login')}>
              <Text
                style={[
                  styles.loginText,
                  {
                    color: theme.colors.textOrange,
                    fontWeight: theme.fonts.semibold,
                  },
                ]}
              >
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
    justifyContent: 'space-around',
    backgroundColor: theme.colors.defaultBackgroundDark,
    paddingHorizontal: wp(4),
  },
  welcomeImage: {
    height: hp(30),
    width: wp(100),
    alignSelf: 'center',
  },
  title: {
    fontSize: hp(6), // or even hp(8)
    textAlign: 'center',
    fontWeight: theme.fonts.extraBold,
    letterSpacing: 1.2,
},
  punchline: {
    textAlign: 'center',
    paddingHorizontal: wp(10),
    fontSize: hp(1.7),
    color: theme.colors.textWhite,
  },
  footer: {
    gap: 30,
    width: '100%',
    alignSelf: 'center',
  },
  bottomTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  loginText: {
    textAlign: 'center',
    color: theme.colors.textWhite,
    fontSize: hp(1.6),
    fontWeight: theme.fonts.semibold,
  },
})