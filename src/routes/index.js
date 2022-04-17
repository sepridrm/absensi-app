import React from "react";
import { StyleSheet } from "react-native";

import Auth from "./Auth";

import Login from "../pages/login";
import Home from "../pages/home";
import Absensi from "../pages/absensi";
import Profile from "../pages/profile";
import OpenCamera from "../components/OpenCamera";

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
    return (
        <Stack.Navigator mode="modal" initialRouteName="Auth"
            screenOptions={{
                headerShadowVisible: false,
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Stack.Screen name="Auth" component={Auth} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }} />
            <Stack.Screen name="Absensi" component={Absensi} options={{ title: 'Absensi' }} />
            <Stack.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />
            <Stack.Screen name="OpenCamera" component={OpenCamera} options={{ title: 'Camera' }} />
        </Stack.Navigator>
    )
}

export default StackNavigator

const styles = StyleSheet.create({
    headerStyle: { elevation: 0, shadowOpacity: 0 }
})