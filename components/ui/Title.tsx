import React from 'react';
import { StyleSheet, Text } from 'react-native';

function Title(props: React.PropsWithChildren<{}>) {
  return <Text style={styles.title}>{props.children}</Text>;
}

export default Title;

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
