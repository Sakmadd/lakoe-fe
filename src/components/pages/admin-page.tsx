import { MainContent } from '@/layouts/mainContent';
import { ContentContainer } from '../fragments/container/contentContainer';
import AdminContent from '../fragments/admin/admin-content';

export function AdminPage() {
  return (
    <MainContent>
      <ContentContainer>
        <AdminContent />
      </ContentContainer>
    </MainContent>
  );
}
