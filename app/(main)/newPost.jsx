import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import { theme } from '../../constants/theme'
import Header from '../../components/Header'
import { wp, hp } from '../../helpers/common'
import { useAuth } from '../../contexts/AuthContexts'
import { useRouter } from 'expo-router'
import { supabase } from '../../lib/supabase'
import Avatar from '../../components/Avatar'
import RichTextEditor from '../../components/RichTextEditor'

const NewPost = () => {

  const { user } = useAuth();
  const bodyRef = useRef("");
  const editorRef = useRef(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(file);

  return (
    <ScreenWrapper bg={theme.colors.defaultBackgroundDark}>
        <View style={styles.container}>
          <Header title='Create Post' />
          <ScrollView contentContainerStyle={{gap: 20}}>
            {/*Avatar*/}
            <View style={styles.header}>
              <Avatar 
                uri={user?.image}
                size={hp(6.5)}
                rounded={theme.radius.xl}
                />
                <View style={{gap: 2}}>
                  <Text style={styles.username}>
                    {
                      user && user.name
                    }
                  </Text>

                  <Text style={styles.publicText}>
                    Public
                  </Text>
                </View>
            </View>
            <View style={styles.textEditor}>
              <RichTextEditor editorRef={editorRef} onChange={body => bodyRef.current = body} />
            </View>
          </ScrollView>
        </View>
      
    </ScreenWrapper>
  )
}

export default NewPost

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    marginBottom: 30,
    paddingHorizontal: wp(4),
    gap: 15
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  username: {
    fontSize: hp(2.2),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.primaryLight,
    textDecorationLine: 'underline',
  },
  publicText: {
    fontSize: hp(1.7),
    fontWeight: theme.fonts.medium,
    color: theme.colors.textLight,
  }
  
})