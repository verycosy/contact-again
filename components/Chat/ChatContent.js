import React from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Clipboard,
  ToastAndroid
} from "react-native";
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
  }
});

const View = styled.View`
  padding: 8px;
  max-width: ${props =>
    props.type === 0 ? Layout.width * 0.65 : Layout.width * 0.8};
`;

const Text = styled.Text`
  color: black;
  line-height: 21;
`;

const ChatContent = ({ content, type, navigation, images, imageIndex }) =>
  !checkMediaExt(content) ? ( //TODO: 이미지 확장자들 다 필터링해야함
    <TouchableOpacity
      style={{
        borderRadius: 4,
        elevation: 1,
        backgroundColor: type === 0 ? "white" : "#ffeb33"
      }}
      onPress={() => {
        Clipboard.setString(content);
        ToastAndroid.show("복사되었습니다 !", ToastAndroid.SHORT);
      }}
    >
      <View type={type}>
        <Text>{content}</Text>
      </View>
    </TouchableOpacity>
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
