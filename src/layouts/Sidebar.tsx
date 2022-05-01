import Link from 'next/link';

import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';

import { PAGE_APP_HOME, PAGE_APP_STATIONS, PAGE_APP_USERS } from 'common/routes/pages';

export { Sidebar };

const Sidebar = () => {
  return (
    <Drawer
      sx={{
        width: 'calc(100vw - 80%)',
        flexShrink: 0,
        zIndex: (theme) => theme.zIndex.appBar - 1,
        '& .MuiDrawer-paper': {
          width: 'calc(100vw - 80%)',
          boxSizing: 'border-box',
          zIndex: (theme) => theme.zIndex.appBar - 1,
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Divider />
      <List>
        {[
          { label: 'Главная', href: PAGE_APP_HOME, icon: <HomeIcon /> },
          { label: 'Пользователи', href: PAGE_APP_USERS, icon: <GroupIcon /> },
          { label: 'Станции', href: PAGE_APP_STATIONS, icon: <LocalGasStationIcon /> },
        ].map(({ label, icon, href }, index) => (
          <ListItem key={label}>
            <Link
              href={href}
              passHref
            >
              <ListItemButton component={'a'}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={label} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
