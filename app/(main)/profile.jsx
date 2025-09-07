import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import { theme } from '../../constants/theme'
import { useAuth } from '../../contexts/AuthContexts'
import { useRouter } from 'expo-router'
import Header from '../../components/Header'
import { wp, hp } from '../../helpers/common'
import Icon from '../../assets/icons'
import { supabase } from '../../lib/supabase'
import Avatar from '../../components/Avatar'
import { Pressable } from 'react-native';

const Profile = () => {
    const {user, setAuth} = useAuth();
    const router = useRouter();

    const onLogout = async () => {
    
        setAuth(null);
        // Here you would typically call your logout function from your auth provider
        // For example, if using Supabase:
        const {error} = await supabase.auth.signOut();
        if(error) {
          Alert.alert('Sign out', 'error signing out. Please try again later.');
        }
      }

    const handleLogout = async () => {
        //show confirm modal

        Alert.alert('Confirm', 'Are you sure you want to logout?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            },
            {
                text: 'Logout',
                onPress: () => onLogout(),
                style: 'destructive'
            }
        ])
            

    }

  return (
    <ScreenWrapper bg={theme.colors.defaultBackgroundDark}>
      <UserHeader user={user} router={router} handleLogout={handleLogout} />
    </ScreenWrapper>
  )
}

const UserHeader = ({user, router, handleLogout}) => {
    return(
        <View style={{flex: 1, backgroundColor: theme.colors.defaultBackgroundDark, paddingHorizontal: wp(4)}}>
            <View>
                <Header title='Profile' mb={35} />
                <TouchableOpacity style={styles.logoutButton} onPress = {handleLogout}>
                    <Icon name="logout" size={26} color={theme.colors.bloodRed} strokeWidth={2} />
                </TouchableOpacity>
            </View>

            <View style={styles.container}>
                <View style={{gap: 15}}>
                    <View style={styles.avatarContainer}>
                        <Avatar
                        uri={user?.image}
                        size={hp(12)}
                        rounded={theme.radius.xxl*1.4}
                        />
                    <Pressable style={styles.editIcon} onPress = {() => router.push('/editProfile')}>
                        <Icon name="edit" strokeWidth={2.5} size={20}/>
                    </Pressable>
                    </View>

                        {/* user name and address */}

                    <View style={{alignItems: 'center', gap: 4}}>
                        <Text style={styles.userName}>{user && user.name}</Text>
                        <Text style={styles.infoText}>{user && user.address}</Text>
                    </View>

                        {/* email, phone, bio */}

                    <View style={{gap:10}}>
                        <View style={styles.info}>
                            <Icon name="mail" size={hp(2.5)} color={theme.colors.textLight} />
                            <Text style={styles.infoText}>
                                {user && user.email}
                            </Text>
                        </View>
                        {
                            user && user.phoneNumber && (
                                <View style={styles.info}>
                                    <Icon name="call" size={hp(2.5)} color={theme.colors.textLight} />
                                    <Text style={styles.infoText}>
                                        {user && user.phoneNumber}
                                    </Text>
                                </View>
                            )
                        }

                        {
                        user && user.bio && (
                            <Text style={styles.infoText}>
                                {user.bio}
                            </Text>
                        )
                        }
                        

                    </View>

                </View>
             </View>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerContainer: {
        marginHorizontal: wp(4),
        marginBottom: 20
    },
    headerShape: {
        width: wp(100),
        height: hp(20),
    },
    avatarContainer: {
        width: hp(12),
        height: hp(12),
        alignSelf: 'center'
    },
    editIcon: {
        position: 'absolute',
        bottom: 0,
        right: -12,
        padding: 7,
        borderRadius: 50,
        backgroundColor: theme.colors.defaultBackgroundDark,
        shadowColor: theme.colors.dark,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 7,

    },
    infoText:{
        fontSize: hp(1.6),
        fontWeight: '500',
        color: theme.colors.textLight
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    logoutButton: {
        position: 'absolute',
        right: 0,
        padding: 5,
        borderRadius: theme.radius.sm,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    userName: {
        fontSize: hp(3),
        fontWeight: 500,
        color: theme.colors.textWhite,
    }

})