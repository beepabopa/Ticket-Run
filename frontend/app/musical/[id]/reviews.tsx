import { View, Text, FlatList } from "react-native";

const reviews = [
  {
    id: "1",
    user: "뮤덕123",
    verified: true,
    content: "박은태 배우 연기 미쳤음..."
  },
  {
    id: "2",
    user: "승승",
    verified: true,
    content: "2막 눈물버튼"
  },
  {
    id: "3",
    user: "초코라떼",
    verified: false,
    content: "볼까 고민중인데 어때요?"
  }
];

export default function ReviewsScreen() {
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
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        관람 후기
      </Text>

      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "white",
              padding: 16,
              borderRadius: 16,
              marginBottom: 12,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
              }}
            >
              {item.user}
              {item.verified ? " 🎟️관람인증" : ""}
            </Text>

            <Text
              style={{
                marginTop: 8,
              }}
            >
              {item.content}
            </Text>
          </View>
        )}
      />
    </View>
  );
}