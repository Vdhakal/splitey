import LogoutButton from '@/Components/LogoutButton';
import { Text, View, TouchableOpacity } from 'react-native';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Main 3</Text>
      <LogoutButton />
    </View>
  );
}
