import { Checkbox } from '@/components/ui/checkbox';
import { SellerProductListType } from '@/types/types';
import { Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { LuTrash2 } from 'react-icons/lu';
import { ProductItemButton } from './product-item-button';

interface Props {
  products: SellerProductListType[];
  checkedProduct: SellerProductListType[];
  setCheckedProduct: React.Dispatch<
    React.SetStateAction<SellerProductListType[]>
  >;
  batchToggleHandler(checkedProduct: SellerProductListType[]): Promise<void>;
  batchDeleteHandler(checkedProduct: SellerProductListType[]): Promise<void>;
}

export function ProductCheckAll({
  products,
  checkedProduct,
  setCheckedProduct,
  batchToggleHandler,
  batchDeleteHandler,
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
            <ProductItemButton
              children={'Toggle Active'}
              onClick={() => batchToggleHandler(checkedProduct)}
            />
            <ProductItemButton
              onClick={() => batchDeleteHandler(checkedProduct)}
              icon={<LuTrash2 />}
            />
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
