import {
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";

import {
  useLocalSearchParams,
  router,
} from "expo-router";

import { musicals } from "../../data/musicals";
import { favoriteIds } from "../../store/favorites";

export default function MusicalDetailScreen() {
  const { id } = useLocalSearchParams();

  const musical = musicals.find(
    (item) => item.id === id
  );

  if (!musical) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>공연 정보를 찾을 수 없습니다.</Text>
      </View>
    );
  }

  const addFavorite = () => {
    if (!favoriteIds.includes(musical.id)) {
      favoriteIds.push(musical.id);

      Alert.alert(
        "등록 완료",
        `${musical.title} 관심공연 등록 완료`
      );
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F5F5F5",
        padding: 24,
        paddingTop: 80,
      }}
    >
      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
        }}
      >
        {musical.title}
      </Text>

      <Text
        style={{
          color: "#7C3AED",
          fontWeight: "bold",
          marginTop: 10,
          fontSize: 18,
        }}
      >
        {musical.dday}
      </Text>

      <Text style={{ marginTop: 20 }}>
        🎫 예매처: {musical.platform}
      </Text>

      <Text style={{ marginTop: 10 }}>
        📅 티켓 오픈: {musical.openDate}
      </Text>

      <Text style={{ marginTop: 10 }}>
        📍 공연장: {musical.venue}
      </Text>

      <TouchableOpacity
        onPress={addFavorite}
        style={{
          backgroundColor: "#7C3AED",
          padding: 16,
          borderRadius: 12,
          marginTop: 30,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          ⭐ 관심공연 등록
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          router.push(`/musical/${musical.id}/reviews`)
        }
        style={{
          backgroundColor: "#111",
          padding: 16,
          borderRadius: 12,
          marginTop: 12,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          💬 관람 후기 보기
        </Text>
      </TouchableOpacity>
    </View>
  );
}