import axios from 'axios';
import { PoolData } from '@Models/services/MempoolServicesModel';
import { MEMPOOL_ENDPOINT, PERIOD } from '@Models/constants';

const getPoolDataWeekly = async (period:string = PERIOD.WEEKLY): Promise<PoolData> => {
  const response = await axios.get(`${MEMPOOL_ENDPOINT}/mining/pools/${period}`);
  return response.data;
}

const getPoolDataMonthly= async (period:string = PERIOD.MONTHLY): Promise<PoolData> => {
  const response = await axios.get(`${MEMPOOL_ENDPOINT}/mining/pools/${period}`);
  return response.data;
}

const getPoolDataQuarterly = async (period:string = PERIOD.QUARTERLY): Promise<PoolData> => {
  const response = await axios.get(`${MEMPOOL_ENDPOINT}/mining/pools/${period}`);
  return response.data;
}

const getPoolDataYearly= async (period:string = PERIOD.YEARLY): Promise<PoolData> => {
  const response = await axios.get(`${MEMPOOL_ENDPOINT}/mining/pools/${period}`);
  return response.data;
}

export default { getPoolDataWeekly };