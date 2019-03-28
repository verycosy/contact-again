import React, { PureComponent } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { withNavigation } from "react-navigation";
import Loader from "../../components/Loader";
import ChatSystemMessage from "../../components/Chat/ChatSystemMessage";
import ChatMessage from "../../components/Chat/ChatMessage";
import { CHAT_BG_COLOR, MAIN_COLOR } from "../../constants/Color";

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

const ChatPresenter = ({ loading, messages, navigation }) =>
  loading ? (
    <Loader />
  ) : (
    <Container
      data={messages}
      renderItem={(
        { item } //NOTE: 어째서인지 item 으로 받지 않으면 오류난다. message로 받으면 왜 안 되는 걸까..
      ) =>
        item.type === 0 || item.type === 1 ? (
          <MessageContainer key={item.id}>
            {item.who !== "회원님" && item.isFirst ? (
              <View>
                <Image source={require("../../assets/default_profile.png")} />
                <ChatWho>{item.who}</ChatWho>
              </View>
            ) : null}
            <ChatMessage
              type={item.type}
              content={item.content}
              time={item.time}
              isLast={item.isLast}
              who={item.who}
            />
          </MessageContainer>
        ) : (
          <ChatSystemMessage
            key={item.id}
            isDate={item.content === "" ? true : false}
            systemMessage={item.content === "" ? item.date : item.content}
          />
        )
      }
      keyExtractor={item => "key" + item.id} //NOTE: string으로 넣어야 함.
      initialNumToRender={30}
      maxToRenderPerBatch={30}
      windowSize={101}
      removeClippedSubviews={true}
      viewabilityConfig={CONFIG}
    />
  );

ChatPresenter.propTypes = {
  loading: PropTypes.bool.isRequired,
  messages: PropTypes.array.isRequired
};

export default withNavigation(ChatPresenter);
