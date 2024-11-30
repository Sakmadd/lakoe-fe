import { Box } from '@chakra-ui/react';

interface Props {
  children: React.ReactNode;
}

export function ContentContainer({ children }: Props) {
  return (
    <>
      <Box
        borderRadius={'10px'}
        padding={'1rem'}
        width={'100%'}
        backgroundColor={'rgba(255, 255, 255, 1)'}
        borderColor={'rgba(230, 230, 230, 1)'}
        borderWidth={'1px'}
      >
        {children}
      </Box>
    </>
  );
}
