import LogoutButton from '@/Components/LogoutButton';
import { Text, View, TouchableOpacity, Button } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

export default function Home() {
  const { token } = useContext(AuthContext); // Access the token from AuthContext

  //button to log token when pressed
  const handleTokenPress = () => {
    console.log('Token:', token);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>
        Welcome to the App!
      </Text>
      <LogoutButton />
      <div onClick={handleTokenPress}>
        <span>Log Out</span>
      </div>
    </View>
  );
}
