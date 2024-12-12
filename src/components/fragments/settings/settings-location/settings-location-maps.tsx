import { DialogBody } from '@chakra-ui/react/dialog';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

interface Props {
  location:
    | {
        lat: number;
        lng: number;
      }
    | undefined
    | null;
  PinPoint: () => null;
}

export default function SettingsLocationMaps({ location, PinPoint }: Props) {
  return (
    <DialogBody pb="4" display="flex" flexDirection="column" gap="1rem">
      <MapContainer
        center={location ? location : [-6.381217458239561, 106.74980642781192]}
        zoom={13}
      >
        <TileLayer
          attribution="Google Maps"
          url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" // regular
          // url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}" // satellite
          // url="http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}.png" // terrain
          maxZoom={20}
          subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
        />
        <PinPoint />
        {location && <Marker position={location} />}
      </MapContainer>
    </DialogBody>
  );
}
