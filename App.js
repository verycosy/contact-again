import React from "react";
import { Text, PermissionsAndroid, StatusBar } from "react-native";
import AppNavigator from "./navigation/AppNavigator";
import RNFetchBlob from "rn-fetch-blob";

export default () => {
  requestPermission = async () => {
    //TODO: 허락 후에 바로 파일 로딩하게끔.
    //TODO: 첫 권한 설정시 사용법, 대화 없을 때도.
    try {
      let granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "너랑 다시 연락하고 싶다 권한 요청",
          message:
            "카카오톡 대화 파일을 읽어들이기 위해 파일 접근 권한이 필요합니다.",
          buttonNegative: "아니오",
          buttonPositive: "네"
        }
      );

      granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "너랑 다시 연락하고 싶다 권한 요청",
          message:
            "카카오톡 대화 파일을 읽어들이기 위해 파일 접근 권한이 필요합니다.",
          buttonNegative: "아니오",
          buttonPositive: "네"
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("ACCESS");
      } else {
        console.log("DENIED");
      }
    } catch (err) {
      console.log(err);
    }
  };

  this.requestPermission();

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <AppNavigator />
    </>
  );
};
