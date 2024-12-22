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
import { Button, Flex, Image, Separator, Text } from '@chakra-ui/react';
import { useState } from 'react';

interface Props {
  courierRates: RatesResponseDTO[];
  shipSelect: boolean;
  setShipSelect: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CheckoutRatesDialog({ setShipSelect, courierRates }: Props) {
  const [selectedCourierRates, setSelectedCourierRates] =
    useState<RatesResponseDTO | null>(null);

  const handleSelectCourier = (rate: RatesResponseDTO) => {
    setSelectedCourierRates(rate);
    setShipSelect(false); // Menutup dialog setelah memilih kurir
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
            type="button"
          >
            {selectedCourierRates
              ? `Selected: ${selectedCourierRates.courier_name} (${selectedCourierRates.courier_type})`
              : 'Select Your Shipments'}
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
            <Flex gap={'1rem'} flexDir={'column'}>
              {courierRates.map((rate) => (
                <Button
                  key={rate.courier_code + rate.courier_type}
                  onClick={() => handleSelectCourier(rate)}
                  backgroundColor={
                    selectedCourierRates?.courier_code === rate.courier_code &&
                    selectedCourierRates?.courier_type === rate.courier_type
                      ? 'green.200'
                      : 'gray.100'
                  }
                  border="1px solid"
                  borderColor="gray.300"
                  padding="1rem"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  textAlign="left"
                >
                  <Flex alignItems="center" gap={3}>
                    <Image
                      src={rate.courier_image}
                      alt={rate.courier_name}
                      boxSize="50px"
                    />
                    <Flex flexDir="column">
                      <Text fontWeight="bold">{rate.courier_name}</Text>
                      <Text fontSize="sm" color="gray.600">
                        {rate.courier_type}
                      </Text>
                    </Flex>
                  </Flex>
                  <Text fontWeight="bold" color="blue.500">
                    Rp {rate.price.toLocaleString('id-ID')}
                  </Text>
                </Button>
              ))}
            </Flex>
          </DialogBody>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </>
  );
}
