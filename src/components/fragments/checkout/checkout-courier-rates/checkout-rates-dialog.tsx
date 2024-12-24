import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from '@/components/ui/dialog';
import { RatesResponseDTO } from '@/types/rates-type';
import { formatRupiah } from '@/utils/format-rp';
import {
  Flex,
  Image,
  Separator,
  Spacer,
  Spinner,
  Text,
} from '@chakra-ui/react';

interface Props {
  courierRates: RatesResponseDTO[];
  shipSelect: boolean;
  setShipSelect: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedCourierRates: React.Dispatch<
    React.SetStateAction<RatesResponseDTO | null>
  >;
  selectedCourierRates: RatesResponseDTO | null;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CheckoutRatesDialog({
  setShipSelect,
  courierRates,
  selectedCourierRates,
  setSelectedCourierRates,
  isOpen,
  setIsOpen,
}: Props) {
  const handleSelectCourier = (rate: RatesResponseDTO) => {
    setSelectedCourierRates(rate);
    setShipSelect(false);
  };

  return (
    <>
      <DialogRoot
        open={isOpen}
        key={'md'}
        size={'md'}
        scrollBehavior={'inside'}
        motionPreset={'slide-in-bottom'}
      >
        {selectedCourierRates && (
          <Flex
            alignItems={'center'}
            height={'5rem'}
            padding={'1rem'}
            transition={'ease-in-out 100ms'}
            cursor={'pointer'}
            borderRadius={'md'}
            _hover={{
              border: '1px solid black',
              backgroundColor: 'gray.200',
              shadow: 'md',
            }}
          >
            <Image src={selectedCourierRates.courier_image} width={'6rem'} />
            <Flex flexDir={'column'} paddingX={'1rem'}>
              <Text fontWeight={'bold'} fontSize={'md'} color={'gray'}>
                {selectedCourierRates.courier_name}
              </Text>
              <Text>{selectedCourierRates.courier_type}</Text>
            </Flex>
            <Spacer />
            <Text fontWeight={'semibold'}>
              {formatRupiah(selectedCourierRates.price)}
            </Text>
          </Flex>
        )}
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
                <Spinner margin={'auto'} />
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
                    backgroundColor={
                      selectedCourierRates === item ? 'green.100' : 'white'
                    }
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
          <DialogCloseTrigger onClick={() => setIsOpen(!isOpen)} />
        </DialogContent>
      </DialogRoot>
    </>
  );
}
