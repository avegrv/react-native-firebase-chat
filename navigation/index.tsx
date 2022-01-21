import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {ColorSchemeName} from 'react-native';
import HomeScreen from "../screens/HomeScreen";
import {RootStackParamList} from "../types";
import ChatScreen from "../screens/ChatScreen";

export default function Navigation({colorScheme}: { colorScheme: ColorSchemeName }) {
    return (
        <NavigationContainer
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <RootNavigator/>
        </NavigationContainer>
    );
}

const RootStack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
    return (
        <RootStack.Navigator>
            <RootStack.Screen name="Home" component={HomeScreen}/>
            <RootStack.Screen name="Chat" component={ChatScreen}/>
        </RootStack.Navigator>
    );
}