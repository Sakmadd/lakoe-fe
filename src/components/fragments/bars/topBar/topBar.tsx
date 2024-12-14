import { Avatar } from '@/components/ui/avatar';
import { InputGroup } from '@/components/ui/input-group';
import { TopBarlayout } from '@/layouts/bars/topBarLayout';
import {
  Flex,
  Input,
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { CgProfile } from 'react-icons/cg';
import { LuSearch } from 'react-icons/lu';
import { MdOutlineAssignmentInd } from 'react-icons/md';
import {
  RiLoginBoxLine,
  RiLogoutBoxLine,
  RiShoppingBag4Line,
} from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';

interface Props {
  display?: string;
}

export function TopBar({ display }: Props) {
  const navigate = useNavigate();
  const loggedUser = null;

  return (
    <>
      <TopBarlayout display={display}>
        <Flex
          width={'full'}
          justifyContent={'space-between'}
          paddingX={'2%'}
          paddingY={'.5%'}
        >
          <Link to="/">
            <Flex alignItems={'center'}>
              <RiShoppingBag4Line size={'40px'} />
              <Text
                fontWeight={'bold'}
                fontSize={'2xl'}
                textDecoration={'underline'}
                textUnderlineOffset={3}
                textDecorationColor={'rgba(230, 230, 230, 1)'}
              >
                Lakoe
              </Text>
            </Flex>
          </Link>
          <InputGroup maxWidth={'50%'} flex="1" startElement={<LuSearch />}>
            <Input placeholder="Search " />
          </InputGroup>
          <MenuRoot>
            <MenuTrigger asChild>
              <Avatar
                name="Segun Adebayo"
                src={
                  loggedUser ? 'https://bit.ly/dan-abramov' : '/anon-avatar.png'
                }
                cursor={'pointer'}
              />
            </MenuTrigger>
            <MenuContent pos={'absolute'} right={'3'} top={'16'}>
              {loggedUser ? (
                <>
                  <MenuItem
                    value="profile"
                    cursor={'pointer'}
                    onClick={() => navigate('/profile')}
                  >
                    Profile
                    <Spacer />
                    <CgProfile />
                  </MenuItem>
                  <MenuItem value="logout" cursor={'pointer'}>
                    Logout
                    <Spacer />
                    <RiLogoutBoxLine />
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem
                    value="register"
                    cursor={'pointer'}
                    onClick={() => navigate('/register')}
                  >
                    Register
                    <Spacer />
                    <MdOutlineAssignmentInd />
                  </MenuItem>
                  <MenuItem
                    value="login"
                    cursor={'pointer'}
                    onClick={() => navigate('/login')}
                  >
                    Login
                    <Spacer />
                    <RiLoginBoxLine />
                  </MenuItem>
                </>
              )}
            </MenuContent>
          </MenuRoot>
        </Flex>
      </TopBarlayout>
    </>
  );
}
