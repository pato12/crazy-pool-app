import React, { useLayoutEffect, useState } from 'react';
import { ThemeProvider } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import useTheme from './hooks/useTheme';

import SplashScreenView from './views/splashscreen';
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
  const isLookingSplashScreen = useFakeLoading(2 * 1000);

  useLayoutEffect(() => {
    if (isDarkMode) {
      replaceTheme(darkTheme);
    } else {
      replaceTheme(lightTheme);
    }
  }, [isDarkMode]);

  if (isLookingSplashScreen) {
    return <SplashScreenView />;
  }

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

function useFakeLoading(ms: number) {
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    const interval = setInterval(() => setIsLoading(false), ms);

    return () => clearInterval(interval);
  }, []);

  return isLoading;
}
