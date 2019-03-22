import React, { PureComponent } from "react";
import ChatPresenter from "./ChatPresenter";
import * as RNFS from "react-native-fs";

export default class extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("name")
    };
  };

  constructor(props) {
    super(props);
    const {
      navigation: {
        state: {
          params: { name, path }
        }
      }
    } = props;

    this.state = {
      path,
      loading: true,
      messages: []
    };
  }

  async componentDidMount() {
    const { path, messages } = this.state;

    try {
      textFile = await RNFS.readFile(path);
      const lines = textFile.toString().split("\n");
      const reg = /^(20[0-9][0-9])년 ([1-9]|1[012])월 ([1-9]|[12][0-9]|3[0-1])일 (오전|오후) ([0-9]|1[0-9]|2[0-3]):([0-5][0-9])/;

      for (let i = 4; i < lines.length; i++) {
        if (lines[i] !== "" && lines[i] !== "\r") {
          //NOTE: (8) ["", "2018", "9", "3", "오후", "8", "44", ", 회원님: 안녕하세요."]

          const currentLine = lines[i].split(reg);

          if (currentLine.length === 1) {
            messages[messages.length - 1].content += `\n${currentLine[0]}`;
          } else {
            const colonIndex = currentLine[7].indexOf(":");

            const who = currentLine[7].substring(2, colonIndex - 1);
            const content = currentLine[7].substring(colonIndex + 2);

            let type; //NOTE: 0 그녀 / 1 나 / 2 시스템

            if (who === "회원님") type = 1;
            else if (who === "\r") type = 2;
            else {
              if (who === ", ") type = 2;
              else type = 0;
            }

            const message = {
              id: i,
              who,
              date: `${currentLine[1]}년 ${currentLine[2]}월 ${
                currentLine[3]
              }일`,
              time: `${currentLine[4]} ${currentLine[5]}:${currentLine[6]}`,
              type,
              content
            };

            messages.push(message);
          }
        }
      }

      let nowWho = null;
      for (let i = 0; i < messages.length; i++) {
        if (messages[i].who !== nowWho) {
          if (i !== 0) messages[i - 1].isLast = true;

          messages[i].isFirst = true;
          nowWho = messages[i].who;
        } else {
          messages[i].isFirst = false;
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({
        loading: false,
        messages
      });
    }
  }

  render() {
    const { loading, messages } = this.state;

    return <ChatPresenter loading={loading} messages={messages} />;
  }
}
