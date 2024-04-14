import { PoolData } from "@Models/services/MempoolServicesModel";
import MempoolApi from "@API/MempoolApi";

export const getData = async (): Promise<PoolData> => {
  const response: PoolData = await MempoolApi.getPoolData();
  return response;
};

export default { getData };