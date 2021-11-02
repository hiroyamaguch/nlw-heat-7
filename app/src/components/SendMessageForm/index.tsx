import React, { useCallback, useState } from 'react';
import { View, TextInput, Alert, Keyboard } from 'react-native'
import { api } from '../../services/api';
import { COLORS } from '../../theme';
import { Button } from '../Button';

import { styles } from './styles'

export function SendMessageForm() {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(async () => {
    const messageFormatted = message.trim();

    if (messageFormatted.length > 0) {
      setIsLoading(true);

      await api.post('/messages', { message: messageFormatted });

      setMessage('');
      Keyboard.dismiss();
      setIsLoading(false);
      Alert.alert('Mensagem enviada com sucesso!')
    } else {
      Alert.alert('Escreva a mensagem para enviar.')
    }
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        keyboardAppearance="dark"
        placeholder="Qual sua expectativa para o evento"
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        multiline
        maxLength={140}
        onChangeText={setMessage}
        value={message}
        editable={!isLoading}
      />

      <Button
        title="Enviar mensagem"
        color={COLORS.WHITE}
        backgroundColor={COLORS.PINK}
        isLoading={isLoading}
        onPress={handleSubmit}
      />
    </View>
  )
}