import useAsync from 'react-use/lib/useAsync';

import { getDollarArsRate } from '../services/criptoya';

export interface IRate {
  multipler: number;
  decimals: number;
  iso: string;
}

function useCurrencyRate(ethUsdRate: string | undefined, selectedRate: string) {
  const dollarArsRate = useDollarArsRate();

  let rate: IRate;

  if (
    selectedRate === 'ars' &&
    typeof dollarArsRate !== 'undefined' &&
    typeof ethUsdRate !== 'undefined'
  ) {
    rate = {
      multipler: +ethUsdRate * dollarArsRate,
      decimals: 2,
      iso: 'ARS',
    };
  } else if (selectedRate === 'usd' && typeof ethUsdRate !== 'undefined') {
    rate = {
      multipler: +ethUsdRate,
      decimals: 2,
      iso: 'USD',
    };
  } else {
    rate = {
      multipler: 1,
      decimals: 8,
      iso: 'ETH',
    };
  }

  return rate;
}

export default useCurrencyRate;

function useDollarArsRate() {
  const { value, loading, error } = useAsync(() => getDollarArsRate(), []);

  return loading || error ? undefined : value;
}
