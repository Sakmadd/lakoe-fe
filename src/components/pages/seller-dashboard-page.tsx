import { MainContent } from '@/layouts/mainContent';
import { DashboardStats } from '../fragments/dashboard/dashboardStats/dashboard-content';

export function DashboardPage() {
  return (
    <>
      <MainContent>
        <DashboardStats />
      </MainContent>
    </>
  );
}
