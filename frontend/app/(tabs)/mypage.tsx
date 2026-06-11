import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, Modal, TextInput
} from "react-native"
import { useState, useCallback } from "react"
import { useFocusEffect } from "expo-router"
import { Colors } from "../../constants/colors"
import { favoriteIds, followedActors } from "../../store/favorites"
import { alarmIds } from "../../store/alarms"
import { musicals } from "../../data/musicals"
import { actors } from "../../data/actors"

interface TicketRecord {
  id: string
  title: string
  date: string
  venue: string
  cast: string
  rating: number
  memo: string
}

export default function MyPageScreen() {
  const [records, setRecords] = useState<TicketRecord[]>([
    {
      id: "1", title: "웃는남자", date: "2026-06-01",
      venue: "예술의전당", cast: "홍광호, 박강현",
      rating: 5, memo: "인생 뮤지컬 등극...",
    },
  ])
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({
    title: "", date: "", venue: "", cast: "", rating: 5, memo: ""
  })
  const [favList, setFavList] = useState<string[]>([])
  const [alarmList, setAlarmList] = useState<string[]>([])
  const [actorList, setActorList] = useState<string[]>([])

  useFocusEffect(
    useCallback(() => {
      setFavList([...favoriteIds])
      setAlarmList([...alarmIds])
      setActorList([...followedActors])
    }, [])
  )

  const handleSave = () => {
    if (!form.title.trim()) return
    setRecords(prev => [{ id: Date.now().toString(), ...form }, ...prev])
    setForm({ title: "", date: "", venue: "", cast: "", rating: 5, memo: "" })
    setShowModal(false)
  }

  const favMusicals = musicals.filter(m => favList.includes(m.id))
  const alarmMusicals = musicals.filter(m => alarmList.includes(m.id))
  const followedActorList = actors.filter(a => actorList.includes(a.id))

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>MY</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

        {/* 통계 */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>{records.length}</Text>
            <Text style={styles.statLabel}>총 관람</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>{favList.length}</Text>
            <Text style={styles.statLabel}>관심공연</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>{actorList.length}</Text>
            <Text style={styles.statLabel}>팔로우 배우</Text>
          </View>
        </View>

        {/* 관심 공연 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⭐ 관심 공연</Text>
          {favMusicals.length === 0
            ? <Text style={styles.empty}>등록된 관심 공연이 없어요</Text>
            : favMusicals.map(m => (
              <View key={m.id} style={styles.rowCard}>
                <Text style={styles.rowTitle}>{m.title}</Text>
                <View style={styles.ddayBadge}>
                  <Text style={styles.ddayText}>{m.dday}</Text>
                </View>
              </View>
            ))
          }
        </View>

        {/* 알림 공연 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔔 알림 설정 공연</Text>
          {alarmMusicals.length === 0
            ? <Text style={styles.empty}>알림 설정된 공연이 없어요</Text>
            : alarmMusicals.map(m => (
              <View key={m.id} style={styles.rowCard}>
                <Text style={styles.rowTitle}>{m.title}</Text>
                <Text style={styles.rowSub}>{m.openDate}</Text>
              </View>
            ))
          }
        </View>

        {/* 팔로우 배우 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎤 팔로우 배우</Text>
          {followedActorList.length === 0
            ? <Text style={styles.empty}>팔로우한 배우가 없어요</Text>
            : (
              <View style={styles.actorRow}>
                {followedActorList.map(a => (
                  <View key={a.id} style={styles.actorChip}>
                    <Text style={styles.actorChipText}>{a.name}</Text>
                  </View>
                ))}
              </View>
            )
          }
        </View>

        {/* 티켓 기록 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🎟️ 티켓 기록</Text>
            <TouchableOpacity style={styles.addBtn} onPress={() => setShowModal(true)}>
              <Text style={styles.addBtnText}>+ 추가</Text>
            </TouchableOpacity>
          </View>
          {records.map(item => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardTop}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text>{"⭐".repeat(item.rating)}</Text>
              </View>
              <Text style={styles.cardSub}>📅 {item.date} · 📍 {item.venue}</Text>
              {item.cast ? <Text style={styles.cardSub}>👤 {item.cast}</Text> : null}
              {item.memo ? <Text style={styles.cardMemo}>"{item.memo}"</Text> : null}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* 기록 추가 모달 */}
      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>관람 기록 추가</Text>
            {[
              { key: "title", placeholder: "공연 제목 *" },
              { key: "date", placeholder: "관람일 (예: 2026-06-11)" },
              { key: "venue", placeholder: "공연장" },
              { key: "cast", placeholder: "관람 캐스트" },
              { key: "memo", placeholder: "한줄 메모" },
            ].map(({ key, placeholder }) => (
              <TextInput
                key={key}
                style={styles.modalInput}
                placeholder={placeholder}
                placeholderTextColor={Colors.textMuted}
                value={String(form[key as keyof typeof form])}
                onChangeText={v => setForm(prev => ({ ...prev, [key]: v }))}
              />
            ))}
            <View style={styles.ratingRow}>
              <Text style={styles.ratingLabel}>별점</Text>
              {[1,2,3,4,5].map(n => (
                <TouchableOpacity key={n} onPress={() => setForm(prev => ({ ...prev, rating: n }))}>
                  <Text style={{ fontSize: 24 }}>{n <= form.rating ? "⭐" : "☆"}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.modalBtns}>
              <TouchableOpacity style={styles.modalCancel} onPress={() => setShowModal(false)}>
                <Text style={styles.modalCancelText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalSave} onPress={handleSave}>
                <Text style={styles.modalSaveText}>저장</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  header: {
    paddingHorizontal: 20, paddingTop: 60, paddingBottom: 16,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  title: { fontSize: 22, fontWeight: "800", color: Colors.textPrimary },
  statsRow: { flexDirection: "row", padding: 20, gap: 12 },
  statBox: {
    flex: 1, backgroundColor: Colors.bgCard, borderRadius: 12,
    padding: 16, alignItems: "center",
    borderWidth: 1, borderColor: Colors.border,
  },
  statNum: { fontSize: 24, fontWeight: "800", color: Colors.accent },
  statLabel: { fontSize: 12, color: Colors.textMuted, marginTop: 4 },
  section: { paddingHorizontal: 20, marginBottom: 24 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  sectionTitle: { fontSize: 15, fontWeight: "700", color: Colors.textPrimary, marginBottom: 12 },
  empty: { fontSize: 13, color: Colors.textMuted },
  rowCard: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    backgroundColor: Colors.bgCard, borderRadius: 12, padding: 14,
    marginBottom: 8, borderWidth: 1, borderColor: Colors.border,
  },
  rowTitle: { fontSize: 14, fontWeight: "600", color: Colors.textPrimary },
  rowSub: { fontSize: 12, color: Colors.textMuted },
  ddayBadge: {
    backgroundColor: Colors.accent,
    paddingHorizontal: 10, paddingVertical: 3, borderRadius: 10,
  },
  ddayText: { color: "#fff", fontSize: 12, fontWeight: "700" },
  actorRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  actorChip: {
    backgroundColor: Colors.accentSoft, borderRadius: 20,
    paddingHorizontal: 14, paddingVertical: 8,
    borderWidth: 1, borderColor: Colors.accent,
  },
  actorChipText: { color: Colors.accent, fontWeight: "600", fontSize: 13 },
  card: {
    backgroundColor: Colors.bgCard, borderRadius: 14,
    padding: 16, marginBottom: 10,
    borderWidth: 1, borderColor: Colors.border,
  },
  cardTop: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  cardTitle: { fontSize: 16, fontWeight: "700", color: Colors.textPrimary },
  cardSub: { fontSize: 13, color: Colors.textSecondary, marginTop: 2 },
  cardMemo: { fontSize: 13, color: Colors.textMuted, marginTop: 6, fontStyle: "italic" },
  addBtn: {
    backgroundColor: Colors.accent,
    paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20,
  },
  addBtnText: { color: "#fff", fontWeight: "700", fontSize: 13 },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "flex-end" },
  modalBox: {
    backgroundColor: Colors.bgCard,
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 24, paddingBottom: 40,
  },
  modalTitle: { fontSize: 18, fontWeight: "800", color: Colors.textPrimary, marginBottom: 16 },
  modalInput: {
    backgroundColor: Colors.bgMuted, borderRadius: 10,
    padding: 14, fontSize: 14, color: Colors.textPrimary, marginBottom: 10,
  },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 16 },
  ratingLabel: { fontSize: 14, color: Colors.textSecondary, marginRight: 4 },
  modalBtns: { flexDirection: "row", gap: 10 },
  modalCancel: {
    flex: 1, padding: 14, borderRadius: 12,
    backgroundColor: Colors.bgMuted, alignItems: "center",
  },
  modalCancelText: { color: Colors.textSecondary, fontWeight: "600" },
  modalSave: {
    flex: 1, padding: 14, borderRadius: 12,
    backgroundColor: Colors.accent, alignItems: "center",
  },
  modalSaveText: { color: "#fff", fontWeight: "700" },
})