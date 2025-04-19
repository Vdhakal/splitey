import React from 'react';
import { TextInput, Button } from 'react-native';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';

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

const StyledButton = styled(Button)`
  margin-top: 10px;
`;

export default function Login() {
  const navigation = useNavigation();
  const handleLogin = async () => {
    navigation.navigate('index'); 
    navigation.reset({
      index: 0,
      routes: [{ name: 'index' }], 
    });
  };

  return (
    <Container>
      <Title>Login</Title>
      <Input placeholder="Email" keyboardType="email-address" />
      <Input placeholder="Password" secureTextEntry />
      <StyledButton title="Log In" onPress={handleLogin} />
    </Container>
  );
}
