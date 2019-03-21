import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";

const TabBarIcon = ({ name, focused }) => <Text>{name}</Text>;

TabBarIcon.propTypes = {
  focused: PropTypes.bool.isRequired
};

export default TabBarIcon;
