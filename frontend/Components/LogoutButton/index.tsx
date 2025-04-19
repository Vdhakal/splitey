import React, { useContext } from 'react';
import {
  Alert,
  Platform,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
} from 'react-native';
import styled from 'styled-components/native';
import {
  useNavigation,
  ParamListBase,
  NavigationProp,
} from '@react-navigation/native';
import { useAuth } from '@/hooks/useAuth';
import { AuthContext } from '@/context/AuthContext';

const LogoutButton: React.FC = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const { logout } = useContext(AuthContext); // Assuming you have a logout function in your AuthContext

  const handleLogout = () => {
    logout();
    navigation.navigate('Login/index');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login/index' }],
    });
    console.log('User logged out');
  };

  const mobilelogoutPress = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log Out', onPress: handleLogout },
      ],
      { cancelable: true }
    );
  };

  const weblogoutPress = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      handleLogout();
    }
  };

  if (Platform.OS === 'web') {
    return (
      <div style={styles.button} onClick={weblogoutPress}>
        <span style={styles.text}>Log Out</span>
      </div>
    );
  }

  return (
    <TouchableOpacity style={styles.button} onPress={mobilelogoutPress}>
      <Text style={styles.text}>Log Out</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LogoutButton;
