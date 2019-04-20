import React from "react";
import styled from "styled-components";
import { Image, Text } from "react-native";

export default ({ password }) => {
  const items = [];

  for (let i = 0; i < password.length; i++) {
    items.push(
      <Image
        source={require("../assets/pw-icon.png")}
        key={i}
        style={{ marginLeft: 10, marginRight: 10 }}
      />
    );
  }

  for (let i = 4; i > password.length; i--) {
    items.push(<Text key={i}> ㅡ </Text>);
  }

  return items;
};
