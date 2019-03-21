import React from "react";
import { Platform } from "react-native";
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";
import ChatListScreen from "../screens/ChatList";
import SettingScreen from "../screens/Setting";
import TabBarIcon from "../components/TabBarIcon";
import { createStack } from "./config";

const TabNavigation = createBottomTabNavigator(
  {
    ChatList: {
      screen: createStack(ChatListScreen, "채팅"),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <TabBarIcon focused={focused} name={"채팅"} />
        )
      }
    },
    Setting: {
      screen: createStack(SettingScreen, "설정"),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <TabBarIcon focused={focused} name={"설정"} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false
    }
  }
);

export default createAppContainer(TabNavigation);
