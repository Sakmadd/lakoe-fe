import { MainContent } from '@/layouts/mainContent';
import { ContentContainer } from '../fragments/container/contentContainer';
import { DashboardStats } from '../fragments/dsahboard/dashboardStats/dashboardStats';

export function DashboardPage() {
  return (
    <>
      <MainContent>
        <ContentContainer>
          <DashboardStats />
        </ContentContainer>
      </MainContent>
    </>
  );
}
