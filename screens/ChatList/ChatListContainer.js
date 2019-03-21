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
          const who = {
            name: contents.toString().split("\n")[0],
            id: 1
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
