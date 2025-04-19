import React, { useContext, useState } from 'react';
import { TextInput, Button, Alert, View, Text, StyleSheet } from 'react-native';
import {
  useNavigation,
  ParamListBase,
  NavigationProp,
} from '@react-navigation/native';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '@/utils/firebaseConfig';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { GOOGLE_CLIENT_ID, IOS_CLIENT_ID } from '@env';
import { useAuth } from '@/hooks/useAuth';
import { AuthContext } from '@/context/AuthContext';

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and sign-up
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: IOS_CLIENT_ID,
    clientId: GOOGLE_CLIENT_ID,
    redirectUri: AuthSession.makeRedirectUri(),
  });

  console.log(GOOGLE_CLIENT_ID);

  const handleGoogleSignIn = async () => {
    try {
      const result = await promptAsync();
      if (result.type === 'success') {
        const { id_token } = result.params;
        console.log('Google ID Token:', id_token);
        Alert.alert('Google Sign-In Successful', 'You are now signed in.');

        navigation.navigate('Home/index');
        navigation.reset({
          index: 0,
          routes: [{ name: 'index' }],
        });
      } else {
        Alert.alert('Google Sign-In Failed', 'Please try again.');
      }
    } catch (error) {
      Alert.alert('Google Sign-In Error', error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredentials);
      const user = userCredentials.user;
      const token = await user.getIdToken();
      console.log('User Token:', token);
      await login(token);
      navigation.navigate('Home/index');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home/index' }],
      });
    } catch (error: any) {
      Alert.alert('Login Failed', error.message);
    }
  };

  const handleSignUp = async () => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredentials);
      Alert.alert('Sign Up Successful', 'You can now log in.');
      navigation.navigate('Home/index');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home/index' }],
      });
    } catch (error: any) {
      Alert.alert('Sign Up Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? 'Login' : 'Sign Up'}</Text>
      {!isLogin && (
        <>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            keyboardType="default"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            keyboardType="default"
            value={lastName}
            onChangeText={setLastName}
          />
        </>
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {isLogin ? (
        <>
          <Button title="Log In" onPress={handleLogin} />
          <Button
            title="Don't have an account? Sign Up"
            onPress={() => setIsLogin(false)}
          />
        </>
      ) : (
        <>
          <Button title="Sign Up" onPress={handleSignUp} />
          <Button
            title="Already have an account? Log In"
            onPress={() => setIsLogin(true)}
          />
        </>
      )}
      <Button
        title="Sign in with Google"
        onPress={handleGoogleSignIn}
        disabled={!request}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#336e62',
  },
});
