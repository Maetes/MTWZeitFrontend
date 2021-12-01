import { Box, Flex, Link, Spacer } from '@chakra-ui/react';
import React from 'react';
import { AddIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';

export const NavigationPane = () => {
  const router = useRouter();

  return (
    <Flex>
      <Box p={2}>
        <Image
          src='https://mtw-it.de/img/logos/mtw.svg'
          alt='logo'
          layout='intrinsic'
          width={100}
          height={50}
        ></Image>
      </Box>
      <Spacer />
      <Box p={2}>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<HamburgerIcon />}
            variant='outline'
          />
          <MenuList>
            <MenuItem
              icon={<AddIcon />}
              command='⌘K'
              onClick={async () => await router.push('/')}
            >
              Neuer Auftrag
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};
