import { Box } from '@chakra-ui/react';
import { DetailImageHero } from './detail-image-hero';
import { DetailImageList } from './detail-image-list';
import { useState } from 'react';
import { Product, ProductImage } from '@/types/product-type';

interface Props {
  product: Product;
}

export function ProductDetailImage({ product }: Props) {
  const [currentImage, setCurrentImage] = useState(product.Images[0]);
  const handleImageClick = (image: ProductImage) => {
    setCurrentImage(image);
  };
  return (
    <>
      <Box width={'40%'}>
        <DetailImageHero alt={currentImage.alt} src={currentImage.src} />
        <DetailImageList
          images={product.Images}
          onImageClick={handleImageClick}
        />
      </Box>
    </>
  );
}
