import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from '@/components/ui/accordion';
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ProductType, recipientType } from '@/types/types';
import { formatRupiah } from '@/utils/format-rp';
import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Separator,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react';
import { UseFormRegister } from 'react-hook-form';
import { LuTags } from 'react-icons/lu';
import { FieldInput } from '../product-new/product-new-fields/field-input';
import { FieldInputAddon } from '../product-new/product-new-fields/field-input-addon';
import { FieldInputDescription } from '../product-new/product-new-fields/field-input-description';

interface Props {
  product: ProductType;
  register: UseFormRegister<recipientType>;
}

export function CheckoutInformation({ register, product }: Props) {
  return (
    <>
      <Flex width={'65%'} flexDir={'column'} gap={'1rem'}>
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
          <FieldInput
            required
            register={register}
            registerName={'province'}
            label="Province"
          />
          <FieldInput
            required
            register={register}
            registerName={'city'}
            label="City"
          />
          <FieldInput
            required
            register={register}
            registerName={'district'}
            label="Disctrict"
          />
          <FieldInput
            required
            register={register}
            registerName={'subdistrict'}
            label="Subdistrict"
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
        <Stack width="full">
          <AccordionRoot
            collapsible
            defaultValue={['info']}
            border={'1px solid red'}
            borderRadius={'.5rem'}
            overflow={'hidden'}
          >
            <AccordionItem key={'info'} value={'info'}>
              <AccordionItemTrigger
                cursor={'pointer'}
                backgroundColor={'red.100'}
                padding={'1rem'}
              >
                <Icon fontSize="lg">
                  <LuTags />
                </Icon>
                Order
              </AccordionItemTrigger>
              <AccordionItemContent padding={'1rem'}>
                <Flex flexDir={'column'} gap={'1rem'}>
                  <Text>Jakarta Barat</Text>
                  <Flex gap={'1rem'}>
                    <Image src={product.images[0].src} maxWidth={'100px'} />
                    <Flex flexDir={'column'}>
                      <Text>{product.name}</Text>
                      <Text fontWeight={'thin'} fontSize={'sm'}>
                        - {product.checkout_quantity} Items (
                        {product.selected_combination!.weight *
                          product.checkout_quantity!}
                        gr)
                      </Text>
                      <Text fontWeight={'semibold'}>
                        {formatRupiah(
                          product.selected_combination!.price *
                            product.checkout_quantity!
                        )}
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex flexDir={'column'} gap={'1rem'}>
                    <Separator />
                    <DialogRoot
                      key={'md'}
                      size={'md'}
                      scrollBehavior={'inside'}
                      motionPreset={'slide-in-bottom'}
                    >
                      <DialogTrigger asChild>
                        <Button
                          maxWidth={'30%'}
                          backgroundColor={'blue.500'}
                          fontWeight={'bold'}
                        >
                          Select Your Shipments
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle textAlign={'center'}>
                            <Text paddingBottom={'1rem'}>
                              Choose Your Shipments
                            </Text>
                            <Separator size={'md'} />
                          </DialogTitle>
                        </DialogHeader>
                        <DialogBody>shitmen</DialogBody>
                        <DialogCloseTrigger />
                      </DialogContent>
                    </DialogRoot>

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
                            product.selected_combination!.price *
                              product.checkout_quantity!
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
                                product.selected_combination!.price *
                                  product.checkout_quantity!
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
      </Flex>
    </>
  );
}
