'use client';
import MempoolService from "@Services/MempoolService";
import { useEffect, useState } from "react";
import { PoolData, PoolListResponse } from "@Models/services/MempoolServicesModel";

const PoolList = () => {
const [data, setData] = useState<PoolListResponse[] | null>(null);

  useEffect(() => {
    const fetchTopTenPools = async () => {
      const topTen = await MempoolService.getTopTenPools();
      setData(topTen);
    };
    
    fetchTopTenPools();
  }, []);
  return (
    <div>
      <h1>Pool List</h1>
      {/* <h1>{data && data.blockCount}</h1> */}
      {data && data.map((pool, index) => (
        <div key={index}>
          <p>rank:{pool.rank}</p>
          <h2>{pool.name}</h2>
          <p>Link: <a href={pool.link}>{pool.link}</a></p>
          <p>Block Count: {pool.blockCount}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};
export default PoolList;