import { FaMoneyBill1Wave } from 'react-icons/fa6';
import { StatsCard } from './stats-card';
import { FiPackage } from 'react-icons/fi';
// import { Flex } from '@chakra-ui/react';
import { Box, Text, Tabs } from '@chakra-ui/react';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { useState } from 'react';
import { Data } from '@/dummy-data/dummyChartData';
import DashboardChart from './dashboard-chart';
import { ContentContainer } from '../../../fragments/container/contentContainer';

Chart.register(CategoryScale);

export function DashboardStats() {
  const [chartData] = useState(Data);

  return (
    <>
      <Box display="flex" flexDirection="column" gap="1rem">
        <Tabs.Root defaultValue="stats">
          <ContentContainer>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text fontWeight="semibold" fontFamily="sans-serif" as="h1">
                Dashboard
              </Text>
              <Box display="flex">
                <Tabs.List>
                  <Tabs.Trigger value="stats">Stats</Tabs.Trigger>
                </Tabs.List>
                <Tabs.List>
                  <Tabs.Trigger value="">Withdraw</Tabs.Trigger>
                </Tabs.List>
              </Box>
            </Box>
          </ContentContainer>
          <Tabs.Content
            value="stats"
            display="flex"
            flexDirection="column"
            gap="1rem"
          >
            <ContentContainer>
              <Box
                display="flex"
                justifyContent="space-between"
                marginTop="1rem"
              >
                <StatsCard
                  color="white"
                  icon={<FiPackage />}
                  text="Total Product Sold"
                  stats="546"
                />
                <StatsCard
                  color="white"
                  icon={<FiPackage />}
                  text="Unproccessed Order"
                  stats="233"
                />
                <StatsCard
                  color="white"
                  icon={<FaMoneyBill1Wave />}
                  text="Balance"
                  stats="Rp. 5.456.000"
                />
              </Box>
            </ContentContainer>
            <ContentContainer>
              <DashboardChart chartData={chartData} />
            </ContentContainer>
          </Tabs.Content>
        </Tabs.Root>
      </Box>
      {/* <Flex width={'100%'} gap={'1rem'} justifyContent={'center'}>
        <StatsCard
          color={'purple.100'}
          icon={<FaMoneyBill1Wave />}
          text="Balance"
          stats="Rp. 1.000.000"
        />
        <StatsCard
          color={'orange.100'}
          icon={<FiPackage />}
          text="Order"
          stats="233"
        />
        <StatsCard
          color={'blue.100'}
          icon={<FaMoneyBill1Wave />}
          text="Balance"
          stats="Rp. 1.000.000"
        />
      </Flex> */}
    </>
  );
}
