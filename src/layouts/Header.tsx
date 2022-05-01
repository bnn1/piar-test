import { signOut } from 'next-auth/react';

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
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { Sidebar } from './Sidebar';

export { Header };

const pages = ['Пользователи', 'Станции'];
const addMenu = ['Пользователя', 'Станцию'];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElAddMenu, setAnchorElAddMenu] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const showBurger = useMediaQuery(theme.breakpoints.down('lg'));

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
                {pages.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={handleCloseNavMenu}
                  >
                    <Typography textAlign="center">{page}</Typography>
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
                  onClick={handleCloseUserMenu}
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
        </Toolbar>
      </Container>
    </AppBar>
  );
};
