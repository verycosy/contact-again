import React from "react";
import { StyleSheet, TouchableWithoutFeedback, Text } from "react-native";
import PropTypes from "prop-types";
import styled from "styled-components";
import { withNavigation } from "react-navigation";
import Layout from "../../constants/Layout";
import FastImage from "react-native-fast-image";
import checkMediaExt from "../../utils.js/checkMediaExt";

const styles = StyleSheet.create({
  imageSquare: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ddd",
    width: Layout.width * 0.65,
    height: Layout.height * 0.5,
    borderRadius: 4
  },
  textMessage: {
    color: "black",
    lineHeight: 21
  }
});

const View = styled.View`
  border-radius: 4px;
  padding: 8px;
  background-color: ${props => (props.type === 0 ? "white" : "#ffeb33")};
  max-width: ${props =>
    props.type === 0 ? Layout.width * 0.65 : Layout.width * 0.8};
  elevation: 1;
`;

const ChatContent = ({ content, type, navigation, images, imageIndex }) =>
  !checkMediaExt(content) ? ( //TODO: 이미지 확장자들 다 필터링해야함
    <View type={type}>
      <Text style={styles.textMessage}>{content}</Text>
    </View>
  ) : (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate({
          routeName: "ImageDetail",
          params: {
            index: images[imageIndex].index,
            images,
            info: images[imageIndex].info
          }
        })
      }
    >
      <FastImage
        source={{
          uri: content
        }}
        style={styles.imageSquare}
      />
    </TouchableWithoutFeedback>
  );

ChatContent.propTypes = {
  content: PropTypes.string.isRequired
};

export default withNavigation(ChatContent);
