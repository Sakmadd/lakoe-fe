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

interface Props {
  product: ProductType;
}

export function CheckoutOrderSummary({ product }: Props) {
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
        top={'2rem'}
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
              <Text>
                {formatRupiah(
                  product.selected_combination!.price *
                    product.checkout_quantity!
                )}
              </Text>
            </Flex>
            <Flex>
              <Text color={'grey'}>Shipment Costs</Text>
              <Spacer />
              <Text>Rp. 100.000</Text>
            </Flex>
            <Separator size={'md'} />
            <Flex>
              <Text color={'grey'}>Total Payment</Text>
              <Spacer />
              <Text>Rp. 100.000</Text>
            </Flex>
          </Flex>
        </Flex>
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
        <Button
          backgroundColor={'#4d4c4c'}
          fontSize={'md'}
          fontWeight={'normal'}
          type="submit"
        >
          <Flex gap={'1rem'}>
            <Text paddingBottom={'.2rem'}>Checkout</Text>
            <FaArrowRightLong />
          </Flex>
        </Button>
      </Flex>
    </>
  );
}
