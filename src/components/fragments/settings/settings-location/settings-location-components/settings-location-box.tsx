import { Button } from '@/components/ui/button';
import { Tag } from '@/components/ui/tag';
import { SettingsLocationType } from '@/validators/settings/settings-location';
import { Box, Text } from '@chakra-ui/react';
import { UseFormReset } from 'react-hook-form';
import { FaRegEdit } from 'react-icons/fa';
import { LuTrash } from 'react-icons/lu';

interface Props {
  data: SettingsLocationType;
  onOpenDialog: (a: string) => void;
  reset: UseFormReset<SettingsLocationType>;
  setId: (a: string | undefined) => void;
  setLocationTitle: (a: string) => void;
  setOpenDeleteDialog: (a: boolean) => void;
}

export default function SettingsLocationBox({
  setOpenDeleteDialog,
  setLocationTitle,
  data,
  onOpenDialog,
  reset,
  setId,
}: Props) {
  return (
    <Box
      key={data.id}
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
            Province
          </Text>
          <Text fontFamily="sans-serif" fontSize="0.8rem">
            City
          </Text>
          <Text fontFamily="sans-serif" fontSize="0.8rem">
            District
          </Text>
          <Text fontFamily="sans-serif" fontSize="0.8rem">
            Subdistrict
          </Text>
          <Text fontFamily="sans-serif" fontSize="0.8rem">
            Address
          </Text>
          <Text fontFamily="sans-serif" fontSize="0.8rem">
            Postal Code
          </Text>
          <Text fontFamily="sans-serif" fontSize="0.8rem">
            Pinpoint
          </Text>
        </Box>
        <Box display="flex" flexDirection="column" gap="0.3rem">
          <Box display="flex" alignItems="center" gap="0.5rem">
            <Text fontFamily="sans-serif" fontSize="0.8rem" fontWeight="bold">
              {data.name}
            </Text>
            {data.is_main && (
              <Tag colorPalette="green" variant="solid" fontWeight="semibold">
                Main Address
              </Tag>
            )}
          </Box>
          <Text fontFamily="sans-serif" fontSize="0.8rem">
            {data.province}
          </Text>
          <Text fontFamily="sans-serif" fontSize="0.8rem">
            {data.city}
          </Text>
          <Text fontFamily="sans-serif" fontSize="0.8rem">
            {data.district}
          </Text>
          <Text fontFamily="sans-serif" fontSize="0.8rem">
            {data.subdistrict}
          </Text>
          <Text fontFamily="sans-serif" fontSize="0.8rem">
            {data.address}
          </Text>
          <Text fontFamily="sans-serif" fontSize="0.8rem">
            {data.postal_code}
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
          _active={{ transform: 'scale(0.95)' }}
          onClick={() => {
            setOpenDeleteDialog(true);
            setLocationTitle(data.name);
            setId(data.id);
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
          _active={{ transform: 'scale(0.95)' }}
          onClick={() => {
            onOpenDialog('edit');
            reset(data);
            setId(data.id);
          }}
        >
          <FaRegEdit />
        </Button>
      </Box>
    </Box>
  );
}
