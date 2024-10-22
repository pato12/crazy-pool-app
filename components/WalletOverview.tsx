import _ from 'lodash';
import React from 'react';
import { Card, ListItem, Text } from 'react-native-elements';

import type { IWalletStatsData } from '../hooks/useWalletStats';
import type { IRate } from '../hooks/useCurrencyRate';

import { formatBalance, formatHashrate, formatPercent } from '../helpers';

import TodayRewards from './TodayRewards';

interface IWalletOverviewProps {
  data: IWalletStatsData;
  rate: IRate;
}

function WalletOverview({ data, rate }: IWalletOverviewProps) {
  const {
    roundPercent,
    roundVariance,
    lastHourHashRate,
    last6hrsHashRate,
    immatureBalance,
    pendingBalance,
    last24hreward,
    workersOnline,
  } = data;

  return (
    <React.Fragment>
      <TodayRewards data={data} rate={rate} />

      <Card containerStyle={{ padding: 0 }}>
        {!_.isNaN(immatureBalance) && (
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>Immature Balance:</ListItem.Title>
            </ListItem.Content>
            <Text>
              {formatBalance(immatureBalance * rate.multipler, rate.decimals)} {rate.iso}
            </Text>
          </ListItem>
        )}
        {!_.isNaN(pendingBalance) && (
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>Pending Balance:</ListItem.Title>
            </ListItem.Content>
            <Text>
              {formatBalance(pendingBalance * rate.multipler, rate.decimals)} {rate.iso}
            </Text>
          </ListItem>
        )}
        {!_.isNaN(last24hreward) && (
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>Last 24h Reward:</ListItem.Title>
            </ListItem.Content>
            <Text>
              {formatBalance(last24hreward * rate.multipler, rate.decimals)} {rate.iso}
            </Text>
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
    </React.Fragment>
  );
}

export default WalletOverview;
