import React from "react";
import ChatPresenter from "./ChatPresenter";
import * as RNFS from "react-native-fs";

export default class extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("name")
    };
  };

  constructor(props) {
    super(props);
    const {
      navigation: {
        state: {
          params: { name, path }
        }
      }
    } = props;

    this.state = {
      path,
      loading: true,
      textFile: null
    };
  }

  async componentDidMount() {
    const { path } = this.state;
    let textFile;

    try {
      textFile = await RNFS.readFile(path);
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({
        loading: false,
        textFile
      });
    }
  }

  render() {
    const { loading, textFile } = this.state;

    return <ChatPresenter loading={loading} textFile={textFile} />;
  }
}
