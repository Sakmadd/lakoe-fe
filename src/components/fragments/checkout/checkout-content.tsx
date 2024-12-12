import { recipientType } from '@/types/types';
import { Flex, Text } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CheckoutInformation } from './checkout-information';
import { CheckoutOrderSummary } from './checkout-order-summary';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function CheckoutContent() {
  const { register, handleSubmit } = useForm<recipientType>();

  const location = useLocation();
  const navigate = useNavigate();

  const { checkoutProduct } = location.state || {};

  useEffect(() => {
    if (!checkoutProduct) {
      navigate('/');
    }
  }, [checkoutProduct, navigate]);

  const onSubmit: SubmitHandler<recipientType> = (data) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Text fontSize={'3xl'} fontWeight={'semibold'} paddingY={'3rem'}>
          Checkout
        </Text>
        <Flex gap={'1rem'} paddingBottom={'3rem'}>
          <CheckoutInformation product={checkoutProduct} register={register} />
          <CheckoutOrderSummary product={checkoutProduct} />
        </Flex>
      </form>
    </>
  );
}
