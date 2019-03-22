import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { withNavigation } from "react-navigation";
import Layout from "../../constants/Layout";

const Name = styled.Text`
  font-size: 16px;
  color: black;
  margin-bottom: 5px;
`;

const ChatListWho = ({ name }) => <Name>{name}</Name>;

ChatListWho.propTypes = {
  name: PropTypes.string.isRequired
};

export default ChatListWho;
