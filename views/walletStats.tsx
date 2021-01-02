import _ from 'lodash';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { ButtonGroup } from 'react-native-elements';

import useWalletStats from '../hooks/useWalletStats';

import WalletOverview from '../components/WalletOverview';
import WalletWorkers from '../components/WalletWorkers';
import WalletRewards from '../components/WalletRewards';

import { WalletStatsProps } from '../navigation';
import { assertIsDefined } from '../helpers';

interface IWalletStatsProps extends WalletStatsProps {}

function WalletStats(props: IWalletStatsProps) {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const walletAddresss = props.route.params.wallet;

  const { data, isError, isLoading } = useWalletStats(walletAddresss);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <Text>Error loading stats</Text>
      </View>
    );
  }

  assertIsDefined(data);

  return (
    <React.Fragment>
      <ButtonGroup
        onPress={setSelectedMenu}
        selectedIndex={selectedMenu}
        buttons={['Overview', 'Workers', 'Rewards']}
      />

      <ScrollView>
        {selectedMenu === 0 && <WalletOverview data={data} />}
        {selectedMenu === 1 && <WalletWorkers workers={data.workers} />}
        {selectedMenu === 2 && <WalletRewards data={data} />}
      </ScrollView>
    </React.Fragment>
  );
}

export default WalletStats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
