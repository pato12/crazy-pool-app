import React from 'react';
import { StyleSheet, View } from 'react-native';

function Container(props: React.PropsWithChildren<React.ComponentProps<typeof View>>) {
  return (
    <View {...props} style={StyleSheet.flatten([styles.container, props.style])}>
      {props.children}
    </View>
  );
}

export default Container;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});
