import { Flex, Spinner, Box } from '@chakra-ui/react';
import { RiShoppingBag4Line } from 'react-icons/ri';

export function LoadingPage() {
  return (
    <Flex
      alignItems={'center'}
      height={'100vh'}
      justifyContent={'center'}
      flexDir={'column'}
      gap={'1rem'}
    >
      <Box position="relative" width="100px" height="100px">
        <Spinner
          size="xl"
          borderWidth="4px"
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          css={{ '--spinner-track-color': 'colors.gray.200' }}
        />
        <RiShoppingBag4Line
          size="60%"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </Box>
    </Flex>
  );
}
