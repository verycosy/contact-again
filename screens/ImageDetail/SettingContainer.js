import React from "react";
import ImageDetailPresenter from "./ImageDetailPresenter";

export default class extends React.Component {
  state = {
    loading: true
  };

  async componentDidMount() {}

  render() {
    const { loading } = this.state;
    return <ImageDetailPresenter loading={loading} />;
  }
}
