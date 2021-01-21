import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>チャット</Text>
       <TextInput
        style={styles.sendTextInput}
        placeholder="メッセージを入力してください。"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40
  },
  title: {
    fontSize: 20,
    marginLeft: 10,
  },
  sendTextInput: {
    marginTop: 10,
    padding: 10,
    fontSize: 20,
    width: 200,
    borderWidth: 1,
    borderColor: 'gray',
    justifyContent: 'flex-start',
    marginLeft: 10,
  }
});
