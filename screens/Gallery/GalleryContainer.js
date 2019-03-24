import React from "react";
import GalleryPresenter from "./GalleryPresenter";

export default class extends React.Component {
  state = {
    loading: true
  };

  async componentDidMount() {}

  render() {
    const { loading } = this.state;
    return <GalleryPresenter loading={loading} />;
  }
}
