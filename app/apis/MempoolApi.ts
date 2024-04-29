import axios from 'axios';
import { PoolData } from '@Models/services/MempoolServicesModel';
import { MEMPOOL_ENDPOINT, PERIOD } from '@Models/constants';

const getPoolData = async (period:string = PERIOD.WEEKLY): Promise<PoolData> => {
  const response = await axios.get(`${MEMPOOL_ENDPOINT}/mining/pools/${period}`);
  return response.data;
}

export default { getPoolData };