import { Box, Text } from '@chakra-ui/react';
import { HStack } from '@chakra-ui/react';
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';

const wd = [
  {
    id: 1,
    name: 'Orang1',
    email: 'orang@ganteng.com',
    date: '00-00-0000',
    amount: 10000,
  },
  {
    id: 2,
    name: 'Orang2',
    email: 'orang@ganteng.com',
    date: '00-00-0000',
    amount: 10000,
  },
  {
    id: 3,
    name: 'Orang3',
    email: 'orang@ganteng.com',
    date: '00-00-0000',
    amount: 10000,
  },
  {
    id: 4,
    name: 'Orang4',
    email: 'orang@ganteng.com',
    date: '00-00-0000',
    amount: 10000,
  },
  {
    id: 5,
    name: 'Orang5',
    email: 'orang@ganteng.com',
    date: '00-00-0000',
    amount: 10000,
  },
];

export default function AdminContent() {
  return (
    <Box display="flex" flexDirection="column" gap="1.5rem">
      <Text
        fontSize="1.2rem"
        fontWeight="semibold"
        as="h1"
        fontFamily="sans-serif"
      >
        Seller Request
      </Text>
      <Box
        display="flex"
        flexDirection="column"
        gap="1rem"
        border="1px solid #e6e6e6"
        borderRadius="1rem"
        padding="1rem"
        shadow="lg"
      >
        {wd.map((data) => (
          <Box
            display="flex"
            alignItems="center"
            borderRadius="1rem"
            gap="1rem"
            border="1px solid #e6e6e6"
            justifyContent="space-around"
            padding="0.8rem"
            fontSize="0.9rem"
          >
            <Text fontFamily="sans-serif" fontWeight="semibold">
              {data.name}
            </Text>
            <Text fontFamily="sans-serif" fontWeight="semibold">
              {data.email}
            </Text>
            <Text fontFamily="sans-serif">{data.date}</Text>
            <Text fontFamily="sans-serif" fontWeight="semibold">
              Rp. {data.amount}
            </Text>
            <Box display="flex" gap="1rem">
              <Button
                backgroundColor="transparent"
                color="black"
                border="1px solid gray"
                borderRadius="2rem"
                height="2rem"
                fontSize="0.8rem"
                type="submit"
              >
                Accept
              </Button>
              <Button
                backgroundColor="transparent"
                color="black"
                border="1px solid gray"
                borderRadius="2rem"
                height="2rem"
                fontSize="0.8rem"
                type="submit"
              >
                Decline
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
      <Box display="flex" justifyContent="center">
        <PaginationRoot count={wd.length * 5} pageSize={5} page={1}>
          <HStack wrap="wrap">
            <PaginationPrevTrigger />
            <PaginationItems />
            <PaginationNextTrigger />
          </HStack>
        </PaginationRoot>
      </Box>
    </Box>
  );
}
