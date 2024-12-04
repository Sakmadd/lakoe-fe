import { VariantUIType } from '@/types/types';
import { Box, Flex, Spacer, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ContentContainer } from '../../container/contentContainer';
import { AddVariantDialog } from '../product-new-fields/field-add-variant-dialog';
import { VariantCheckbox } from '../product-new-fields/variant-checkbox';
import TagFieldInput from '../product-new-fields/tag-field-input';
export function ProductVariantSection() {
  const [variantList, setVariantList] = useState<VariantUIType[]>([]);

  useEffect(() => {
    console.log(variantList);
  }, [variantList]);

  return (
    <ContentContainer>
      <Flex flexDir="column" gap="1rem">
        <Flex alignItems={'center'}>
          <Box>
            <Text fontSize="1xl" fontWeight="bold">
              Product Variant
            </Text>
            <Text fontSize="1xl" color={'grey'}>
              Add variants so buyers can choose the right product, come on!
            </Text>
          </Box>
          <Spacer />
          <AddVariantDialog
            setVariantList={setVariantList}
            variantList={variantList}
          />
        </Flex>
        <Flex gap={'1rem'}>
          {variantList.map((variant) => (
            <VariantCheckbox
              setVariantList={setVariantList}
              key={variant.id}
              variantlist={variantList}
              variant={variant}
            />
          ))}
        </Flex>
        {variantList.map((variant) => {
          return variant.is_checked ? (
            <TagFieldInput label={variant.name} required />
          ) : null;
        })}
      </Flex>
    </ContentContainer>
  );
}
