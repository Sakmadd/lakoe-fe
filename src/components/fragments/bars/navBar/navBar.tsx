import { LeftBarLayout } from '@/layouts/bars/leftBarLayout';
import { Flex, Spacer } from '@chakra-ui/react';
import { TbDashboard, TbSettings2, TbSmartHome } from 'react-icons/tb';
import { NavButton } from './navButton';
import { AiOutlineProduct } from 'react-icons/ai';
import { LuShoppingBasket } from 'react-icons/lu';

export function NavBar() {
  return (
    <>
      <LeftBarLayout>
        <Flex
          width={'100%'}
          height={'100%'}
          justifyContent={'flex-start'}
          fontSize={'1.5rem'}
          flexDir={'column'}
          gap={'.2rem'}
        >
          <NavButton text="Home" href="/">
            <TbSmartHome />
          </NavButton>
          <NavButton text="Dashboard" href="/dashboard">
            <TbDashboard />
          </NavButton>
          <NavButton text="Product" href="/products">
            <AiOutlineProduct />
          </NavButton>
          <NavButton text="Order" href="/orders">
            <LuShoppingBasket />
          </NavButton>
          <Spacer />
          <NavButton text="Settings" href="/settings">
            <TbSettings2 />
          </NavButton>
        </Flex>
      </LeftBarLayout>
    </>
  );
}
