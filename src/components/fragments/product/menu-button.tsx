import { Button } from '@/components/ui/button';
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from '@/components/ui/menu';
import api from '@/networks/api';
import { SellerProductListType } from '@/types/types';
import { FaTrash } from 'react-icons/fa6';
import { HiDotsHorizontal } from 'react-icons/hi';
import { MdEdit } from 'react-icons/md';

interface Props {
  product: SellerProductListType;
}

export function MenuButton({ product }: Props) {
  async function deleteProductHandle() {
    try {
      await api.DELETE_PRODUCT_BATCH([product.id]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button
          colorPalette={'gray'}
          variant="outline"
          borderRadius={'full'}
          size={'xs'}
          fontWeight={'semibold'}
        >
          <HiDotsHorizontal />
        </Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem value="edit-product" cursor={'pointer'}>
          <MdEdit />
          Edit Product
        </MenuItem>
        <MenuItem
          value="delete-product"
          cursor={'pointer'}
          color={'red.400'}
          onClick={() => deleteProductHandle()}
        >
          <FaTrash />
          Delete Product
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  );
}
