import React from 'react';
import { Button, Card, ListItem } from 'react-native-elements';
import { formatDistanceToNow } from 'date-fns';

import { formatWalletAddress } from '../helpers';

import type { IWalletHistoryItem } from '../hooks/useWalletHistory';
import { Container, Title } from './ui';
import RealTimeDate from './RealTimeDate';

interface IWalletHistoryProps {
  history: IWalletHistoryItem[];
  onNavigateToWallet: (walletAddress: string) => void;
  onClearHistory: () => void;
}

function WalletHistory({ history, onNavigateToWallet, onClearHistory }: IWalletHistoryProps) {
  if (history.length === 0) return null;

  return (
    <React.Fragment>
      <Container>
        <Title>Last Wallets</Title>
      </Container>

      <Card containerStyle={{ padding: 0 }}>
        {history.map(({ walletAddress, date }) => (
          <ListItem
            bottomDivider
            key={walletAddress}
            onPress={() => onNavigateToWallet(walletAddress)}
          >
            <ListItem.Content>
              <ListItem.Title>Wallet {formatWalletAddress(walletAddress)}</ListItem.Title>
              <ListItem.Subtitle>
                <RealTimeDate value={date} formater={formatDistanceToNow} interval={60 * 1000} />
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
  );
}

export default WalletHistory;
