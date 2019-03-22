import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { withNavigation } from "react-navigation";
import Layout from "../../constants/Layout";

const Name = styled.Text`
  font-size: 16px;
  color: #111111;
  flex: 1;
  margin-bottom: 2px;
  margin-left: 55px;
`;

const ChatListWho = ({ name }) => <Name>{name}</Name>;

ChatListWho.propTypes = {
  name: PropTypes.string.isRequired
};

export default ChatListWho;
