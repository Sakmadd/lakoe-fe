import { Button } from '@/components/ui/button';
import { SettingsLocationType } from '@/validators/settings-location';
import { Box, Text } from '@chakra-ui/react';
import { FaRegEdit } from 'react-icons/fa';
import { LuTrash } from 'react-icons/lu';

interface Props {
  data: SettingsLocationType;
  handleDelete: (a: string) => void;
}

export default function SettingsLocationBox({ data, handleDelete }: Props) {
  return (
    <Box
      border="1px solid #e6e6e6"
      display="flex"
      padding="0.8rem"
      borderRadius="1rem"
      justifyContent="space-between"
    >
      <Box display="flex" gap="3rem">
        <Box display="flex" flexDirection="column" gap="0.3rem">
          <Text fontFamily="sans-serif" fontSize="0.8rem">
            Location Name
          </Text>
          <Text fontFamily="sans-serif" fontSize="0.8rem">
            Address
          </Text>
          <Text fontFamily="sans-serif" fontSize="0.8rem">
            City / Subdistrict
          </Text>
          <Text fontFamily="sans-serif" fontSize="0.8rem">
            Postal Code
          </Text>
          <Text fontFamily="sans-serif" fontSize="0.8rem">
            Pinpoint
          </Text>
        </Box>
        <Box display="flex" flexDirection="column" gap="0.3rem">
          <Text fontFamily="sans-serif" fontSize="0.8rem" fontWeight="bold">
            {data.shop}
          </Text>
          <Text fontFamily="sans-serif" fontSize="0.8rem">
            {data.address}
          </Text>
          <Text fontFamily="sans-serif" fontSize="0.8rem">
            {data.regency}
          </Text>
          <Text fontFamily="sans-serif" fontSize="0.8rem">
            {data.postal}
          </Text>
          <Text fontFamily="sans-serif" fontSize="0.8rem">
            {data.location ? 'Already pin point' : 'No pin point'}
          </Text>
        </Box>
      </Box>
      <Box display="flex" gap="0.5rem">
        <Button
          backgroundColor="transparent"
          color="gray"
          border="1px solid #e6e6e6"
          borderRadius="50%"
          width="1rem"
          onClick={() => {
            handleDelete(data.id);
          }}
        >
          <LuTrash />
        </Button>
        <Button
          backgroundColor="transparent"
          color="gray"
          border="1px solid #e6e6e6"
          borderRadius="50%"
          width="1rem"
        >
          <FaRegEdit />
        </Button>
      </Box>
    </Box>
  );
}
