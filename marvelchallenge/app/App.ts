import React from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";
import Home from "./screens/Home";
import HeroeDetail from './screens/HeroDetail';

const AppStack = createStackNavigator(
  {
    home: {
      screen: Home,
      navigationOptions: { headerTitle: "Marvel Challenge" }
    },
    heroDetail: {
      screen: HeroeDetail,
      navigationOptions: { headerTitle: "Hero Detail" }
    }
  },
  {
    //
  }
);

export const RootNavigator = createAppContainer(AppStack);

export default RootNavigator;
