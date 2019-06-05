import React from "react";
import { ToastAndroid } from "react-native";
import RNFetchBlob from "rn-fetch-blob";
import SettingPasswordPresenter from "./SettingPasswordPresenter";

export default class extends React.Component {
  constructor(props) {
    super(props);

    let {
      navigation: {
        state: {
          params: { check, checkPassword }
        }
      }
    } = props;

    this.state = {
      loading: true,
      password: "",
      check,
      checkPassword
    };
  }

  _passwordInput = value => {
    const { password, check, checkPassword } = this.state;

    if (value !== -1) {
      this.setState(
        {
          password: password + value
        },
        () => {
          const { password } = this.state;

          if (password.length === 4) {
            if (check) {
              const writePath =
                RNFetchBlob.fs.dirs.DocumentDir + "password.txt";

              RNFetchBlob.fs.writeFile(writePath, password, "utf8").then(() => {
                if (password === checkPassword) {
                  ToastAndroid.show(
                    `비밀번호가 설정되었습니다.`,
                    ToastAndroid.SHORT
                  );
                  this.props.navigation.navigate("Setting");
                } else {
                  ToastAndroid.show(`비밀번호가 다릅니다.`, ToastAndroid.SHORT);

                  this.setState({
                    password: ""
                  });
                }
              });
            } else {
              if (checkPassword !== null) {
                if (password === checkPassword) this.props.navigation.pop();
                else {
                  ToastAndroid.show(`비밀번호가 다릅니다.`, ToastAndroid.SHORT);

                  this.setState({
                    password: ""
                  });
                }
              } else {
                this.props.navigation.push("SettingPassword", {
                  check: true,
                  checkPassword: password
                });
              }
            }
          }
        }
      );
    } else {
      this.setState({
        password: password.substr(0, password.length - 1)
      });
    }
  };

  render() {
    const { loading, password, check, checkPassword } = this.state;

    return (
      <SettingPasswordPresenter
        loading={loading}
        password={password}
        handler={this._passwordInput}
        check={check}
        checkPassword={checkPassword}
      />
    );
  }
}
