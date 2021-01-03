import React from 'react';
import { StyleSheet, View } from 'react-native';
import useTheme from '../../hooks/useTheme';

function Layout(props: React.PropsWithChildren<{}>) {
  const { theme } = useTheme();

  return (
    <View style={{ ...styles.container, backgroundColor: theme.colors?.grey5 }}>
      {props.children}
    </View>
  );
}

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
