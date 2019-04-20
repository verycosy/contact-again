import React from "react";
import ChatListPresenter from "./ChatListPresenter";
import { TouchableOpacity } from "react-native";
import * as RNFS from "react-native-fs";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

export default class extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <TouchableOpacity
          onPress={() => navigation.navigate({ routeName: "Setting" })}
        >
          <FontAwesomeIcon size={16} icon={faCog} style={{ marginRight: 12 }} />
        </TouchableOpacity>
      )
    };
  };

  state = {
    loading: true,
    chatList: null
  };

  async componentDidMount() {
    let chatList, error;

    try {
      const titleList = [];
      const folderList = await RNFS.readDir(
        `${RNFS.ExternalStorageDirectoryPath}/KakaoTalk/Chats/`
      );

      await Promise.all(
        folderList.map(async folder => {
          const textFilePath = `${folder.path}/kakaotalkChats.txt`;
          const contents = await RNFS.readFile(textFilePath, "utf8");
          const lines = contents.toString().split("\n");

          const reg = /^(20[0-9][0-9])년 ([1-9]|1[012])월 ([1-9]|[12][0-9]|3[0-1])일 (오전|오후) ([0-9]|1[0-9]|2[0-3]):([0-5][0-9])/;
          const lastLine = lines[lines.length - 2].split(reg);
          const colonIndex = lastLine[7].indexOf(":");

          const who = {
            path: textFilePath,
            name: lines[0]
              .replace(" 님과 카카오톡 대화", "")
              .replace(" 카카오톡 대화", ""),
            lastTime: `${lastLine[4]} ${lastLine[5]}:${lastLine[6]}`,
            lastMessage: lastLine[7].substring(colonIndex + 2)
          };

          titleList.push(who);
        })
      );

      chatList = titleList;
    } catch (error) {
      console.log(error);
      error = "파일을 읽어올 수 없습니다.";
    } finally {
      this.setState({
        loading: false,
        error,
        chatList
      });
    }
  }

  render() {
    const { loading, chatList } = this.state;
    return <ChatListPresenter loading={loading} chatList={chatList} />;
  }
}
