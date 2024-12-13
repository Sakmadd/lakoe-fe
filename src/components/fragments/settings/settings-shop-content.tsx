import { Box, Text } from '@chakra-ui/react';
import { Tabs } from '@chakra-ui/react';
import SettingsInformation2 from './settings-information/settings-infromation-2';
import SettingsLocation from './settings-location';
import SettingsTemplateMessage from './settings-template-message/settings-template-message';

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
          <SettingsInformation2 />
        </Tabs.Content>
        <Tabs.Content value="location">
          <SettingsLocation />
        </Tabs.Content>
        <Tabs.Content value="template">
          <SettingsTemplateMessage />
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
}
