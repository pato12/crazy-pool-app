import React, { useCallback, useLayoutEffect } from 'react';
import { ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import useToggle from 'react-use/lib/useToggle';

import useWalletHistory from '../hooks/useWalletHistory';

import { Layout } from '../components/ui';
import WalletHistory from '../components/WalletHistory';
import WalletSelector from '../components/WalletSelector';
import SupportUs from '../components/SupportUs';

import { MainProps } from '../navigation';

interface IMainViewProps extends MainProps {}

function MainView(props: IMainViewProps) {
  const { history, saveWalletAddress, clearHistory } = useWalletHistory();

  const [walletSelectorVisible, toggleWalleSelectorVisible] = useToggle(false);

  const onNavigateToWallet = useCallback((wallet: string) => {
    saveWalletAddress(wallet);
    props.navigation.navigate('WalletStats', { wallet });
  }, []);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: `Crazy Pool Home`,
      headerRight: () => (
        <Button type="clear" onPress={() => props.navigation.push('Settings')} title={'Settings'} />
      ),
    });
  }, [props.navigation]);

  return (
    <Layout>
      <ScrollView>
        <WalletHistory
          history={history}
          onNavigateToWallet={onNavigateToWallet}
          onClearHistory={clearHistory}
          onAddWallet={toggleWalleSelectorVisible}
        />

        {history.length > 0 && <SupportUs />}
      </ScrollView>

      <WalletSelector
        isVisible={walletSelectorVisible}
        onClose={toggleWalleSelectorVisible}
        onNavigateToWallet={onNavigateToWallet}
      />
    </Layout>
  );
}

export default MainView;
