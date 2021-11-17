import { Flex, Link } from '@chakra-ui/react';
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

export const NavigationPane = () => {
  const router = useRouter();

  return (
    <Flex alignItems='flex-end' justify='flex-start' direction='column' p='1%'>
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
    </Flex>
  );
};
