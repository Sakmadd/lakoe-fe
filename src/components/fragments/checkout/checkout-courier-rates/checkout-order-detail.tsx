import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from '@/components/ui/accordion';
import { Product } from '@/types/product-type';
import { formatRupiah } from '@/utils/format-rp';
import {
  Flex,
  Icon,
  Image,
  Separator,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { LuTags } from 'react-icons/lu';
import { CheckoutRatesDialog } from './checkout-rates-dialog';
import { RatesResponseDTO } from '@/types/rates-type';

interface Props {
  courierRates: RatesResponseDTO[];
  product: Product;
}

export function CheckoutOrderDetail({ product, courierRates }: Props) {
  const [shipSelect, setShipSelect] = useState<boolean>(false);

  return (
    <>
      <Stack width="full">
        <AccordionRoot
          collapsible
          defaultValue={['info']}
          border={shipSelect ? '1px solid green' : '1px solid red'}
          borderRadius={'.5rem'}
          overflow={'hidden'}
        >
          <AccordionItem key={'info'} value={'info'}>
            <AccordionItemTrigger
              cursor={'pointer'}
              backgroundColor={shipSelect ? 'green.100' : 'red.100'}
              padding={'1rem'}
            >
              <Icon fontSize="lg">
                <LuTags />
              </Icon>
              Order
            </AccordionItemTrigger>
            <AccordionItemContent padding={'1rem'}>
              <Flex flexDir={'column'} gap={'1rem'}>
                <Text>Order Item</Text>
                <Flex gap={'1rem'}>
                  <Image src={product.Images[0].src} maxWidth={'100px'} />
                  <Flex flexDir={'column'}>
                    <Text fontWeight={'semibold'}>{product.name}</Text>
                    {product.selected_variant && (
                      <Text fontWeight={'thin'}>
                        {product.selected_variant
                          .map((variant) => variant)
                          .join(', ')}
                      </Text>
                    )}
                    <Text fontWeight={'thin'} fontSize={'sm'}>
                      - {product.checkout_quantity} Items (
                      {product.weight * product.checkout_quantity!}
                      gr)
                    </Text>
                    <Text fontWeight={'semibold'}>
                      {formatRupiah(product.price * product.checkout_quantity!)}
                    </Text>
                  </Flex>
                </Flex>
                <Flex flexDir={'column'} gap={'1rem'}>
                  <Separator />

                  <CheckoutRatesDialog
                    courierRates={courierRates}
                    setShipSelect={setShipSelect}
                    shipSelect={shipSelect}
                  />

                  <Separator />
                </Flex>
                <Flex flexDir={'column'}>
                  <AccordionRoot
                    collapsible
                    defaultValue={['info']}
                    borderRadius={'.5rem'}
                    overflow={'hidden'}
                  >
                    <AccordionItem key={'info'} value={'info'}>
                      <AccordionItemTrigger cursor={'pointer'}>
                        Subtotal
                        <Spacer />
                        {formatRupiah(
                          product.price * product.checkout_quantity!
                        )}
                      </AccordionItemTrigger>
                      <AccordionItemContent padding={'1rem'}>
                        <Flex
                          backgroundColor={'rgb(249, 250, 251)'}
                          padding={'1rem'}
                          borderRadius={'.5rem'}
                        >
                          <Text color={'grey'}>Subtotal (Items)</Text>
                          <Spacer />
                          <Text color={'grey'}>
                            {formatRupiah(
                              product.price * product.checkout_quantity!
                            )}
                          </Text>
                        </Flex>
                      </AccordionItemContent>
                    </AccordionItem>
                  </AccordionRoot>
                </Flex>
              </Flex>
            </AccordionItemContent>
          </AccordionItem>
        </AccordionRoot>
      </Stack>
    </>
  );
}
