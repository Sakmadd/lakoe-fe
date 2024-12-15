import { dummyLoggedUser } from '@/dummy-data/dummyData';
import { Box, Image, Link } from '@chakra-ui/react';
import Carousel from 'better-react-carousel';
import './middlepage.css';

const SELLER = [
  {
    image: '/promo4.jpg',
  },
  {
    image: '/promo5.jpg',
  },
  {
    image: '/promo6.jpg',
  },
  {
    image: '/promo7.jpg',
  },
];
const BUYER = [
  {
    image: '/promo5.jpg',
  },
  {
    image: '/promo4.jpg',
  },
];

const loggedUser = dummyLoggedUser;

const images = loggedUser ? SELLER : BUYER;

function CarouselBanner() {
  return (
    <>
      <Box width={'80%'}>
        <Carousel
          cols={1}
          rows={1}
          loop={true}
          showDots={false}
          autoplay={2000}
        >
          {images.map((img) => (
            <Carousel.Item>
              <Link>
                <Image w="100%" src={img.image} />
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      </Box>
    </>
  );
}
export default CarouselBanner;
