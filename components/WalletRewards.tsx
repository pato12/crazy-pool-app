import _ from 'lodash';
import React from 'react';
import { Card, Divider, ListItem } from 'react-native-elements';
import { Text, View, StyleSheet } from 'react-native';
import { format } from 'date-fns';

import type { IWalletStatsData } from '../hooks/useWalletStats';

import { formatBalance, formatBlockHeight, formatPercent, formatWalletAddress } from '../helpers';
import { Title, Container } from './ui';

interface IWalletRewardsProps {
  data: IWalletStatsData;
}

function WalletRewards(props: IWalletRewardsProps) {
  const { sumrewards, rewards } = props.data;

  return (
    <React.Fragment>
      <Container>
        <Title>Your Latest Rewards</Title>
      </Container>

      <Card containerStyle={{ padding: 0 }}>
        {sumrewards.map(reward => (
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{reward.name}</ListItem.Title>
            </ListItem.Content>
            <Text>{formatBalance(reward.reward)} ETH</Text>
          </ListItem>
        ))}
      </Card>

      <BlockReward rewards={rewards} />
    </React.Fragment>
  );
}

export default WalletRewards;

interface IBlockRewardProps {
  rewards: IWalletStatsData['rewards'];
}

function BlockReward(props: IBlockRewardProps) {
  if (props.rewards.length === 0) return null;

  return (
    <View>
      <Container>
        <Title>Last Blocks</Title>
      </Container>

      <Card containerStyle={{ padding: 0 }}>
        <View style={styles.rowItem}>
          <View style={styles.row}>
            <Text style={styles.columnHeader}>Block Height</Text>
            <Text style={styles.columnHeader}>Reward</Text>
            <Text style={styles.columnHeader}>Round Share</Text>
          </View>
        </View>

        {props.rewards.map(reward => (
          <View style={styles.rowItem} key={reward.blockhash}>
            <View style={styles.row}>
              <Text style={styles.column}>{formatBlockHeight(reward.blockheight)}</Text>
              <Text style={styles.column}>{formatBalance(reward.reward)}</Text>
              <Text style={styles.column}>{formatPercent(reward.percent, 4)}</Text>
            </View>
            <Text style={styles.hint}>
              {format(reward.timestamp * 1000, 'M/d/yyyy, h:m:s b')} |{' '}
              {reward.immature ? 'Immature' : 'Matured'} | {formatWalletAddress(reward.blockhash)}
            </Text>
          </View>
        ))}
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  rowItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  columnHeader: {
    flex: 1,
    fontWeight: 'bold',
  },
  column: {
    flex: 1,
  },
  hint: {
    opacity: 0.5,
    marginTop: 10,
  },
});
