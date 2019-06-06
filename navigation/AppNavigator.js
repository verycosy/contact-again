import { createStackNavigator, createAppContainer } from "react-navigation";
import { headerStyles, chatHeaderStyles, ImageHeaderStyles } from "./config";

import ChatListScreen from "../screens/ChatList";
import SettingScreen from "../screens/Setting";
import HelpScreen from "../screens/Help";
import ChatScreen from "../screens/Chat";
import GalleryScreen from "../screens/Gallery";
import ImageDetailScreen from "../screens/ImageDetail";
import SettingPasswordScreen from "../screens/SettingPassword";
import SettingPathScreen from "../screens/SettingPath";

import SplashScreen from "../components/SplashScreen";

const ChatListStack = createStackNavigator(
  {
    SplashScreen: {
      screen: SplashScreen,
      navigationOptions: {
        header: null
      }
    },
    Help: {
      screen: HelpScreen,
      navigationOptions: {
        title: "도움말",
        ...headerStyles
      }
    },
    ChatList: {
      screen: ChatListScreen,
      navigationOptions: {
        title: "채팅",
        ...headerStyles
      }
    },
    Chat: {
      screen: ChatScreen,
      navigationOptions: {
        ...chatHeaderStyles
      }
    },
    Gallery: {
      screen: GalleryScreen,
      navigationOptions: {
        title: "사진, 동영상",
        ...headerStyles
      }
    },
    Setting: {
      screen: SettingScreen,
      navigationOptions: {
        title: "설정",
        ...headerStyles
      }
    },
    SettingPassword: {
      screen: SettingPasswordScreen,
      navigationOptions: {
        header: null
      }
    },
    SettingPath: {
      screen: SettingPathScreen,
      navigationOptions: {
        title: "대화폴더 경로 설정",
        ...headerStyles
      }
    },
    ImageDetail: {
      screen: ImageDetailScreen,
      navigationOptions: {
        ...ImageHeaderStyles
      }
    }
  },
  {
    headerMode: "screen",
    headerBackTitleVisible: false,
    initialRouteName: "SplashScreen"
  }
);

export default createAppContainer(ChatListStack);
