import { StyleSheet, Text, View } from 'react-native'
import ScreenWrapper from '../components/ScreenWrapper'
import { theme } from '../constants/theme'
import Icon from '../assets/icons/index'
import { StatusBar } from 'expo-status-bar'
import BackButton from '../components/BackButton'


const Login = () => {
  return (
    <ScreenWrapper bg={theme.colors.defaultBackgroundDark}>
      <StatusBar style='light' />
      <View style={styles.container}/>
        <BackButton />
    </ScreenWrapper>
  )
}

export default Login

const styles = StyleSheet.create({})