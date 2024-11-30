import { Box, Card, Image, Text } from '@chakra-ui/react';

export function ProductCard() {
  return (
    <>
      <Card.Root
        maxW="sm"
        overflow="hidden"
        width={'190px'}
        height={'250px'}
        cursor={'pointer'}
        boxShadow={'sm'}
        _hover={{
          boxShadow: 'md',
          transform: 'translateY(-2px)',
        }}
        transition={'transform .1s ease-in-out'}
      >
        <Box height={'70%'} width={'100%'}>
          <Image
            objectFit={'cover'}
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            alt="Green double couch with wooden legs"
            width={'100%'}
            height={'100%'}
          />
        </Box>
        <Card.Body gap="1" padding={'1rem'}>
          <Card.Title
            textStyle="sm"
            fontWeight={'normal'}
            letterSpacing={'wide'}
          >
            LIVING ROOM SOFA
          </Card.Title>
          <Text
            textStyle="1xl"
            fontWeight="medium"
            letterSpacing="tight"
            mt="2"
          >
            Rp. 1.000.000
          </Text>
        </Card.Body>
      </Card.Root>
    </>
  );
}
