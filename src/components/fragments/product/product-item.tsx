import api from '@/networks/api';
import { SellerProductListType } from '@/types/types';
import { formatRupiah } from '@/utils/format-rp';
import { Box, Flex, Image, Spacer, Text } from '@chakra-ui/react';
import { GoDotFill } from 'react-icons/go';
import { RiLink } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { Checkbox } from '../../ui/checkbox';
import { Switch } from '../../ui/switch';
import { EditSingleModal } from './edit-single-modal';
import { MenuButton } from './menu-button';
import { ProductItemButton } from './product-item-button';

interface Props {
  product: SellerProductListType;
  checkedProduct: SellerProductListType[];
  setCheckedProduct: React.Dispatch<
    React.SetStateAction<SellerProductListType[]>
  >;
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

  async function handleSwitchClick(id: string) {
    try {
      await api.TOGGLE_ACTIVE_SINGLE(id);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box border="0.1rem solid #e6e6e6" borderRadius="0.5rem">
      <Box display="flex" justifyContent="space-between">
        <Box padding=".7rem" display="flex" gap="0.5rem" width={'100%'}>
          <Image
            width="6rem"
            height="6rem"
            borderRadius=".3rem"
            objectFit="cover"
            border="0.1rem solid #e6e6e6"
            src={product.Images[0]!.src}
            alt={product.Images[0]!.alt}
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
              <EditSingleModal
                edit="price"
                label="Edit Price"
                leftAddon="Rp"
                placeholder={product.price.toString()}
                product={product}
                trigerElement={<ProductItemButton children={'Edit Price'} />}
              />
              <EditSingleModal
                edit="stock"
                label="Edit Stock"
                placeholder={product.stock.toString()}
                rightAddon="Pcs"
                product={product}
                trigerElement={<ProductItemButton children={'Edit Stock'} />}
              />
              <ProductItemButton
                onClick={() => navigate(`/${product.url_name}`)}
                children={'See Live Product'}
                icon={<RiLink />}
              />
              <MenuButton product={product} />
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
