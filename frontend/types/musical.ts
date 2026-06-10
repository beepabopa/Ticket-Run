export interface Musical {
  id: string;
  title: string;
  venue: string;
  platform: "인터파크" | "멜론티켓" | "YES24" | "티켓링크";
  openDate: string;
  dday: string;
  image: string;
  alarm: boolean;
}