import { Text, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from 'expo-router';

export default function Index() {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Main 3</Text>
      <StyledButton
        onPress={() => {
          // Navigate to the login screen
          navigation.navigate('Login/index');
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login/index' }],
          });
        }}
      >
        <ButtonText>Go to Login</ButtonText>
      </StyledButton>
    </View>
  );
}

// Styled TouchableOpacity for the button
const StyledButton = styled(TouchableOpacity)`
  background-color: #007bff;
  border-radius: 4px;
  padding: 10px 20px;
  margin-top: 20px;
`;

const ButtonText = styled(Text)`
  color: white;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;
