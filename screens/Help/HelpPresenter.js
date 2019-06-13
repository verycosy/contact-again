import React from "react";
import { WebView } from "react-native";
import styled from "styled-components";

const Container = styled.View`
  height: 240px;
`;

const HelpPresenter = () => (
  <Container>
    <WebView
      javaScriptEnabled={true}
      domStorageEnabled={true}
      source={{ uri: "https://www.youtube.com/embed/0iayQ1xPsnc" }}
    />
  </Container>
);

export default HelpPresenter;
