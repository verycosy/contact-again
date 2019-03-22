import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ChatContent from "./ChatContent";
import ChatTime from "./ChatTime";

const View = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  align-self: ${props => (props.type === 0 ? "flex-start" : "flex-end")};
`;

const ChatMessage = ({ content, type, time }) => (
  <View type={type}>
    {type === 1 ? <ChatTime chatTime={time} /> : null}
    <ChatContent content={content} type={type} />
    {type === 0 ? <ChatTime chatTime={time} /> : null}
  </View>
);

ChatMessage.propTypes = {
  type: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired
};

export default ChatMessage;
