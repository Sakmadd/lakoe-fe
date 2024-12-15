import { Avatar } from '@/components/ui/avatar';
import { Box, Button, Tabs, Text, Collapsible } from '@chakra-ui/react';
import { ProductList } from '../product-detail/product-list';
import { Tooltip } from '@/components/ui/tooltip';
import { LuStore } from 'react-icons/lu';

export default function ProfileShopMeContent() {
  return (
    <Box display="flex" flexDirection="column" gap="1rem">
      <Collapsible.Root>
        <Box
          display="flex"
          justifyContent="space-between"
          padding="1rem"
          alignItems="center"
        >
          <Box
            display="flex"
            gap="1rem"
            borderRadius="1rem"
            alignItems="center"
            width="100%"
          >
            <Avatar
              border="1px solid white"
              src="https://picsum.photos/200/300"
              width="5rem"
              height="5rem"
            />
            <Box display="flex" flexDirection="column" gap="0.5rem">
              <Text
                as="h1"
                fontFamily="sans-serif"
                fontSize="1.4rem"
                fontWeight="semibold"
              >
                Toko Ganteng
              </Text>
              <Box display="flex" gap="0.5rem">
                <Button
                  bg="transparent"
                  color="black"
                  borderRadius="0.8rem"
                  border="1px solid gray"
                  height="2.1rem"
                >
                  Contact Seller
                </Button>
                <Collapsible.Trigger cursor="pointer">
                  <Tooltip
                    content="Store Info"
                    showArrow
                    positioning={{ placement: 'top' }}
                  >
                    <Button
                      bg="transparent"
                      color="gray"
                      border="1px solid gray"
                      width="1rem"
                      height="2rem"
                      borderRadius="0.8rem"
                    >
                      <LuStore />
                    </Button>
                  </Tooltip>
                </Collapsible.Trigger>
              </Box>
            </Box>
          </Box>
          <Box
            display="flex"
            // border="1px solid black"
            width="25rem"
            alignItems="center"
            // justifyContent="center"
          >
            <Text
              fontSize="1rem"
              fontFamily="sans-serif"
              borderRight="1px solid #e6e6e6"
              paddingRight="1rem"
            >
              Main Location
            </Text>
            <Text fontSize="1rem" fontFamily="sans-serif" padding="0rem 1rem">
              City
            </Text>
            <Text
              fontSize="1rem"
              fontFamily="sans-serif"
              borderLeft="1px solid #e6e6e6"
              paddingLeft="1rem"
            >
              Address
            </Text>
          </Box>
        </Box>
        <Collapsible.Content>
          <Box
            marginTop="1.5rem"
            width="50%"
            padding="0rem 1rem"
            display="flex"
            flexDirection="column"
            gap="1rem"
          >
            <Text
              fontFamily="sans-serif"
              fontSize="0.8rem"
              borderBottom="1px solid gray"
              paddingBottom="1rem"
            >
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio ex
              quo, quae quis blanditiis sequi veritatis reiciendis, voluptatibus
              inventore consequatur tempora enim, odit dignissimos. Architecto
              iste enim nesciunt quae similique.
            </Text>
            <Text fontFamily="sans-serif" fontSize="0.8rem">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
              error nemo suscipit, vel ullam atque, ipsum vitae quod, provident
              optio debitis dolorum doloribus culpa nam voluptatem totam
              corrupti dolore quo?
            </Text>
          </Box>
        </Collapsible.Content>
      </Collapsible.Root>
      <Tabs.Root defaultValue="products">
        <Tabs.List>
          <Tabs.Trigger value="products" fontWeight="semibold" fontSize="1rem">
            Products
          </Tabs.Trigger>
          <Tabs.Trigger value="category" fontWeight="semibold" fontSize="1rem">
            Category
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="products">
          <Box paddingTop="1rem">
            <ProductList />
          </Box>
        </Tabs.Content>
        <Tabs.Content value="category">
          <Box display="flex" flexDirection="column" border="1px solid #e6e6e6">
            {data.map((isi) => (
              <Box
                key={isi.id}
                cursor="pointer"
                height="3rem"
                display="flex"
                alignItems="center"
                padding="2rem"
                borderBottom="1px solid #e6e6e6"
                _hover={{ backgroundColor: 'rgb(248, 247, 247)' }}
              >
                <Text
                  fontFamily="sans-serif"
                  fontWeight="semibold"
                  fontSize="1.2rem"
                >
                  {isi.name}
                </Text>
              </Box>
            ))}
          </Box>
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
}

const data = [
  {
    id: 1,
    name: 'Accessories',
  },
  {
    id: 2,
    name: 'Tech',
  },
  {
    id: 3,
    name: 'Health',
  },
];
