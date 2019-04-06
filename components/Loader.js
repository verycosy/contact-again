import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components";
import Layout from "../constants/Layout";

const Container = styled.View`
  height: ${Layout.height - 70};
  justify-content: center;
`;

export default () => (
  <Container>
    <ActivityIndicator />
  </Container>
);
