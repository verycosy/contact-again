import React from "react";
import SettingPresenter from "./SettingPresenter";

export default class extends React.Component {
  state = {
    loading: true
  };

  async componentDidMount() {}

  render() {
    const { loading } = this.state;
    return <SettingPresenter loading={loading} />;
  }
}
