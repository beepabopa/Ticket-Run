export interface Review {
  id: string
  userId: string
  userName: string
  musicalId: string
  musicalTitle: string
  seat: string
  content: string
  likes: number
  isVerified: boolean
  createdAt: string
}

export const reviews: Review[] = [
  {
    id: "1",
    userId: "user1",
    userName: "뮤덕후123",
    musicalId: "1",
    musicalTitle: "웃는남자",
    seat: "B구역 2열",
    content: "2막에서 진짜 펑펑 울었어요.. 배우 목소리가 너무 좋아서 심장이 녹는 줄 알았음 ㅠㅠ 꼭 보세요",
    likes: 24,
    isVerified: true,
    createdAt: "2026-06-10",
  },
  {
    id: "2",
    userId: "user2",
    userName: "공연러버",
    musicalId: "2",
    musicalTitle: "햄릿",
    seat: "VIP석",
    content: "오늘 대역이었는데 오히려 더 좋았음 ㄷㄷ 본 캐스팅은 얼마나 좋을지",
    likes: 41,
    isVerified: true,
    createdAt: "2026-06-09",
  },
  {
    id: "3",
    userId: "user3",
    userName: "티켓런유저",
    musicalId: "1",
    musicalTitle: "웃는남자",
    seat: "R석 5열",
    content: "첫 뮤지컬 입문작으로 봤는데 완전 입덕했어요. 다음 회차도 이미 예매함ㅋㅋ",
    likes: 18,
    isVerified: false,
    createdAt: "2026-06-08",
  },
]