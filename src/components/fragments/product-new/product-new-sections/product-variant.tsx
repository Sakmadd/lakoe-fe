import { VariantUIType } from '@/types/types';
import { Box, Button, Flex, Spacer, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { ContentContainer } from '../../container/contentContainer';
import { AddVariantDialog } from '../product-new-fields/field-add-variant-dialog';
import { VariantCheckbox } from '../product-new-fields/variant-checkbox';
import { ProductVariantItem } from './product-variant-item';

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
        {variantList.some((variant) => variant.is_checked) && (
          <Flex flexDir="column" gap="1rem">
            <Flex alignItems={'center'}>
              <Box>
                <Text fontSize="1xl" fontWeight="bold">
                  Variant List
                </Text>
                <Text fontSize="1xl" color={'grey'}>
                  Add variants so buyers can choose the right product, come on!
                </Text>
              </Box>
              <Spacer />
              <Button
                colorPalette={'gray'}
                variant="surface"
                borderRadius={'full'}
                onClick={() => console.log('ba')}
              >
                <FaRegEdit />
                Edit All Variant
              </Button>
            </Flex>
            {variantList.map(
              (variant) =>
                variant.is_checked && <ProductVariantItem key={variant.id} />
            )}
          </Flex>
        )}
      </Flex>
    </ContentContainer>
  );
}
