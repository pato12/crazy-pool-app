import React from 'react';
import { StyleSheet, View } from 'react-native';

function Container(props: React.PropsWithChildren<{}>) {
  return <View style={styles.container}>{props.children}</View>;
}

export default Container;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});
