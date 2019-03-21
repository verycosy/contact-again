import React from "react";
import { Text } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import Loader from "../../components/Loader";

const Container = styled.ScrollView``;

const ChatListPresenter = ({ loading, chatList }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      {chatList
        ? chatList.map((chat, i) => <Text key={i}>{chat.name}</Text>)
        : null}
    </Container>
  );

ChatListPresenter.propTypes = {
  loading: PropTypes.bool.isRequired,
  chatList: PropTypes.array
};

export default ChatListPresenter;
