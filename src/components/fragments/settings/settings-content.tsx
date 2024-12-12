import { ContentContainer } from '../container/contentContainer';
import SettingsColapsable from './settings-colapsable';
import { Text, Box } from '@chakra-ui/react';

export default function SettingsContent() {
  const collapseData = {
    listNav1: [
      {
        title: 'Shop',
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
        <ContentContainer>
          <Text as="h1" fontWeight="bold" fontFamily="sans-serif">
            Settings
          </Text>
        </ContentContainer>
        {collapseData.listNav1.map((data, index) => (
          <SettingsColapsable key={index} title={data.title} nav={data.nav} />
        ))}
      </Box>
    </>
  );
}
