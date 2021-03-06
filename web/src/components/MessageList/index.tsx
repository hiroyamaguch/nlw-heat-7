import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import io from 'socket.io-client';

import styles from './styles.module.scss'
import logoImg from '../../assets/logo.png'

import { MESSAGES_EXAMPLE } from '../../utils/messages'

type Message = {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  }
}

const messagesQueue: Message[] = MESSAGES_EXAMPLE;

const socket = io('http://localhost:8000');

socket.on('new_message', (newMessage: Message) => {
  messagesQueue.push(newMessage);
});

export function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setMessages(state => [
          messagesQueue[0],
          state[0],
          state[1],
        ].filter(Boolean))

        messagesQueue.shift()
      }
    }, 3000)
  }, []);

  useEffect(() => {
    api.get<Message[]>('/messages/last3').then(response => setMessages(response.data))
  }, []);

  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="DoWhile 2021" />

      <ul className={styles.messageList}>
        {messages.map(message => (
          <li className={styles.message} key={message.id}>
            <p className={styles.messageContent}>{message.text}</p>
            <div className={styles.messageUser}>
              <div className={styles.userImage}>
                <img src={message.user.avatar_url} alt={message.user.name} />
              </div>
              <span>{message.user.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
};