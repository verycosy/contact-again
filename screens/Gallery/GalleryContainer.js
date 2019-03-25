import React from "react";
import GalleryPresenter from "./GalleryPresenter";

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      navigation: {
        state: {
          params: { images, path }
        }
      }
    } = props;

    this.state = {
      path,
      images
    };
  }

  render() {
    const { images, path } = this.state;
    return <GalleryPresenter images={images} path={path} />;
  }
}
