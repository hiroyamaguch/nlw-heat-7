import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { io } from 'socket.io-client';

import { styles } from './styles'
import { Message, MessageProps } from '../Message';
import { api } from '../../services/api';

import { MESSAGES_EXAMPLE } from '../../utils/messages'

let messagesQueue: MessageProps[] = MESSAGES_EXAMPLE;

const socket = io(String(api.defaults.baseURL));
socket.on('new_message', newMessage => {
  messagesQueue.push(newMessage);
});

export function ListMessage() {
  const [currentMessages, setCurrentMessages] = useState<MessageProps[]>([]);

  useEffect(() => {
    api.get<MessageProps[]>('/messages/last3').then(response => {
      setCurrentMessages(response.data);
    })
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setCurrentMessages(state => [messagesQueue[0], state[0], state[1]]);
        messagesQueue.shift();
      }
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >
      {currentMessages.map(message => (
        <Message key={message.id} data={message} />
      ))}
    </ScrollView>
  )
}