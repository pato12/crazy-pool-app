import React from 'react';
import { Image, View, ActivityIndicator } from 'react-native';

function SplashScreenView() {
  return (
    <React.Fragment>
      <View style={{ flex: 1, backgroundColor: '#fff', display: 'flex', alignItems: 'center' }}>
        <Image
          style={{ width: 150, height: 150, margin: 150 }}
          source={require('../assets/adaptive-icon.png')}
        />
        <ActivityIndicator color="#000" size="large" />
      </View>
    </React.Fragment>
  );
}

export default SplashScreenView;
