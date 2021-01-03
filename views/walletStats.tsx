import _ from 'lodash';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { ButtonGroup, Button, Text } from 'react-native-elements';
import { formatDistanceToNow } from 'date-fns';
import { ActivityIndicator } from 'react-native';

import useWalletStats from '../hooks/useWalletStats';
import useCurrencyRate from '../hooks/useCurrencyRate';

import { Layout } from '../components/ui';
import WalletOverview from '../components/WalletOverview';
import WalletWorkers from '../components/WalletWorkers';
import WalletRewards from '../components/WalletRewards';
import RealTimeDate from '../components/RealTimeDate';

import { WalletStatsProps } from '../navigation';
import { assertIsDefined, formatWalletAddress } from '../helpers';

interface IWalletStatsProps extends WalletStatsProps {}

function WalletStats(props: IWalletStatsProps) {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [selectedRate, setSelectedRate] = useState('eth');

  const walletAddresss = props.route.params.wallet;

  const { data, lastUpdate, isError, isLoading } = useWalletStats(walletAddresss);

  const currentRate = useCurrencyRate(data?.exchangedata.usdt, selectedRate);

  const toggleSelectedRate = useCallback(() => {
    setSelectedRate(v => {
      if (v === 'eth') return 'usd';
      else if (v === 'usd') return 'ars';
      return 'eth';
    });
  }, []);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: `Wallet ${formatWalletAddress(walletAddresss)}`,
      headerBackTitle: 'Back',
      headerRight: () => (
        <Button type="clear" onPress={toggleSelectedRate} title={selectedRate.toUpperCase()} />
      ),
    });
  }, [props.navigation, selectedRate]);

  if (isLoading) {
    return (
      <Layout>
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout>
        <View style={styles.container}>
          <Text>Error loading</Text>
        </View>
      </Layout>
    );
  }

  assertIsDefined(data);

  return (
    <Layout>
      <ButtonGroup
        onPress={setSelectedMenu}
        selectedIndex={selectedMenu}
        buttons={['Overview', 'Workers', 'Rewards']}
      />

      <ScrollView>
        {selectedMenu === 0 && <WalletOverview rate={currentRate} data={data} />}
        {selectedMenu === 1 && <WalletWorkers workers={data.workers} />}
        {selectedMenu === 2 && <WalletRewards rate={currentRate} data={data} />}

        <View style={styles.footer}>
          <Text style={styles.hint}>
            Last update:{' '}
            <RealTimeDate value={lastUpdate} formater={formatDistanceToNow} interval={5 * 1000} />{' '}
            ago
          </Text>
          <Text style={styles.hint}>
            Current rate: 1 ETH = {currentRate.multipler.toFixed(currentRate.decimals)}{' '}
            {currentRate.iso}
          </Text>
        </View>
      </ScrollView>
    </Layout>
  );
}

export default WalletStats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    margin: 15,
    marginBottom: 30,
  },
  hint: {
    opacity: 0.5,
  },
});
