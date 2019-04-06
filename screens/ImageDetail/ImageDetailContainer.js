import React from "react";
import ImageDetailPresenter from "./ImageDetailPresenter";
import styled from "styled-components";
import Gallery from "react-native-image-gallery";
import Loader from "../../components/Loader";
import { StatusBar, TouchableWithoutFeedback } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faThLarge } from "@fortawesome/free-solid-svg-icons";
import FastImage from "react-native-fast-image";
import Layout from "../../constants/Layout";

const View = styled.View`
  align-items: center;
`;

const TitleView = styled.View``;
const Text = styled.Text`
  font-size: 12px;
`;

export default class extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { who, date } = navigation.getParam("info");

    return {
      headerTitle: (
        <TitleView>
          <Text style={{ color: "white" }}>{who}</Text>
          <Text style={{ color: "#777777" }}>{date}</Text>
        </TitleView>
      ),
      headerRight: (
        <TouchableWithoutFeedback
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() =>
            navigation.replace({
              routeName: "Gallery",
              params: {
                images: navigation.getParam("images")
              }
            })
          }
        >
          <FontAwesomeIcon
            size={18}
            icon={faThLarge}
            color={"white"}
            style={{ marginLeft: 18, marginRight: 18 }}
          />
        </TouchableWithoutFeedback>
      )
    };
  };

  constructor(props) {
    super(props);
    const {
      navigation: {
        state: {
          params: { images, index }
        }
      }
    } = props;

    this.state = {
      loading: false,
      images,
      index
    };
  }

  async componentDidMount() {}

  render() {
    const { loading, images, index } = this.state;
    return loading ? (
      <Loader />
    ) : (
      <>
        <StatusBar hidden />
        <Gallery
          pageMargin={10}
          style={{ flex: 1, backgroundColor: "black" }}
          images={images}
          initialPage={index}
          imageComponent={image => (
            <FastImage
              source={{ uri: image.source.uri }}
              style={{ width: Layout.width, height: Layout.height }}
              resizeMode={FastImage.resizeMode.contain}
            />
          )}
          onPageSelected={position => {
            this.props.navigation.setParams({
              info: images[position].info
            });
          }}
        />
      </>
    );
  }
}
