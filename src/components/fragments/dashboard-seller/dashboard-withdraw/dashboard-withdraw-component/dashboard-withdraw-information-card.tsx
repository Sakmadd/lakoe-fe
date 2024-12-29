import { SettingsWithdrawalTypes } from '@/validators/settings/settings-withdrawal';
import { Box, Text } from '@chakra-ui/react';

export default function DashboardWithdrawInformationCard({
  data,
}: {
  data: SettingsWithdrawalTypes;
}) {
  return (
    <Box
      display="flex"
      border="1px solid #e6e6e6"
      borderRadius="1rem"
      padding="1rem"
      gap="2rem"
      justifyContent="space-between"
    >
      <Text fontFamily="sans-serif" fontWeight="semibold">
        Bank Account Used
      </Text>
      <Box display="flex" gap="1.5rem" alignItems="center">
        <Text fontFamily="sans-serif" fontWeight="semibold" fontSize="1rem">
          {data?.name}
        </Text>
        <Text fontFamily="sans-serif" fontSize="0.9rem">
          {data?.account}
        </Text>
        <Text fontFamily="sans-serif" fontSize="0.9rem" fontWeight="semibold">
          {data?.bank}
        </Text>
      </Box>
    </Box>
  );
}
