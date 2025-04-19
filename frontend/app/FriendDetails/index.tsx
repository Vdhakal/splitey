// FriendDetails/index.tsx
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { PieChart } from "react-native-chart-kit";

interface Transaction {
  id: number;
  amount: string;
  comments: string;
  group_name: string | null;
  type: "individual" | "group";
}

interface FriendDetailsProps {
  friendId: number; // ID of the selected friend
  friendName: string;
  onBack: () => void;
}

function FriendDetails({
  friendId,
  friendName,
  onBack,
}: FriendDetailsProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const authToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg1NzA4MWNhOWNiYjM3YzIzNDk4ZGQzOTQzYmYzNzFhMDU4ODNkMjgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc3BsaXRleSIsImF1ZCI6InNwbGl0ZXkiLCJhdXRoX3RpbWUiOjE3NDUwODQ2MDgsInVzZXJfaWQiOiJqeGF0cTc0OEN4UVdJQlduUG8zTHhRczB3Z0IyIiwic3ViIjoianhhdHE3NDhDeFFXSUJXblBvM0x4UXMwd2dCMiIsImlhdCI6MTc0NTA4NDYwOCwiZXhwIjoxNzQ1MDg4MjA4LCJlbWFpbCI6ImFwcGxlQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJhcHBsZUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.MgOvoBDVBKxFe2QG5ohRCLfd3B5y2Ld98eCdnm_RLVlLHJEazkcMdIxLS6Mi0Onf7CnKk4dDtMT3OPp4Q216VWu-TzvDL9RRJ3sAlPxkHPSRNeLn57pT2DapRjh6rbTzm1sr8qjJgP1epw54bV3fdDbA0sPPSgs6d1puxGrVfm8HET-tGeHbA9jPI81NSrWfiNI1f1w95lrVi8y6Bu3IEA77vDE6jCi3gl2CnDLlEXMAK0QIG3alJhp_JYQKzxm6Ii0dlaZacWPV88Az1vyerV4kW2bgPR0X2s2IfAskj3wDd4HZUETRd98JH5PC4OrAV4_REZnwj35IyyuCcmgHHA"; // Replace with your actual token
        const response = await fetch(
          `http://127.0.0.1:8000/api/friends/${friendId}/transactions`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }

        const result = await response.json();
        setTransactions(result);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [friendId]);

  const calculateTotals = () => {
    const individualTotal = transactions
      .filter((t) => t.type === "individual")
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);

    const groupTotal = transactions
      .filter((t) => t.type === "group")
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);

    return { individualTotal, groupTotal };
  };

  const { individualTotal, groupTotal } = calculateTotals();

  const pieChartData = [
    {
      name: "Individual",
      amount: individualTotal,
      color: "#4CAF50",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Group",
      amount: groupTotal,
      color: "#F44336",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      {/* Friend Details */}
      <Text style={styles.friendNameHeader}>{friendName}</Text>
      <Text style={styles.overallBalance}>
        Overall Balance: ${(individualTotal + groupTotal).toFixed(2)}
      </Text>

      {/* Pie Chart */}
      <View style={styles.chartContainer}>
        <PieChart
          data={pieChartData}
          width={300}
          height={200}
          chartConfig={{
            backgroundColor: "#ffffff", 
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="amount"
          paddingLeft="15"
          absolute
        />
      </View>
    </View>
  );
};

export default FriendDetails;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: "#007BFF",
  },
  friendNameHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  overallBalance: {
    fontSize: 18,
    marginBottom: 20,
  },
  chartContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
});