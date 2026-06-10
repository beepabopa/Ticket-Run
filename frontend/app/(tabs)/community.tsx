import { View, Text, FlatList } from "react-native";

const posts = [
  {
    id: "1",
    user: "승승",
    musical: "웃는남자",
    rating: "★★★★★",
    content: "박은태가 진짜 미쳤다...",
  },
  {
    id: "2",
    user: "모도맨숀",
    musical: "위키드",
    rating: "★★★★☆",
    content: "3층 시야 생각보다 괜찮음",
  },
];

export default function CommunityScreen() {
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
          fontSize: 30,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        커뮤니티
      </Text>

      <FlatList
        data={posts}
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
                color: "#7C3AED",
                fontWeight: "bold",
              }}
            >
              🎟 관람인증
            </Text>

            <Text
              style={{
                marginTop: 8,
                fontWeight: "bold",
              }}
            >
              {item.user}
            </Text>

            <Text>{item.musical}</Text>

            <Text
              style={{
                marginTop: 8,
              }}
            >
              {item.rating}
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