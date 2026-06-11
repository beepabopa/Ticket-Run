import {
  View, Text, ScrollView,
  TouchableOpacity, Alert, StyleSheet, Linking
} from "react-native"
import { useLocalSearchParams, router } from "expo-router"
import { useState } from "react"
import { musicals } from "../../data/musicals"
import { actors } from "../../data/actors"
import { followedActors, isFavorite, toggleFavorite, toggleFollowActor } from "../../store/favorites"
import { isAlarmOn, toggleAlarm } from "../../store/alarms"
import { Colors } from "../../constants/colors"

const PLATFORM_URLS: Record<string, string> = {
  "인터파크": "https://tickets.interpark.com",
  "멜론티켓": "https://ticket.melon.com",
  "YES24": "https://ticket.yes24.com",
  "티켓링크": "https://www.ticketlink.co.kr",
}

export default function MusicalDetailScreen() {
  const { id } = useLocalSearchParams()
  const musical = musicals.find(item => item.id === id)
  const [alarmOn, setAlarmOn] = useState(musical ? isAlarmOn(musical.id) : false)
  const [isFav, setIsFav] = useState(musical ? isFavorite(musical.id) : false)
  const [followed, setFollowed] = useState<string[]>([...followedActors])

  if (!musical) return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: Colors.bg }}>
      <Text style={{ color: Colors.textMuted }}>공연 정보를 찾을 수 없습니다.</Text>
    </View>
  )

  const relatedActors = actors.filter(a => a.musicalIds.includes(musical.id))

  const handleAlarm = () => {
    const next = toggleAlarm(musical.id)
    setAlarmOn(next)
    Alert.alert(next ? "알림 등록 🔔" : "알림 해제", next ? `${musical.openDate} 오픈 전에 알려드릴게요!` : `${musical.title} 알림을 해제했어요.`)
  }

  const handleFavorite = () => {
    const next = toggleFavorite(musical.id)
    setIsFav(next)
    Alert.alert(next ? "등록 완료 ⭐" : "해제", next ? `${musical.title}을 관심공연에 추가했어요.` : `${musical.title}을 관심공연에서 제거했어요.`)
  }

  const handleFollowActor = (actor: typeof actors[0]) => {
    const next = toggleFollowActor(actor.id)
    setFollowed([...followedActors])
    Alert.alert(next ? "팔로우 ✅" : "팔로우 해제", next ? `${actor.name} 배우를 팔로우했어요!` : `${actor.name} 배우 팔로우를 해제했어요.`)
  }

  const handleBuyTicket = () => {
    const url = PLATFORM_URLS[musical.platform]
    if (url) Linking.openURL(url)
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 포스터 */}
      <View style={styles.poster}>
        <Text style={styles.posterEmoji}>🎭</Text>
      </View>

      <View style={styles.body}>
        {/* 플랫폼 + D-day */}
        <View style={styles.topRow}>
          <Text style={styles.platform}>{musical.platform}</Text>
          <View style={styles.ddayBadge}>
            <Text style={styles.ddayText}>{musical.dday}</Text>
          </View>
        </View>

        <Text style={styles.title}>{musical.title}</Text>
        <Text style={styles.venue}>📍 {musical.venue}</Text>

        {/* 티켓 오픈 */}
        <View style={styles.openBox}>
          <Text style={styles.openLabel}>티켓 오픈</Text>
          <Text style={styles.openValue}>{musical.openDate}</Text>
        </View>

        {/* 액션 버튼 */}
        <View style={styles.btnRow}>
          <TouchableOpacity
            style={[styles.btnHalf, isFav && styles.btnHalfOn]}
            onPress={handleFavorite}
          >
            <Text style={[styles.btnHalfText, isFav && styles.btnHalfTextOn]}>
              {isFav ? "⭐ 관심등록됨" : "☆ 관심공연"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnHalf, alarmOn && styles.btnHalfAccent]}
            onPress={handleAlarm}
          >
            <Text style={[styles.btnHalfText, alarmOn && styles.btnHalfTextOn]}>
              {alarmOn ? "🔔 알림 ON" : "🔕 알림 받기"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* 예매 바로가기 */}
        <TouchableOpacity style={styles.buyBtn} onPress={handleBuyTicket}>
          <Text style={styles.buyBtnText}>🎫 {musical.platform}에서 예매하기 →</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        {/* 출연 배우 */}
        {relatedActors.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>출연 배우</Text>
            <View style={styles.actorRow}>
              {relatedActors.map(actor => {
                const isFollowed = followed.includes(actor.id)
                return (
                  <TouchableOpacity
                    key={actor.id}
                    style={[styles.actorBtn, isFollowed && styles.actorBtnOn]}
                    onPress={() => handleFollowActor(actor)}
                  >
                    <Text style={styles.actorAvatar}>🎤</Text>
                    <Text style={[styles.actorName, isFollowed && styles.actorNameOn]}>
                      {actor.name}
                    </Text>
                    <Text style={[styles.actorFollow, isFollowed && styles.actorFollowOn]}>
                      {isFollowed ? "✓ 팔로잉" : "+ 팔로우"}
                    </Text>
                  </TouchableOpacity>
                )
              })}
            </View>
            <View style={styles.divider} />
          </>
        )}

        {/* 후기 / 양도 링크 */}
        <TouchableOpacity
          style={styles.linkRow}
          onPress={() => router.push(`/musical/${musical.id}/reviews`)}
        >
          <Text style={styles.linkText}>💬 관람 후기 보기</Text>
          <Text style={styles.linkArrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkRow}>
          <Text style={styles.linkText}>🎫 양도 티켓 보기</Text>
          <Text style={styles.linkArrow}>›</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  poster: {
    height: 220, backgroundColor: Colors.bgMuted,
    justifyContent: "center", alignItems: "center",
  },
  posterEmoji: { fontSize: 64 },
  body: { padding: 20 },
  topRow: {
    flexDirection: "row", justifyContent: "space-between",
    alignItems: "center", marginBottom: 8,
  },
  platform: { fontSize: 13, color: Colors.textMuted },
  ddayBadge: {
    backgroundColor: Colors.accent,
    paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12,
  },
  ddayText: { color: "#fff", fontWeight: "700", fontSize: 13 },
  title: {
    fontSize: 24, fontWeight: "800",
    color: Colors.textPrimary, marginBottom: 6,
  },
  venue: { fontSize: 14, color: Colors.textSecondary, marginBottom: 16 },
  openBox: {
    backgroundColor: Colors.accentSoft, borderRadius: 12,
    padding: 16, flexDirection: "row",
    justifyContent: "space-between", marginBottom: 16,
  },
  openLabel: { color: Colors.textSecondary, fontSize: 14 },
  openValue: { color: Colors.accent, fontWeight: "700", fontSize: 15 },
  btnRow: { flexDirection: "row", gap: 10, marginBottom: 10 },
  btnHalf: {
    flex: 1, paddingVertical: 14, borderRadius: 12,
    alignItems: "center", backgroundColor: Colors.bgMuted,
    borderWidth: 1, borderColor: Colors.border,
  },
  btnHalfOn: { backgroundColor: Colors.textPrimary, borderColor: Colors.textPrimary },
  btnHalfAccent: { backgroundColor: Colors.accent, borderColor: Colors.accent },
  btnHalfText: { fontSize: 14, fontWeight: "600", color: Colors.textSecondary },
  btnHalfTextOn: { color: "#fff" },
  buyBtn: {
    backgroundColor: Colors.accentSoft, borderRadius: 12,
    padding: 14, alignItems: "center", marginBottom: 20,
    borderWidth: 1, borderColor: Colors.accent,
  },
  buyBtnText: { color: Colors.accent, fontWeight: "700", fontSize: 14 },
  divider: { height: 1, backgroundColor: Colors.divider, marginBottom: 16, marginTop: 4 },
  sectionTitle: {
    fontSize: 15, fontWeight: "700",
    color: Colors.textPrimary, marginBottom: 12,
  },
  actorRow: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 16 },
  actorBtn: {
    alignItems: "center", backgroundColor: Colors.bgCard,
    borderRadius: 12, padding: 12, minWidth: 80,
    borderWidth: 1, borderColor: Colors.border,
  },
  actorBtnOn: { borderColor: Colors.accent, backgroundColor: Colors.accentSoft },
  actorAvatar: { fontSize: 24, marginBottom: 4 },
  actorName: { fontSize: 13, fontWeight: "700", color: Colors.textPrimary },
  actorNameOn: { color: Colors.accent },
  actorFollow: { fontSize: 11, color: Colors.textMuted, marginTop: 2 },
  actorFollowOn: { color: Colors.accent },
  linkRow: {
    flexDirection: "row", justifyContent: "space-between",
    alignItems: "center", paddingVertical: 16,
    borderBottomWidth: 1, borderBottomColor: Colors.divider,
  },
  linkText: { fontSize: 15, color: Colors.textPrimary, fontWeight: "500" },
  linkArrow: { fontSize: 20, color: Colors.textMuted },
})