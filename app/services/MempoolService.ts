import { PoolData, PoolListResponse } from "@Models/services/MempoolServicesModel";
import MempoolApi from "@API/MempoolApi";

const getPoolData = async (timeframe: string): Promise<PoolData> => {
  const response: PoolData = await MempoolApi.getPoolData(timeframe);
  return response;
};

const getTopTenPools = async (timeframe: string): Promise<PoolListResponse[]|null> => {
  try {
    const result = await getPoolData(timeframe);
    const topTen = result.pools
      .sort((a, b) => a.rank - b.rank)
      .slice(0, 10);
    return topTen;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default {getPoolData, getTopTenPools};