export interface PoolData {
  pools: PoolListResponse[];
  blockCount: number;
  lastEstimatedHashrate: number;
}

export interface PoolListResponse {
  poolId: number;
  name: string;
  link: string;
  blockCount: number;
  rank: number;
  emptyBlocks: number;
  slug: string;
  avgMatchRate: number;
  avgFeeDelta: string;
  poolUniqueId: number;
}
