import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ChefHat, List } from "@tamagui/lucide-icons";

export default function TabLayout() {
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
