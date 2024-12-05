import { Button, Flex, Spacer } from '@chakra-ui/react';
import { ContentContainer } from '../../container/contentContainer';
import { useNavigate } from 'react-router-dom';

export function ProductSaveSection() {
  const navigate = useNavigate();
  return (
    <>
      <ContentContainer>
        <Flex gap=".5rem">
          <Spacer />
          <Button variant={'outline'} onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit">Save Product</Button>
        </Flex>
      </ContentContainer>
    </>
  );
}
