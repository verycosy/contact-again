import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Loader from "../../components/Loader";

const Container = styled.ScrollView``;
const Text = styled.Text``;

const ChatPresenter = ({ loading, textFile }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      <Text>{textFile}</Text>
    </Container>
  );

ChatPresenter.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default ChatPresenter;
