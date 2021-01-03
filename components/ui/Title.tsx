import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';

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
