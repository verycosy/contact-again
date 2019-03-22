import { createStackNavigator } from "react-navigation";
import {
  MAIN_COLOR,
  WHITE,
  CHAT_BG_COLOR,
  ACCENT_COLOR
} from "../constants/Color";

export const headerStyles = {
  headerStyle: {
    backgroundColor: "white",
    borderBottomWidth: 0,
    height: 55
  },
  headerTitleStyle: {
    fontSize: 16,
    color: "black"
  }
};

export const chatHeaderStyles = {
  headerStyle: {
    backgroundColor: CHAT_BG_COLOR,
    borderBottomWidth: 0,
    height: 55
  },
  headerTitleStyle: {
    fontSize: 16,
    color: ACCENT_COLOR
  },
  headerTintColor: ACCENT_COLOR
};

export const createStack = (screen, title) =>
  createStackNavigator({
    Screen: {
      screen,
      navigationOptions: {
        title,
        ...headerStyles
      }
    }
  });
