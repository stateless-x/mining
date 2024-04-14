export interface PoolData {
  pools: PoolListResponse[];
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
