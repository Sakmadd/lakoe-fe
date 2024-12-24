import api from '@/networks/api';
import { CreateOrderRequestDTO } from '@/types/order-types';
import { RatesRequestDTO, RatesResponseDTO } from '@/types/rates-type';
import { recipientType } from '@/types/types';
import { Flex, Tabs, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaRegCreditCard } from 'react-icons/fa';
import { LiaShippingFastSolid } from 'react-icons/lia';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { CheckoutInformation } from './checkout-information';
import { CheckoutOrderSummary } from './checkout-order-summary';
import { CheckoutPayments } from './checkout-payments';

export function CheckoutContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const { checkoutProduct } = location.state || {};
  const { register, handleSubmit, setValue } = useForm<recipientType>();
  const [courierRates, setCourierRates] = useState<RatesResponseDTO[]>([]);
  const [selectedCourierRates, setSelectedCourierRates] =
    useState<RatesResponseDTO | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [recipient, setRecipient] = useState<recipientType | null>(null);
  const [tabs, setTabs] = useState<'shipping' | 'payments'>('shipping');

  useEffect(() => {
    console.log(checkoutProduct);
    if (!checkoutProduct) {
      navigate('/');
    }
  }, [checkoutProduct, navigate]);

  function formatCityName(input: string) {
    return input.replace(/^(KAB\.\s*|KOTA\s*)/i, '').toLowerCase();
  }

  const onSelectCourier: SubmitHandler<recipientType> = async (data) => {
    setIsOpen(!isOpen);
    setRecipient(data);
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
    try {
      const response = await api.GET_COURIER_RATES(body);
      setCourierRates(response);
    } catch (error) {
      console.log(error);
    }
  };

  async function onCheckout() {
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
    const body: CreateOrderRequestDTO = {
      name: recipient!.name,
      email: recipient!.email,
      phone: recipient!.phone,
      address: recipient!.address,
      province: recipient!.province,
      city: recipient!.city,
      district: recipient!.district,
      subdistrict: recipient!.subdistrict,
      postal_code: recipient!.postal_code,
      longitude: '0000123',
      latitude: '00021030213',
      origin_area_id: selectedCourierRates!.origin_area_id,
      destination_area_id: selectedCourierRates!.destination_area_id,
      courier_price: selectedCourierRates!.price,
      courier_company: selectedCourierRates!.company,
      courier_code: selectedCourierRates!.courier_code,
      courier_type: selectedCourierRates!.courier_type,
      items: {
        variant_combination_id:
          checkoutProduct.variant_option_combination_id || undefined,
        product_id: checkoutProduct.id,
        price: checkoutProduct.price,
        quantity: checkoutProduct.checkout_quantity,
      },
    };
    try {
      const response = await api.CREATE_ORDER(body);
      setTabs('payments');
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function onPayment() {
    console.log('kontol');
  }

  return (
    <>
      <Text fontSize={'3xl'} fontWeight={'semibold'} paddingY={'3rem'}>
        Checkout
      </Text>
      <Flex gap={'1rem'} paddingBottom={'3rem'}>
        <Tabs.Root value={tabs} width={'65%'}>
          <Tabs.List>
            <Tabs.Trigger
              value="shipping"
              disabled={tabs === 'payments' && true}
            >
              <LiaShippingFastSolid size={'sm'} style={{ width: '20px' }} />
              Shipping Information
            </Tabs.Trigger>
            <Tabs.Trigger
              value="payments"
              disabled={tabs === 'shipping' && true}
            >
              <FaRegCreditCard size={'sm'} style={{ width: '20px' }} />
              Payments
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="shipping">
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
          </Tabs.Content>
          <Tabs.Content value="payments">
            <CheckoutPayments />
          </Tabs.Content>
        </Tabs.Root>

        <CheckoutOrderSummary
          onPayment={onPayment}
          tabs={tabs}
          onCheckout={onCheckout}
          selectedCourierRates={selectedCourierRates}
          product={checkoutProduct}
        />
      </Flex>
    </>
  );
}
