import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Layout from "../../constants/Layout";

const Text = styled.Text`
  border-radius: 4px;
  line-height: 21px;
  padding: 8px;
  background-color: ${props => (props.type === 0 ? "white" : "#ffeb33")};
  max-width: ${props =>
    props.type === 0 ? Layout.width * 0.65 : Layout.width * 0.8};
  color: black;
`;

const ChatContent = ({ content, type }) => <Text type={type}>{content}</Text>;

ChatContent.propTypes = {
  content: PropTypes.string.isRequired
};

export default ChatContent;
