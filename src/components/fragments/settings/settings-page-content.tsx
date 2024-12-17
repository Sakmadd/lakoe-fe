import SettingsColapsable from './settings-page-components/settings-colapsable';
import { Box } from '@chakra-ui/react';

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
