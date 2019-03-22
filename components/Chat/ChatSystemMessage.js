import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { MAIN_COLOR } from "../../constants/Color";

const SystemMessage = styled.Text`
  color: ${props => (props.isDate ? MAIN_COLOR : "white")};
  text-align: center;
  font-size: 12px;
  padding: 5px 0px;
  margin: 15px 0px;
  background-color: ${props => (props.isDate ? "transparent" : MAIN_COLOR)};
  margin-bottom: ${props => (props.isDate ? "15px" : "20px")};
`;

const ChatSystemMessage = ({ systemMessage, isDate }) => (
  <SystemMessage isDate={isDate}>
    {isDate
      ? "━━━━━━━━━━     " + systemMessage + "     ━━━━━━━━━━"
      : systemMessage}
  </SystemMessage>
);

ChatSystemMessage.propTypes = {
  systemMessage: PropTypes.string.isRequired,
  isDate: PropTypes.bool.isRequired
};

export default ChatSystemMessage;
