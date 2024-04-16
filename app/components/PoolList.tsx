'use client';
import MempoolService from "@Services/MempoolService";
import { useEffect } from "react";
import useStore from "@Hooks/useStore";
import { Table, Anchor, Box, LoadingOverlay } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

const PoolList = () => {
  const { data, setWeeklyTop } = useStore();
  const [visible, handler] = useDisclosure(true);

  useEffect(() => {
    const fetchTopTenPools = async () => {
      const topTen = await MempoolService.getTopTenPools();
      if (topTen) {
        setWeeklyTop(topTen);
      }
    };
    if (data === null) {
      handler.toggle(); //toggle loading overlay
      fetchTopTenPools();
    }

  }, [data, setWeeklyTop]);

  return (
    <>
      <div className="sm:mx-auto block min-w-[375px] w-5/6 px-4 sm:px-none">
        <h1 className="font-bold text-2xl 
        py-2
        sm:text-4xl sm:pt-8 sm:pb-4">
          Bitcoin Pools Ranking
        </h1>
        <h3 className="pb-2 font-semibold sm:pb-4">Timeframe: 1 Week</h3>
        <Box pos="relative" className="sm:border sm:border-[#c9c9c9] min-w-full">
          <Table withRowBorders={false}>
            <Table.Thead>
              <Table.Tr className="sm:text-lg">
                <Table.Th>#</Table.Th>
                <Table.Th>Pools</Table.Th>
                <Table.Th>Blocks Mined</Table.Th>
                <Table.Th>Link</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody className="text-base">
              {data ? (
                data.map((pool, index) => (
                  <Table.Tr key={index}>
                    <Table.Td>{pool.rank}</Table.Td>
                    <Table.Td>{pool.name}</Table.Td>
                    <Table.Td>{pool.blockCount}</Table.Td>
                    <Table.Td><Anchor href={pool.link}>Visit</Anchor></Table.Td>
                  </Table.Tr>
                ))
              ) : (
                <Table.Tr>
                  <Table.Td colSpan={4}>
                    <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                  </Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </Box>
      </div>
    </>
  );
};
export default PoolList;