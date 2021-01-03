import React, { useCallback, useState } from 'react';
import { TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import { Text, Card, Input, Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import Clipboard from 'expo-clipboard';

const ZERO_WALLET = '0x0000000000000000000000000000000000000000';
const WALLET_VALIDATOR = /^0x([0-9a-z]{40})$/i;

interface IWalletSelectorProps {
  isVisible: boolean;
  onNavigateToWallet: (wallet: string) => void;
  onClose: () => void;
}

function WalletSelector(props: React.PropsWithChildren<IWalletSelectorProps>) {
  const [wallet, setWallet] = useState<string>('');

  const onSubmit = useCallback(async () => {
    let currentWallet = wallet;

    if (!currentWallet) {
      currentWallet = await Clipboard.getStringAsync();
      setWallet(currentWallet);
    }

    if (WALLET_VALIDATOR.test(currentWallet)) {
      props.onNavigateToWallet(currentWallet);
      props.onClose();
    }
  }, [wallet, props.onNavigateToWallet, props.onClose]);

  return (
    <Modal
      avoidKeyboard
      isVisible={props.isVisible}
      onBackButtonPress={props.onClose}
      onBackdropPress={props.onClose}
      customBackdrop={
        <TouchableWithoutFeedback onPress={props.onClose}>
          <View style={{ flex: 1, backgroundColor: '#000', opacity: 0.8 }} />
        </TouchableWithoutFeedback>
      }
    >
      <Card>
        <View>
          <Text>Wallet Address</Text>
          <Input placeholder={ZERO_WALLET} value={wallet} onChangeText={setWallet} />
          <Button
            style={styles.button}
            title={!wallet ? 'Paste and go' : 'Go'}
            onPress={onSubmit}
          />
          <Button style={styles.button} type="outline" title="Cancel" onPress={props.onClose} />
        </View>
      </Card>
    </Modal>
  );
}

export default WalletSelector;

const styles = StyleSheet.create({
  button: {
    marginTop: 15,
  },
});
