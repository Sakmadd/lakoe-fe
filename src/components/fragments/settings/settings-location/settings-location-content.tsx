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
import { Field } from '@/components/ui/field';
import { Tag } from '@/components/ui/tag';
import { Toaster } from '@/components/ui/toaster';
import { Box, Image, Input, Spinner, Text, Textarea } from '@chakra-ui/react';
import 'leaflet/dist/leaflet.css';
import { FaRegEdit } from 'react-icons/fa';
import { LuTrash } from 'react-icons/lu';
import offMaps from '../../../../assets/offmaps.svg';
import onMaps from '../../../../assets/onmaps.svg';
import '../../../../styles/leaftlet.css';
import SettingsDeleteDialog from '../global-settings-components/settings-delete-dialog';
import SettingsLocationMaps from './settings-location-components/settings-location-maps';
import SettingsLocationSelectGroup from './settings-location-components/settings-location-select/settings-location-select-group';
import { useSettLocation } from './settings-template-location-hooks/settings-location';
import SettingsEmptyContent from '../global-settings-components/settings-empty-content';

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
          size="lg"
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
              _active={{ transform: 'scale(0.95)' }}
              onClick={() => locationDialog.onOpenDialog('add')}
            >
              Add Location
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form
              onSubmit={locationForm.handleSubmit(
                locationForm.handleSubmitStore,
                (error) => console.log(error)
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
                  invalid={!!locationForm.errors.name}
                  errorText={locationForm.errors.name?.message}
                >
                  <Input
                    placeholder="Example Someone Store"
                    {...locationForm.register('name')}
                  />
                </Field>
                <SettingsLocationSelectGroup
                  errors={locationForm.errors}
                  watch={locationForm.watch}
                  control={locationForm.control}
                />
                <Field
                  label="Postal Code"
                  invalid={!!locationForm.errors.postal_code}
                  errorText={locationForm.errors.postal_code?.message}
                >
                  <Input
                    placeholder="Input Postal Code"
                    {...locationForm.register('postal_code')}
                  />
                </Field>
                <Field
                  label="Complete address"
                  invalid={!!locationForm.errors.address}
                  errorText={locationForm.errors.address?.message}
                >
                  <Textarea
                    rows={5}
                    placeholder="Write down the complete address"
                    {...locationForm.register('address')}
                  />
                </Field>
                <Box
                  onClick={() => locationDialog.setOpenMap(true)}
                  cursor="pointer"
                >
                  {locationState.location ? (
                    <Image src={onMaps} width="100%" />
                  ) : (
                    <Image src={offMaps} width="100%" />
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
                      _active={{ transform: 'scale(0.95)' }}
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
                    _active={{ transform: 'scale(0.95)' }}
                    onClick={locationDialog.onCloseDialog}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="outline"
                    type="submit"
                    borderRadius="2rem"
                    height="2rem"
                    _active={{ transform: 'scale(0.95)' }}
                    loading={locationForm.addIsPending}
                  >
                    Save
                  </Button>
                </Box>
              </DialogFooter>
            </form>
          </DialogContent>
        </DialogRoot>
      </Box>
      {locationData.FetchingLocationData && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="10rem"
        >
          <Spinner size="xl" />
        </Box>
      )}
      {!locationData.FetchingLocationData &&
        locationData.store
          ?.map((data) => (
            <>
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
                      <Text
                        fontFamily="sans-serif"
                        fontSize="0.8rem"
                        fontWeight="bold"
                      >
                        {data.name}
                      </Text>
                      {data.is_main && (
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
                      locationDialog.setOpenDeleteDialog(true);
                      locationState.setLocationTitle(data.name);
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
                    _active={{ transform: 'scale(0.95)' }}
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
              _active={{ transform: 'scale(0.95)' }}
              onClick={() => locationDialog.setOpenMap(false)}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
      <SettingsDeleteDialog
        pendingDelete={locationDialog.pendingDelete}
        id={locationState.id}
        openDeleteDialog={locationDialog.openDeleteDialog}
        setOpenDeleteDialog={locationDialog.setOpenDeleteDialog}
        header={'Delete Address'}
        title={locationState.locationTitle}
        deleteSubmit={locationMutation.handleDelete}
      />
      {locationData.store?.length == 0 && (
        <SettingsEmptyContent content={"You haven't set your location yet"} />
      )}
      <Toaster />
    </Box>
  );
}
