import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Loader from "../../components/Loader";

const Text = styled.Text``;

const GalleryPresenter = ({ loading }) =>
  !loading ? <Loader /> : <Text>불러왔다.</Text>;

GalleryPresenter.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default GalleryPresenter;
