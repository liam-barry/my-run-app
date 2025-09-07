import { StyleSheet, Text, View, Pressable } from 'react-native'
import ScreenWrapper from '../components/ScreenWrapper'
import { theme } from '../constants/theme'
import { StatusBar } from 'expo-status-bar'
import BackButton from '../components/BackButton'
import { useRouter } from 'expo-router'
import { hp, wp } from '../helpers/common'
import Input from '../components/input'
import Icon from '../assets/icons'
import { useRef, useState } from 'react'
import Button from '../components/Button'
import { Alert } from 'react-native'
import { supabase } from '../lib/supabase'




const Login = () => {

  const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Login", "Please fill in all fields");
      return;
    }
    
    let email = emailRef.current.trim();
    let password = passwordRef.current.trim();

    setLoading(true);

    const {error} = await supabase.auth.signInWithPassword({
      email,
      password
    });

    setLoading(false);

    console.log('error: ', error);
    if(error) {
      Alert.alert("Login", error.message);
    }

  }


  return (
    <ScreenWrapper bg={theme.colors.defaultBackgroundDark}>
      <StatusBar style='light' />
      <View style={styles.container}>
        <BackButton router={router} />

        {/* welcome screen */}

        <View>
          <Text style={styles.welcomeText}>Heyo,</Text>
          <Text style={styles.welcomeText}>Welcome Back</Text>
        </View>

        {/* form */}

        <View style={styles.form}>
          <Text style={{fontSize: hp(1.5), color: theme.colors.textWhite}}>
            Please enter your credentials to login
          </Text>

          <Input 
            icon={<Icon name='mail' size={26} strokeWidth={1.6} color={theme.colors.textWhite} />}
            placeholder='Enter your email'
            color={theme.colors.textWhite}
            onChangeText={value=> emailRef.current = value} 
          />

          <Input 
            icon={<Icon name='lock' size={26} strokeWidth={1.6} color={theme.colors.textWhite} />}
            placeholder='Enter your password'
            secureTextEntry
            color={theme.colors.textWhite}
            onChangeText={value=> passwordRef.current = value} 
          />

          <Text style={styles.forgotPassword}>
            Forgot Password?
          </Text>

          {/* submit button */}

          <Button title={'Login'} loading={loading} onPress={onSubmit}/>
          

          {/* footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Don't have an account?
            </Text>
            <Pressable onPress={() => router.push('/signUp')}>
              <Text style={[styles.footerText, {fontWeight: theme.fonts.semibold}, {color: theme.colors.textOrange}]}>
                Sign Up
              </Text>
            </Pressable>
          </View>


        </View>

      </View>
    </ScreenWrapper>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 45,
    paddingHorizontal: wp(5),
  },
  welcomeText: {
    fontSize: hp(4),
    fontWeight: theme.fonts.bold,
    color: theme.colors.textWhite,
  },
  form: {
    gap: 25,
  },
  forgotPassword: {
    textAlign: 'right',
    fontWeight: theme.fonts.semibold,
    color: theme.colors.textWhite,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  footerText: {
    textAlign: 'center',
    color: theme.colors.textWhite,
    fontSize: hp(1.6),
  }
})