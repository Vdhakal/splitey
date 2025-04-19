// app/index.tsx
import { Text, View } from "react-native";
import styled from "styled-components/native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <Container>
      <Text>Main 3</Text>
      <StyledButton
        // Use Link from expo-router for navigation
        href="/Login"
        asChild
      >
        <ButtonText>Go to Login</ButtonText>
      </StyledButton>
    </Container>
  );
}

// Styled Components
const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled(Link)`
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