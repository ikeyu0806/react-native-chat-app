import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>チャット</Text>
      <View style={styles.message}>
        <TextInput
          style={styles.selfTextInput}
          placeholder="メッセージを入力してください。"
        />
        <View style={styles.space} />
      </View>
      <View style={styles.message}>
        <View style={styles.space} />
        <Text
          style={styles.otherMessage}
        >相手の送信メッセージ</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40
  },
  message: {
    flexDirection: 'row'
  },
  title: {
    fontSize: 20,
    marginLeft: 10,
  },
  space: {
    flex: 1,
    flexDirection: 'row',
  },
  selfTextInput: {
    marginTop: 10,
    padding: 10,
    fontSize: 20,
    borderWidth: 1,
    borderColor: 'gray',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 10,
  },
  otherMessage: {
    marginTop: 10,
    padding: 10,
    fontSize: 20,
    borderWidth: 1,
    borderColor: 'gray',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 10,
  }
});
