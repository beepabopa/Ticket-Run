export interface Musical {
  id: string
  title: string
  venue: string
  platform: "인터파크" | "멜론티켓" | "YES24" | "티켓링크"
  openDate: string
  dday: string
  image: string
  alarm: boolean
  category: "뮤지컬" | "연극" | "콘서트"
}

export const musicals: Musical[] = [
  {
    id: "1",
    title: "웃는남자",
    venue: "예술의전당",
    platform: "인터파크",
    openDate: "2026-06-20 14:00",
    dday: "D-9",
    image: "",
    alarm: false,
    category: "뮤지컬",
  },
  {
    id: "2",
    title: "햄릿",
    venue: "샤롯데씨어터",
    platform: "멜론티켓",
    openDate: "2026-06-15 12:00",
    dday: "D-4",
    image: "",
    alarm: false,
    category: "뮤지컬",
  },
  {
    id: "3",
    title: "레미제라블",
    venue: "블루스퀘어",
    platform: "YES24",
    openDate: "2026-06-13 14:00",
    dday: "D-2",
    image: "",
    alarm: false,
    category: "뮤지컬",
  },
]