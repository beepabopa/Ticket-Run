import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, FlatList
} from "react-native"
import { useState } from "react"
import { Colors } from "../../constants/colors"
import { musicals } from "../../data/musicals"

const MONTHS = ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"]
const DAYS = ["일","월","화","수","목","금","토"]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDay(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

const TIMELINE = [
  { id: "1", title: "웃는남자", start: "2026-05-01", end: "2026-08-31", color: "#C8963E", venue: "예술의전당" },
  { id: "2", title: "레미제라블", start: "2026-06-01", end: "2026-09-30", color: "#4A7C59", venue: "블루스퀘어" },
  { id: "3", title: "햄릿", start: "2026-04-01", end: "2026-07-31", color: "#C0392B", venue: "샤롯데씨어터" },
  { id: "4", title: "오페라의유령", start: "2026-07-01", end: "2026-12-31", color: "#6B5E52", venue: "예술의전당" },
  { id: "5", title: "시카고", start: "2026-08-01", end: "2027-02-28", color: "#E67E22", venue: "LG아트센터" },
]

export default function CalendarScreen() {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [tab, setTab] = useState<"캘린더" | "타임라인">("캘린더")

  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDay(year, month)
  const cells = Array(firstDay).fill(null).concat(
    Array.from({ length: daysInMonth }, (_, i) => i + 1)
  )

  const ticketingDays = musicals
    .filter(m => {
      const d = new Date(m.openDate)
      return d.getFullYear() === year && d.getMonth() === month
    })
    .map(m => new Date(m.openDate).getDate())

  const prevMonth = () => {
    if (month === 0) { setYear(y => y - 1); setMonth(11) }
    else setMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (month === 11) { setYear(y => y + 1); setMonth(0) }
    else setMonth(m => m + 1)
  }

  // 타임라인: 월별 폭 계산
  const timelineStart = new Date("2026-01-01")
  const timelineEnd = new Date("2027-06-30")
  const totalMonths = (timelineEnd.getFullYear() - timelineStart.getFullYear()) * 12
    + timelineEnd.getMonth() - timelineStart.getMonth() + 1
  const COL_W = 52

  const getLeft = (start: string) => {
    const d = new Date(start)
    const diff = (d.getFullYear() - timelineStart.getFullYear()) * 12
      + d.getMonth() - timelineStart.getMonth()
    return Math.max(0, diff) * COL_W
  }

  const getWidth = (start: string, end: string) => {
    const s = new Date(start)
    const e = new Date(end)
    const months = (e.getFullYear() - s.getFullYear()) * 12 + e.getMonth() - s.getMonth() + 1
    return months * COL_W - 4
  }

  const timelineMonths = Array.from({ length: totalMonths }, (_, i) => {
    const d = new Date(timelineStart)
    d.setMonth(d.getMonth() + i)
    return `${d.getMonth() + 1}월`
  })

  return (
    <View style={styles.container}>
      {/* 탭 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>일정</Text>
        <View style={styles.tabRow}>
          {(["캘린더", "타임라인"] as const).map(t => (
            <TouchableOpacity
              key={t}
              style={[styles.tabBtn, tab === t && styles.tabBtnActive]}
              onPress={() => setTab(t)}
            >
              <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {tab === "캘린더" ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* 월 이동 */}
          <View style={styles.monthNav}>
            <TouchableOpacity onPress={prevMonth} style={styles.navBtn}>
              <Text style={styles.navBtnText}>‹</Text>
            </TouchableOpacity>
            <Text style={styles.monthText}>{year}년 {MONTHS[month]}</Text>
            <TouchableOpacity onPress={nextMonth} style={styles.navBtn}>
              <Text style={styles.navBtnText}>›</Text>
            </TouchableOpacity>
          </View>

          {/* 요일 헤더 */}
          <View style={styles.dayHeader}>
            {DAYS.map(d => (
              <Text key={d} style={[styles.dayLabel, d === "일" && { color: Colors.urgent }]}>{d}</Text>
            ))}
          </View>

          {/* 날짜 그리드 */}
          <View style={styles.grid}>
            {cells.map((day, i) => {
              const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear()
              const hasTicketing = day && ticketingDays.includes(day)
              return (
                <View key={i} style={styles.cell}>
                  {day ? (
                    <>
                      <View style={[styles.dayNum, isToday && styles.todayCircle]}>
                        <Text style={[
                          styles.dayNumText,
                          isToday && styles.todayText,
                          i % 7 === 0 && { color: Colors.urgent },
                        ]}>
                          {day}
                        </Text>
                      </View>
                      {hasTicketing && <View style={styles.dot} />}
                    </>
                  ) : null}
                </View>
              )
            })}
          </View>

          {/* 이번 달 티켓팅 일정 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🔔 이번 달 티켓팅 오픈</Text>
            {musicals
              .filter(m => {
                const d = new Date(m.openDate)
                return d.getFullYear() === year && d.getMonth() === month
              })
              .map(m => (
                <View key={m.id} style={styles.ticketRow}>
                  <View style={styles.ticketDot} />
                  <View>
                    <Text style={styles.ticketTitle}>{m.title}</Text>
                    <Text style={styles.ticketDate}>{m.openDate} · {m.platform}</Text>
                  </View>
                  <View style={styles.ddayBadge}>
                    <Text style={styles.ddayText}>{m.dday}</Text>
                  </View>
                </View>
              ))}
            {musicals.filter(m => {
              const d = new Date(m.openDate)
              return d.getFullYear() === year && d.getMonth() === month
            }).length === 0 && (
              <Text style={styles.empty}>이번 달 티켓팅 오픈 일정이 없어요</Text>
            )}
          </View>
        </ScrollView>
      ) : (
        // 타임라인 뷰
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.timelineGuide}>공연 기간 타임라인 (2026~2027)</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View>
              {/* 월 헤더 */}
              <View style={styles.timelineHeader}>
                <View style={styles.timelineLabel} />
                {timelineMonths.map((m, i) => (
                  <View key={i} style={[styles.timelineMonthCell, { width: COL_W }]}>
                    <Text style={styles.timelineMonthText}>{m}</Text>
                  </View>
                ))}
              </View>

              {/* 공연 바 */}
              {TIMELINE.map(show => (
                <View key={show.id} style={styles.timelineRow}>
                  <View style={styles.timelineLabel}>
                    <Text style={styles.timelineLabelText} numberOfLines={1}>{show.venue}</Text>
                  </View>
                  <View style={[styles.timelineTrack, { width: totalMonths * COL_W }]}>
                    <View
                      style={[
                        styles.timelineBar,
                        {
                          left: getLeft(show.start),
                          width: getWidth(show.start, show.end),
                          backgroundColor: show.color,
                        }
                      ]}
                    >
                      <Text style={styles.timelineBarText} numberOfLines={1}>{show.title}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </ScrollView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  header: {
    paddingHorizontal: 20, paddingTop: 60, paddingBottom: 12,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
  },
  headerTitle: { fontSize: 22, fontWeight: "800", color: Colors.textPrimary },
  tabRow: { flexDirection: "row", gap: 8 },
  tabBtn: {
    paddingHorizontal: 14, paddingVertical: 6,
    borderRadius: 20, backgroundColor: Colors.bgMuted,
  },
  tabBtnActive: { backgroundColor: Colors.textPrimary },
  tabText: { fontSize: 13, color: Colors.textMuted },
  tabTextActive: { color: Colors.bg, fontWeight: "700" },
  monthNav: {
    flexDirection: "row", justifyContent: "space-between",
    alignItems: "center", paddingHorizontal: 24, paddingVertical: 16,
  },
  navBtn: { padding: 8 },
  navBtnText: { fontSize: 24, color: Colors.textPrimary },
  monthText: { fontSize: 17, fontWeight: "700", color: Colors.textPrimary },
  dayHeader: { flexDirection: "row", paddingHorizontal: 16, marginBottom: 4 },
  dayLabel: {
    flex: 1, textAlign: "center",
    fontSize: 12, color: Colors.textMuted, fontWeight: "600",
  },
  grid: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 16 },
  cell: {
    width: "14.28%", aspectRatio: 1,
    alignItems: "center", justifyContent: "flex-start", paddingTop: 4,
  },
  dayNum: { width: 28, height: 28, borderRadius: 14, justifyContent: "center", alignItems: "center" },
  todayCircle: { backgroundColor: Colors.accent },
  dayNumText: { fontSize: 13, color: Colors.textPrimary },
  todayText: { color: "#fff", fontWeight: "700" },
  dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: Colors.accent, marginTop: 2 },
  section: { padding: 20 },
  sectionTitle: { fontSize: 15, fontWeight: "700", color: Colors.textPrimary, marginBottom: 12 },
  ticketRow: {
    flexDirection: "row", alignItems: "center", gap: 10,
    backgroundColor: Colors.bgCard, borderRadius: 12,
    padding: 14, marginBottom: 8,
    borderWidth: 1, borderColor: Colors.border,
  },
  ticketDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.accent },
  ticketTitle: { fontSize: 14, fontWeight: "700", color: Colors.textPrimary },
  ticketDate: { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
  ddayBadge: {
    marginLeft: "auto", backgroundColor: Colors.accent,
    paddingHorizontal: 10, paddingVertical: 3, borderRadius: 10,
  },
  ddayText: { color: "#fff", fontSize: 12, fontWeight: "700" },
  empty: { fontSize: 14, color: Colors.textMuted, textAlign: "center", paddingVertical: 20 },
  timelineGuide: {
    fontSize: 13, color: Colors.textMuted,
    paddingHorizontal: 20, paddingVertical: 12,
  },
  timelineHeader: { flexDirection: "row", paddingLeft: 80 },
  timelineMonthCell: { alignItems: "center", paddingVertical: 8 },
  timelineMonthText: { fontSize: 11, color: Colors.textMuted },
  timelineRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  timelineLabel: {
    width: 80, paddingHorizontal: 8,
  },
  timelineLabelText: { fontSize: 10, color: Colors.textSecondary },
  timelineTrack: { height: 32, position: "relative" },
  timelineBar: {
    position: "absolute", height: 28,
    borderRadius: 6, justifyContent: "center",
    paddingHorizontal: 8, top: 2,
  },
  timelineBarText: { fontSize: 11, color: "#fff", fontWeight: "600" },
})