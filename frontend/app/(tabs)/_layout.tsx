import { Tabs } from "expo-router"
import { Text } from "react-native"
import { Colors } from "../../constants/colors"

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.bgCard,
          borderTopColor: Colors.border,
        },
        tabBarActiveTintColor: Colors.accent,
        tabBarInactiveTintColor: Colors.textMuted,
      }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          title: "피드",
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 18, color }}>🎭</Text>,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "공연",
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 18, color }}>🎫</Text>,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "일정",
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 18, color }}>📅</Text>,
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: "양도",
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 18, color }}>🤝</Text>,
        }}
      />
      <Tabs.Screen
        name="mypage"
        options={{
          title: "MY",
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 18, color }}>👤</Text>,
        }}
      />
    </Tabs>
  )
}