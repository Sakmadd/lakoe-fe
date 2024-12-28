import { Toaster } from '@/components/ui/toaster';
import { Box, Spinner, Text } from '@chakra-ui/react';
import 'leaflet/dist/leaflet.css';
import '../../../../styles/leaftlet.css';
import SettingsDeleteDialog from '../global-settings-components/settings-delete-dialog';
import SettingsEmptyContent from '../global-settings-components/settings-empty-content';
import SettingsLocationBox from './settings-location-components/settings-location-box';
import SettingsLocationMapsDialog from './settings-location-components/settings-location-maps-dialog';
import { useSettLocation } from './settings-location-hooks/settings-location';
import SettingsLocationFormDialog from './settings-location-components/settings-location-form-dialog';

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
        <SettingsLocationFormDialog
          register={locationForm.register}
          openDialog={locationDialog.openDialog}
          onOpenDialog={locationDialog.onOpenDialog}
          handleSubmit={locationForm.handleSubmit}
          handleSubmitStore={locationForm.handleSubmitStore}
          dialogMode={locationDialog.dialogMode}
          errors={locationForm.errors}
          watch={locationForm.watch}
          control={locationForm.control}
          setOpenMap={locationDialog.setOpenMap}
          location={locationState.location}
          handleMain={locationMutation.handleMain}
          onCloseDialog={locationDialog.onCloseDialog}
          addIsPending={locationForm.addIsPending}
          id={locationState.id}
        />
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
            <SettingsLocationBox
              data={data}
              setOpenDeleteDialog={locationDialog.setOpenDeleteDialog}
              onOpenDialog={locationDialog.onOpenDialog}
              reset={locationForm.reset}
              setId={locationState.setId}
              setLocationTitle={locationState.setLocationTitle}
            />
          ))
          .reverse()}
      <SettingsLocationMapsDialog
        setOpenMap={locationDialog.setOpenMap}
        openMap={locationDialog.openMap}
        PinPoint={locationComponents.PinPoint}
        location={locationState.location}
      />
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
