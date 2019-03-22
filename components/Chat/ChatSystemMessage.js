import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { MAIN_COLOR } from "../../constants/Color";

const SystemMessage = styled.Text`
  font-size: 12px;
  text-align: center;
  color: ${MAIN_COLOR};
  padding: 5px 0px;
  margin: 5px 0px;
`;

const ChatSystemMessage = ({ systemMessage }) => (
  <SystemMessage>{systemMessage}</SystemMessage>
);

ChatSystemMessage.propTypes = {
  systemMessage: PropTypes.string.isRequired
};

export default ChatSystemMessage;
