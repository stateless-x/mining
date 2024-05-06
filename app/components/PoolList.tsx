'use client';
import MempoolService from "@Services/MempoolService";
import { useState, useEffect } from "react";
import { useDailyStore, useWeeklyStore, useMonthlyStore, useYearlyStore} from "@Hooks/useStore";
import { Table, Anchor, Box, LoadingOverlay, Select } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { PERIOD } from '@Models/constants';
import { PoolListResponse } from "@Models/services/MempoolServicesModel";

const PoolList = () => {
  // type TimeframeKey = "Daily" | "Weekly" | "Monthly" | "Yearly";
  type TimeframeKey = keyof typeof timeframeOptions;
  const { data:dailyData, setDailyTop } = useDailyStore();
  const { data:weeklyData , setWeeklyTop } = useWeeklyStore();
  const { data:monthlyData, setMonthlyTop } = useMonthlyStore();
  const { data:yearlyData, setYearlyTop } = useYearlyStore();

  const [visible, handler] = useDisclosure(true);
  const [timeframe, setTimeframe] = useState<TimeframeKey>("Weekly")
  const [currentData, setCurrentData] = useState<PoolListResponse[] | null>();

  const timeframeOptions = {
    "Daily": PERIOD.DAILY,
    "Weekly": PERIOD.WEEKLY,
    "Monthly": PERIOD.MONTHLY,
    "Yearly": PERIOD.YEARLY,
  };

  useEffect(() => {
    fetchTopTenPools(timeframe);
  }, [timeframe, dailyData, weeklyData, monthlyData, yearlyData]);

  const fetchTopTenPools = async (selectedTimeframe: TimeframeKey) => {
    // show curent data based on selected time frame
    let dataNeeded = true;
    switch(selectedTimeframe) {
      case "Daily":
        if (dailyData) {
          setCurrentData(dailyData);
          dataNeeded = false;
        }
        break;
      case "Weekly":
        if (weeklyData) {
          setCurrentData(weeklyData);
          dataNeeded = false;
        }
        break;
      case "Monthly":
        if (monthlyData) {
          setCurrentData(monthlyData);
          dataNeeded = false;
        }
        break;
      case "Yearly":
        if (yearlyData) {
          setCurrentData(yearlyData);
          dataNeeded = false;
        }
        break;
    }

    // fetch data only when necessary
    if (dataNeeded) {
      handler.open();
      const topTen = await MempoolService.getTopTenPools(timeframeOptions[selectedTimeframe]);
      switch(selectedTimeframe) {
        case "Daily":
          setDailyTop(topTen);
          break;
        case "Weekly":
          setWeeklyTop(topTen);
          break;
        case "Monthly":
          setMonthlyTop(topTen);
          break;
        case "Yearly":
          setYearlyTop(topTen);
          break;
        default:
          null;
      }
      handler.close();
    }
  };
 
  return (
    <>
      <div className="sm:mx-auto block min-w-[375px] sm:w-5/6 w-full px-4 sm:px-0">
        <h1 className="font-bold text-2xl 
        py-2
        sm:text-4xl sm:pt-8 sm:pb-4">
          Bitcoin Pools Ranking
        </h1>
        <div className="flex justify-end my-4">
          <Select 
          // defaultValue="Weekly"
          value={timeframe}
          data={Object.keys(timeframeOptions).map(key => ({ value: key, label: key }))}
          onChange={(_value, option) => {
            if (_value !== null) {
              fetchTopTenPools(_value as TimeframeKey);
              setTimeframe(_value as TimeframeKey);
            }
          }}
          className="
          w-full
          sm:w-1/6"
          />
        </div>
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
              { currentData ? (
                currentData && currentData.map((pool, index) => (
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