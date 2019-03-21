import React from "react";
import ChatListPresenter from "./ChatListPresenter";
import * as RNFS from "react-native-fs";

export default class extends React.Component {
  state = {
    loading: true,
    chatList: null
  };

  async componentDidMount() {
    let chatList, error;

    try {
      const titleList = [];
      const folderList = await RNFS.readDir(
        `${RNFS.ExternalStorageDirectoryPath}/kakaotalk/chats/`
      );

      await Promise.all(
        folderList.map(async folder => {
          const textFilePath = `${folder.path}/kakaotalkChats.txt`;
          const contents = await RNFS.readFile(textFilePath);
          const lines = contents.toString().split("\n");

          let reg = /^(19|20)\d{2}년 ([1-9]|1[012])월 ([1-9]|[12][0-9]|3[0-1])일 (오전|오후) ([0-9]|1[0-9]|2[0-3]):([0-5][0-9])/;

          const lastLine = lines[lines.length - 2].split(reg);

          const who = {
            path: textFilePath,
            name: lines[0].replace(" 님과 카카오톡 대화", ""),
            lastTime: `${lastLine[4]} ${lastLine[5]}:${lastLine[6]}`,
            lastMessage: lastLine[7].substring(2)
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
