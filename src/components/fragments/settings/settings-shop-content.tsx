import { Box, Text } from '@chakra-ui/react';
import { Tabs } from '@chakra-ui/react';
import SettingsLocation from './settings-location';
import SettingsTemplateMessage from './settings-template-message';
import SettingsInformation from './settings-information';
import { useSettInfo } from './settings-information/settings-information-hooks/settings-information2';

export default function SettingsShopContent() {
  const { data } = useSettInfo();

  return (
    <Box>
      <>
        <Text
          marginBottom="0.5rem"
          as="h1"
          fontWeight="semibold"
          fontFamily="sans-serif"
        >
          {data?.name}
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
            <SettingsTemplateMessage />
          </Tabs.Content>
        </Tabs.Root>
      </>
      {/* )} */}
    </Box>
  );
}
