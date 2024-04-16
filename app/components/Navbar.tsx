import Link from 'next/link'
import { useState } from 'react';
import '@mantine/core/styles.css';
import { IconSun, IconMoonStars } from '@tabler/icons-react';

import {
  useMantineColorScheme,
  Switch,
  useMantineTheme,
  rem
} from '@mantine/core';
import { toggleColorScheme } from '@Utils/styling';

const Navbar:React.FC = () => {
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const sunIcon = (
    <IconSun
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.yellow[4]}
    />
  );

  const moonIcon = (
    <IconMoonStars
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.blue[6]}
    />
  );

  return (
    <nav className='flex h-16 bg-[#F6AA1C] w-full items-center justify-end px-2 sm:px-8'>
      <Switch
        onClick={()=>toggleColorScheme(setColorScheme, colorScheme)}
        size="xl"
        onLabel={sunIcon} 
        offLabel={moonIcon}
        color="dark.4"      
      />
    </nav>
  );
}
export default Navbar;