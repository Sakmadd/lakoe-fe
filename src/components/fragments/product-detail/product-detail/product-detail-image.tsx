import { Box } from '@chakra-ui/react';
import { DetailImageHero } from './detail-image-hero';
import { DetailImageList, imagesType } from './detail-image-list';
import { useState } from 'react';

export function ProductDetailImage() {
  const [currentImage, setCurrentImage] = useState(images[0]);
  const handleImageClick = (image: imagesType) => {
    setCurrentImage(image);
  };
  return (
    <>
      <Box width={'40%'}>
        <DetailImageHero alt={currentImage.alt} src={currentImage.src} />
        <DetailImageList images={images} onImageClick={handleImageClick} />
      </Box>
    </>
  );
}

const images = [
  {
    src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    alt: 'Green double couch with wooden legs',
  },
  {
    src: 'https://pixlr.com/images/generator/photo-generator.webp',
    alt: 'ai ni bro',
  },
  {
    src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    alt: 'Green double couch with wooden legs',
  },
  {
    src: 'https://pixlr.com/images/generator/photo-generator.webp',
    alt: 'ai ni bro',
  },
  {
    src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    alt: 'Green double couch with wooden legs',
  },
  {
    src: 'https://pixlr.com/images/generator/photo-generator.webp',
    alt: 'ai ni bro',
  },
  {
    src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
    alt: 'Green double couch with wooden legs',
  },
];
