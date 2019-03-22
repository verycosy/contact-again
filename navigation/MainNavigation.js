import { createStackNavigator, createAppContainer } from "react-navigation";
import { headerStyles, chatHeaderStyles } from "../navigation/config";
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
        ...chatHeaderStyles
      }
    }
  },
  {
    headerMode: "screen",
    headerBackTitleVisible: false
  }
);

export default createAppContainer(MainNavigation);
