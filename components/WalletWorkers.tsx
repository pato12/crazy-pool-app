import React from 'react';
import { Card, ListItem, Text } from 'react-native-elements';
import { View } from 'react-native';
import { formatDistanceToNow } from 'date-fns';

import type { IWalletStatsData } from '../hooks/useWalletStats';

import { formatHashrate } from '../helpers';
import { Container, Title } from './ui';
import RealTimeDate from './RealTimeDate';

interface IWalletWorkersProps {
  workers: IWalletStatsData['workers'];
}

function WalletWorkers(props: IWalletWorkersProps) {
  return (
    <View>
      {props.workers.map(worker => (
        <WorkerItem
          key={worker.name}
          name={worker.name}
          lastBeat={worker.lastBeat}
          hr={worker.hr}
          offline={worker.offline}
          hr2={worker.hr2}
          hostname={worker.hostname}
        />
      ))}
    </View>
  );
}

export default WalletWorkers;

interface IWorkerItemProps {
  name: string;
  lastBeat: number;
  hr: number;
  offline: boolean;
  hr2: number;
  hostname: string;
}

function WorkerItem(props: IWorkerItemProps) {
  return (
    <View>
      <Container>
        <Title>Worker: {props.name}</Title>
      </Container>

      <Card containerStyle={{ padding: 0 }}>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Current Hashrate:</ListItem.Title>
          </ListItem.Content>
          <Text>{formatHashrate(props.hr)}</Text>
        </ListItem>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Hashrate Average:</ListItem.Title>
          </ListItem.Content>
          <Text>{formatHashrate(props.hr2)}</Text>
        </ListItem>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Status:</ListItem.Title>
          </ListItem.Content>
          <Text>{props.offline ? 'Offline' : 'Online'}</Text>
        </ListItem>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Server:</ListItem.Title>
          </ListItem.Content>
          <Text>{props.hostname}</Text>
        </ListItem>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Last Share:</ListItem.Title>
          </ListItem.Content>
          <Text>
            <RealTimeDate value={props.lastBeat * 1000} formater={formatDate} interval={5 * 1000} />
          </Text>
        </ListItem>
      </Card>
    </View>
  );
}

function formatDate(value: number) {
  return formatDistanceToNow(value, { includeSeconds: true });
}
