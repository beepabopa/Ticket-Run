import { useEffect, useState } from "react"
import {
  View, Text, FlatList,
  TouchableOpacity, StyleSheet, StatusBar
} from "react-native"
import { useRouter } from "expo-router"
import { Colors } from "../../constants/colors"
import { musicals } from "../../data/musicals"

const CATEGORIES = ["전체", "뮤지컬", "연극", "콘서트"]

export default function HomeScreen() {
  const [category, setCategory] = useState("전체")
  const router = useRouter()

  const filtered = musicals.filter(m =>
    category === "전체" ? true : m.category === category
  )

  const getDdayColor = (dday: string) => {
    if (dday === "D-1" || dday === "D-2") return Colors.urgent
    if (dday.startsWith("D-3") || dday.startsWith("D-4") || dday.startsWith("D-5"))
      return Colors.warning
    return Colors.accent
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.bg} />

      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.logo}>티켓런</Text>
        <Text style={styles.logoSub}>이번 주 티켓팅 오픈</Text>
      </View>

      {/* 카테고리 */}
      <View style={styles.categoryRow}>
        {CATEGORIES.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[styles.catBtn, category === cat && styles.catBtnActive]}
            onPress={() => setCategory(cat)}
          >
            <Text style={[
              styles.catText,
              category === cat && styles.catTextActive
            ]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 공연 목록 */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/musical/${item.id}` as any)}
            activeOpacity={0.7}
          >
            {/* 포스터 자리 */}
            <View style={styles.poster}>
              <Text style={styles.posterEmoji}>🎭</Text>
            </View>

            {/* 공연 정보 */}
            <View style={styles.info}>
              <Text style={styles.title} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.venue}>📍 {item.venue}</Text>
              <Text style={styles.platform}>{item.platform}</Text>

              <View style={styles.bottomRow}>
                <Text style={styles.openDate}>{item.openDate}</Text>
                <View style={[
                  styles.ddayBadge,
                  { backgroundColor: getDdayColor(item.dday) }
                ]}>
                  <Text style={styles.ddayText}>{item.dday}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
  },
  logo: {
    fontSize: 26,
    fontWeight: "800",
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  logoSub: {
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 2,
  },
  categoryRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 12,
  },
  catBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: Colors.bgMuted,
  },
  catBtnActive: {
    backgroundColor: Colors.textPrimary,
  },
  catText: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: "500",
  },
  catTextActive: {
    color: Colors.bg,
    fontWeight: "700",
  },
  card: {
    flexDirection: "row",
    backgroundColor: Colors.bgCard,
    borderRadius: 14,
    marginBottom: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  poster: {
    width: 90,
    backgroundColor: Colors.bgMuted,
    justifyContent: "center",
    alignItems: "center",
  },
  posterEmoji: {
    fontSize: 32,
  },
  info: {
    flex: 1,
    padding: 14,
    gap: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  venue: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  platform: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  openDate: {
    fontSize: 12,
    color: Colors.accent,
    fontWeight: "600",
  },
  ddayBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  ddayText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
})
