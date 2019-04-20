import React from "react";
import SettingPathPresenter from "./SettingPathPresenter";

export default class extends React.Component {
  state = {
    loading: true
  };

  async componentDidMount() {}

  render() {
    const { loading } = this.state;
    return <SettingPathPresenter loading={loading} />;
  }
}
