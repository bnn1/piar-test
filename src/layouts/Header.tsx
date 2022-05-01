import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

import { MouseEvent, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import MenuIcon from '@mui/icons-material/Menu';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Link as MuiLink,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { PAGE_APP_HOME, PAGE_APP_STATIONS, PAGE_APP_USERS } from 'common/routes/pages';
import { CreateStation, CreateUser } from 'common/types/users';
import { Dialog } from 'components/Dialog';
import { Input } from 'components/Form/components/Input';
import { useEditableFields } from 'hooks/useEditableFields';
import { useStore } from 'lib/store';

export { Header };

const addMenu = ['Пользователя', 'Станцию'];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElAddMenu, setAnchorElAddMenu] = useState<null | HTMLElement>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newItemType, setNewItemType] = useState<null | 'user' | 'station'>(null);

  const theme = useTheme();
  const { data } = useSession();
  const showBurger = useMediaQuery(theme.breakpoints.down('lg'));
  const createUser = useStore((state) => state.createUser);
  const createStation = useStore((state) => state.createStation);
  const editableFields = useEditableFields(newItemType || 'user');

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenAddMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElAddMenu(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElAddMenu(null);
  };

  const handleOpenDialog = (idx: number) => {
    handleCloseUserMenu();
    setShowCreateDialog(true);
    setNewItemType(idx % 2 === 0 ? 'user' : 'station');
  };

  const handleSubmitNewItem = (item: CreateStation | CreateUser) => {
    if (newItemType === 'user') {
      createUser(item as CreateUser);
    }
    if (newItemType === 'station') {
      data && createStation(item, data.jwt);
    }
    setShowCreateDialog(false);
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ justifyContent: 'flex-end' }}
        >
          {showBurger && (
            <Box sx={{ flexGrow: 1, display: 'flex' }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                {[
                  { label: 'Главная', href: PAGE_APP_HOME },
                  { label: 'Пользователи', href: PAGE_APP_USERS },
                  { label: 'Станции', href: PAGE_APP_STATIONS },
                ].map(({ label, href }) => (
                  <MenuItem
                    key={label + href}
                    onClick={handleCloseNavMenu}
                  >
                    <Link
                      href={href}
                      passHref
                    >
                      <MuiLink
                        textAlign="center"
                        underline={'none'}
                        color={'common.white'}
                      >
                        {label}
                      </MuiLink>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Добавить пользователя/станцию">
              <IconButton
                onClick={handleOpenAddMenu}
                sx={{ p: 4, borderRadius: 0 }}
              >
                <Typography>Добавить</Typography>
                <AddIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElAddMenu}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElAddMenu)}
              onClose={handleCloseUserMenu}
            >
              {addMenu.map((item, idx) => (
                <MenuItem
                  key={item}
                  onClick={() => handleOpenDialog(idx)}
                >
                  <ListItemIcon>
                    {idx % 2 === 0 ? <PersonAddIcon /> : <LocalGasStationIcon />}
                  </ListItemIcon>
                  <Typography textAlign="center">{item}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Button onClick={() => signOut()}>Выйти</Button>
          <Dialog
            title={newItemType === 'user' ? 'Добавить пользователя' : 'Добавить станцию'}
            open={showCreateDialog}
            onClose={() => setShowCreateDialog(false)}
            handleSubmit={(data) => {
              console.log('NEW DATA:', data);
              handleSubmitNewItem(data);
            }}
          >
            {editableFields.map(({ label, name, props }) => (
              <Input
                key={label + name}
                label={label}
                name={name}
                {...props}
              />
            ))}
          </Dialog>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
