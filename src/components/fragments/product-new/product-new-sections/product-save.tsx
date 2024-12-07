import { Button, Flex, Spacer } from '@chakra-ui/react';
import { ContentContainer } from '../../container/contentContainer';
import { useNavigate } from 'react-router-dom';
import { UseFormHandleSubmit } from 'react-hook-form';
import {
  VariantCombinationFormType,
  VariantOptionCombinationType,
} from '@/types/types';

interface Props {
  variantsHandleSubmit: UseFormHandleSubmit<
    VariantCombinationFormType,
    undefined
  >;
  setVariantOptionCombinations: React.Dispatch<
    React.SetStateAction<VariantOptionCombinationType[]>
  >;
}

export function ProductSaveSection({
  variantsHandleSubmit,
  setVariantOptionCombinations,
}: Props) {
  const navigate = useNavigate();
  return (
    <>
      <ContentContainer>
        <Flex gap=".5rem">
          <Spacer />
          <Button variant={'outline'} onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={variantsHandleSubmit((data) => {
              setVariantOptionCombinations(data.variants);
            })}
          >
            Save Product
          </Button>
        </Flex>
      </ContentContainer>
    </>
  );
}
