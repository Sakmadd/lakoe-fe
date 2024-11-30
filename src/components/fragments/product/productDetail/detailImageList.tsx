import { Box, Flex, Image } from '@chakra-ui/react';

type images = {
  src: string;
  alt: string;
};

interface DetailImageListProps {
  images: images[];
}

export function DetailImageList({ images }: DetailImageListProps) {
  return (
    <>
      <Flex paddingTop={'1rem'} gap={'1rem'}>
        {images.map((image) => (
          <Box width={'80px'} height={'80px'}>
            <Image
              objectFit={'cover'}
              src={image.src}
              alt={image.alt}
              width={'100%'}
              height={'100%'}
            />
          </Box>
        ))}
      </Flex>
    </>
  );
}
