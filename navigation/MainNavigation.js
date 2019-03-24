import { createStackNavigator, createAppContainer } from "react-navigation";
import { headerStyles, chatHeaderStyles } from "../navigation/config";
import TabNavigation from "./TabNavigation";
import ChatScreen from "../screens/Chat";
import SettingScreen from "../screens/Setting";

const MainNavigation = createStackNavigator(
  {
    Tabs: {
      screen: TabNavigation,
      navigationOptions: {
        header: null
      }
    },
    Chat: {
      screen: ChatScreen,
      navigationOptions: {
        ...chatHeaderStyles
      }
    },
    Setting: {
      screen: SettingScreen,
      navigationOptions: {
        ...headerStyles
      }
    }
  },
  {
    headerMode: "screen",
    headerBackTitleVisible: false
  }
);

export default createAppContainer(MainNavigation);
