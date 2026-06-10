import { View, Text, FlatList } from "react-native";

import { favoriteIds } from "../../store/favorites";
import { musicals } from "../../data/musicals";

export default function MyPageScreen() {
  const favorites = musicals.filter((item) =>
    favoriteIds.includes(item.id)
  );

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
          marginBottom: 20,
        }}
      >
        MY
      </Text>

      <Text
        style={{
          fontSize: 18,
          marginBottom: 16,
        }}
      >
        ⭐ 관심공연
      </Text>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text>등록된 관심공연이 없습니다.</Text>
        }
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "white",
              padding: 16,
              borderRadius: 16,
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              {item.title}
            </Text>

            <Text>{item.platform}</Text>
          </View>
        )}
      />
    </View>
  );
}