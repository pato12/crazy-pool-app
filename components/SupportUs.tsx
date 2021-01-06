import React from 'react';
import { Card, Text, Divider } from 'react-native-elements';
import { Vibration, StyleSheet, TouchableOpacity } from 'react-native';
import Clipboard from 'expo-clipboard';

import { Container, Title } from './ui/';

const copyToClipboard = (address: string) => {
  Clipboard.setString(address);
  Vibration.vibrate(100);
};

function SupportUs() {
  return (
    <React.Fragment>
      <Container>
        <Title>Buy me a Coffee</Title>
      </Container>

      <Card containerStyle={{ padding: 0 }}>
        <Container>
          <Text style={[styles.text]}>
            Do you like the app? You can buy me a coffee to continue improving it. Click to copy the
            address.
          </Text>
        </Container>
        <Divider />
        <Container>
          <TouchableOpacity
            onPress={() => copyToClipboard('0x3df3E0D6BD45bA5667569139EA3AF4Aa7F463295')}
          >
            <Text style={styles.address}>
              ETH{'\n'}0x3df3E0D6BD45bA5667569139EA3AF4Aa7F463295{'\n'}
              <Text style={styles.hint}>(erc20 supported)</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => copyToClipboard('bc1qmykwuywnp50662ulepg04en6drcfnycptxp48f')}
          >
            <Text style={styles.address}>
              BTC{'\n'}bc1qmykwuywnp50662ulepg04en6drcfnycptxp48f
              <Text style={styles.hint}>(native segwit supported)</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => copyToClipboard('TXPN1UGV8MUJHBMqyGbDBFLNkVkppzHqoX')}>
            <Text style={styles.address}>
              TRON{'\n'}TXPN1UGV8MUJHBMqyGbDBFLNkVkppzHqoX{'\n'}
              <Text style={styles.hint}>(trc20 supported)</Text>
            </Text>
          </TouchableOpacity>
        </Container>
      </Card>
    </React.Fragment>
  );
}

export default SupportUs;

const styles = StyleSheet.create({
  marginBottom: {
    marginBottom: 10,
  },
  text: {
    lineHeight: 20,
  },
  address: {
    lineHeight: 30,
  },
  hint: {
    opacity: 0.5,
  },
});
