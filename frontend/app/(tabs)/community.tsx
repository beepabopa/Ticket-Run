import {
  View, Text, FlatList, StyleSheet,
  TouchableOpacity, Modal, TextInput, ScrollView, Alert
} from "react-native"
import { useState } from "react"
import { Colors } from "../../constants/colors"

interface Transfer {
  id: string
  userId: string
  userName: string
  isVerified: boolean
  musicalTitle: string
  date: string
  venue: string
  seat: string
  originalPrice: number
  transferPrice: number
  method: string
  status: "판매중" | "예약중" | "완료"
  createdAt: string
}

const DUMMY: Transfer[] = [
  {
    id: "1", userId: "u1", userName: "뮤덕후123", isVerified: true,
    musicalTitle: "웃는남자", date: "2026-06-25", venue: "예술의전당",
    seat: "B구역 2열 15번", originalPrice: 110000, transferPrice: 110000,
    method: "모바일전송", status: "판매중", createdAt: "2026-06-11",
  },
  {
    id: "2", userId: "u2", userName: "공연러버", isVerified: true,
    musicalTitle: "레미제라블", date: "2026-06-20", venue: "블루스퀘어",
    seat: "VIP 3열 8번", originalPrice: 140000, transferPrice: 130000,
    method: "직거래", status: "판매중", createdAt: "2026-06-10",
  },
  {
    id: "3", userId: "u3", userName: "티켓런유저", isVerified: false,
    musicalTitle: "햄릿", date: "2026-06-18", venue: "샤롯데씨어터",
    seat: "R석 5열 22번", originalPrice: 99000, transferPrice: 99000,
    method: "모바일전송", status: "예약중", createdAt: "2026-06-09",
  },
]

