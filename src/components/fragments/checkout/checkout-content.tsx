import { useCheckout } from '@/hooks/use-checkout';
import { Flex, Tabs, Text } from '@chakra-ui/react';
import { FaRegCreditCard } from 'react-icons/fa';
import { LiaShippingFastSolid } from 'react-icons/lia';
import { CheckoutInformation } from './checkout-information';
import { CheckoutOrderSummary } from './checkout-order-summary';
import { CheckoutPayments } from './checkout-payments';

export function CheckoutContent() {
  const {
    tabs,
    isOpen,
    courierRates,
    selectedCourierRates,
    checkoutProduct,
    setIsOpen,
    setSelectedCourierRates,
    register,
    handleSubmit,
    setValue,
    onSelectCourier,
    onPayment,
    onCheckout,
    order,
  } = useCheckout();

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
            {order && <CheckoutPayments order={order.order} />}
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
