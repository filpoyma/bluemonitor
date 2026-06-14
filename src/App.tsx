import React, { useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BootSplash from 'react-native-bootsplash';
import { RootNavigator } from './navigation/RootNavigator';

export default function App() {
  const handleNavigationReady = useCallback(() => {
    BootSplash.hide({ fade: true });
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer onReady={handleNavigationReady}>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
