import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "홈",
        }}
      />

      <Tabs.Screen
        name="calendar"
        options={{
          title: "일정",
        }}
      />

      <Tabs.Screen
        name="community"
        options={{
          title: "커뮤니티",
        }}
      />

      <Tabs.Screen
        name="mypage"
        options={{
          title: "MY",
        }}
      />
    </Tabs>
  );
}