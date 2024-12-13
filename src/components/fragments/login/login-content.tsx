import { Button } from '@/components/ui/button';
import { PasswordInput } from '@/components/ui/password-input';
import { Box, Flex, Image, Input, Span, Text } from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';

export function LoginContent() {
  return (
    <>
      <Box width={'full'} marginTop={'18vh'}>
        <Flex justifyContent={'center'} margin={'auto'} gap={'2rem'}>
          <Flex width={'30%'} flexDir={'column'} gap={'1rem'}>
            <Box
              width={'100%'}
              padding={'2rem'}
              borderRadius={'lg'}
              border={'3px solid rgb(245, 245, 242)'}
            >
              <Text
                color={'blackAlpha.700'}
                textAlign={'center'}
                fontSize={'4xl'}
                fontWeight={'bold'}
                textDecor={'underline'}
                textDecorationColor={'blackAlpha.400'}
                paddingBottom={'2rem'}
              >
                Lakoe
              </Text>
              <Flex flexDir={'column'} gap={'1.5rem'}>
                <Input placeholder="Email" variant="subtle" />
                <PasswordInput placeholder="Password" variant={'subtle'} />
                <Button
                  type="submit"
                  variant={'surface'}
                  backgroundColor={'gray'}
                  color={'white'}
                  _hover={{ backgroundColor: 'gray.700' }}
                >
                  Login
                </Button>
              </Flex>
            </Box>
            <Box
              width={'100%'}
              padding={'2rem'}
              borderRadius={'lg'}
              border={'3px solid rgb(245, 245, 242)'}
            >
              <Text textAlign={'center'} color={'gray'}>
                Don't have an account yet?{' '}
                <Span color={'gray.900'} fontWeight={'semibold'}>
                  <ReactLink to="/register">Register</ReactLink>
                </Span>
              </Text>
            </Box>
          </Flex>
          <Box width={'45%'}>
            <Image src="/login-illustration.svg" />
          </Box>
        </Flex>
      </Box>
    </>
  );
}
