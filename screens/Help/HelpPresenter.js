import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Loader from "../../components/Loader";

const Text = styled.Text``;

const HelpPresenter = ({ loading }) =>
  !loading ? <Loader /> : <Text>도움말페이지</Text>;

HelpPresenter.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default HelpPresenter;
