import { Button, Flex, Heading } from '@chakra-ui/react';
import { FaStoreSlash } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

export function UnSetShopPage() {
  const navigate = useNavigate();
  return (
    <>
      <Flex
        justifyContent={'center'}
        flexDir={'column'}
        width={'100%'}
        alignItems={'center'}
        height={'65vh'}
        color={'gray'}
        gap={'1rem'}
      >
        <FaStoreSlash size={'100px'} color="gray" />
        <Heading fontSize={'3rem'}>Oops!</Heading>
        <Heading>You haven't setup your shop yet</Heading>
        <Button
          variant={'surface'}
          color={'gray'}
          onClick={() => navigate('/settings/shop')}
        >
          Lets filled it!
        </Button>
      </Flex>
    </>
  );
}
