import React from 'react';
import { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import io from 'socket.io-client';

export default function App() {
  const [myMessage, setMyMessage] = useState()
  const [messages, setMessages] = useState([])
  const socketRef = useRef()

  useEffect(() => {
    console.log('Connectinng..')
    socketRef.current = io('http://localhost:4000', {transports: ['websocket']} )
    socketRef.current.on('message', function(msg) {
      const incomingMessage = {
        ...msg,
        ownedByCurrentUser: msg.senderId === socketRef.current.id,
      }
      setMessages((messages) => [...messages, incomingMessage])
      console.log(msg)
    })
    return () => {
      socketRef.current.disconnect()
    }
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat</Text>
      {messages.map((msg, i) => (
        <View style={styles.message} key={i}>
          {!msg.ownedByCurrentUser && <View style={styles.containerSpace} />}
          <Text
            style={msg.ownedByCurrentUser ? styles.selfMessage : styles.otherMessage}
          >{msg.body}</Text>
          {msg.ownedByCurrentUser && <View style={styles.containerSpace} />}
        </View>
      ))}
      <TextInput
        style={styles.textInput}
        placeholder="メッセージを入力してください。"
        onChangeText={(value) => {setMyMessage(value)}}
        value={myMessage}
      />
      <View style={styles.containerSpace} />
      <Button
        title="メッセージ送信"
        onPress={() => {
          socketRef.current.emit('message', {body: myMessage, senderId: socketRef.current.id})
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
  containerSpace: {
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
    borderRadius: 5,
    margin: 10
  },
});
