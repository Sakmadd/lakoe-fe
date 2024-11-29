import { Button } from '../ui/button';

export default function ButtonGue() {
  return (
    <Button
      onClick={() => {
        alert('Kurang kerjaan di pencet pencet');
      }}
    >
      Pencet
    </Button>
  );
}
