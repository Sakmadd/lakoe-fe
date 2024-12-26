import { RightBarlayout } from '@/layouts/bars/rightLayoutBar';
import { Box, Image, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function SideBar() {
  const [state, setState] = useState<boolean>(false);

  return (
    <>
      <Box onClick={() => setState(!state)}>
        <RightBarlayout>
          <Text display={state ? 'none' : 'block'}>Kosong</Text>
          <Box
            display={state ? 'flex' : 'none'}
            flexDir={'column'}
            gap={'1rem'}
          >
            <Link
              to="https://youtube.com/clip/UgkxhnLnUSWx5BpcFbF8onAGhK7llxkyyiHY?si=v6GeU7nhcf55r7rM"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="https://media.tenor.com/AHnlkOVUHioAAAAM/gacor.gif"
                alt="Click to open YouTube"
              />
            </Link>
            <Image
              src={
                'https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/esensi/2023/08/slot1.gif'
              }
            />
            <Image
              src={
                'https://obattahanlamaberhubungan.wordpress.com/wp-content/uploads/2015/07/foredi-gel-rekomendasi-boyke.gif'
              }
            />
          </Box>
        </RightBarlayout>
      </Box>
    </>
  );
}
