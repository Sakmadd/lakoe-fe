import { Flex, Text, Box } from '@chakra-ui/react';

interface StatsCardProps {
  icon: React.ReactNode;
  text: string;
  stats: string | undefined;
  color: string;
}

export function StatsCard({ icon, text, stats, color }: StatsCardProps) {
  return (
    <>
      <Flex
        cursor="pointer"
        _hover={{ shadow: 'xl', transition: '0.5s' }}
        flexDir={'column'}
        // alignItems={'center'}
        width={'32%'}
        backgroundColor={color}
        padding={'2rem'}
        borderRadius="1rem"
        shadow="lg"
        gap="0.8rem"
      >
        <Box display="flex" alignItems="center" gap="0.5rem">
          {icon}
          <Text fontSize="0.8rem" fontWeight="semibold" fontFamily="sans-serif">
            {text}
          </Text>
        </Box>
        <Box>
          <Text fontSize="1.5rem" fontWeight="semibold" fontFamily="sans-serif">
            {stats}
          </Text>
        </Box>
      </Flex>
    </>
  );
}
