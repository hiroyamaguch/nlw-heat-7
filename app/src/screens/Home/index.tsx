import React from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native'
import { useAuth } from '../../hooks/auth';

import { Header } from '../../components/Header'
import { ListMessage } from '../../components/ListMessage';
import { SignInBox } from '../../components/SignInBox'
import { SendMessageForm } from '../../components/SendMessageForm';

import { styles } from './styles'

export function Home() {
  const { user } = useAuth();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <Header />
        <ListMessage />
        {user ? <SendMessageForm /> : <SignInBox />}
      </View>
    </KeyboardAvoidingView>
  )
}