import { Box } from '@chakra-ui/react';
import { DetailImageHero } from './detail-image-hero';
import { DetailImageList, imagesType } from './detail-image-list';
import { useState } from 'react';
import { ProductType } from '@/types/types';

interface Props {
  product: ProductType;
}

export function ProductDetailImage({ product }: Props) {
  const [currentImage, setCurrentImage] = useState(product.images[0]);
  const handleImageClick = (image: imagesType) => {
    setCurrentImage(image);
  };
  return (
    <>
      <Box width={'40%'}>
        <DetailImageHero alt={currentImage.alt} src={currentImage.src} />
        <DetailImageList
          images={product.images}
          onImageClick={handleImageClick}
        />
      </Box>
    </>
  );
}
