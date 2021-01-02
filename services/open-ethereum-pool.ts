import { PoolStatsData, WalletAccountData } from './types';
import axios from 'axios';

const API_URL = 'https://eth.crazypool.org/api/';

export async function getAccount(walletAddress: string): Promise<WalletAccountData> {
  const data = await axios.get<WalletAccountData>(`${API_URL}/accounts/${walletAddress}`);

  return data.data;
}

export async function getPoolStats(): Promise<PoolStatsData> {
  const data = await axios.get<PoolStatsData>(`${API_URL}/stats`);

  return data.data;
}
