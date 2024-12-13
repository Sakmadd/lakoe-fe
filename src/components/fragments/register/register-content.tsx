import { Button } from '@/components/ui/button';
import { PasswordInput } from '@/components/ui/password-input';
import { Box, Flex, Image, Input, Link, Span, Text } from '@chakra-ui/react';

export function RegisterContent() {
  return (
    <>
      <Box width={'full'} marginTop={'18vh'}>
        <Flex justifyContent={'center'} margin={'auto'} gap={'2rem'}>
          <Box width={'50%'}>
            <Image src="/register-illustration.svg" />
          </Box>
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
                <Input placeholder="Name" variant="subtle" />
                <Input placeholder="Email" variant="subtle" />
                <PasswordInput placeholder="Password" variant={'subtle'} />
                <Button
                  type="submit"
                  variant={'surface'}
                  backgroundColor={'gray'}
                  color={'white'}
                  _hover={{ backgroundColor: 'gray.700' }}
                >
                  Register
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
                Already have an account?{' '}
                <Span>
                  <Link href="/login">Login</Link>
                </Span>
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
