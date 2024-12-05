import { Button, Flex, Spacer } from '@chakra-ui/react';
import { ContentContainer } from '../../container/contentContainer';

export function ProductSaveSection() {
  return (
    <>
      <ContentContainer>
        <Flex gap=".5rem">
          <Spacer />
          <Button variant={'outline'}>Cancel</Button>
          <Button>Save Product</Button>
        </Flex>
      </ContentContainer>
    </>
  );
}
