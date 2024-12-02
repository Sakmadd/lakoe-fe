import { Button } from '@chakra-ui/react';

interface Props {
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export function ProductItemButton({ children, icon }: Props) {
  return (
    <>
      <Button
        colorPalette={'gray'}
        variant="outline"
        borderRadius={'full'}
        size={'xs'}
        fontWeight={'semibold'}
      >
        {icon}
        {children}
      </Button>
    </>
  );
}
