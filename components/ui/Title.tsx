import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';

function Title(props: React.PropsWithChildren<React.ComponentProps<typeof Text>>) {
  return <Text style={StyleSheet.flatten([styles.title, props.style])}>{props.children}</Text>;
}

export default Title;

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
