import { Box } from '@chakra-ui/react';
import SettingsColapsable from './settings-colapsable';

export default function SettingsContent() {
  const collapseData = {
    listNav1: [
      {
        title: 'Settings',
        nav: [
          { text: 'Shop Settings', path: '/settings/shop' },
          { text: 'Delivery Settings', path: '/' },
          { text: 'Payment Method Settings', path: '/' },
        ],
      },
    ],
  };

  return (
    <>
      <Box display="flex" flexDirection="column" gap="1rem">
        {collapseData.listNav1.map((data, index) => (
          <SettingsColapsable key={index} title={data.title} nav={data.nav} />
        ))}
      </Box>
    </>
  );
}
