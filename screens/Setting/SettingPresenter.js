import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Loader from "../../components/Loader";

const Container = styled.ScrollView``;

const SettingPresenter = ({ loading }) =>
  loading ? <Loader /> : <Container>불러왔다.</Container>;

SettingPresenter.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default SettingPresenter;
