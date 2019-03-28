import React from "react";
import styled from "styled-components";
import { StyleSheet, StatusBar } from "react-native";
import PropTypes from "prop-types";
import Loader from "../../components/Loader";
import Layout from "../../constants/Layout";
import FastImage from "react-native-fast-image";
import { Header } from "react-navigation";

const styles = StyleSheet.create({
  imageSquare: {
    width: Layout.width,
    height: Layout.height
  }
});

const View = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: black;
`;

const ImageDetailPresenter = ({ loading, uri }) =>
  loading ? (
    <Loader />
  ) : (
    <View>
      <StatusBar hidden={true} />
      <FastImage
        source={{
          uri
        }}
        style={styles.imageSquare}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );

ImageDetailPresenter.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default ImageDetailPresenter;
