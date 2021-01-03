import _ from 'lodash';
import React from 'react';
import { Text, Card, ListItem } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';
import { format } from 'date-fns';

import type { IWalletStatsData } from '../hooks/useWalletStats';
import type { IRate } from '../hooks/useCurrencyRate';
import useTheme from '../hooks/useTheme';

import { formatBalance, formatBlockHeight, formatPercent, formatWalletAddress } from '../helpers';
import { Title, Container } from './ui';

interface IWalletRewardsProps {
  data: IWalletStatsData;
  rate: IRate;
}

function WalletRewards({ data, rate }: IWalletRewardsProps) {
  const { sumrewards, rewards } = data;

  return (
    <React.Fragment>
      <Container>
        <Title>Your Latest Rewards</Title>
      </Container>

      <Card containerStyle={{ padding: 0 }}>
        {sumrewards.map(reward => (
          <ListItem bottomDivider key={reward.name}>
            <ListItem.Content>
              <ListItem.Title>{reward.name}</ListItem.Title>
            </ListItem.Content>
            <Text>
              {formatBalance(reward.reward * rate.multipler, rate.decimals)} {rate.iso}
            </Text>
          </ListItem>
        ))}
      </Card>

      <BlockReward rewards={rewards} rate={rate} />
    </React.Fragment>
  );
}

export default WalletRewards;

interface IBlockRewardProps {
  rewards: IWalletStatsData['rewards'];
  rate: IRate;
}

function BlockReward({ rate, rewards }: IBlockRewardProps) {
  const { theme } = useTheme();

  if (rewards.length === 0) return null;

  const rowItem = {
    padding: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors?.divider,
  };

  return (
    <View>
      <Container>
        <Title>Last Blocks</Title>
      </Container>

      <Card containerStyle={{ padding: 0 }}>
        <View style={rowItem}>
          <View style={styles.row}>
            <Text style={styles.columnHeader}>Block Height</Text>
            <Text style={{ ...styles.columnHeader, ...styles.extendedColumn }}>Reward</Text>
            <Text style={styles.columnHeader}>Round Share</Text>
          </View>
        </View>

        {rewards.map(reward => (
          <View style={rowItem} key={reward.blockhash}>
            <View style={styles.row}>
              <Text style={styles.column}>{formatBlockHeight(reward.blockheight)}</Text>
              <Text style={styles.extendedColumn}>
                {formatBalance(reward.reward * rate.multipler, rate.decimals)} {rate.iso}
              </Text>
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
  extendedColumn: {
    flex: 1.5,
  },
  hint: {
    opacity: 0.5,
    marginTop: 10,
  },
});
