import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Loader from "../../components/Loader";
import UUID from "uuid/v1";
import ChatListTalk from "../../components/ChatList/ChatListTalk";

const Container = styled.ScrollView``;

const Text = styled.Text`
  text-align: center;
  padding: 10px;
`;

const ChatListPresenter = ({ loading, chatList }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      {chatList.length !== 0 ? (
        chatList.map(chat => (
          <ChatListTalk
            key={UUID()}
            path={chat.path}
            name={chat.name}
            lastTime={chat.lastTime}
            lastMessage={chat.lastMessage}
          />
        ))
      ) : (
        <>
          <Text>저장된 대화가 없습니다.</Text>
          <Text>카카오톡에서 대화를 저장해주세요 !</Text>
        </>
      )}
    </Container>
  );

ChatListPresenter.propTypes = {
  loading: PropTypes.bool.isRequired,
  chatList: PropTypes.array
};

export default ChatListPresenter;
