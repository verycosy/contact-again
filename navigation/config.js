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
    height: 55,
    elevation: 0
  },
  headerTitleStyle: {
    fontSize: 16,
    color: "black"
  }
};

export const ImageHeaderStyles = {
  headerTransparent: true,
  headerTitleStyle: {
    fontSize: 16,
    color: "white"
  },
  headerTintColor: "white"
};

export const chatHeaderStyles = {
  headerStyle: {
    backgroundColor: CHAT_BG_COLOR,
    borderBottomWidth: 1,
    borderColor: "rgba(247, 129, 190, 0.3)", // MAIN_COLOR
    height: 55,
    elevation: 0
  },
  headerTitleStyle: {
    fontSize: 16,
    color: MAIN_COLOR
  },
  headerTintColor: MAIN_COLOR
};
