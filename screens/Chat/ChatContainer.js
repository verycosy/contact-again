import React, { PureComponent } from "react";
import * as RNFS from "react-native-fs";
import Drawer from "react-native-drawer";
import styled from "styled-components";
import { StatusBar } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faImages,
  faCalendarAlt,
  faSearch
} from "@fortawesome/free-solid-svg-icons";
import { withNavigation } from "react-navigation";
import CalendarDrawer from "../../components/Chat/CalendarDrawer";
import Loader from "../../components/Loader";
import ChatSystemMessage from "../../components/Chat/ChatSystemMessage";
import ChatMessage from "../../components/Chat/ChatMessage";
import { CHAT_BG_COLOR, MAIN_COLOR } from "../../constants/Color";
import RecyclerviewList, { DataSource } from "react-native-recyclerview-list";
import checkMediaExt from "../../utils.js/checkMediaExt";
import checkGroup from "../../utils.js/checkGroup";
import Layout from "../../constants/Layout";

const MenuView = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Container = styled.FlatList`
  flex: 1;
  background-color: ${CHAT_BG_COLOR};
`;

const MessageContainer = styled.View`
  padding: 0px 10px;
`;

const View = styled.View`
  flex-direction: row;
`;

const Image = styled.Image`
  width: 40px;
  height: 40px;
  position: absolute;
  z-index: 1;
`;

const ChatWho = styled.Text`
  margin-left: 50px;
  margin-bottom: 5px;
  color: #2d3236;
`;

const CONFIG = {
  viewAreaCoveragePercentThreshold: 70
};

export default class extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: checkGroup(navigation.getParam("name"))
        ? "그룹채팅"
        : navigation.getParam("name"),
      headerRight: (
        <MenuView>
          <TouchableWithoutFeedback>
            <FontAwesomeIcon size={20} icon={faSearch} color={MAIN_COLOR} />
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate({
                routeName: "Gallery",
                params: {
                  images: navigation.getParam("images")
                }
              })
            }
          >
            <FontAwesomeIcon
              size={22}
              icon={faImages}
              color={MAIN_COLOR}
              style={{ marginLeft: 18, marginRight: 18 }}
            />
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={navigation.getParam("openDrawer")}>
            <FontAwesomeIcon
              size={20}
              icon={faCalendarAlt}
              color={MAIN_COLOR}
              style={{ marginRight: 14 }}
            />
          </TouchableWithoutFeedback>
        </MenuView>
      )
    };
  };

  constructor(props) {
    super(props);
    this.listRef = React.createRef();

    const {
      navigation: {
        state: {
          params: { path }
        }
      }
    } = props;

    this.state = {
      path,
      loading: true,
      messages: [],
      dates: [],
      images: [],
      drawerOpen: false
    };
  }

  async componentDidMount() {
    const { path, messages, dates, images } = this.state;
    const folderPath = path.replace("kakaotalkChats.txt", "");

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
            let content = currentLine[7].substring(colonIndex + 2);
            let date = `${currentLine[1]}년 ${currentLine[2]}월 ${
              currentLine[3]
            }일`;

            let type; //NOTE: 0 그녀 / 1 나 / 2 시스템

            if (who === "회원님") type = 1;
            else if (who === "\r") {
              type = 2;
              dates.push({
                index: messages.length,
                date
              });
            } else {
              if (who === ", ") type = 2;
              else type = 0;
            }

            const message = {
              id: messages.length,
              who,
              date,
              time: `${currentLine[4]} ${currentLine[5]}:${currentLine[6]}`,
              type,
              content
            };

            if (checkMediaExt(content)) {
              const imageIndex = images.length;
              content = "file://" + folderPath + content.replace("\r", "");
              message.content = content;
              message.imageIndex = imageIndex;

              images.push({
                index: imageIndex,
                source: { uri: content },
                info: { who, date },
                dimensions: { width: Layout.width, height: Layout.height }
              });
            }

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

      messages.push({
        id: lines.length,
        type: 2,
        content: "대화가 끝났습니다."
      });

      this.props.navigation.setParams({
        images,
        openDrawer: () => this.setState({ drawerOpen: true })
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({
        images,
        loading: false,
        messages,
        dates
      });
    }
  }

  calendarHandle = index => {
    this.listRef.current.scrollToIndex({
      index,
      animated: false,
      viewPosition: 0
    });
  };

  render() {
    const { loading, messages, path, drawerOpen, dates, images } = this.state;

    return (
      <>
        <StatusBar
          barStyle="light-content"
          backgroundColor="rgba(247, 129, 190, 0.8)"
        />

        <Drawer
          open={drawerOpen}
          side="right"
          type="overlay"
          tapToClose={true}
          content={
            <CalendarDrawer
              dates={dates}
              calendarHandle={this.calendarHandle}
            />
          }
          openDrawerOffset={0.6}
          panCloseMask={0.6}
        >
          {loading ? (
            <Loader />
          ) : (
            <RecyclerviewList //NOTE: FlatList 어째서인지 item 으로 받지 않으면 오류난다. message로 받으면 왜 안 되는 걸까..
              ref={this.listRef}
              velocity={500}
              style={{
                flex: 1,
                backgroundColor: CHAT_BG_COLOR
              }}
              dataSource={new DataSource(messages, item => item.id)}
              renderItem={({ item }) =>
                item.type === 0 || item.type === 1 ? (
                  <MessageContainer key={item.id}>
                    {item.who !== "회원님" && item.isFirst ? (
                      <View>
                        <Image
                          source={require("../../assets/default_profile.png")}
                        />
                        <ChatWho>{item.who}</ChatWho>
                      </View>
                    ) : null}
                    <ChatMessage
                      images={images}
                      type={item.type}
                      imageIndex={
                        checkMediaExt(item.content) ? item.imageIndex : -1
                      }
                      content={item.content}
                      time={item.time}
                      isLast={item.isLast}
                    />
                  </MessageContainer>
                ) : (
                  <ChatSystemMessage
                    key={item.id}
                    isDate={item.content === "" ? true : false}
                    systemMessage={
                      item.content === "" ? item.date : item.content
                    }
                  />
                )
              }
            />
          )}
        </Drawer>
      </>
    );
  }
}
