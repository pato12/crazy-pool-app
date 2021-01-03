import React, { useCallback, useLayoutEffect } from 'react';
import { ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import useToggle from 'react-use/lib/useToggle';

import useWalletHistory from '../hooks/useWalletHistory';

import { Container, Layout, Title } from '../components/ui';
import WalletHistory from '../components/WalletHistory';
import WalletSelector from '../components/WalletSelector';

import { MainProps } from '../navigation';
import { useDarkMode } from '../themeManager';

interface IMainViewProps extends MainProps {}

function MainView(props: IMainViewProps) {
  const { history, saveWalletAddress, clearHistory } = useWalletHistory();

  const { isDarkMode, setIsDarkMode } = useDarkMode();
  const [walletSelectorVisible, toggleWalleSelectorVisible] = useToggle(false);

  const onNavigateToWallet = useCallback((wallet: string) => {
    saveWalletAddress(wallet);
    props.navigation.navigate('WalletStats', { wallet });
  }, []);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: `Crazy Pool Home`,
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

        <Container>
          <Title>Settings</Title>
        </Container>

        <Button
          type="clear"
          title={`Change to ${isDarkMode ? 'light mode' : 'dark mode'}`}
          onPress={() => setIsDarkMode((v: boolean) => !v)}
        />
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
