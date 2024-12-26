import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from '@/components/ui/accordion';
import { Product } from '@/types/product-type';
import { RatesResponseDTO } from '@/types/rates-type';
import { formatRupiah } from '@/utils/format-rp';
import {
  Button,
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

interface Props {
  courierRates: RatesResponseDTO[];
  selectedCourierRates: RatesResponseDTO | null;
  setSelectedCourierRates: React.Dispatch<
    React.SetStateAction<RatesResponseDTO | null>
  >;
  product: Product;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CheckoutOrderDetail({
  product,
  courierRates,
  selectedCourierRates,
  setSelectedCourierRates,
  isOpen,
  setIsOpen,
}: Props) {
  const [shipSelect, setShipSelect] = useState<boolean>(true);

  return (
    <>
      <Stack width="full">
        <AccordionRoot
          collapsible
          defaultValue={['info']}
          border={shipSelect ? '1px solid red' : '1px solid green'}
          borderRadius={'.5rem'}
          overflow={'hidden'}
        >
          <AccordionItem key={'info'} value={'info'}>
            <AccordionItemTrigger
              cursor={'pointer'}
              backgroundColor={shipSelect ? 'red.100' : 'green.100'}
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
                  <Button
                    maxWidth={'30%'}
                    backgroundColor={'blue.500'}
                    fontWeight={'bold'}
                    type="submit"
                  >
                    Select Your Shipments
                  </Button>
                  <CheckoutRatesDialog
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    selectedCourierRates={selectedCourierRates}
                    setSelectedCourierRates={setSelectedCourierRates}
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
                          product.price * product.checkout_quantity! +
                            (selectedCourierRates
                              ? selectedCourierRates.price
                              : 0)
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
                        {selectedCourierRates && (
                          <Flex
                            backgroundColor={'rgb(249, 250, 251)'}
                            padding={'1rem'}
                            borderRadius={'.5rem'}
                          >
                            <Text color={'grey'}>
                              Courier rates ({selectedCourierRates.courier_name}
                              )
                            </Text>
                            <Spacer />
                            <Text color={'grey'}>
                              {formatRupiah(selectedCourierRates.price)}
                            </Text>
                          </Flex>
                        )}
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
