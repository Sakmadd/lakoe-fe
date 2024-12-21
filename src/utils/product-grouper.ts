import { SellerProductListType } from '@/types/types';
interface Props {
  products: SellerProductListType[];
}

export function ProductGrouper({ products }: Props) {
  const groupedProducts = products.reduce(
    (acc, product) => {
      const status = product.is_active ? 'active' : 'unactive';
      if (!acc[status]) {
        acc[status] = [];
      }
      acc[status].push(product);
      return acc;
    },
    { active: [], unactive: [] } as Record<
      'active' | 'unactive',
      SellerProductListType[]
    >
  );

  return groupedProducts;
}
