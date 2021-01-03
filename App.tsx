import React, { useEffect, useLayoutEffect } from 'react';
import { ThemeProvider } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import useTheme from './hooks/useTheme';

import MainView from './views/main';
import WalletStatsView from './views/walletStats';

import { Stack } from './navigation';
import { lightTheme, darkTheme, DarkModeProvider, useDarkMode } from './themeManager';

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <DarkModeProvider>
        <AppStack />
      </DarkModeProvider>
    </ThemeProvider>
  );
}

function AppStack() {
  const { theme, replaceTheme } = useTheme();
  const { isDarkMode } = useDarkMode();

  useLayoutEffect(() => {
    if (isDarkMode) {
      replaceTheme(darkTheme);
    } else {
      replaceTheme(lightTheme);
    }
  }, [isDarkMode]);

  return (
    <NavigationContainer>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <Stack.Navigator
        screenOptions={{
          headerTintColor: theme.colors?.black,
          headerStyle: {
            backgroundColor: theme.colors?.white,
            shadowColor: theme.colors?.black,
          },
        }}
        initialRouteName="Main"
      >
        <Stack.Screen name="Main" component={MainView} />
        <Stack.Screen name="WalletStats" component={WalletStatsView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
