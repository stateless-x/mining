'use client';
import MempoolService from "@Services/MempoolService";
import { useEffect, useState } from "react";
import useStore from "@Hooks/useStore";

const PoolList = () => {
const { data, setWeeklyTop } = useStore();

useEffect(() => {
  const fetchTopTenPools = async () => {
    const topTen = await MempoolService.getTopTenPools();
    topTen && setWeeklyTop(topTen);
  };
  data === null && fetchTopTenPools();
}, [data, setWeeklyTop]);

  return (
    <div>
      <h1>Pool List</h1>
      {data ?  (
        data.map((pool, index) => (
          <div key={index}>
            <p>rank:{pool.rank}</p>
            <h2>{pool.name}</h2>
            <p>Link: <a href={pool.link}>{pool.link}</a></p>
            <p>Block Count: {pool.blockCount}</p>
            <hr />
          </div>
       ))
      ) : ( <p>Loading...</p>)}
    </div>
  );
};
export default PoolList;