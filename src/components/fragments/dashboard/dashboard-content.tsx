import { Box, Tabs, Text } from '@chakra-ui/react';
import { ContentContainer } from '../container/contentContainer';
import DashboardActivity from './dashboard-activity';
import DashboardWithdraw from './dashboard-withdraw';

export function DashboardContent() {
  return (
    <>
      <Box display="flex" flexDirection="column" gap="1rem">
        <ContentContainer>
          <Tabs.Root defaultValue="stats">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text fontWeight="semibold" fontFamily="sans-serif" as="h1">
                Dashboard Overview
              </Text>
              <Tabs.List>
                <Tabs.Trigger value="stats">Stats</Tabs.Trigger>
                <Tabs.Trigger value="withdraw">Withdraw</Tabs.Trigger>
              </Tabs.List>
            </Box>
            <Tabs.Content
              value="stats"
              display="flex"
              flexDirection="column"
              gap="1rem"
            >
              <DashboardActivity />
            </Tabs.Content>
            <Tabs.Content
              value="withdraw"
              display="flex"
              flexDirection="column"
              gap="1rem"
            >
              <DashboardWithdraw />
            </Tabs.Content>
          </Tabs.Root>
        </ContentContainer>
      </Box>
    </>
  );
}
