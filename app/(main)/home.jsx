import { Alert, Button, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import { useAuth } from '../../contexts/AuthContexts'
import { supabase } from '../../lib/supabase'
import { theme } from '../../constants/theme'
import { hp, wp } from '../../helpers/common'
import Icon from '../../assets/icons'
import { router, useRouter } from 'expo-router'
import { Tabs } from 'expo-router' 
import Avatar from '../../components/Avatar'

const Home = () => {

  const {user, setAuth} = useAuth();
  console.log('user: ', user);

  // const onLogout = async () => {

  //   setAuth(null);
  //   // Here you would typically call your logout function from your auth provider
  //   // For example, if using Supabase:
  //   const {error} = await supabase.auth.signOut();
  //   if(error) {
  //     Alert.alert('Sign out', 'error signing out. Please try again later.');
  //   }
  // }

  return (
    <ScreenWrapper bg={theme.colors.defaultBackgroundDark}>
      <View style={styles.container}>
        {/* header */}
        <View style={styles.header}>
          <Text style={styles.title}>Everstride</Text>
          <View style={styles.icons}>
            <Pressable onPress={() => router.push('/notifications')}>
              <Icon name="heart" size={hp(3.5)} color={theme.colors.textWhite} strokeWidth={2} />
            </Pressable>
            <Pressable onPress={() => router.push('/newPost')}>
              <Icon name="plus" size={hp(3.5)} color={theme.colors.textWhite} strokeWidth={2} />
            </Pressable>
            <Pressable onPress={() => router.push('/profile')}>
              <Avatar 
                uri={user?.image}
                size = {hp(4.3)}
                rounded={theme.radius.sm}
                style={{borderWidth: 2}}
              />
            </Pressable>
          </View>
        </View>
      </View>
      {/* <Button title='Logout' onPress={onLogout} color={theme.colors.accent} /> */}
    </ScreenWrapper>
  )
}

export default Home

const styles = StyleSheet.create({
  listStyle: {
    paddingTop: 20,
    paddingHorizontal: wp(4),
  },
  noPosts: {
    fontSize: hp(2),
    textAlign: 'center',
    color: theme.colors.text,
  },
  pill: {
    position: 'absolute',
    right: -10,
    top: -4,
    height: hp(2.2),
    width: hp(2.2),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: theme.colors.roseLight,
  },
  pillText: {
    color: 'white',
    fontSize: hp(1.2),
    fontWeight: theme.fonts.bold,
  },
  title: {
    color: theme.colors.textWhite,
    fontSize: hp(3.2),
    fontWeight: theme.fonts.bold,
  },
  avatarImage: {
    height: hp(4.3),
    width: hp(4.3),
    borderRadius: theme.radius.sm,
    borderCurve: 'continuous',
    borderColor: theme.colors.gray,
    borderWidth: 3,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 18,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.defaultBackgroundDark,
    // paddingHorizontal: wp(4),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginHorizontal: wp(4),
  },
});