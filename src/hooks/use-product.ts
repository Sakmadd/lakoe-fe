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

export function useProduct() {
  const queryClient: QueryClient = useQueryClient();
  const { data: products, isLoading } = useQuery<SellerProductListType[]>({
    queryKey: ['products'],
    queryFn: api.GET_SHOP_PRODUCTS,
  });

  const groupedProducts = useMemo(() => {
    if (!products) return { active: [], unactive: [] };
    return ProductGrouper({ products });
  }, [products]);

  const createProduct = useMutation({
    mutationFn: CREATE_PRODUCT,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: 'products' });
    },
  });

  async function onPost(data: FormData): Promise<void> {
    createProduct.mutate(data);
  }

  async function CREATE_PRODUCT(data: FormData) {
    return await api.CREATE_PRODUCT(data);
  }

  return {
    products,
    onPost,
    groupedProducts,
    isLoading,
  };
}
