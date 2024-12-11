import { recipientType } from '@/types/types';
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
import { FieldInput } from '../fragments/product-new/product-new-fields/field-input';
import { FieldInputAddon } from '../fragments/product-new/product-new-fields/field-input-addon';
import { FieldInputDescription } from '../fragments/product-new/product-new-fields/field-input-description';
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from '../ui/accordion';

interface Props {
  register: UseFormRegister<recipientType>;
}

export function CheckoutInformation({ register }: Props) {
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
            registerName={'district'}
            label="Disctrict"
          />
          <FieldInput register={register} registerName={'city'} label="City" />
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
                Order 1
              </AccordionItemTrigger>
              <AccordionItemContent padding={'1rem'}>
                <Flex flexDir={'column'} gap={'1rem'}>
                  <Text>Jakarta Barat</Text>
                  <Flex gap={'1rem'}>
                    <Image
                      src="https://assets.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/2023/01/03/904180906.jpg"
                      maxWidth={'100px'}
                    />
                    <Flex flexDir={'column'}>
                      <Text>HANPDHONE PALING KECE SEJAGT RAYA</Text>
                      <Text fontWeight={'thin'} fontSize={'sm'}>
                        - 2 Items (200gr)
                      </Text>
                      <Text fontWeight={'semibold'}>Rp. 2.000.000</Text>
                    </Flex>
                  </Flex>
                  <Flex flexDir={'column'} gap={'1rem'}>
                    <Separator />
                    <Button
                      maxWidth={'30%'}
                      backgroundColor={'blue.500'}
                      fontWeight={'bold'}
                    >
                      Select Your Shipments
                    </Button>
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
                          Rp. 2.000.000
                        </AccordionItemTrigger>
                        <AccordionItemContent padding={'1rem'}>
                          <Flex
                            backgroundColor={'rgb(249, 250, 251)'}
                            padding={'1rem'}
                            borderRadius={'.5rem'}
                          >
                            <Text color={'grey'}>Subtotal (Items)</Text>
                            <Spacer />
                            <Text color={'grey'}>Rp. 2.000.000</Text>
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
