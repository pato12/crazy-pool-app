/* eslint-disable camelcase */
interface Exchangedata {
  btc: string;
  color_change_percentage: string;
  eth: string;
  market_cap: string;
  market_cap_rank: string;
  price_change_percentage_24h: string;
  symbol: string;
  total_volume: string;
  usdt: string;
}

interface MinerChart {
  x: number;
  timeFormat: string;
  minerHash: number;
  minerLargeHash: number;
  workerOnline: string;
}

interface Reward {
  blockheight: number;
  timestamp: number;
  blockhash: string;
  reward: number;
  percent: number;
  immature: boolean;
}

interface Shift {
  amount: number;
  hashes: number;
  lastShift: number;
  stales: number;
  timestamp: number;
}

interface ShiftsToday {
  amount: number;
  hashes: any;
  lastShift: number;
  stales: number;
  timestamp: number;
}

interface Stats {
  balance: number;
  hashesCurrent: number;
  hashesShort: number;
  hopper: number;
  immature: number;
  ip: string;
  lastShare: number;
  minedCurrent: number;
  minedShort: number;
  stalesCurrent: number;
  stalesShort: number;
}

interface Sumreward {
  inverval: number;
  reward: number;
  name: string;
  offset: number;
}

interface Worker {
  lastBeat: number;
  hr: number;
  offline: boolean;
  hr2: number;
  difficulty: number;
  hostname: string;
}

export interface WalletAccountData {
  '24hreward': number;
  bonus: number;
  currentHashrate: number;
  exchangedata: Exchangedata;
  hashrate: number;
  minerCharts: MinerChart[];
  pageSize: number;
  paymentCharts?: any;
  paymentDaily?: any;
  payments?: any;
  paymentsTotal: number;
  refList?: any;
  rewards: Reward[];
  risk: number;
  roundShares: number;
  shifts: Shift[];
  shiftsToday: ShiftsToday[];
  stales: any;
  stats: Stats;
  sumrewards: Sumreward[];
  workers: Record<string, Worker>;
  workersOffline: number;
  workersOnline: number;
  workersTotal: number;
}

export interface PoolStatsData {
  blockReward: string;
  candidatesTotal: number;
  exchangedata: Exchangedata;
  hashrate: number;
  immatureTotal: number;
  maturedTotal: number;
  minersTotal: number;
  nodes: {
    difficulty: string;
    height: string;
    lastBeat: string;
    name: string;
  }[];
  now: number;
  stats: {
    lastBlockFound: number;
    nShares: number;
    roundShares: number;
  };
}

export interface CriptoYaData {
  oficial: number;
  solidario: number;
  mep: number;
  ccl: number;
  ccb: number;
  blue: number;
  time: number;
}
