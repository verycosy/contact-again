import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Layout from "../../constants/Layout";
import { MAIN_COLOR } from "../../constants/Color";
import { TouchableOpacity } from "react-native";

const View = styled.ScrollView`
  background-color: ${MAIN_COLOR};
`;

const Text = styled.Text`
  font-size: 14px;
  padding: 10px;
  color: white;
`;

const CalendarDrawer = ({ dates, calendarHandle }) => (
  <View>
    {dates.map(date => (
      <TouchableOpacity
        key={date.index}
        onPress={() => calendarHandle(date.index)}
      >
        <Text>{date.date}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

CalendarDrawer.propTypes = {};

export default CalendarDrawer;
