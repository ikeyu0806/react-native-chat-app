import React from 'react';
import { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import io from 'socket.io-client';

const socket = io('http://localhost:4000', {transports: ['websocket']} );

export default function App() {
  const [myMessage, setMyMessage] = useState('')
  const [sendMessage, setSendMessage] = useState({})
  const [messageID, setMessageID] = useState(0)

  socket.on('message', function(msg){
    console.log(msg);
  })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat</Text>
      <View style={styles.message}>
        <TextInput
          style={styles.selfTextInput}
          placeholder="メッセージを入力してください。"
          onChange={(e) => {setMyMessage(e.target.value)}}
          value={myMessage}
        />
        <View style={styles.space} />
      </View>
      <View style={styles.message}>
        <View style={styles.space} />
        <Text
          style={styles.otherMessage}
        >相手の送信メッセージ</Text>
      </View>
      <Button
        title="emit"
        onPress={() => {
          socket.emit('message', myMessage)
          setSendMessage(Object.assign(sendMessage, { [messageID]: {message: myMessage, type: 'myMessage'}}))
         }
        }
      />
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
    borderRadius: 20,
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
    borderRadius: 20,
    color: 'white',
    backgroundColor:'blue',
    overflow: 'hidden'
  }
});
