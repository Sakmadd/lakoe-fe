import { Product } from '@/types/product-type';
import { recipientType } from '@/types/types';
import { Box, Flex, Text } from '@chakra-ui/react';
import {
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import { FieldInput } from '../product-new/product-new-fields/field-input';
import { FieldInputAddon } from '../product-new/product-new-fields/field-input-addon';
import { FieldInputDescription } from '../product-new/product-new-fields/field-input-description';
import { LocationInputGroup } from './location-input/location-input-group';
import { CheckoutOrderDetail } from './checkout-courier-rates/checkout-order-detail';
import { RatesResponseDTO } from '@/types/rates-type';

interface Props {
  product: Product;
  courierRates: RatesResponseDTO[];
  setValue: UseFormSetValue<recipientType>;
  register: UseFormRegister<recipientType>;
  onSubmit: SubmitHandler<recipientType>;
  handleSubmit: UseFormHandleSubmit<recipientType, undefined>;
}

export function CheckoutInformation({
  register,
  product,
  onSubmit,
  handleSubmit,
  setValue,
  courierRates,
}: Props) {
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: '65%',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <Flex
          border={'1px solid #e6e6e6'}
          padding={'1rem'}
          borderRadius={'.5rem'}
          width={'100%'}
          flexDirection={'column'}
          gap={'.8rem'}
        >
          <Text fontSize={'xl'} fontWeight={'semibold'}>
            Contact Information
          </Text>
          <Box width={'50%'}>
            <FieldInput
              required
              register={register}
              registerName={'name'}
              label="Name"
            />
            <FieldInput
              required
              register={register}
              registerName={'email'}
              label="Email"
            />
          </Box>
        </Flex>
        <Flex
          border={'1px solid #e6e6e6'}
          padding={'1rem'}
          borderRadius={'.5rem'}
          width={'100%'}
          flexDirection={'column'}
          gap={'.8rem'}
        >
          <Text fontSize={'xl'} fontWeight={'semibold'}>
            Shipping Addresss
          </Text>
          <FieldInputAddon
            required
            leftAddon="+62"
            register={register}
            registerName={'phone'}
            label="Phone Number"
            type="number"
          />
          <LocationInputGroup setValue={setValue} />
          <FieldInput
            required
            register={register}
            registerName={'postal_code'}
            label="Postal Code"
            type="number"
          />
          <FieldInputDescription
            registerName="address"
            label="Address Detail"
            placeholder="Enter your address detail"
            maxLength={3000}
            required
            register={register}
          />
        </Flex>
        <CheckoutOrderDetail courierRates={courierRates} product={product} />
      </form>
    </>
  );
}
