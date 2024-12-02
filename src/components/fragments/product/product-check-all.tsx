import { Checkbox } from '@/components/ui/checkbox';
import { ProductType } from '@/types/types';
import { Flex, Text } from '@chakra-ui/react';
import { ProductItemButton } from './product-item-button';
import { LuTrash2 } from 'react-icons/lu';
import { useState } from 'react';

interface Props {
  products: ProductType[];
  checkedProduct: ProductType[];
  setCheckedProduct: React.Dispatch<React.SetStateAction<ProductType[]>>;
}

export function ProductCheckAll({
  products,
  checkedProduct,
  setCheckedProduct,
}: Props) {
  const [isCheckedAll, setIsCheckedAll] = useState<boolean>(false);

  const checkAllHandler = () => {
    if (isCheckedAll) {
      setCheckedProduct([]);
    } else {
      setCheckedProduct(products);
    }
    setIsCheckedAll(!isCheckedAll);
  };

  return (
    <Flex padding={'.8rem'} justifyContent={'space-between'} gap={'1rem'}>
      <Text>{`${products.length} Product${products.length > 1 ? 's' : ''}`}</Text>
      <Flex gap={'.5rem'} alignItems={'center'}>
        {checkedProduct.length > 0 && (
          <>
            <ProductItemButton children={'Toggle Active'} />
            <ProductItemButton icon={<LuTrash2 />} />
          </>
        )}
        <Text fontSize={'.8rem'}>Check All</Text>
        <Checkbox
          cursor={'pointer'}
          checked={isCheckedAll}
          variant={'subtle'}
          onChange={checkAllHandler}
        />
      </Flex>
    </Flex>
  );
}
