import { PoolData, PoolListResponse } from "@Models/services/MempoolServicesModel";
import MempoolApi from "@API/MempoolApi";

const getWeeklyData = async (): Promise<PoolData> => {
  const response: PoolData = await MempoolApi.getPoolDataWeekly();
  return response;
};

const getTopTenPools = async (): Promise<PoolListResponse[]|null> => {
  try {
    const result = await getWeeklyData();
    const topTen = result.pools
      .sort((a, b) => a.rank - b.rank)
      .slice(0, 10);
    return topTen;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default {getWeeklyData, getTopTenPools};