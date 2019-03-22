import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ChatContent from "./ChatContent";
import ChatTime from "./ChatTime";

const View = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: ${props => (props.isLast ? "20px" : "10px")};
  align-self: ${props => (props.type === 0 ? "flex-start" : "flex-end")};
  margin-left: ${props => (props.type === 0 ? "50px" : "0px")};
`;

const ChatMessage = ({ content, type, time, isLast }) => (
  <View type={type} isLast={isLast}>
    {type === 1 && isLast ? <ChatTime chatTime={time} /> : null}
    <ChatContent content={content} type={type} />
    {type === 0 && isLast ? <ChatTime chatTime={time} /> : null}
  </View>
);

ChatMessage.propTypes = {
  type: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  isLast: PropTypes.bool
};

export default ChatMessage;
