import { Alert, Pressable, ScrollView, StyleSheet, Text, View, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { theme } from '../../constants/theme'
import ScreenWrapper from '../../components/ScreenWrapper'
import Header from '../../components/Header'
import Button from '../../components/Button'
import { hp, wp } from '../../helpers/common'
import { Image } from 'expo-image'
import { useAuth } from '../../contexts/AuthContexts'
import { getUserImageSrc, uploadFile } from '../../services/imageService'
import Icon from '../../assets/icons'
import Input from '../../components/input'
import { updateUser } from '../../services/userservice'
import { useRouter } from 'expo-router'
import * as imagePicker from 'expo-image-picker'

const EditProfile = () => {
    const { user: currentUser, setUserData } = useAuth()
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const [user, setUser] = useState({
        name: '',
        phoneNumber: '',
        image: null,
        bio: '',
        address: '',
    })

    useEffect(() => {
        if (currentUser) {
            setUser({
                name: currentUser.name || '',
                phoneNumber: currentUser.phoneNumber || '',
                image: currentUser.image || null,
                bio: currentUser.bio || '',
                address: currentUser.address || '',
            })
        }
    }, [currentUser])

    let imageSource = user.image && typeof user.image == 'object' ? user?.image.uri : getUserImageSrc(user?.image)

    const onPickImage = async () => {
        // Implement image picker logic here
        let result = await imagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.7,
        });

        if (!result.canceled) {
            setUser({...user, image: result.assets[0]});
        }
    }

    const onSubmit = async () => {
        let userData = { ...user }
        let { name, phoneNumber, image, bio, address } = userData

        if (!name || !phoneNumber || !bio || !address || !image) {
            Alert.alert('Profile', 'Please fill all the fields')
            return
        }

        setLoading(true)
 
        if (typeof image === 'object') {
            let imageResponse = await uploadFile('profile', image.uri, true)
            if(imageResponse.success) {
                userData.image = imageResponse.data
            }
            else {
                Alert.alert('Profile', imageResponse.msg || 'Failed to upload image')
                return userData.image = null
            }
        }

        const response = await updateUser(currentUser?.id, userData)
        setLoading(false)
        if (response?.success || response?.id) {
            setUserData({ ...currentUser, ...userData })
            Alert.alert('Profile', 'Profile updated successfully!')
            router.back()
        } else {
            Alert.alert('Profile', 'Failed to update profile.')
        }
    }

    return (
        <ScreenWrapper bg={theme.colors.defaultBackgroundDark}>
            <KeyboardAvoidingView 
                style={{ flex: 1 }} 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.container}>
                    <ScrollView 
                        style={{ flex: 1 }}
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={{ flexGrow: 1 }}
                        showsVerticalScrollIndicator={false}
                    >
                        <Header title="Edit Profile" />

                        <View style={styles.form}>
                            <View style={styles.avatarContainer}>
                                <Image source={imageSource} style={styles.avatar} />
                                <Pressable style={styles.cameraIcon} onPress={onPickImage}>
                                    <Icon name="camera" size={20} strokeWidth={2.5} />
                                </Pressable>
                            </View>

                            <Text style={{ fontSize: hp(1.5), color: theme.colors.textWhite }}>
                                Please enter your profile information below.
                            </Text>

                            <Input
                                icon={<Icon name="user" />}
                                placeholder="Enter name"
                                value={user.name}
                                placeholderTextColor={theme.colors.gray}
                                onChangeText={value => setUser({ ...user, name: value })}
                                color={theme.colors.textWhite}
                            />
                            <Input
                                icon={<Icon name="call" />}
                                placeholder="Enter phone number"
                                value={user.phoneNumber}
                                placeholderTextColor={theme.colors.gray}
                                onChangeText={value => setUser({ ...user, phoneNumber: value })}
                                color={theme.colors.textWhite}
                            />
                            <Input
                                icon={<Icon name="location" />}
                                placeholder="Enter your address"
                                value={user.address}
                                placeholderTextColor={theme.colors.gray}
                                onChangeText={value => setUser({ ...user, address: value })}
                                color={theme.colors.textWhite}
                            />
                            <Input
                                placeholder="Enter your bio!"
                                value={user.bio}
                                placeholderTextColor={theme.colors.gray}
                                multiline={true}
                                containerStyle={styles.bio}
                                onChangeText={value => setUser({ ...user, bio: value })}
                                color={theme.colors.textWhite}
                            />

                            <Button title="Update" loading={loading} onPress={onSubmit} />
                        </View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </ScreenWrapper>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: wp(4),
    },
    avatarContainer: {
        height: hp(14),
        width: hp(14),
        alignSelf: 'center',
        marginTop: hp(2.3),
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: theme.radius.xxl * 1.8,
        borderCurve: 'continuous',
        borderWidth: 1,
        borderColor: theme.colors.darkLight,
    },
    form: {
        gap: 18,
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: -10,
        padding: 8,
        borderRadius: 50,
        backgroundColor: theme.colors.defaultBackgroundDark,
        shadowColor: theme.colors.dark,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 7,
    },
    bio: {
        flexDirection: 'row',
        height: hp(15),
        alignItems: 'flex-start',
        paddingVertical: 15,
    },
})