import React, { useCallback, useLayoutEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Card, Input, Button } from 'react-native-elements';

import useWalletHistory from '../hooks/useWalletHistory';

import WalletHistory from '../components/WalletHistory';
import { Container, Layout, Title } from '../components/ui';

import { MainProps } from '../navigation';
import { useDarkMode } from '../themeManager';

interface IMainViewProps extends MainProps {}

function MainView(props: IMainViewProps) {
  const { history, saveWalletAddress, clearHistory } = useWalletHistory();

  const [wallet, setWallet] = useState<string>('');
  const { isDarkMode, setIsDarkMode } = useDarkMode();

  const onNavigateToWallet = useCallback((wallet: string) => {
    saveWalletAddress(wallet);
    props.navigation.navigate('WalletStats', { wallet });
  }, []);

  const onShowStats = useCallback(() => {
    if (wallet) {
      onNavigateToWallet(wallet);
    }
  }, [wallet]);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: `Crazy Pool Home`,
    });
  }, [props.navigation]);

  return (
    <Layout>
      <ScrollView>
        <Container>
          <Title>Look Up Wallet</Title>
        </Container>
        <Card>
          <View>
            <Text>Wallet Address</Text>
            <Input placeholder="0x0000000000000000000" value={wallet} onChangeText={setWallet} />
            <Button title="Show stats" onPress={onShowStats} />
          </View>
        </Card>

        <WalletHistory
          history={history}
          onNavigateToWallet={onNavigateToWallet}
          onClearHistory={clearHistory}
        />

        <Button
          type="clear"
          title={`Change to ${isDarkMode ? 'light mode' : 'dark mode'}`}
          onPress={() => setIsDarkMode((v: boolean) => !v)}
        />
      </ScrollView>
    </Layout>
  );
}

export default MainView;
