// Dashboard.tsx
import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FooterNavigation from "@/app/Shared/Footer";
import Chart from "@/app/Dashboard/Chart";
import { useNavigation } from "@react-navigation/native";


// Define TypeScript interfaces
interface MetricProps {
  title: string;
  amount: string;
  change: string;
}

interface FriendProps {
  friend_id: number;
  friend_name: string;
  friend_email: string;
  amount: number;
  status: "owed" | "owe";
}

interface ApiResponse {
  total_balance: number;
  friend_balances: FriendProps[];
}

function Dashboard() {
  // State to store API data
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation();
  // State to track the active tab
  const [activeTab, setActiveTab] = useState<"Overall" | "Owed" | "Owe">(
    "Overall"
  );

  // Fetch data from the API with auth token
  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg1NzA4MWNhOWNiYjM3YzIzNDk4ZGQzOTQzYmYzNzFhMDU4ODNkMjgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc3BsaXRleSIsImF1ZCI6InNwbGl0ZXkiLCJhdXRoX3RpbWUiOjE3NDUwODQ2MDgsInVzZXJfaWQiOiJqeGF0cTc0OEN4UVdJQlduUG8zTHhRczB3Z0IyIiwic3ViIjoianhhdHE3NDhDeFFXSUJXblBvM0x4UXMwd2dCMiIsImlhdCI6MTc0NTA4NDYwOCwiZXhwIjoxNzQ1MDg4MjA4LCJlbWFpbCI6ImFwcGxlQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJhcHBsZUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.MgOvoBDVBKxFe2QG5ohRCLfd3B5y2Ld98eCdnm_RLVlLHJEazkcMdIxLS6Mi0Onf7CnKk4dDtMT3OPp4Q216VWu-TzvDL9RRJ3sAlPxkHPSRNeLn57pT2DapRjh6rbTzm1sr8qjJgP1epw54bV3fdDbA0sPPSgs6d1puxGrVfm8HET-tGeHbA9jPI81NSrWfiNI1f1w95lrVi8y6Bu3IEA77vDE6jCi3gl2CnDLlEXMAK0QIG3alJhp_JYQKzxm6Ii0dlaZacWPV88Az1vyerV4kW2bgPR0X2s2IfAskj3wDd4HZUETRd98JH5PC4OrAV4_REZnwj35IyyuCcmgHHA";
        const response = await fetch(
          "http://127.0.0.1:8000/api/accounts/friendships/balances",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate owed and owe amounts
  const calculateBalances = () => {
    if (!data) return { owedAmount: 0, oweAmount: 0 };

    let owedAmount = 0;
    let oweAmount = 0;

    data.friend_balances.forEach((friend) => {
      if (friend.status === "owed") {
        owedAmount += friend.amount;
      } else if (friend.status === "owe") {
        oweAmount += friend.amount;
      }
    });

    return { owedAmount, oweAmount };
  };

  const { owedAmount, oweAmount } = calculateBalances();

  // Get the chart data based on the active tab
  const getChartData = () => {
    if (!data) return null;

    const labels = ["Nov 23", "24", "25", "26", "27", "28", "29", "30"];

    switch (activeTab) {
      case "Overall":
        return {
          labels,
          datasets: [
            {
              data: Array(8).fill(data.total_balance), // Example static data
              color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
              strokeWidth: 2,
            },
          ],
          legend: ["Overall Balance"],
        };
      case "Owed":
        return {
          labels,
          datasets: [
            {
              data: Array(8).fill(owedAmount), // Example static data
              color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
              strokeWidth: 2,
            },
          ],
          legend: ["Owed Amount"],
        };
      case "Owe":
        return {
          labels,
          datasets: [
            {
              data: Array(8).fill(oweAmount), // Example static data
              color: (opacity = 1) => `rgba(244, 67, 54, ${opacity})`,
              strokeWidth: 2,
            },
          ],
          legend: ["Owe Amount"],
        };
      default:
        return null;
    }
  };

  const currentChartData = getChartData();

  // Handle friend selection
  const handleFriendSelect = (friendId: number) => {
    console.log(`Selected friend ID: ${friendId}`);
    navigation.navigate("FriendDetails", { friendId });
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="menu" size={24} color="#000" />
        <Text style={styles.appName}>Splitey</Text>
        <Ionicons name="person-circle-outline" size={24} color="#000" />
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <Text
          style={[styles.tab, activeTab === "Overall" && styles.activeTab]}
          onPress={() => setActiveTab("Overall")}
        >
          Overall
        </Text>
        <Text
          style={[styles.tab, activeTab === "Owed" && styles.greenTab]}
          onPress={() => setActiveTab("Owed")}
        >
          Owed
        </Text>
        <Text
          style={[styles.tab, activeTab === "Owe" && styles.redTab]}
          onPress={() => setActiveTab("Owe")}
        >
          Owe
        </Text>
      </View>

      {/* Key Metrics */}
      <View style={styles.metrics}>
        <MetricCard
          title="Owed"
          amount={`$${owedAmount.toFixed(2)}`}
          change="+20%"
        />
        <MetricCard
          title="Owe"
          amount={`$${oweAmount.toFixed(2)}`}
          change="+33%"
        />
      </View>

      {/* Chart Section */}
      <View style={styles.cardContainer}>
        {currentChartData && <Chart data={currentChartData} />}
      </View>

     {/* Friends List Container */}
      <View style={styles.cardContainer}>
        <Text style={styles.sectionTitle}>Friends</Text>
        {data?.friend_balances.map((friend) => (
          <Pressable
            key={friend.friend_id}
            onPress={() => handleFriendSelect(friend.friend_id)}
            style={styles.friendItem}
          >
            <Image
              source={{ uri: "http://via.placeholder.com/50" }}
              style={styles.avatar}
            />
            <View style={styles.friendDetails}>
              <Text style={styles.friendName}>{friend.friend_name}</Text>
              <Text style={styles.friendEmail}>{friend.friend_email}</Text>
            </View>
            <Text style={styles.friendBalance}>
              {friend.status === "owed" ? "+" : "-"}${friend.amount.toFixed(2)}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Footer Navigation */}
      <FooterNavigation activeTab="Home" />
    </View>
  );
};

// Metric Card Component
const MetricCard: React.FC<MetricProps> = ({ title, amount, change }) => (
  <View style={styles.metricCard}>
    <Text style={styles.metricTitle}>{title}</Text>
    <Text style={styles.metricAmount}>{amount}</Text>
    <Text style={styles.metricChange}>{change}</Text>
  </View>
);

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  appName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    fontSize: 14,
    fontWeight: "bold",
  },
  activeTab: {
    backgroundColor: "#000",
    color: "#fff",
  },
  greenTab: {
    backgroundColor: "#4CAF50",
    color: "#fff",
  },
  redTab: {
    backgroundColor: "#F44336",
    color: "#fff",
  },
  metrics: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metricCard: {
    backgroundColor: "#f0f0f0",
    padding: 16,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
  },
  metricTitle: {
    fontSize: 14,
    color: "#888",
  },
  metricAmount: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 4,
  },
  metricChange: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  friendsList: {
    marginTop: 20,
  },
  
    cardContainer: {
      borderWidth: 1, // Add a border
      borderColor: "#ddd", // Border color
      borderRadius: 10, // Rounded corners
      padding: 16, // Padding inside the container
      backgroundColor: "#fff", // Background color
      marginTop: 20, // Space above the container
      shadowColor: "#000", // Optional: Add shadow for depth
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2, // For Android shadow
    },
  
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
    },
  
    friendItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
  
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
    },
  
    friendDetails: {
      flex: 1,
    },
  
    friendName: {
      fontSize: 16,
      fontWeight: "bold",
    },
  
    friendEmail: {
      fontSize: 12,
      color: "#888",
    },
  
    friendBalance: {
      fontSize: 16,
      fontWeight: "bold",
      color: (props: any) => (props.status === "owed" ? "#4CAF50" : "#F44336"),
    },
  
});

export default Dashboard;