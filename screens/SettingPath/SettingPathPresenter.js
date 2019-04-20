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

const SettingPathPresenter = ({ loading }) =>
  !loading ? (
    <Loader />
  ) : (
    <>
      <TouchableOpacity>
        <View>
          <SettingText>경로 설정합니당</SettingText>
        </View>
      </TouchableOpacity>
    </>
  );

SettingPathPresenter.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default SettingPathPresenter;
