import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import Loader from "../../components/Loader";

const SettingMenu = styled.Text`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 5px;
  color: black;
`;

const SettingText = styled.Text`
  color: #aaa;
`;

const View = styled.View`
  padding: 10px;
`;

const SettingPresenter = ({ loading, navigation }) =>
  !loading ? (
    <Loader />
  ) : (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate({ routeName: "SettingPassword" })}
      >
        <View>
          <SettingMenu>비밀번호</SettingMenu>
          <SettingText>실행시 비밀번호를 입력합니다.</SettingText>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate({ routeName: "SettingPath" })}
      >
        <View>
          <SettingMenu>대화폴더 경로</SettingMenu>
          <SettingText>기본 대화폴더 경로를 변경합니다.</SettingText>
        </View>
      </TouchableOpacity>
    </>
  );

SettingPresenter.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default SettingPresenter;
