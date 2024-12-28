import api from '@/networks/api';
import {
  CreateOrderRequestDTO,
  CreateOrderResponseDTO,
} from '@/types/order-types';
import { RatesRequestDTO, RatesResponseDTO } from '@/types/rates-type';
import { recipientType } from '@/types/types';
import { formatCityName } from '@/utils/fomrat-city-name';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export function useCheckout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { checkoutProduct } = location.state || {};

  useEffect(() => {
    console.log(checkoutProduct);
    if (!checkoutProduct) {
      navigate('/');
    }
  }, [checkoutProduct, navigate]);

  const { register, handleSubmit, setValue } = useForm<recipientType>();
  const [courierRates, setCourierRates] = useState<RatesResponseDTO[]>([]);
  const [selectedCourierRates, setSelectedCourierRates] =
    useState<RatesResponseDTO | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [recipient, setRecipient] = useState<recipientType | null>(null);
  const [tabs, setTabs] = useState<'shipping' | 'payments'>('shipping');
  const [order, setOrder] = useState<CreateOrderResponseDTO | null>(null);

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
      return;
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
      Swal.fire({
        title: 'Processing Your Order...',
        html: 'Please wait while we create your order.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading(null);
        },
      });
      const response = await api.CREATE_ORDER(body);
      Swal.close();
      setTabs('payments');
      setOrder(response);
    } catch (error) {
      Swal.close();
      Swal.fire({
        title: 'Order Failed!',
        html: 'An error occurred while creating your order. Please try again.',
        icon: 'error',
        confirmButtonText: 'Retry',
      });

      console.error(error);
    }
  }

  async function onPayment() {
    try {
      navigate(`/invoice/${order?.order.Recipient.Invoices.id}`);
      window.open(order?.redirect_url, '_blank');
      api.POST_WA(order!.order.id);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    order,
    register,
    handleSubmit,
    setValue,
    isOpen,
    setIsOpen,
    courierRates,
    selectedCourierRates,
    setSelectedCourierRates,
    tabs,
    onSelectCourier,
    onCheckout,
    onPayment,
    checkoutProduct,
  };
}
