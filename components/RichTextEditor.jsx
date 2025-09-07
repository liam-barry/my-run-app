import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RichToolbar } from 'react-native-pell-rich-editor'

const RichTextEditor = ({
    editorRef, 
    onChange
}) => {
  return (
    <View style={{minHeight: 200}}>
      <Text>RichTextEditor</Text>
        <RichToolbar
            actions={[
                actions.insertImage,
                actions.setBold,
                actions.setItalic,
                actions.insertBulletsList,
                actions.insertOrderedList,
                actions.insertLink,
                actions.keyboard,
                actions.setStrikethrough,
                actions.setUnderline,
                actions.removeFormat,
                actions.insertVideo,
                actions.checkboxList,
                actions.undo,
                actions.redo
            ]}
          />
    </View>
  )
}

export default RichTextEditor

const styles = StyleSheet.create({})