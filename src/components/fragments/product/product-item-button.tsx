import { Button } from '@chakra-ui/react';

interface Props {
  icon?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: () => void;
}

export function ProductItemButton({ children, icon, onClick }: Props) {
  return (
    <>
      <Button
        colorPalette={'gray'}
        variant="outline"
        borderRadius={'full'}
        size={'xs'}
        fontWeight={'semibold'}
        onClick={onClick}
      >
        {icon}
        {children}
      </Button>
    </>
  );
}
