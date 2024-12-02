import { Box, Image } from '@chakra-ui/react';

interface DetailImageHeroProps {
  src: string;
  alt: string;
}

export function DetailImageHero({ src, alt }: DetailImageHeroProps) {
  return (
    <>
      <Box height={'500px'}>
        <Image
          objectFit={'cover'}
          src={src}
          alt={alt}
          width={'100%'}
          height={'100%'}
        />
      </Box>
    </>
  );
}
