import _ from 'lodash';
import React from 'react';
import { Card, ListItem } from 'react-native-elements';
import { Text } from 'react-native';

import type { IWalletStatsData } from '../hooks/useWalletStats';

import { formatBalance, formatHashrate, formatPercent } from '../helpers';

interface IWalletOverviewProps {
  data: IWalletStatsData;
}

function WalletOverview(props: IWalletOverviewProps) {
  const {
    roundPercent,
    roundVariance,
    lastHourHashRate,
    last6hrsHashRate,
    immatureBalance,
    pendingBalance,
    last24hreward,
    workersOnline,
  } = props.data;

  return (
    <Card containerStyle={{ padding: 0 }}>
      {!_.isNaN(immatureBalance) && (
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Immature Balance:</ListItem.Title>
          </ListItem.Content>
          <Text>{formatBalance(immatureBalance)} ETH</Text>
        </ListItem>
      )}
      {!_.isNaN(pendingBalance) && (
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Pending Balance:</ListItem.Title>
          </ListItem.Content>
          <Text>{formatBalance(pendingBalance)} ETH</Text>
        </ListItem>
      )}
      {!_.isNaN(last24hreward) && (
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Last 24h Reward:</ListItem.Title>
          </ListItem.Content>
          <Text>{formatBalance(last24hreward)} ETH</Text>
        </ListItem>
      )}
      {!_.isNaN(lastHourHashRate) && (
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Hashrate (1h):</ListItem.Title>
          </ListItem.Content>
          <Text>{formatHashrate(lastHourHashRate)}</Text>
        </ListItem>
      )}
      {!_.isNaN(last6hrsHashRate) && (
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Hashrate (6h):</ListItem.Title>
          </ListItem.Content>
          <Text>{formatHashrate(last6hrsHashRate)}</Text>
        </ListItem>
      )}
      {!_.isNaN(roundPercent) && (
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Your Round Share</ListItem.Title>
          </ListItem.Content>
          <Text>{formatPercent(roundPercent, 4)}</Text>
        </ListItem>
      )}
      {!_.isNaN(roundVariance) && (
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Current Round Variance</ListItem.Title>
          </ListItem.Content>
          <Text>{formatPercent(roundVariance)}</Text>
        </ListItem>
      )}
      {!_.isNaN(workersOnline) && (
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Workers online</ListItem.Title>
          </ListItem.Content>
          <Text>
            {workersOnline} {workersOnline > 1 ? 'workers' : 'worker'}
          </Text>
        </ListItem>
      )}
    </Card>
  );
}

export default WalletOverview;
