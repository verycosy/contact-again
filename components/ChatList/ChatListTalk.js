import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { withNavigation } from "react-navigation";
import ChatListWho from "./ChatListWho";
import ChatListLastMessage from "./ChatListLastMessage";
import ChatListLastTime from "./ChatListTime";

const Container = styled.TouchableOpacity`
  padding: 18px 15px;
`;

const ContainerTop = styled.View`
  display: flex;
  flex-direction: row;
`;

const Image = styled.Image`
  width: 40px;
  height: 40px;
  margin-right: 15px;
  position: absolute;
  z-index: 1;
`;

const ChatListTalk = ({ name, lastTime, lastMessage, navigation, path }) => (
  <Container
    onPress={() =>
      navigation.navigate({ routeName: "Chat", params: { name, path } })
    }
  >
    <ContainerTop>
      <Image source={require("../../assets/default_profile.png")} />
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
