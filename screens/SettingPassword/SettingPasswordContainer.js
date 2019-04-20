import React from "react";
import SettingPasswordPresenter from "./SettingPasswordPresenter";

export default class extends React.Component {
  state = {
    loading: true,
    password: ""
  };

  async componentDidMount() {}

  _passwordInput = value => {
    const { password } = this.state;

    if (value !== -1) {
      this.setState({
        password: password + value
      });
    } else {
      this.setState({
        password: password.substr(0, password.length - 1)
      });
    }

    //TODO: 4자리 되면 한 번 더 입력하게
  };

  render() {
    const { loading, password } = this.state;
    return (
      <SettingPasswordPresenter
        loading={loading}
        password={password}
        handler={this._passwordInput}
      />
    );
  }
}
