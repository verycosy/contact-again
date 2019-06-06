import React from "react";
import styled from "styled-components";

const Text = styled.Text`
  width: 20px;
  font-weight: 600;
  text-align: center;
`;

export default ({ password }) => (
  <>
    <Text>{password.length >= 1 ? "*" : "ㅡ"}</Text>
    <Text>{password.length >= 2 ? "*" : "ㅡ"}</Text>
    <Text>{password.length >= 3 ? "*" : "ㅡ"}</Text>
    <Text>ㅡ</Text>
  </>
);
