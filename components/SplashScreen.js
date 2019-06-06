import React, { Component } from "react";
import styled from "styled-components";
import Layout from "../constants/Layout";

const Container = styled.View`
  display: flex;
  align-items: center;
`;

const Logo = styled.Image`
  width: ${Layout.width * 0.4};
  height: ${Layout.width * 0.4};
`;

const Tree = styled.Image`
  width: ${Layout.width};
  height: ${Layout.width};
`;

export default class extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.replace("ChatList");
    }, 2000);
  }

  render() {
    return (
      <Container>
        <Logo source={require("../assets/treelogo.png")} />
        <Tree source={require("../assets/treetree.png")} />
      </Container>
    );
  }
}
