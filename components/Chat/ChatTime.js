import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Text = styled.Text`
  font-size: 10px;
  align-self: flex-end;
  margin: 0px 5px;
  color: #3e454c;
`;

const ChatTime = ({ chatTime }) => <Text>{chatTime}</Text>;

ChatTime.propTypes = {
  chatTime: PropTypes.string.isRequired
};

export default ChatTime;
