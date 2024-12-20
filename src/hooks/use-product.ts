import api from '@/networks/api';
import { SellerProductListType } from '@/types/types';
import { ProductGrouper } from '@/utils/product-grouper';
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export function useProduct() {
  const navigate = useNavigate();
  const queryClient: QueryClient = useQueryClient();

  const { data: products, isLoading } = useQuery<SellerProductListType[]>({
    queryKey: ['products'],
    queryFn: api.GET_SHOP_PRODUCTS,
  });

  const groupedProducts = useMemo(() => {
    if (!products) return { active: [], unactive: [] };
    return ProductGrouper({ products });
  }, [products]);

  async function CREATE_PRODUCT(data: FormData) {
    return await api.CREATE_PRODUCT(data);
  }

  async function DELETE_PRODUCT(id: string[]) {
    return await api.DELETE_PRODUCT_BATCH(id);
  }

  async function EDIT_PRICE_PRODUCT(id: string, amount: string[]) {
    await api.EDIT_PRICE_SINGLE(id, amount);
  }

  async function EDIT_STOCK_PRODUCT(id: string, amount: string[]) {
    await api.EDIT_STOCK_SINGLE(id, amount);
  }

  async function TOGGLE_PRODUCT(id: string[]) {
    return await api.TOGGLE_ACTIVE_BATCH(id);
  }

  const createProduct = useMutation({
    mutationFn: CREATE_PRODUCT,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const deleteProduct = useMutation({
    mutationFn: DELETE_PRODUCT,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const editPriceProduct = useMutation({
    mutationFn: ({ id, amount }: { id: string; amount: string[] }) =>
      EDIT_PRICE_PRODUCT(id, amount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const editStockProduct = useMutation({
    mutationFn: ({ id, amount }: { id: string; amount: string[] }) =>
      EDIT_STOCK_PRODUCT(id, amount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const toggleProduct = useMutation({
    mutationFn: TOGGLE_PRODUCT,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  async function onPost(data: FormData): Promise<void> {
    Swal.fire({
      title: 'Are you done?',
      html: 'Check before its too late! ',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Create!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        createProduct.mutate(data);
        Swal.fire({
          title: 'Product Added!',
          html: 'Lets check the latest product! ',
          icon: 'success',
          confirmButtonText: 'Go!',
        }).then(() => {
          navigate('/products');
        });
      }
    });
  }

  async function onDelete(id: string[]): Promise<void> {
    Swal.fire({
      title: 'Delete Product?!',
      html: 'There is no going back!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete!',
      confirmButtonColor: 'red',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct.mutate(id);
        Swal.fire({
          title: 'Deleted!',
          html: 'Your product has been deleted.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate('/products');
        });
      }
    });
  }

  async function onEditPrice(id: string, amount: string[]): Promise<void> {
    Swal.fire({
      title: 'Are you sure?',
      html: 'Check before it’s too late!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Edit!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        editPriceProduct.mutate({ id, amount });
        Swal.fire({
          title: 'Price Edited!',
          html: 'Let’s check the latest price!',
          icon: 'success',
          confirmButtonText: 'Go!',
        }).then(() => {
          navigate('/products');
        });
      }
    });
  }

  async function onEditStock(id: string, amount: string[]): Promise<void> {
    Swal.fire({
      title: 'Are you sure?',
      html: 'Check before it’s too late!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Edit!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        editStockProduct.mutate({ id, amount });
        Swal.fire({
          title: 'Price Edited!',
          html: 'Let’s check the latest price!',
          icon: 'success',
          confirmButtonText: 'Go!',
        }).then(() => {
          navigate('/products');
        });
      }
    });
  }

  async function onToggleProduct(id: string[]) {
    Swal.fire({
      title: 'Toggle Activation Product?',
      html: 'You can toggle anytime!',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yes, Toggle!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        toggleProduct.mutate(id);
        Swal.fire({
          title: 'Product Toggled!',
          html: 'Your product active status has been toggled.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate('/products');
        });
      }
    });
  }

  return {
    products,
    onPost,
    onDelete,
    onEditPrice,
    onEditStock,
    onToggleProduct,
    groupedProducts,
    isLoading,
  };
}
