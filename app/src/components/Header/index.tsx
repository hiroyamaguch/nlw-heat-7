import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import { useAuth } from '../../hooks/auth';

import { UserPhoto } from '../../components/UserPhoto'

import { styles } from './styles'
import Logo from '../../assets/logo.svg'

export function Header() {
  const { user, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Logo />

      <View style={styles.logoutContainer}>
        {user && (
          <TouchableOpacity onPress={signOut}>
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
        )}

        <UserPhoto imageUri={user?.avatar_url} />
      </View>
    </View>
  )
}