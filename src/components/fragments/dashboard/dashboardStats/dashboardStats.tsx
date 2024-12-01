import { FaMoneyBill1Wave } from 'react-icons/fa6';
import { StatsCard } from './statsCard';
import { FiPackage } from 'react-icons/fi';
import { Flex } from '@chakra-ui/react';

export function DashboardStats() {
  return (
    <>
      <Flex width={'100%'} gap={'1rem'} justifyContent={'center'}>
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
      </Flex>
    </>
  );
}
