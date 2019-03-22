import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { withNavigation } from "react-navigation";
import Layout from "../../constants/Layout";
import ChatListWho from "./ChatListWho";
import ChatListLastMessage from "./ChatListLastMessage";
import ChatListLastTime from "./ChatListTime";

const Container = styled.TouchableOpacity`
  padding: 10px;
`;

const ContainerTop = styled.View`
  display: flex;
  flex-direction: row;
`;

const ChatListTalk = ({ name, lastTime, lastMessage, navigation, path }) => (
  <Container
    onPress={() =>
      navigation.navigate({ routeName: "Chat", params: { name, path } })
    }
  >
    <ContainerTop>
      <ChatListWho name={name} />
      <ChatListLastTime lastTime={lastTime} />
    </ContainerTop>
    <ChatListLastMessage lastMessage={lastMessage} />
  </Container>
);

ChatListTalk.propTypes = {
  name: PropTypes.string.isRequired,
  lastMessage: PropTypes.string.isRequired
};

export default withNavigation(ChatListTalk);
