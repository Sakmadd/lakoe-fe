import { RatesRequestDTO, RatesResponseDTO } from '@/types/rates-type';
import { recipientType } from '@/types/types';
import { Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckoutInformation } from './checkout-information';
import { CheckoutOrderSummary } from './checkout-order-summary';
import api from '@/networks/api';

export function CheckoutContent() {
  const { register, handleSubmit, setValue } = useForm<recipientType>();
  const location = useLocation();
  const navigate = useNavigate();
  const [courierRates, setCourierRates] = useState<RatesResponseDTO[]>([]);
  const { checkoutProduct } = location.state || {};

  useEffect(() => {
    if (!checkoutProduct) {
      navigate('/');
    }
  }, [checkoutProduct, navigate]);

  function formatCityName(input: string) {
    return input.replace(/^(KAB\.\s*|KOTA\s*)/i, '').toLowerCase();
  }

  const onSubmit: SubmitHandler<recipientType> = async (data) => {
    const body: RatesRequestDTO = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      latitude: data.latitude,
      longitude: data.longitude,
      province: data.province.toLowerCase(),
      city: formatCityName(data.city),
      district: data.district.toLowerCase(),
      subdistrict: data.subdistrict.toLowerCase(),
      postal_code: data.postal_code,
      address: data.address,
      quantity: checkoutProduct.checkout_quantity,
      items: {
        id: checkoutProduct.id,
        name: checkoutProduct.name,
        price: checkoutProduct.price,
        height: checkoutProduct.height,
        length: checkoutProduct.length,
        weight: checkoutProduct.weight,
        width: checkoutProduct.width,
      },
    };
    const response = await api.GET_COURIER_RATES(body);
    setCourierRates(response);
  };

  return (
    <>
      <Text fontSize={'3xl'} fontWeight={'semibold'} paddingY={'3rem'}>
        Checkout
      </Text>
      <Flex gap={'1rem'} paddingBottom={'3rem'}>
        <CheckoutInformation
          courierRates={courierRates}
          setValue={setValue}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          product={checkoutProduct}
          register={register}
        />
        <CheckoutOrderSummary product={checkoutProduct} />
      </Flex>
    </>
  );
}
