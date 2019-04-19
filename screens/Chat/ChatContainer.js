import React, { PureComponent } from "react";
import * as RNFS from "react-native-fs";
import Drawer from "react-native-drawer";
import styled from "styled-components";
import { StatusBar, Text } from "react-native";
import {
  TouchableOpacity,
  AppState,
  TextInput,
  ToastAndroid
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faImages,
  faCalendarAlt,
  faSearch,
  faChevronUp,
  faChevronDown
} from "@fortawesome/free-solid-svg-icons";
import { withNavigation } from "react-navigation";
import CalendarDrawer from "../../components/Chat/CalendarDrawer";
import Loader from "../../components/Loader";
import ChatSystemMessage from "../../components/Chat/ChatSystemMessage";
import ChatMessage from "../../components/Chat/ChatMessage";
import { CHAT_BG_COLOR, MAIN_COLOR } from "../../constants/Color";
import RecyclerviewList, {
  DataSource
} from "react-native-recyclerview-list-android";
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

const SearchArrowContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  background-color: ${MAIN_COLOR};
  width:${Layout.width}
  padding: 10px 0px;
`;

export default class extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const searching = navigation.getParam("searching");

    return {
      title: !searching
        ? checkGroup(navigation.getParam("name"))
          ? "그룹채팅"
          : navigation.getParam("name")
        : null,
      headerTitle: !searching ? null : (
        <TextInput
          returnKeyType={"search"}
          style={{ width: "100%" }}
          onChangeText={search => navigation.setParams({ search })}
          placeholder="대화 내용 검색"
          value={navigation.getParam("search")}
          autoFocus
          onSubmitEditing={({ nativeEvent: { text, eventCount, target } }) =>
            navigation.getParam("searchHandler")(text)
          }
        />
      ),
      headerRight: !searching ? (
        <MenuView>
          <TouchableOpacity
            onPress={() =>
              navigation.setParams({
                searching: true
              })
            }
          >
            <FontAwesomeIcon size={20} icon={faSearch} color={MAIN_COLOR} />
          </TouchableOpacity>

          <TouchableOpacity
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
          </TouchableOpacity>

          <TouchableOpacity onPress={navigation.getParam("openDrawer")}>
            <FontAwesomeIcon
              size={20}
              icon={faCalendarAlt}
              color={MAIN_COLOR}
              style={{ marginRight: 14 }}
            />
          </TouchableOpacity>
        </MenuView>
      ) : null
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
      drawerOpen: false,
      searched: false
    };
  }

  _searchMessages = text => {
    let cnt = 0;
    const { messages } = this.state;
    const searchedIndex = [];

    for (message of messages) {
      if (message.content.includes(text)) {
        cnt++;
        searchedIndex.push(message.id);
        console.log(message.content);
      }
    }

    if (cnt !== 0) {
      ToastAndroid.show(`${cnt}개의 검색결과가 있습니다.`, ToastAndroid.SHORT);
      this.setState({
        searched: true,
        searchedIndex,
        searchingIndex: 0
      });

      this.calendarHandle(searchedIndex[0]);
    } else {
      ToastAndroid.show(`검색결과가 없습니다.`, ToastAndroid.SHORT);
      this.setState({
        searched: false
      });
    }
  };

  _createBookmark() {
    console.log("Write!!");
  }

  componentWillUnmount() {
    this._createBookmark();
  }

  async componentDidMount() {
    AppState.addEventListener("change", state => {
      if (state === "background") {
        this._createBookmark();
      }
    });

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
        openDrawer: () => this.setState({ drawerOpen: true }),
        searchHandler: this._searchMessages,
        searching: false,
        search: ""
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

  _searchUpDown = type => {
    const { searchingIndex, searchedIndex } = this.state;

    if (type === 1) {
      if (searchingIndex > 0) {
        this.setState({
          searchingIndex: searchingIndex - 1
        });
      }
    } else {
      if (searchingIndex < searchedIndex.length - 1) {
        this.setState({
          searchingIndex: searchingIndex + 1
        });
      }
    }

    this.calendarHandle(searchedIndex[this.state.searchingIndex]);
  };

  render() {
    const {
      loading,
      messages,
      drawerOpen,
      dates,
      images,
      searched
    } = this.state;

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

        {searched ? (
          <SearchArrowContainer>
            <TouchableOpacity onPress={() => this._searchUpDown(1)}>
              <FontAwesomeIcon
                size={25}
                icon={faChevronUp}
                color={this.state.searchingIndex === 0 ? "#999" : "white"}
                style={{ marginRight: 15 }}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this._searchUpDown(-1)}>
              <FontAwesomeIcon
                size={25}
                icon={faChevronDown}
                color={
                  this.state.searchingIndex + 1 ===
                  this.state.searchedIndex.length
                    ? "#999"
                    : "white"
                }
              />
            </TouchableOpacity>

            <Text
              style={{
                alignSelf: "flex-end",
                color: "white",
                fontWeight: "600"
              }}
            >
              {this.state.searchingIndex + 1} /{" "}
              {this.state.searchedIndex.length}
            </Text>
          </SearchArrowContainer>
        ) : null}
      </>
    );
  }
}
