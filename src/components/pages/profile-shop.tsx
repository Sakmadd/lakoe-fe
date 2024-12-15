import { MainContent } from '@/layouts/mainContent';
import { ContentContainer } from '../fragments/container/contentContainer';
import ProfileShopMeContent from '../fragments/profile/profile-shop-me-content';

export default function ProfileShop() {
  return (
    <MainContent>
      <ContentContainer>
        <ProfileShopMeContent />
      </ContentContainer>
    </MainContent>
  );
}
