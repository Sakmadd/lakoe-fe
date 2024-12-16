import { Button } from '@/components/ui/button';
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Box, Image, Input, Text, Textarea } from '@chakra-ui/react';
import 'leaflet/dist/leaflet.css';
import offMaps from '../../../../assets/offmaps.svg';
import onMaps from '../../../../assets/onmaps.svg';
import '../../../../styles/leaftlet.css';
import { Field } from '@/components/ui/field';
import { Tag } from '@/components/ui/tag';
import { Toaster } from '@/components/ui/toaster';
import { FaRegEdit } from 'react-icons/fa';
import { LuTrash } from 'react-icons/lu';
import SettingsLocationMaps from './settings-location-components/settings-location-maps';
import SettingsLocationSelect from './settings-location-components/settings-location-select';
import SettingsDeleteDialog from '../global-settings-components/settings-delete-dialog';
import { useSettLocation } from './settings-template-location-hooks/settings-location';

export default function SettingsLocationContent() {
  const {
    locationComponents,
    locationData,
    locationDialog,
    locationForm,
    locationMutation,
    locationState,
  } = useSettLocation();

  return (
    <Box display="flex" flexDirection="column" gap="1.1rem ">
      <Box
        display="flex"
        justifyContent="space-between"
        marginTop="0.6rem"
        alignItems="center"
      >
        <Box display="flex" gap="0.5rem" alignItems="center">
          <Text
            as="h1"
            fontSize="0.9rem"
            fontWeight="semibold"
            fontFamily="sans-serif"
          >
            Shop's Locations
          </Text>
          <Text fontWeight="lighter" fontSize="0.8rem">
            This address is used as your shipping address
          </Text>
        </Box>
        <DialogRoot
          size="sm"
          placement="center"
          open={locationDialog.openDialog}
        >
          <DialogTrigger asChild>
            <Button
              backgroundColor="transparent"
              color="black"
              border="1px solid gray"
              borderRadius="2rem"
              height="2rem"
              fontSize="0.8rem"
              onClick={() => locationDialog.onOpenDialog('add')}
            >
              Add Location
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form
              onSubmit={locationForm.handleSubmit(
                locationForm.handleSubmitStore
              )}
            >
              <DialogHeader>
                <DialogTitle>
                  {locationDialog.dialogMode == 'add'
                    ? 'Add new location'
                    : 'Edit location'}
                </DialogTitle>
              </DialogHeader>
              <DialogBody
                pb="4"
                display="flex"
                flexDirection="column"
                gap="1rem"
              >
                <Field
                  label="Location Name"
                  invalid={!!locationForm.errors.shop}
                  errorText={locationForm.errors.shop?.message}
                >
                  <Input
                    placeholder="Example Someone Store"
                    {...locationForm.register('shop')}
                  />
                </Field>
                <Field
                  label="City / Regency"
                  invalid={!!locationForm.errors.shop}
                  errorText={locationForm.errors.regency?.message}
                >
                  <SettingsLocationSelect register={locationForm.register} />
                </Field>
                <Field
                  label="Postal Code"
                  invalid={!!locationForm.errors.postal}
                  errorText={locationForm.errors.postal?.message}
                >
                  <Input
                    placeholder="Input Postal Code"
                    {...locationForm.register('postal')}
                  />
                </Field>
                <Field
                  label="Complete address"
                  invalid={!!locationForm.errors.address}
                  errorText={locationForm.errors.address?.message}
                >
                  <Textarea
                    placeholder="Write down the complete address"
                    {...locationForm.register('address')}
                  />
                </Field>
                <Box
                  onClick={() => locationDialog.setOpenMap(true)}
                  cursor="pointer"
                >
                  {locationState.location ? (
                    <Image src={onMaps} />
                  ) : (
                    <Image src={offMaps} />
                  )}
                </Box>
              </DialogBody>
              <DialogFooter
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  {locationDialog.dialogMode != 'add' && (
                    <Button
                      variant="outline"
                      borderRadius="2rem"
                      height="2rem"
                      onClick={() =>
                        locationMutation.handleMain(locationState.id)
                      }
                    >
                      Set as Main
                    </Button>
                  )}
                </Box>
                <Box
                  display="flex"
                  gap="0.5rem"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Button
                    variant="outline"
                    borderRadius="2rem"
                    height="2rem"
                    onClick={locationDialog.onCloseDialog}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="outline"
                    type="submit"
                    borderRadius="2rem"
                    height="2rem"
                  >
                    Save
                  </Button>
                </Box>
              </DialogFooter>
            </form>
          </DialogContent>
        </DialogRoot>
      </Box>
      {locationData.store
        .map((data) => (
          <>
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
                  <Box display="flex" alignItems="center" gap="0.5rem">
                    <Text
                      fontFamily="sans-serif"
                      fontSize="0.8rem"
                      fontWeight="bold"
                    >
                      {data.shop}
                    </Text>
                    {data.main && (
                      <Tag
                        colorPalette="green"
                        variant="solid"
                        fontWeight="semibold"
                      >
                        Main Address
                      </Tag>
                    )}
                  </Box>
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
                    locationDialog.setOpenDeleteDialog(true);
                    locationState.setLocationTitle(data.shop);
                    locationState.setId(data.id);
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
                  onClick={() => {
                    locationDialog.onOpenDialog('edit');
                    locationForm.reset(data);
                    locationState.setId(data.id);
                  }}
                >
                  <FaRegEdit />
                </Button>
              </Box>
            </Box>
          </>
        ))
        .reverse()}
      <DialogRoot size="lg" placement="center" open={locationDialog.openMap}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set your location pin point</DialogTitle>
          </DialogHeader>
          <SettingsLocationMaps
            location={locationState.location}
            PinPoint={locationComponents.PinPoint}
          />
          <DialogFooter>
            <Button
              variant="outline"
              borderRadius="2rem"
              height="2rem"
              onClick={() => locationDialog.setOpenMap(false)}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
      <SettingsDeleteDialog
        id={locationState.id}
        openDeleteDialog={locationDialog.openDeleteDialog}
        setOpenDeleteDialog={locationDialog.setOpenDeleteDialog}
        header={'Delete Address'}
        title={locationState.locationTitle}
        deleteSubmit={locationMutation.handleDelete}
      />
      <Toaster />
    </Box>
  );
}
