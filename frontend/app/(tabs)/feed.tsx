import {
  View, Text, FlatList,
  StyleSheet, TouchableOpacity, TextInput
} from "react-native"
import { useState } from "react"
import { reviews, Review } from "../../data/reviews"
import { Colors } from "../../constants/colors"

const FILTERS = ["전체", "뮤지컬", "연극", "콘서트"] as const

export default function FeedScreen() {
  const [liked, setLiked] = useState<string[]>([])
  const [filter, setFilter] = useState("전체")
  const [posts, setPosts] = useState<Review[]>(reviews)
  const [text, setText] = useState("")
  const [showInput, setShowInput] = useState(false)

  const handleLike = (id: string) =>
    setLiked(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )

  const handlePost = () => {
    if (!text.trim()) return
    const newPost: Review = {
      id: Date.now().toString(),
      userId: "me",
      userName: "나",
      musicalId: "",
      musicalTitle: "자유후기",
      seat: "",
      content: text.trim(),
      likes: 0,
      isVerified: false,
      createdAt: new Date().toISOString().split("T")[0],
    }
    setPosts(prev => [newPost, ...prev])
    setText("")
    setShowInput(false)
  }

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.logo}>티켓런</Text>
        <TouchableOpacity
          style={styles.writeBtn}
          onPress={() => setShowInput(!showInput)}
        >
          <Text style={styles.writeBtnText}>✏️</Text>
        </TouchableOpacity>
      </View>

      {/* 글쓰기 인풋 */}
      {showInput && (
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="관람 후기를 남겨보세요..."
            placeholderTextColor={Colors.textMuted}
            value={text}
            onChangeText={setText}
            multiline
            autoFocus
          />
          <TouchableOpacity style={styles.postBtn} onPress={handlePost}>
            <Text style={styles.postBtnText}>게시</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* 필터 */}
      <View style={styles.filterRow}>
        {FILTERS.map(f => (
          <TouchableOpacity key={f} onPress={() => setFilter(f)}>
            <Text style={[styles.filterText, filter === f && styles.filterActive]}>
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 피드 */}
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <View style={styles.avatarCol}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{item.userName.charAt(0)}</Text>
              </View>
              <View style={styles.line} />
            </View>

            <View style={styles.postBody}>
              <View style={styles.postHeader}>
                <Text style={styles.userName}>{item.userName}</Text>
                {item.isVerified && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>관람인증 ✅</Text>
                  </View>
                )}
                <Text style={styles.date}>{item.createdAt}</Text>
              </View>

              {item.musicalTitle !== "자유후기" && (
                <Text style={styles.musicalTag}>🎭 {item.musicalTitle}{item.seat ? ` · ${item.seat}` : ""}</Text>
              )}

              <Text style={styles.content}>{item.content}</Text>

              <View style={styles.actions}>
                <TouchableOpacity onPress={() => handleLike(item.id)} style={styles.action}>
                  <Text style={styles.actionText}>
                    {liked.includes(item.id) ? "❤️" : "🤍"} {item.likes + (liked.includes(item.id) ? 1 : 0)}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.action}>
                  <Text style={styles.actionText}>💬</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  logo: { fontSize: 22, fontWeight: "800", color: Colors.textPrimary },
  writeBtn: { padding: 8 },
  writeBtnText: { fontSize: 20 },
  inputBox: {
    backgroundColor: Colors.bgCard,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  input: {
    fontSize: 15,
    color: Colors.textPrimary,
    minHeight: 60,
    textAlignVertical: "top",
  },
  postBtn: {
    alignSelf: "flex-end",
    backgroundColor: Colors.accent,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 8,
  },
  postBtnText: { color: "#fff", fontWeight: "700", fontSize: 14 },
  filterRow: {
    flexDirection: "row",
    gap: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  filterText: { fontSize: 14, color: Colors.textMuted },
  filterActive: { color: Colors.textPrimary, fontWeight: "700" },
  separator: { height: 1, backgroundColor: Colors.border },
  post: {
    flexDirection: "row",
    padding: 16,
    paddingBottom: 8,
  },
  avatarCol: { alignItems: "center", marginRight: 12 },
  avatar: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.accentSoft,
    justifyContent: "center", alignItems: "center",
  },
  avatarText: { color: Colors.accent, fontWeight: "700", fontSize: 16 },
  line: { width: 2, flex: 1, backgroundColor: Colors.border, marginTop: 6 },
  postBody: { flex: 1, paddingBottom: 16 },
  postHeader: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 4, flexWrap: "wrap" },
  userName: { fontSize: 14, fontWeight: "700", color: Colors.textPrimary },
  badge: {
    backgroundColor: Colors.accentSoft,
    borderRadius: 8, paddingHorizontal: 6, paddingVertical: 2,
  },
  badgeText: { fontSize: 11, color: Colors.accent },
  date: { fontSize: 12, color: Colors.textMuted, marginLeft: "auto" },
  musicalTag: { fontSize: 13, color: Colors.accent, marginBottom: 6 },
  content: { fontSize: 15, color: Colors.textPrimary, lineHeight: 22, marginBottom: 10 },
  actions: { flexDirection: "row", gap: 16 },
  action: { padding: 4 },
  actionText: { fontSize: 14, color: Colors.textMuted },
})