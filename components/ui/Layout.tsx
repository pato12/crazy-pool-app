import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import useTheme from '../../hooks/useTheme';

function Layout(props: React.PropsWithChildren<{}>) {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={{ ...styles.container, backgroundColor: theme.colors?.grey5 }}>
      {props.children}
    </SafeAreaView>
  );
}

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
