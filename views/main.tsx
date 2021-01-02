import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';

import useWalletHistory from '../hooks/useWalletHistory';

import WalletHistory from '../components/WalletHistory';

import { MainProps } from '../navigation';

interface IMainViewProps extends MainProps {}

function MainView(props: IMainViewProps) {
  const { history, saveWalletAddress, isLoading, isError } = useWalletHistory();

  const [wallet, setWallet] = useState<string>('');

  const onNavigateToWallet = useCallback((wallet: string) => {
    saveWalletAddress(wallet);
    props.navigation.navigate('WalletStats', { wallet });
  }, []);

  const onShowStats = useCallback(() => {
    if (wallet) {
      onNavigateToWallet(wallet);
    }
  }, [wallet]);

  return (
    <React.Fragment>
      <Card>
        <Card.Title>Account</Card.Title>
        <View>
          <Text>Wallet Address</Text>
          <Input placeholder="0x0000000000000000000" value={wallet} onChangeText={setWallet} />
          <Button title="Show stats" onPress={onShowStats} />
        </View>
      </Card>

      <WalletHistory history={history} onNavigateToWallet={onNavigateToWallet} />
    </React.Fragment>
  );
}

export default MainView;
