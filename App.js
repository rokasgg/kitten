import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer, createStackNavigator }from 'react-navigation';
import Main from './screens/Main';
import Details from './screens/Details';

const Nav = createStackNavigator({ 
    Main:{
      screen: Main
    },
    Details:{
      screen: Details
    },
})

const App = createAppContainer(Nav);

export default App;
