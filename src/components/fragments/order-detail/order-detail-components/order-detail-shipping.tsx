import { Box, ClipboardTrigger, Text } from '@chakra-ui/react';
import { ContentContainer } from '../../container/contentContainer';
import { ClipboardRoot } from '@/components/ui/clipboard';
import { LuCopy } from 'react-icons/lu';

interface Props {
  courier_company: string | undefined;
  waybill_id: string | undefined;
  address: string | undefined;
}

export default function OrderDetailShipping({
  courier_company,
  waybill_id,
  address,
}: Props) {
  return (
    <ContentContainer>
      <Box display="flex" flexDirection="column" gap="1rem">
        <Text fontWeight="semibold" fontSize="0.9rem">
          Shipping details
        </Text>
        <Box display="flex" gap="4rem" alignItems="center">
          <Box display="flex" flexDirection="column" gap="0.5rem">
            <Text fontWeight="normal" fontSize="0.8rem">
              Courier
            </Text>
            <ClipboardRoot
              value="Tes"
              display="flex"
              alignItems="center"
              gap="0.5rem"
            >
              <Text fontWeight="normal" fontSize="0.8rem">
                Receipt Number
              </Text>
              <ClipboardTrigger color="gray" cursor="pointer">
                <LuCopy />
              </ClipboardTrigger>
            </ClipboardRoot>
            <ClipboardRoot
              value="Tes"
              display="flex"
              alignItems="center"
              gap="0.5rem"
            >
              <Text fontWeight="normal" fontSize="0.8rem">
                Address
              </Text>
              <ClipboardTrigger color="gray" cursor="pointer">
                <LuCopy />
              </ClipboardTrigger>
            </ClipboardRoot>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            gap="0.5rem"
          >
            <Text fontSize="0.8rem" fontWeight="semibold">
              {courier_company}
            </Text>
            <Text fontSize="0.8rem" fontWeight="semibold">
              {waybill_id}
            </Text>
            <Text fontSize="0.8rem">{address ? address : '-'}</Text>
          </Box>
        </Box>
      </Box>
    </ContentContainer>
  );
}
