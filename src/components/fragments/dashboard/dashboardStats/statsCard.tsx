import { Flex, Text } from '@chakra-ui/react';

interface StatsCardProps {
  icon: React.ReactNode;
  text: string;
  stats: string;
  color: string;
}

export function StatsCard({ icon, text, stats, color }: StatsCardProps) {
  return (
    <>
      <Flex
        flexDir={'column'}
        alignItems={'center'}
        width={'30%'}
        backgroundColor={color}
        padding={'2rem'}
      >
        {icon}
        <Text fontSize={'2xl'}>{text}</Text>
        <Text fontSize={'1xl'}>{stats}</Text>
      </Flex>
    </>
  );
}
