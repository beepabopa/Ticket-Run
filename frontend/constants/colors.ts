// constants/colors.ts — 전체 교체

export const Colors = {
  // 배경 계열 (이 채팅방 배경 느낌)
  bg: "#F5F0E8",          // 메인 배경 — 따뜻한 아이보리
  bgCard: "#FFFFFF",      // 카드 배경 — 순백
  bgMuted: "#EDE8DF",     // 눌렸을 때 / 구분선

  textPrimary: "#1C1816",   // 거의 블랙 (차갑지 않은)
  textSecondary: "#6B5E52", // 브라운 그레이
  textMuted: "#A89A8E",     // 힌트 텍스트

  // 포인트 컬러
  accent: "#C8963E",        // 골드 — 티켓의 금박 느낌 ⭐
  accentSoft: "#F2E4C4",    // 골드 연하게 (배지 배경)

  // 상태 컬러
  urgent: "#C0392B",        // D-1/D-2 — 긴박함
  warning: "#E67E22",       // D-3~5
  success: "#4A7C59",       // 거래완료 / 인증

  // 구분선
  border: "#E0D9CE",
  divider: "#EDE8DF",
} as const