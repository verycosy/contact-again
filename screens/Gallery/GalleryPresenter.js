import React from "react";
import styled from "styled-components";
import { StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Loader from "../../components/Loader";
import FastImage from "react-native-fast-image";
import { FlatGrid } from "react-native-super-grid";
import { withNavigation } from "react-navigation";
import Layout from "../../constants/Layout";

const Text = styled.Text`
  padding: 10px;
  color: #777777;
  font-size: 12px;
`;

const styles = StyleSheet.create({
  item: {
    width: (Layout.width - 6) / 3,
    height: (Layout.width - 6) / 3,
    backgroundColor: "#eee",
    margin: 1
  },
  list: {
    flex: 1
  }
});

//TODO: 이미지만 된다. 영상 넣어야 하나?
const GalleryPresenter = ({ images, navigation }) =>
  !images ? (
    <Text>사진, 동영상이 없습니다.</Text>
  ) : (
    <>
      <Text>{images.length}개의 사진/동영상이 있습니다.</Text>
      <FlatGrid
        spacing={0}
        style={styles.list}
        itemDimension={(Layout.width - 6) / 3}
        items={images}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.source.uri}
            onPress={() =>
              navigation.navigate({
                routeName: "ImageDetail",
                params: {
                  index: item.index,
                  images,
                  info: item.info
                }
              })
            }
          >
            <FastImage
              source={{
                uri: item.source.uri
              }}
              style={styles.item}
              resizeMode={FastImage.resizeMode.center}
            />
          </TouchableOpacity>
        )}
      />
    </>
  );

GalleryPresenter.propTypes = {};

export default withNavigation(GalleryPresenter);
