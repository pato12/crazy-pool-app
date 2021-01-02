import React from 'react';
import { Card, ListItem } from 'react-native-elements';
import { formatDistanceToNow } from 'date-fns';

import { formatWalletAddress } from '../helpers';

import type { IWalletHistoryItem } from '../hooks/useWalletHistory';

interface IWalletHistoryProps {
  history: IWalletHistoryItem[];
  onNavigateToWallet: (walletAddress: string) => void;
}

function WalletHistory({ history, onNavigateToWallet }: IWalletHistoryProps) {
  if (history.length === 0) return null;

  return (
    <Card containerStyle={{ padding: 0 }}>
      <Card.Title style={{ paddingTop: 15, paddingLeft: 10, paddingRight: 15 }}>
        Last Wallets
      </Card.Title>

      {history.map(({ walletAddress, date }) => (
        <ListItem
          bottomDivider
          key={walletAddress}
          onPress={() => onNavigateToWallet(walletAddress)}
        >
          <ListItem.Content>
            <ListItem.Title>Wallet {formatWalletAddress(walletAddress)}</ListItem.Title>
            <ListItem.Subtitle>{formatDistanceToNow(date)}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      ))}
    </Card>
  );
}

export default WalletHistory;
