import { Box, Text } from '@chakra-ui/react';
import { ContentContainer } from '../../container/contentContainer';
import moment from 'moment';

interface Props {
  created_at: string | undefined;
  invoice_number: string | undefined;
  name: string | undefined;
}

export default function OrderDetailBuyer({
  created_at,
  invoice_number,
  name,
}: Props) {
  return (
    <ContentContainer>
      <Box display="flex">
        <Box
          display="flex"
          flexDirection="column"
          width="50%"
          justifyContent="space-between"
          gap="0.7rem"
        >
          <Text fontWeight="semibold" fontSize="0.9rem">
            Date
          </Text>
          <Text fontWeight="semibold" fontSize="0.9rem">
            Invoice
          </Text>
          <Text fontWeight="semibold" fontSize="0.9rem">
            Buyer
          </Text>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="end"
          justifyContent="space-between"
          width="50%"
        >
          <Text fontWeight="light" fontSize="0.8rem">
            {moment(created_at).format('MMM Do YY')}
          </Text>
          <Text fontWeight="light" fontSize="0.8rem">
            {invoice_number}
          </Text>
          <Text fontWeight="light" fontSize="0.8rem">
            {name}
          </Text>
        </Box>
      </Box>
    </ContentContainer>
  );
}
