import React from "react"
import { TouchableOpacity, Image } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { State } from "react-native-gesture-handler"
import LoginScreen from "./LoginScreen"
import RegisterScreen from "./RegisterScreen"
import AllProduct from "./products/AllProduct"
import HomeScreen from "./HomeScreen"
import UserScreen from "./UserScreen"
const Stack = createStackNavigator();

const RootStack = (props)=>{
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} options={{title:'home'}}/>
            <Stack.Screen name="Register" component={RegisterScreen}/>
            <Stack.Screen name="AllProduct" component={AllProduct}/>            
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="User" component={UserScreen}/>
                        
        </Stack.Navigator>
    )
}
export default RootStack