// FooterNavigation.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface FooterNavigationProps {
  activeTab: string; 
}

const FooterNavigation: React.FC<FooterNavigationProps> = ({ activeTab }) => {
  return (
    <View style={styles.footer}>
      <Text
        style={[
          styles.footerIcon,
          activeTab === "Home" && styles.activeIcon,
        ]}
      >
        🏠
      </Text>
      <Text
        style={[
          styles.footerIcon,
          activeTab === "Search" && styles.activeIcon,
        ]}
      >
        🔍
      </Text>
      <Text
        style={[
          styles.footerIcon,
          activeTab === "Exchange" && styles.activeIcon,
        ]}
      >
        ↔️
      </Text>
      <Text
        style={[
          styles.footerIcon,
          activeTab === "Archive" && styles.activeIcon,
        ]}
      >
        🗄️
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  footerIcon: {
    fontSize: 24,
    color: "#888", 
  },
  activeIcon: {
    color: "#000", 
  },
});

export default FooterNavigation;