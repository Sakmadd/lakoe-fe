import { Flex, Spacer } from '@chakra-ui/react';
import { ContentContainer } from '../../container/contentContainer';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface Props {
  loading: boolean;
}

export function ProductSaveSection({ loading }: Props) {
  const navigate = useNavigate();
  return (
    <>
      <ContentContainer>
        <Flex gap=".5rem">
          <Spacer />
          <Button variant={'outline'} onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            Save Product
          </Button>
        </Flex>
      </ContentContainer>
    </>
  );
}
