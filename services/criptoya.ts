import { CriptoYaData } from './types';
import axios from 'axios';
import _ from 'lodash';

const API_URL = 'https://criptoya.com/api/dolar';

export async function getDollarArsRate(): Promise<number> {
  const { data } = await axios.get<CriptoYaData>(API_URL);

  return _.mean([data.blue, data.ccb, data.ccl, data.mep]);
}
