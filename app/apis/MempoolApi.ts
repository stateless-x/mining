import axios from 'axios';
import { PoolData } from '@Models/services/MempoolServicesModel';

const getPoolData = async (): Promise<PoolData> => {
  const response = await axios.get('https://mempool.space/api/v1/mining/pools/1d');
  return response.data;
}

export default { getPoolData };