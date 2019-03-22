import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Loader from "../../components/Loader";
import UUID from "uuid/v1";
import ChatSystemMessage from "../../components/Chat/ChatSystemMessage";
import ChatMessage from "../../components/Chat/ChatMessage";
import { CHAT_BG_COLOR } from "../../constants/Color";

const Container = styled.ScrollView`
  padding: 0px 10px;
  display: flex;
  flex-direction: column;
  background-color: ${CHAT_BG_COLOR};
`;

const MessageContainer = styled.View``;
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

const ChatPresenter = ({ loading, messages }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      {messages ? (
        messages.map(message =>
          message.type === 0 || message.type === 1 ? (
            <MessageContainer key={UUID()}>
              {message.who !== "회원님" && message.isFirst ? (
                <View>
                  <Image source={require("../../assets/default_profile.png")} />
                  <ChatWho>{message.who}</ChatWho>
                </View>
              ) : null}
              <ChatMessage
                type={message.type}
                content={message.content}
                time={message.time}
                isLast={message.isLast}
              />
            </MessageContainer>
          ) : (
            <ChatSystemMessage
              key={UUID()}
              systemMessage={
                message.content === "" ? message.date : message.content
              }
            />
          )
        )
      ) : (
        <Text>대화 내역이 없습니다.</Text>
      )}
    </Container>
  );

ChatPresenter.propTypes = {
  loading: PropTypes.bool.isRequired,
  messages: PropTypes.array.isRequired
};

export default ChatPresenter;
