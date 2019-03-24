import React from "react";
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";
import ChatListScreen from "../screens/ChatList";
import HelpScreen from "../screens/Help";
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
    Help: {
      screen: createStack(HelpScreen, "도움말"),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <TabBarIcon focused={focused} name={"도움말"} />
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
