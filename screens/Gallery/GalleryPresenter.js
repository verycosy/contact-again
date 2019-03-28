import React from "react";
import styled from "styled-components";
import { StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Loader from "../../components/Loader";
import FastImage from "react-native-fast-image";
import Grid from "react-native-grid-component";
import { withNavigation } from "react-navigation";
import Layout from "../../constants/Layout";
import { TouchableWithoutFeedback } from "react-native";

const Text = styled.Text``;
const styles = StyleSheet.create({
  item: {
    flex: 1,
    height: (Layout.width - 2) / 3,
    margin: 1
  },
  list: {
    flex: 1
  }
});

//TODO: 이미지만 된다. 영상 넣어야 하나?
//FIXME: ListView deprecated 경고 뜨네.. 약간 느린 것도 같은데 로딩 화면을 넣어야 하나?
const GalleryPresenter = ({ images, path, navigation }) =>
  !images ? (
    <Text>사진, 동영상이 없습니다.</Text>
  ) : (
    <Grid
      style={styles.list}
      renderItem={(data, i) => (
        <TouchableWithoutFeedback
          key={data.source.uri}
          onPress={() =>
            navigation.navigate({
              routeName: "ImageDetail",
              params: {
                uri: data.source.uri,
                who: data.who
              }
            })
          }
        >
          <FastImage
            source={{
              uri: data.source.uri
            }}
            style={styles.item}
          />
        </TouchableWithoutFeedback>
      )}
      data={images}
      itemsPerRow={3}
    />
  );

GalleryPresenter.propTypes = {};

export default withNavigation(GalleryPresenter);
