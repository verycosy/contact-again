import { createStackNavigator, createAppContainer } from "react-navigation";
import { headerStyles } from "../navigation/config";
import TabNavigation from "./TabNavigation";
import ChatScreen from "../screens/Chat";

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
