import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'


import HomeScreen from "./HomeScreen";
import AllProduct from './products/AllProduct'
import UserScreen from './UserScreen'
const homeName ='Home';
const productsAll ="Product"
const userName ='User'

const Tap =createBottomTabNavigator();

export default function MainContainer(){
    return(
        <h1>fsdf</h1>
    )
}