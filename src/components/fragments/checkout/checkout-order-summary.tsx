import { StoreState } from '@/redux/store';
import { RatesResponseDTO } from '@/types/rates-type';
import { ProductType } from '@/types/types';
import { formatRupiah } from '@/utils/format-rp';
import {
  Box,
  Button,
  Flex,
  Separator,
  Spacer,
  Span,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { useSelector } from 'react-redux';

interface Props {
  product: ProductType;
  selectedCourierRates: RatesResponseDTO | null;
  onCheckout(): void;
  onPayment(): void;
  tabs: 'shipping' | 'payments';
}

export function CheckoutOrderSummary({
  product,
  selectedCourierRates,
  onCheckout,
  tabs,
  onPayment,
}: Props) {
  const price = product.selected_combination
    ? product.selected_combination.price
    : product.price * product.checkout_quantity!;

  const loggedUser = useSelector((state: StoreState) => state.loggedUser.value);

  const [charCount, setCharCount] = useState(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(event.target.value.length);
  };
  return (
    <>
      <Flex
        width={'35%'}
        maxHeight={'50vh'}
        position={'sticky'}
        top={loggedUser ? '6rem' : '2rem'}
        flexDir={'column'}
        gap={'1rem'}
      >
        <Flex
          border={'1px solid gray'}
          padding={'1.5rem'}
          borderRadius={'.5rem'}
          width={'100%'}
          flexDirection={'column'}
          gap={'.8rem'}
          backgroundColor={'gray.100'}
        >
          <Text fontSize={'1.2rem'} fontWeight={'semibold'}>
            Order Summary
          </Text>
          <Flex flexDir={'column'} fontWeight={'semibold'} gap={'.5rem'}>
            <Flex>
              <Text color={'grey'}>
                Total Price ({product.checkout_quantity})
              </Text>
              <Spacer />
              <Text>{formatRupiah(price)}</Text>
            </Flex>
            <Flex>
              <Text color={'grey'}>Shipment Costs</Text>
              <Spacer />
              <Text>
                {selectedCourierRates
                  ? formatRupiah(selectedCourierRates.price)
                  : '(Not selected yet)'}
              </Text>
            </Flex>
            <Separator size={'md'} />
            <Flex>
              <Text color={'grey'}>Total Payment</Text>
              <Spacer />
              <Text>
                {selectedCourierRates
                  ? formatRupiah(price + selectedCourierRates.price)
                  : formatRupiah(price)}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        {tabs === 'shipping' && (
          <Flex
            border={'1px solid #e6e6e6'}
            padding={'1.5rem'}
            borderRadius={'.5rem'}
            width={'100%'}
            flexDirection={'column'}
            gap={'.8rem'}
          >
            <Text fontSize={'1.2rem'} fontWeight={'semibold'}>
              Notes
              <Span color={'grey'} fontWeight={'normal'}>
                (Optionals)
              </Span>
            </Text>
            <Flex flexDir={'column'} fontWeight={'semibold'} gap={'.5rem'}>
              <Textarea
                fontWeight={'thin'}
                placeholder="Write your order notes or intstructions"
                minHeight="150px"
                maxLength={150}
                resize="none"
                onChange={handleInputChange}
              />
              <Box alignSelf="flex-end">
                <Text
                  fontSize="sm"
                  color={charCount === 150 ? 'red.500' : 'gray.500'}
                >
                  {`${charCount}/${150}`}
                </Text>
              </Box>
            </Flex>
          </Flex>
        )}

        {tabs === 'payments' ? (
          <Button
            backgroundColor={'#4d4c4c'}
            fontSize={'md'}
            fontWeight={'normal'}
            onClick={onPayment}
          >
            <Flex gap={'1rem'}>
              <Text paddingBottom={'.2rem'}>Complete Payments</Text>
              <FaArrowRightLong />
            </Flex>
          </Button>
        ) : (
          <Button
            backgroundColor={'#4d4c4c'}
            fontSize={'md'}
            fontWeight={'normal'}
            onClick={onCheckout}
          >
            <Flex gap={'1rem'}>
              <Text paddingBottom={'.2rem'}>Payments</Text>
              <FaArrowRightLong />
            </Flex>
          </Button>
        )}
      </Flex>
    </>
  );
}
