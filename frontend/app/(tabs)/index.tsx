import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { router } from "expo-router";
import { musicals } from "../../data/musicals";

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F5F5F5",
        paddingHorizontal: 20,
        paddingTop: 60,
      }}
    >
      <Text
        style={{
          fontSize: 34,
          fontWeight: "800",
        }}
      >
        🎫 티켓런
      </Text>

      <Text
        style={{
          fontSize: 16,
          color: "#7C3AED",
          marginTop: 6,
          marginBottom: 24,
          fontWeight: "600",
        }}
      >
        가장 빠른 뮤지컬 티켓팅 알림
      </Text>

      <FlatList
        data={musicals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push(`/musical/${item.id}`)
            }
          >
            <View
              style={{
                backgroundColor: "white",
                padding: 20,
                borderRadius: 20,
                marginBottom: 14,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                }}
              >
                🎭 {item.title}
              </Text>

              <Text
                style={{
                  marginTop: 8,
                  color: "#666",
                }}
              >
                🎫 {item.platform}
              </Text>

              <Text
                style={{
                  color: "#7C3AED",
                  fontWeight: "bold",
                  marginTop: 8,
                }}
              >
                {item.dday}
              </Text>

              <Text
                style={{
                  marginTop: 8,
                }}
              >
                📅 {item.openDate}
              </Text>

              <Text
                style={{
                  marginTop: 4,
                }}
              >
                📍 {item.venue}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}