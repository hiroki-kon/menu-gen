import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ChefHat, List, Utensils } from "@tamagui/lucide-icons";
import { Button } from "tamagui";
import { useSession } from "@/ctx";

export default function TabLayout() {
  const { signOut } = useSession();
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "ホーム",
          tabBarActiveTintColor: "#1C1500",
          tabBarIcon: ({ color, focused }) => (
            <ChefHat
              color={focused ? "$yellow9Light" : color}
              fill={focused ? "#F7CE00" : color}
            />
          ),
          headerRight: () => (
            <Button onPress={() => signOut()}>サインアウト</Button>
          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: "献立",
          tabBarActiveTintColor: "#1C1500",
          tabBarIcon: ({ color, focused }) => (
            <Utensils
              color={focused ? "$yellow9Light" : color}
              fill={focused ? "#F7CE00" : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          title: "お気に入り",
          tabBarActiveTintColor: "#1C1500",
          tabBarIcon: ({ color, focused }) => (
            <List
              color={focused ? "$yellow9Light" : color}
              fill={focused ? "#F7CE00" : color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
