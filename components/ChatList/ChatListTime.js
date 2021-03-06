import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { withNavigation } from "react-navigation";
import Layout from "../../constants/Layout";

const LastTime = styled.Text`
  font-size: 10px;
  color: #acacac;
`;

const ChatListLastTime = ({ lastTime }) => <LastTime>{lastTime}</LastTime>;

ChatListLastTime.propTypes = {
  lastTime: PropTypes.string.isRequired
};

export default ChatListLastTime;
