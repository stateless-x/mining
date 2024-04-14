'use client';
import MempoolService from "@Services/MempoolService";
import { useEffect, useState } from "react";
import { PoolData } from "@Models/services/MempoolServicesModel";

const PoolList = () => {
const [data, setData] = useState<PoolData|null>(null);

  const handleFetch = async () => {
    try {
      const result = await MempoolService.getData();
      setData(result);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div>
      <h1>Pool List</h1>
      {data && data.pools.map((pool, index) => (
        <div key={index}>
          <h2>{pool.name}</h2>
          <p>Link: <a href={pool.link}>{pool.link}</a></p>
          <p>Block Count: {pool.blockCount}</p>
        </div>
      ))}
    </div>
  );
};
export default PoolList;