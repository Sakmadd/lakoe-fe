import { MainContent } from '@/layouts/mainContent';
import { ContentContainer } from '../fragments/container/contentContainer';
import SettingsShopContent from '../fragments/settings/settings-shop-content';

export default function SettingsShop() {
  return (
    <MainContent>
      <ContentContainer>
        <SettingsShopContent />
      </ContentContainer>
    </MainContent>
  );
}
