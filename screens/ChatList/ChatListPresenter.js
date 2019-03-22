import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Loader from "../../components/Loader";
import UUID from "uuid/v1";
import ChatListTalk from "../../components/ChatList/ChatListTalk";

const Container = styled.ScrollView``;

const ChatListPresenter = ({ loading, chatList }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      {chatList
        ? chatList.map(chat => (
            <ChatListTalk
              key={UUID()}
              path={chat.path}
              name={chat.name}
              lastTime={chat.lastTime}
              lastMessage={chat.lastMessage}
            />
          ))
        : null}
    </Container>
  );

ChatListPresenter.propTypes = {
  loading: PropTypes.bool.isRequired,
  chatList: PropTypes.array
};

export default ChatListPresenter;
