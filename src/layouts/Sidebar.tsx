import GroupIcon from '@mui/icons-material/Group';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';

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
        {['Пользователи', 'Станции'].map((text, index) => (
          <ListItem
            button
            key={text}
          >
            <ListItemIcon>
              {index % 2 === 0 ? <GroupIcon /> : <LocalGasStationIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
