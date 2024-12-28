import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from '@/components/ui/dialog';
import SettingsLocationMaps from './settings-location-maps';

interface Props {
  openMap: boolean;
  location:
    | {
        lat: number;
        lng: number;
      }
    | null
    | undefined;
  PinPoint: () => null;
  setOpenMap: (a: boolean) => void;
}

export default function SettingsLocationMapsDialog({
  openMap,
  location,
  PinPoint,
  setOpenMap,
}: Props) {
  return (
    <DialogRoot size="lg" placement="center" open={openMap}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set your location pin point</DialogTitle>
        </DialogHeader>
        <SettingsLocationMaps location={location} PinPoint={PinPoint} />
        <DialogFooter>
          <Button
            variant="outline"
            borderRadius="2rem"
            height="2rem"
            _active={{ transform: 'scale(0.95)' }}
            onClick={() => setOpenMap(false)}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}
