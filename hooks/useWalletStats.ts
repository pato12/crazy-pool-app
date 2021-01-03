import { useEffect, useState } from 'react';
import useAsync from 'react-use/lib/useAsync';
import useUpdateEffect from 'react-use/lib/useUpdateEffect';

import { getAccount, getPoolStats } from '../services/open-ethereum-pool';
import type { PoolStatsData, WalletAccountData } from '../services/types';

import useUpdate from './useUpdate';

export type IWalletStatsData = ReturnType<typeof parseData>;

function useWalletStats(walletAddress: string) {
  const { dep, forceUpdate } = useUpdate();
  const [lastUpdate, setLastUpdate] = useState(-1);

  const account = useAsync(() => getAccount(walletAddress), [walletAddress, dep]);
  const pool = useAsync(() => getPoolStats(), [dep]);

  const data: IWalletStatsData | undefined =
    account.value && pool.value ? parseData(account.value, pool.value) : undefined;

  const isLoading = !data && (account.loading || pool.loading);
  const isError = !data && (!!account.error || !!pool.error);

  useUpdateEffect(() => setLastUpdate(Date.now()), [account.value, pool.value]);

  useEffect(() => {
    const interval = setInterval(() => forceUpdate(), 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return {
    data,
    isLoading,
    isError,
    lastUpdate,
  };
}

export default useWalletStats;

function parseData(walletStats: WalletAccountData, poolStats: PoolStatsData) {
  const bestNode = getBestNode(poolStats.nodes);
  const difficulty = bestNode?.difficulty ? parseInt(bestNode?.difficulty) : 0;
  const roundVariance = poolStats.stats.roundShares / difficulty;

  const roundPercent = walletStats.roundShares / poolStats.stats.nShares;

  const lastHourHashRate = walletStats.currentHashrate;
  const last6hrsHashRate = walletStats.hashrate;

  const immatureBalance = walletStats.stats.immature;
  const pendingBalance = walletStats.stats.balance;
  const last24hreward = walletStats['24hreward'];

  const workersOnline = walletStats.workersOnline;

  const workers = parseWorkers(walletStats.workers);

  return {
    roundPercent,
    roundVariance,
    lastHourHashRate,
    last6hrsHashRate,
    immatureBalance,
    pendingBalance,
    last24hreward,
    workersOnline,
    workers,
    sumrewards: walletStats.sumrewards,
    exchangedata: walletStats.exchangedata,
    minerCharts: walletStats.minerCharts,
    rewards: walletStats.rewards.slice(0, 10),
  };
}

interface IWorkerStat {
  name: string;
  lastBeat: number;
  hr: number;
  offline: boolean;
  hr2: number;
  difficulty: number;
  hostname: string;
}

function parseWorkers(workers: WalletAccountData['workers']): IWorkerStat[] {
  const result: IWorkerStat[] = [];

  for (const name of Object.keys(workers)) {
    result.push({
      name,
      difficulty: workers[name].difficulty,
      hostname: workers[name].hostname,
      hr: workers[name].hr,
      hr2: workers[name].hr2,
      lastBeat: workers[name].lastBeat,
      offline: workers[name].offline,
    });
  }

  return result;
}

function getBestNode(nodes: PoolStatsData['nodes']) {
  let node: PoolStatsData['nodes'][number] | null = null;

  for (const n of nodes) {
    if (!node) {
      node = n;
    }
    if (node.height < n.height) {
      node = n;
    }
  }

  return node;
}
