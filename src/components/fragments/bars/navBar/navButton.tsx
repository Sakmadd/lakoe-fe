import { Button } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';

interface navButonProps {
  children: React.ReactNode;
  text: string;
  href?: string;
}

export function NavButton({ children, text, href }: navButonProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <Button
        variant={location.pathname === href ? 'subtle' : 'ghost'}
        width={'100%'}
        justifyContent={'flex-start'}
        onClick={() => navigate(href ?? '')}
      >
        {children}
        {text}
      </Button>
    </>
  );
}
