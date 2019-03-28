import React from "react";
import ImageDetailPresenter from "./ImageDetailPresenter";
import styled from "styled-components";

const View = styled.View`
  align-items: center;
`;

export default class extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("who")
    };
  };

  constructor(props) {
    super(props);
    const {
      navigation: {
        state: {
          params: { uri }
        }
      }
    } = props;

    this.state = {
      uri,
      loading: false
    };
  }

  async componentDidMount() {}

  render() {
    const { loading, uri } = this.state;

    return <ImageDetailPresenter loading={loading} uri={uri} />;
  }
}
