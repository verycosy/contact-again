import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Layout from "../../constants/Layout";

const Text = styled.Text`
  color: black;
  line-height: 21px;
`;

const View = styled.View`
  border-radius: 4px;
  padding: 8px;
  background-color: ${props => (props.type === 0 ? "white" : "#ffeb33")};
  max-width: ${props =>
    props.type === 0 ? Layout.width * 0.65 : Layout.width * 0.8};
  elevation: 1;
`;

const ChatContent = ({ content, type }) => (
  <View type={type}>
    <Text>{content}</Text>
  </View>
);

ChatContent.propTypes = {
  content: PropTypes.string.isRequired
};

export default ChatContent;
