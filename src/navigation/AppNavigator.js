import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useSelector } from "react-redux";
import Home from "../screens/Home/Home";
import Login from "../screens/Login/Login";

const StackNavigation = createNativeStackNavigator();

const AppNavigator = () => {
    const { isLoggedIn } = useSelector(state => state.auth);
    return (
        <NavigationContainer>
            {
                !isLoggedIn ?
                    <StackNavigation.Navigator>
                        <StackNavigation.Screen name="Login" component={Login} />
                    </StackNavigation.Navigator>
                    :
                    <StackNavigation.Navigator>
                        <StackNavigation.Screen name="Home" component={Home} />
                    </StackNavigation.Navigator>
            }
        </NavigationContainer>
    )
}

export default AppNavigator;