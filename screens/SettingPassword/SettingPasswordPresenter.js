import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import Loader from "../../components/Loader";
import Layout from "../../constants/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEraser } from "@fortawesome/free-solid-svg-icons";
import PassworResult from "../../components/PassworResult";

const Container = styled.View`
  flex: 1;
`;

const TopContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const NumPad = styled.View`
  width: ${Layout.width / 3};
  height: ${Layout.height / 10};
`;

const NumPadText = styled.Text`
  text-align: center;
  color: black;
  font-size: 24px;
`;

const NumPadLine = styled.View`
  display: flex;
  flex-direction: row;
`;

const SettingPasswordPresenter = ({
  loading,
  password,
  handler,
  check,
  checkPassword
}) =>
  !loading ? (
    <Loader />
  ) : (
    <Container>
      <TopContainer>
        <Text style={{ fontSize: 24, color: "black" }}>암호</Text>
        <Text style={{ marginTop: 10, marginBottom: 20 }}>
          {!check
            ? checkPassword
              ? "비밀번호를 입력해주세요."
              : "변경할 비밀번호를 입력해주세요."
            : "비밀번호를 한 번 더 입력해주세요."}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <PassworResult password={password} />
        </View>
      </TopContainer>

      <NumPadLine>
        <TouchableOpacity onPress={() => handler(1)}>
          <NumPad>
            <NumPadText>1</NumPadText>
          </NumPad>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handler(2)}>
          <NumPad>
            <NumPadText>2</NumPadText>
          </NumPad>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handler(3)}>
          <NumPad>
            <NumPadText>3</NumPadText>
          </NumPad>
        </TouchableOpacity>
      </NumPadLine>

      <NumPadLine>
        <TouchableOpacity onPress={() => handler(4)}>
          <NumPad>
            <NumPadText>4</NumPadText>
          </NumPad>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handler(5)}>
          <NumPad>
            <NumPadText>5</NumPadText>
          </NumPad>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handler(6)}>
          <NumPad>
            <NumPadText>6</NumPadText>
          </NumPad>
        </TouchableOpacity>
      </NumPadLine>

      <NumPadLine>
        <TouchableOpacity onPress={() => handler(7)}>
          <NumPad>
            <NumPadText>7</NumPadText>
          </NumPad>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handler(8)}>
          <NumPad>
            <NumPadText>8</NumPadText>
          </NumPad>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handler(9)}>
          <NumPad>
            <NumPadText>9</NumPadText>
          </NumPad>
        </TouchableOpacity>
      </NumPadLine>

      <NumPadLine>
        <TouchableOpacity>
          <NumPad>
            <NumPadText> </NumPadText>
          </NumPad>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handler(0)}>
          <NumPad>
            <NumPadText>0</NumPadText>
          </NumPad>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handler(-1)}>
          <NumPad>
            <FontAwesomeIcon
              icon={faEraser}
              size={20}
              style={{ marginTop: 6, marginLeft: "auto", marginRight: "auto" }}
            />
          </NumPad>
        </TouchableOpacity>
      </NumPadLine>
    </Container>
  );

SettingPasswordPresenter.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default SettingPasswordPresenter;
