import { Box, Card, Image, Text } from '@chakra-ui/react';
import { imagesType } from './productDetail/detail-image-list';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  title: string;
  price: string;
  image: imagesType;
  url: string;
}

export function ProductCard({ title, price, image, url }: ProductCardProps) {
  const navigate = useNavigate();
  return (
    <>
      <Card.Root
        maxW="sm"
        overflow="hidden"
        width={'190px'}
        height={'250px'}
        cursor={'pointer'}
        boxShadow={'sm'}
        _hover={{
          boxShadow: 'md',
          transform: 'translateY(-2px)',
        }}
        transition={'transform .1s ease-in-out'}
        onClick={() => navigate(url)}
      >
        <Box height={'70%'} width={'100%'}>
          <Image
            objectFit={'cover'}
            src={image.src}
            alt={image.alt}
            width={'100%'}
            height={'100%'}
          />
        </Box>
        <Card.Body gap="1" padding={'1rem'}>
          <Card.Title
            textStyle="sm"
            fontWeight={'normal'}
            letterSpacing={'wide'}
          >
            {title}
          </Card.Title>
          <Text
            textStyle="1xl"
            fontWeight="medium"
            letterSpacing="tight"
            mt="2"
          >
            {price}
          </Text>
        </Card.Body>
      </Card.Root>
    </>
  );
}
