import React from 'react';
import { View } from 'react-native';
import { Button, Card, ListItem, Text } from 'react-native-elements';
import { formatDistanceToNow } from 'date-fns';
import Icon from 'react-native-vector-icons/FontAwesome';

import type { IWalletHistoryItem } from '../hooks/useWalletHistory';

import { Container, Title } from './ui';
import RealTimeDate from './RealTimeDate';

import { formatWalletAddress } from '../helpers';

interface IWalletHistoryProps {
  history: IWalletHistoryItem[];
  onNavigateToWallet: (walletAddress: string) => void;
  onClearHistory: () => void;
  onAddWallet: () => void;
}

function WalletHistory({
  history,
  onNavigateToWallet,
  onClearHistory,
  onAddWallet,
}: IWalletHistoryProps) {
  return (
    <React.Fragment>
      <Container
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Title>Wallets</Title>

        <Button
          icon={<Icon name="plus" size={15} color="white" />}
          title="Add wallet"
          titleStyle={{ marginLeft: 5 }}
          onPress={onAddWallet}
        />
      </Container>

      {history.length === 0 && (
        <View style={{ padding: 15 }}>
          <Text>None wallets.</Text>
        </View>
      )}

      {history.length > 0 && (
        <React.Fragment>
          <Card containerStyle={{ padding: 0 }}>
            {history.map(({ walletAddress, date }) => (
              <ListItem
                bottomDivider
                key={walletAddress}
                onPress={() => onNavigateToWallet(walletAddress)}
              >
                <ListItem.Content>
                  <ListItem.Title>Wallet {formatWalletAddress(walletAddress)}</ListItem.Title>
                  <ListItem.Subtitle style={{ opacity: 0.5 }}>
                    <RealTimeDate
                      value={date}
                      formater={formatDistanceToNow}
                      interval={60 * 1000}
                    />
                  </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            ))}
          </Card>

          <Container>
            <Button type="clear" title="Clear history" onPress={onClearHistory} />
          </Container>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default WalletHistory;
