import { View, Text, FlatList } from "react-native";
import { musicals } from "../../data/musicals";

export default function CalendarScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F5F5F5",
        padding: 20,
        paddingTop: 60,
      }}
    >
      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          marginBottom: 8,
        }}
      >
        📅 티켓팅 일정
      </Text>

      <Text
        style={{
          color: "#666",
          marginBottom: 24,
        }}
      >
        인터파크 · 멜론티켓 · YES24 · 티켓링크
      </Text>

      <FlatList
        data={musicals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "white",
              padding: 18,
              borderRadius: 16,
              marginBottom: 12,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              🎭 {item.title}
            </Text>

            <Text
              style={{
                color: "#7C3AED",
                fontWeight: "bold",
                marginTop: 6,
              }}
            >
              {item.dday}
            </Text>

            <Text
              style={{
                marginTop: 8,
              }}
            >
              🎫 {item.platform}
            </Text>

            <Text
              style={{
                marginTop: 4,
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
        )}
      />
    </View>
  );
}