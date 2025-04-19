import React from 'react';
import { TextInput } from 'react-native';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

const Input = styled(TextInput)`
  width: 80%;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 15px;
  background-color: #fff;
`;

const StyledButton = styled.TouchableOpacity`
  background-color: #007bff;
  padding: 12px 24px;
  border-radius: 8px;
  margin-top: 10px;
`;

const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  text-align: center;
`;

export default function Login() {
  const router = useRouter();

  const handleLogin = async () => {
    try {
      // Simulate authentication logic
      console.log('Logging in...');

      // Store user session (optional)
      //await AsyncStorage.setItem('isLoggedIn', 'true');

      // Navigate to the Dashboard and reset the navigation stack
      router.replace('/Dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Container>
      <Title>Login</Title>
      <Input placeholder="Email" keyboardType="email-address" />
      <Input placeholder="Password" secureTextEntry />
      <StyledButton onPress={handleLogin}>
        <ButtonText>Log In</ButtonText>
      </StyledButton>
    </Container>
  );
}