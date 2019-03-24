import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Loader from "../../components/Loader";

const Text = styled.Text``;

const ImageDetailPresenter = ({ loading }) =>
  !loading ? <Loader /> : <Text>불러왔다.</Text>;

ImageDetailPresenter.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default ImageDetailPresenter;
