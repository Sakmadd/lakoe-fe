import { Box, Spinner, Text } from '@chakra-ui/react';

export default function StatsCard({
  amount,
  title,
  isFetching,
}: {
  amount: string | undefined;
  title: string;
  isFetching: boolean;
}) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="0.4rem"
      border="1px solid #e6e6e6"
      padding="1rem"
      width="50%"
      borderRadius="1rem"
      justifyContent="center"
      alignItems="center"
    >
      {isFetching && (
        <Box
          height="3.3rem"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner />
        </Box>
      )}
      {!isFetching && (
        <>
          <Text
            as="h1"
            fontWeight="medium"
            fontFamily="sans-serif"
            color="black"
            fontSize="0.8rem"
          >
            {title}
          </Text>
          <Text
            as="h1"
            fontWeight="semibold"
            fontFamily="sans-serif"
            fontSize="1.1rem"
          >
            {amount}
          </Text>
        </>
      )}
    </Box>
  );
}
