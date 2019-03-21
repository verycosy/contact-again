import { createStackNavigator } from "react-navigation";
import { MAIN_COLOR, WHITE, TINT_COLOR } from "../constants/Color";

export const headerStyles = {
  headerStyle: {
    backgroundColor: MAIN_COLOR,
    borderBottomWidth: 0
  },
  headerTitleStyle: {
    color: TINT_COLOR
  },
  headerTintColor: TINT_COLOR
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
