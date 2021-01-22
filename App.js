import React from 'react';
import { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import io from 'socket.io-client';

const socket = io('http://localhost:4000', {transports: ['websocket']} );

export default function App() {
  const [myMessage, setMyMessage] = useState('')
  const [sendMessages, setsendMessages] = useState({})
  const [messageID, setMessageID] = useState(0)

  socket.on('message', function(msg){
    console.log(msg);
  })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat</Text>
      {Object.entries(sendMessages).map(([key, value]) => (
        <View style={styles.message} key={key}>
          <Text
            style={value.type === 'myMessage' ? styles.selfMessage : styles.otherMessage}
          >{value.message}</Text>
        </View>
      ))}
      <TextInput
        style={styles.textInput}
        placeholder="メッセージを入力してください。"
        onChange={(e) => {setMyMessage(e.target.value)}}
        value={myMessage}
      />
      <View style={styles.space} />
      <Button
        title="メッセージ送信"
        onPress={() => {
          socket.emit('message', myMessage)
          setMessageID(messageID + 1)
          setsendMessages(Object.assign(sendMessages, { [messageID]: {message: myMessage, type: 'myMessage'}}))
          console.log(sendMessages)
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
  selfMessage: {
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
  },
  textInput: {
    marginTop: 10,
    padding: 10,
    fontSize: 20,
    borderWidth: 1,
    borderColor: 'gray',
    flexDirection: 'row',
    borderRadius: 20,
    margin: 10
  },
});
