import { ProductImage } from '@/types/product-type';
import { Box, Button, Flex, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

interface DetailImageListProps {
  images: ProductImage[];
  onImageClick: (image: ProductImage) => void;
}

export function DetailImageList({
  images,
  onImageClick,
}: DetailImageListProps) {
  const [startIndex, setStartIndex] = useState(0);
  const [maxVisible, setMaxVisible] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setMaxVisible(3);
      } else if (window.innerWidth <= 1496) {
        setMaxVisible(4);
      } else {
        setMaxVisible(5);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(prev + 1, images.length - maxVisible));
  };

  const visibleImages = images.slice(startIndex, startIndex + maxVisible);

  return (
    <Flex align="center" gap="1rem" justify="center">
      <Flex
        gap=".6rem"
        paddingTop={'.5rem'}
        alignItems={'center'}
        position="relative"
        width="100%"
        maxWidth="500px"
      >
        <Button
          onClick={handlePrev}
          disabled={startIndex === 0}
          size="sm"
          position="absolute"
          left="0"
          zIndex="10"
          boxShadow="md"
          _disabled={{
            cursor: 'default',
            opacity: 0.5,
          }}
        >
          <GrFormPrevious />
        </Button>

        <Flex justifyContent="center" gap="0.6rem" width="100%">
          {visibleImages.map((image, index) => (
            <Box
              key={index}
              width="20%"
              minWidth="70px"
              height="70px"
              border="1px solid"
              borderColor="gray.200"
              overflow="hidden"
            >
              <Image
                _hover={{
                  filter: 'brightness(80%)',
                }}
                transition="filter 0.2s ease-in-out"
                cursor="pointer"
                objectFit="cover"
                src={image.src}
                alt={image.alt}
                width="100%"
                height="100%"
                onClick={() => onImageClick(image)}
              />
            </Box>
          ))}
        </Flex>

        {/* Tombol Navigasi Berikutnya */}
        <Button
          onClick={handleNext}
          disabled={startIndex >= images.length - maxVisible}
          size="sm"
          position="absolute"
          right="0"
          zIndex="10"
          boxShadow="md"
          _disabled={{
            cursor: 'default',
            opacity: 0.5,
          }}
        >
          <GrFormNext />
        </Button>
      </Flex>
    </Flex>
  );
}
