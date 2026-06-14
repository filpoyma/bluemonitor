import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import BootSplash from 'react-native-bootsplash';
import { RootNavigator } from './navigation/RootNavigator';

const SPLASH_VISIBLE_MS = 1500;

function hideBootSplash() {
  setTimeout(() => {
    BootSplash.hide({ fade: true });
  }, SPLASH_VISIBLE_MS);
}

export default function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <NavigationContainer onReady={hideBootSplash}>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}