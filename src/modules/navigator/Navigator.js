import React from 'react';
import { Platform } from 'react-native';
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation';

import CounterViewContainer from '../counter/CounterViewContainer';
import SwipeViewContainer from '../swipe/SwipeViewContainer';

const headerColor = '#39babd';
const activeColor = 'white';

// TabNavigator is nested inside StackNavigator
export const MainScreenNavigator = TabNavigator({
  Swipe: {screen: SwipeViewContainer},
  //Counter: {screen: CounterViewContainer}
}, {
  tabBarOptions: {
    ...Platform.select({
      android: {
        activeTintColor: activeColor,
        indicatorStyle: {backgroundColor: activeColor},
        style: {backgroundColor: headerColor}
      }
    })
  }
});

MainScreenNavigator.navigationOptions = {
  title: 'PodSwipe',
  headerVisible: false,
  header: {
    titleStyle: {color: 'white'},
    style: {
      backgroundColor: headerColor,
      elevation: 1 // disable header elevation when TabNavigator visible
    }
  }
};

//Root navigator is a StackNavigator
const AppNavigator = StackNavigator({
  Home: {screen: SwipeViewContainer},
  //Swipe: {screen: SwipeViewContainer}
});

export default AppNavigator;
