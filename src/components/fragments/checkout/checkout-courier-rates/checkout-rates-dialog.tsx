import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { RatesResponseDTO } from '@/types/rates-type';
import { formatRupiah } from '@/utils/format-rp';
import {
  Button,
  Flex,
  Image,
  Separator,
  Spacer,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface Props {
  courierRates: RatesResponseDTO[];
  shipSelect: boolean;
  setShipSelect: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CheckoutRatesDialog({ setShipSelect, courierRates }: Props) {
  const [selectedCourierRates, setSelectedCourierRates] =
    useState<RatesResponseDTO | null>(null);

  useEffect(() => {
    console.log(selectedCourierRates);
  });

  const handleSelectCourier = (rate: RatesResponseDTO) => {
    setSelectedCourierRates(rate);
    setShipSelect(false);
  };

  return (
    <>
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
            type="submit"
          >
            Select Your Shipments
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle textAlign={'center'}>
              <Text paddingBottom={'1rem'}>Choose Your Shipments</Text>
              <Separator size={'md'} />
            </DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Flex flexDir={'column'} gap={'.5rem'}>
              {courierRates.length < 1 ? (
                <Spinner />
              ) : (
                courierRates.map((item) => (
                  <Flex
                    alignItems={'center'}
                    height={'5rem'}
                    padding={'1rem'}
                    transition={'ease-in-out 100ms'}
                    cursor={'pointer'}
                    borderRadius={'md'}
                    onClick={() => handleSelectCourier(item)}
                    _hover={{
                      border: '1px solid black',
                      backgroundColor: 'gray.200',
                      shadow: 'md',
                    }}
                  >
                    <Image src={item.courier_image} width={'6rem'} />
                    <Flex flexDir={'column'} paddingX={'1rem'}>
                      <Text fontWeight={'bold'} fontSize={'md'} color={'gray'}>
                        {item.courier_name}
                      </Text>
                      <Text>{item.courier_type}</Text>
                    </Flex>
                    <Spacer />
                    <Text fontWeight={'semibold'}>
                      {formatRupiah(item.price)}
                    </Text>
                  </Flex>
                ))
              )}
            </Flex>
          </DialogBody>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </>
  );
}
