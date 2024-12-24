import api from '@/networks/api';
import { RatesRequestDTO, RatesResponseDTO } from '@/types/rates-type';
import { recipientType } from '@/types/types';
import { Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckoutInformation } from './checkout-information';
import { CheckoutOrderSummary } from './checkout-order-summary';
import Swal from 'sweetalert2';

export function CheckoutContent() {
  const { register, handleSubmit, setValue } = useForm<recipientType>();
  const location = useLocation();
  const navigate = useNavigate();
  const [courierRates, setCourierRates] = useState<RatesResponseDTO[]>([]);
  const { checkoutProduct } = location.state || {};
  const [selectedCourierRates, setSelectedCourierRates] =
    useState<RatesResponseDTO | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!checkoutProduct) {
      navigate('/');
    }
  }, [checkoutProduct, navigate]);

  function formatCityName(input: string) {
    return input.replace(/^(KAB\.\s*|KOTA\s*)/i, '').toLowerCase();
  }

  const onSelectCourier: SubmitHandler<recipientType> = async (data) => {
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
    if (!data) {
      Swal.fire({
        title: 'Please Fill Your Informations!',
        html: 'Fill your information before select your shipment method!',
        icon: 'warning',
        confirmButtonText: 'Go!',
      }).then(() => {
        return;
      });
    }
    const response = await api.GET_COURIER_RATES(body);
    setCourierRates(response);
  };

  function onCheckout() {
    if (!selectedCourierRates) {
      Swal.fire({
        title: 'Please Select Courier!',
        html: 'Pick the best price for you!',
        icon: 'warning',
        confirmButtonText: 'Go!',
      }).then(() => {
        return;
      });
    }
    console.log('bisa');
  }

  return (
    <>
      <Text fontSize={'3xl'} fontWeight={'semibold'} paddingY={'3rem'}>
        Checkout
      </Text>
      <Flex gap={'1rem'} paddingBottom={'3rem'}>
        <CheckoutInformation
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedCourierRates={selectedCourierRates}
          setSelectedCourierRates={setSelectedCourierRates}
          courierRates={courierRates}
          setValue={setValue}
          onSubmit={onSelectCourier}
          handleSubmit={handleSubmit}
          product={checkoutProduct}
          register={register}
        />
        <CheckoutOrderSummary
          onCheckout={onCheckout}
          selectedCourierRates={selectedCourierRates}
          product={checkoutProduct}
        />
      </Flex>
    </>
  );
}
