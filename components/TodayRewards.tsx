import React, { useMemo } from 'react';
import { Card, ListItem, Text } from 'react-native-elements';
import { startOfDay, subDays } from 'date-fns';

import type { IWalletStatsData } from '../hooks/useWalletStats';
import type { IRate } from '../hooks/useCurrencyRate';

import { formatBalance } from '../helpers';

interface ITodayRewardsProps {
  data: IWalletStatsData;
  rate: IRate;
}

function TodayRewards({ data, rate }: ITodayRewardsProps) {
  const { today: totalToday, yesterday: totalYesterday } = useMemo(() => {
    const todayStartDay = startOfDay(Date.now()).getTime();
    const yesterdayStartDay = startOfDay(subDays(Date.now(), 1)).getTime();

    return data.rewards.reduce(
      (totals, reward) => {
        const rewardTime = reward.timestamp * 1000;

        if (rewardTime >= todayStartDay) {
          totals.today += reward.reward;
        } else if (rewardTime >= yesterdayStartDay && rewardTime < todayStartDay) {
          totals.yesterday += reward.reward;
        }

        return totals;
      },
      { today: 0, yesterday: 0 },
    );
  }, [data]);

  return (
    <React.Fragment>
      <Card containerStyle={{ padding: 0, marginBottom: 15 }}>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Today</ListItem.Title>
          </ListItem.Content>
          <Text>
            {formatBalance(totalToday * rate.multipler, rate.decimals)} {rate.iso}
          </Text>
        </ListItem>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Yesterday</ListItem.Title>
          </ListItem.Content>
          <Text>
            {formatBalance(totalYesterday * rate.multipler, rate.decimals)} {rate.iso}
          </Text>
        </ListItem>
      </Card>
    </React.Fragment>
  );
}

export default TodayRewards;
