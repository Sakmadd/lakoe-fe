import { Box, Text } from '@chakra-ui/react';
import { Tabs } from '@chakra-ui/react';
import SettingsInformation from './settings-information';
import SettingsLocation from './settings-location';

export default function SettingsShopContent() {
  return (
    <Box>
      <Text
        marginBottom="0.5rem"
        as="h1"
        fontWeight="semibold"
        fontFamily="sans-serif"
      >
        Someone Store
      </Text>
      <Tabs.Root defaultValue="information">
        <Tabs.List>
          <Tabs.Trigger value="information">Information</Tabs.Trigger>
          <Tabs.Trigger value="location">Location</Tabs.Trigger>
          <Tabs.Trigger value="template">Template</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="information">
          <SettingsInformation />
        </Tabs.Content>
        <Tabs.Content value="location">
          <SettingsLocation />
        </Tabs.Content>
        <Tabs.Content value="template">
          <Text>Template tabs</Text>
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
}
