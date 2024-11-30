import { Avatar } from '@/components/ui/avatar';
import { InputGroup } from '@/components/ui/input-group';
import { TopBarlayout } from '@/layouts/bars/topBarLayout';
import {
  Flex,
  Input,
  Link,
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from '@chakra-ui/react';
import { LuSearch } from 'react-icons/lu';
import { RiShoppingBag4Line } from 'react-icons/ri';

export function TopBar() {
  return (
    <>
      <TopBarlayout>
        <Flex
          width={'full'}
          justifyContent={'space-between'}
          paddingX={'3%'}
          paddingY={'.5%'}
        >
          <Link href="/">
            <RiShoppingBag4Line size={'40px'} />
          </Link>
          <InputGroup maxWidth={'50%'} flex="1" startElement={<LuSearch />}>
            <Input placeholder="Search " />
          </InputGroup>
          <MenuRoot>
            <MenuTrigger asChild>
              <Avatar
                name="Segun Adebayo"
                src="https://bit.ly/sage-adebayo"
                cursor={'pointer'}
              />
            </MenuTrigger>
            <MenuContent pos={'absolute'} right={'3'} top={'14'}>
              <MenuItem value="profile" cursor={'pointer'}>
                Profile
              </MenuItem>
              <MenuItem value="register" cursor={'pointer'}>
                Register
              </MenuItem>
              <MenuItem value="login" cursor={'pointer'}>
                Login
              </MenuItem>
              <MenuItem value="logout" cursor={'pointer'}>
                Logout
              </MenuItem>
            </MenuContent>
          </MenuRoot>
        </Flex>
      </TopBarlayout>
    </>
  );
}
