import React from 'react';
import { ThemeProvider } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import MainView from './views/main';
import WalletStatsView from './views/walletStats';

import { Stack } from './navigation';

function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen name="Main" component={MainView} />
          <Stack.Screen name="WalletStats" component={WalletStatsView} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
