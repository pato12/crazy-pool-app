import _ from 'lodash';
import { useCallback } from 'react';
import useAsync from 'react-use/lib/useAsync';

import * as localStorage from '../services/local-storage';
import useUpdate from './useUpdate';

const WALLET_HISTORY_KEY = 'wallet_history';

export interface IWalletHistoryItem {
  walletAddress: string;
  date: number;
}

function useWalletHistory() {
  const { dep, forceUpdate } = useUpdate();

  const { value, loading, error } = useAsync(async () => {
    const data = await localStorage.getItem<IWalletHistoryItem[]>(WALLET_HISTORY_KEY);

    return _.sortBy(data, 'date').reverse();
  }, [dep]);

  const saveWalletAddress = useCallback(async (walletAddress: string) => {
    const currentData =
      (await localStorage.getItem<IWalletHistoryItem[]>(WALLET_HISTORY_KEY)) ?? [];

    const index = _.findIndex(currentData, w => w.walletAddress === walletAddress);

    if (index !== -1) {
      currentData[index] = { ...currentData[index], date: Date.now() };
    } else {
      currentData.push({ walletAddress, date: Date.now() });
    }

    await localStorage.storeItem(WALLET_HISTORY_KEY, [...currentData]);

    forceUpdate();
  }, []);

  return {
    history: value ?? [],
    isLoading: loading,
    isError: !!error,
    saveWalletAddress,
  };
}

export default useWalletHistory;
