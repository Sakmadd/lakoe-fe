import { ProductType } from '@/types/types';
import { formatRupiah } from '@/utils/format-rp';
import { Box, Flex, Image, Spacer, Text } from '@chakra-ui/react';
import { GoDotFill } from 'react-icons/go';
import { HiDotsHorizontal } from 'react-icons/hi';
import { RiLink } from 'react-icons/ri';
import { Checkbox } from '../../ui/checkbox';
import { Switch } from '../../ui/switch';
import { ProductItemButton } from './product-item-button';
import { useNavigate } from 'react-router-dom';

interface Props {
  product: ProductType;
  checkedProduct: ProductType[];
  setCheckedProduct: React.Dispatch<React.SetStateAction<ProductType[]>>;
}

export function ProductItem({
  product,
  checkedProduct,
  setCheckedProduct,
}: Props) {
  const navigate = useNavigate();
  const isChecked = checkedProduct.some((p) => p.id === product.id);

  const handleCheckboxChange = () => {
    if (isChecked) {
      setCheckedProduct((prev) => prev.filter((p) => p.id !== product.id));
    } else {
      setCheckedProduct((prev) => [...prev, product]);
    }
  };

  function handleSwitchClick(id: string) {
    console.log(id);
  }

  return (
    <Box border="0.1rem solid #e6e6e6" borderRadius="0.5rem">
      <Box display="flex" justifyContent="space-between" cursor={'pointer'}>
        <Box padding=".7rem" display="flex" gap="0.5rem" width={'100%'}>
          <Image
            width="6rem"
            height="6rem"
            borderRadius=".3rem"
            objectFit="cover"
            border="0.1rem solid #e6e6e6"
            src={product.images[0]!.src}
            alt={product.images[0]!.alt}
          />
          <Flex flexDirection="column" justifyContent="center" gap={'.1rem'}>
            <Text fontWeight="semibold" fontSize="1rem" fontFamily="sans-serif">
              {product.name}
            </Text>
            <Flex alignItems={'center'} gap={'.5rem'}>
              <Text
                fontSize=".9rem"
                color="black"
                fontFamily="sans-serif"
                fontWeight="semibold"
              >
                {formatRupiah(product.price)}
              </Text>
              <GoDotFill color="gray" />
              <Text
                fontWeight="light"
                fontSize=".9rem"
                color="gray"
                fontFamily="sans-serif"
              >
                Stock: {product.stock}
              </Text>
              <GoDotFill color="gray" />
              <Text
                fontWeight="light"
                fontSize=".9rem"
                color="gray"
                fontFamily="sans-serif"
              >
                SKU: {product.sku}
              </Text>
            </Flex>
            <Flex gap={'.5rem'}>
              <ProductItemButton children={'Edit Price'} />
              <ProductItemButton children={'Edit Stock'} />
              <ProductItemButton
                onClick={() => navigate(product.url)}
                children={'See Live Product'}
                icon={<RiLink />}
              />
              <ProductItemButton children={<HiDotsHorizontal />} />
            </Flex>
          </Flex>
          <Spacer />
          <Flex flexDir={'column'} alignItems={'end'}>
            <Checkbox
              cursor={'pointer'}
              variant={'subtle'}
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <Spacer />
            <Switch
              defaultChecked={product.is_active}
              size={'lg'}
              onCheckedChange={() => handleSwitchClick(product.id)}
            />
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
