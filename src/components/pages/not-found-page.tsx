import { MainContent } from '@/layouts/mainContent';
import { Button, Flex, Heading } from '@chakra-ui/react';
import { MdBrokenImage } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <>
      <MainContent>
        <Flex
          justifyContent={'center'}
          flexDir={'column'}
          width={'100%'}
          alignItems={'center'}
          height={'65vh'}
          color={'gray'}
          gap={'1rem'}
        >
          <MdBrokenImage size={'100px'} color="gray" />
          <Heading fontSize={'3rem'}>Oops!</Heading>
          <Heading>We dont find that page</Heading>
          <Button
            variant={'surface'}
            color={'gray'}
            onClick={() => navigate('/')}
          >
            Back To Home!
          </Button>
        </Flex>
      </MainContent>
    </>
  );
}
