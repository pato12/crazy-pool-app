export function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw new Error(`Expected 'val' to be defined, but received ${val}`);
  }
}

export function formatPercent(percent: number, digits = 2) {
  return `${(percent * 100).toFixed(digits)}%`;
}

export function formatHashrate(hashrate: number) {
  let i = 0;
  const units = ['H', 'KH', 'MH', 'GH', 'TH', 'PH'];

  while (hashrate > 1000) {
    hashrate = hashrate / 1000;
    i++;
  }

  return `${hashrate.toFixed(2)} ${units[i]}`;
}

export function formatWalletAddress(walletAddress: string) {
  return `${walletAddress.substr(0, 5)}...${walletAddress.substr(-5)}`;
}

export function formatBalance(value: number) {
  return (value * 0.000000001).toFixed(8);
}

export function formatBlockHeight(height: number) {
  return height.toLocaleString();
}
