import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AboutScreen } from '../screens/AboutScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { ScreenTestScreen } from '../screens/ScreenTestScreen';
import { colors } from '../constants/colors';

export type RootStackParamList = {
  Home: undefined;
  ScreenTest: undefined;
  About: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        animation: 'slide_from_right',
        statusBarStyle: 'light',
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="ScreenTest"
        component={ScreenTestScreen}
        options={{
          animation: 'fade',
          gestureEnabled: false,
          statusBarHidden: true,
          autoHideHomeIndicator: true,
          contentStyle: { backgroundColor: colors.black },
        }}
      />
      <Stack.Screen name="About" component={AboutScreen} />
    </Stack.Navigator>
  );
}