export default function CommunityScreen() {
  const [posts, setPosts] = useState<Transfer[]>(DUMMY)
  const [showModal, setShowModal] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [form, setForm] = useState({
    musicalTitle: "", date: "", venue: "",
    seat: "", originalPrice: "", transferPrice: "", method: "모바일전송"
  })

  const handleWrite = () => {
    if (!isVerified) { setShowAuthModal(true); return }
    setShowModal(true)
  }

  const handleAuth = () => {
    // 실제론 포트원 연동 — 지금은 mock
    setIsVerified(true)
    setShowAuthModal(false)
    Alert.alert("인증 완료 ✅", "본인인증이 완료됐어요. 이제 양도글을 작성할 수 있어요!")
  }

  const handleSave = () => {
    if (!form.musicalTitle.trim()) return
    setPosts(prev => [{
      id: Date.now().toString(),
      userId: "me", userName: "나", isVerified: true,
      musicalTitle: form.musicalTitle,
      date: form.date, venue: form.venue, seat: form.seat,
      originalPrice: Number(form.originalPrice),
      transferPrice: Number(form.transferPrice),
      method: form.method, status: "판매중",
      createdAt: new Date().toISOString().split("T")[0],
    }, ...prev])
    setForm({ musicalTitle: "", date: "", venue: "", seat: "", originalPrice: "", transferPrice: "", method: "모바일전송" })
    setShowModal(false)
  }

  const handleChat = (item: Transfer) => {
    Alert.alert("채팅 요청", `${item.userName}님께 채팅을 요청할까요?`, [
      { text: "취소", style: "cancel" },
      { text: "채팅하기", onPress: () => Alert.alert("준비중", "채팅 기능은 곧 추가돼요!") },
    ])
  }

  const statusColor = (s: Transfer["status"]) => {
    if (s === "판매중") return Colors.success
    if (s === "예약중") return Colors.warning
    return Colors.textMuted
  }

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.title}>양도</Text>
        <TouchableOpacity style={styles.writeBtn} onPress={handleWrite}>
          <Text style={styles.writeBtnText}>+ 글쓰기</Text>
        </TouchableOpacity>
      </View>

      {/* 인증 안내 배너 */}
      {!isVerified && (
        <TouchableOpacity style={styles.authBanner} onPress={() => setShowAuthModal(true)}>
          <Text style={styles.authBannerText}>🔒 본인인증 후 양도글 작성 가능해요 →</Text>
        </TouchableOpacity>
      )}

      {/* 목록 */}
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardTop}>
              <Text style={styles.musicalTitle}>{item.musicalTitle}</Text>
              <View style={[styles.statusBadge, { backgroundColor: statusColor(item.status) + "22" }]}>
                <Text style={[styles.statusText, { color: statusColor(item.status) }]}>
                  {item.status}
                </Text>
              </View>
            </View>

            <Text style={styles.cardSub}>📅 {item.date} · 📍 {item.venue}</Text>
            <Text style={styles.cardSub}>💺 {item.seat}</Text>

            <View style={styles.priceRow}>
              <Text style={styles.price}>
                {item.transferPrice.toLocaleString()}원
              </Text>
              {item.transferPrice < item.originalPrice && (
                <Text style={styles.originalPrice}>
                  정가 {item.originalPrice.toLocaleString()}원
                </Text>
              )}
              <Text style={styles.method}>{item.method}</Text>
            </View>

            <View style={styles.cardBottom}>
              <View style={styles.sellerRow}>
                <Text style={styles.sellerName}>{item.userName}</Text>
                {item.isVerified && (
                  <Text style={styles.verifiedText}>✅ 인증</Text>
                )}
              </View>
              <TouchableOpacity
                style={styles.chatBtn}
                onPress={() => handleChat(item)}
              >
                <Text style={styles.chatBtnText}>채팅하기</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* 본인인증 모달 */}
      <Modal visible={showAuthModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>본인인증 필요</Text>
            <Text style={styles.modalDesc}>
              안전한 거래를 위해{"\n"}휴대폰 본인인증이 필요해요.
            </Text>
            <TouchableOpacity style={styles.authBtn} onPress={handleAuth}>
              <Text style={styles.authBtnText}>📱 휴대폰 본인인증</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setShowAuthModal(false)}
            >
              <Text style={styles.cancelBtnText}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 양도글 작성 모달 */}
      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <ScrollView>
            <View style={[styles.modalBox, { marginTop: 60 }]}>
              <Text style={styles.modalTitle}>양도글 작성</Text>

              {[
                { key: "musicalTitle", placeholder: "공연 제목 *" },
                { key: "date", placeholder: "공연 날짜 (예: 2026-06-25)" },
                { key: "venue", placeholder: "공연장" },
                { key: "seat", placeholder: "좌석 정보 (예: B구역 2열 15번)" },
                { key: "originalPrice", placeholder: "정가 (숫자만)" },
                { key: "transferPrice", placeholder: "양도가 (숫자만)" },
              ].map(({ key, placeholder }) => (
                <TextInput
                  key={key}
                  style={styles.modalInput}
                  placeholder={placeholder}
                  placeholderTextColor={Colors.textMuted}
                  value={String(form[key as keyof typeof form])}
                  onChangeText={v => setForm(prev => ({ ...prev, [key]: v }))}
                  keyboardType={key.includes("Price") ? "numeric" : "default"}
                />
              ))}

              {/* 거래방식 */}
              <Text style={styles.methodLabel}>거래 방식</Text>
              <View style={styles.methodRow}>
                {["모바일전송", "직거래"].map(m => (
                  <TouchableOpacity
                    key={m}
                    style={[styles.methodBtn, form.method === m && styles.methodBtnActive]}
                    onPress={() => setForm(prev => ({ ...prev, method: m }))}
                  >
                    <Text style={[styles.methodBtnText, form.method === m && styles.methodBtnTextActive]}>
                      {m}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.modalBtns}>
                <TouchableOpacity style={styles.modalCancel} onPress={() => setShowModal(false)}>
                  <Text style={styles.modalCancelText}>취소</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalSave} onPress={handleSave}>
                  <Text style={styles.modalSaveText}>등록</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  header: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    paddingHorizontal: 20, paddingTop: 60, paddingBottom: 16,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  title: { fontSize: 22, fontWeight: "800", color: Colors.textPrimary },
  writeBtn: {
    backgroundColor: Colors.accent,
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20,
  },
  writeBtnText: { color: "#fff", fontWeight: "700", fontSize: 14 },
  authBanner: {
    backgroundColor: Colors.accentSoft,
    padding: 12, marginHorizontal: 16, marginTop: 12,
    borderRadius: 10,
  },
  authBannerText: { fontSize: 13, color: Colors.accent, fontWeight: "600" },
  separator: { height: 1, backgroundColor: Colors.border },
  card: { padding: 16, backgroundColor: Colors.bgCard },
  cardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6 },
  musicalTitle: { fontSize: 16, fontWeight: "700", color: Colors.textPrimary },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 10 },
  statusText: { fontSize: 12, fontWeight: "600" },
  cardSub: { fontSize: 13, color: Colors.textSecondary, marginTop: 2 },
  priceRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 10 },
  price: { fontSize: 17, fontWeight: "800", color: Colors.textPrimary },
  originalPrice: { fontSize: 12, color: Colors.textMuted, textDecorationLine: "line-through" },
  method: {
    fontSize: 12, color: Colors.accent,
    borderWidth: 1, borderColor: Colors.accent,
    paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8, marginLeft: "auto"
  },
  cardBottom: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 12 },
  sellerRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  sellerName: { fontSize: 13, color: Colors.textSecondary },
  verifiedText: { fontSize: 12, color: Colors.success },
  chatBtn: {
    backgroundColor: Colors.textPrimary,
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20,
  },
  chatBtnText: { color: Colors.bg, fontWeight: "700", fontSize: 13 },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "flex-end" },
  modalBox: {
    backgroundColor: Colors.bgCard,
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 24, paddingBottom: 40,
  },
  modalTitle: { fontSize: 18, fontWeight: "800", color: Colors.textPrimary, marginBottom: 8 },
  modalDesc: { fontSize: 14, color: Colors.textSecondary, marginBottom: 20, lineHeight: 22 },
  authBtn: {
    backgroundColor: Colors.accent, borderRadius: 12,
    padding: 16, alignItems: "center", marginBottom: 10,
  },
  authBtnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  cancelBtn: {
    backgroundColor: Colors.bgMuted, borderRadius: 12,
    padding: 16, alignItems: "center",
  },
  cancelBtnText: { color: Colors.textSecondary, fontWeight: "600" },
  modalInput: {
    backgroundColor: Colors.bgMuted, borderRadius: 10,
    padding: 14, fontSize: 14, color: Colors.textPrimary, marginBottom: 10,
  },
  methodLabel: { fontSize: 14, color: Colors.textSecondary, marginBottom: 8 },
  methodRow: { flexDirection: "row", gap: 10, marginBottom: 16 },
  methodBtn: {
    flex: 1, padding: 12, borderRadius: 10,
    backgroundColor: Colors.bgMuted, alignItems: "center",
    borderWidth: 1, borderColor: Colors.border,
  },
  methodBtnActive: { backgroundColor: Colors.accent, borderColor: Colors.accent },
  methodBtnText: { fontSize: 14, color: Colors.textSecondary, fontWeight: "600" },
  methodBtnTextActive: { color: "#fff" },
  modalBtns: { flexDirection: "row", gap: 10, marginTop: 8 },
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