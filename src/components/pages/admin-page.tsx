import { MainContent } from '@/layouts/mainContent';
import { ContentContainer } from '../fragments/container/contentContainer';
import { Text } from '@chakra-ui/react';

export function AdminPage() {
  return (
    <MainContent>
      <ContentContainer>
        <Text>Admin</Text>
      </ContentContainer>
    </MainContent>
  );
}
