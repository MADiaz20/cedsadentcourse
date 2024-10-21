import React, { useContext } from 'react';
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { AuthContext } from '../../components/AuthContext';
import LogoutIcon from '@mui/icons-material/Logout';
import ColorModeSelect from '../../shared-theme/ColorModeSelect';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor: alpha(theme.palette.background.default, 0.4),
  boxShadow: theme.shadows[1],
  padding: '8px 12px',
}));

export default function AppAppBar() {
  const { logout } = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      sx={{ boxShadow: 0, bgcolor: 'transparent', backgroundImage: 'none', mt: 3 }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button variant="text" color="info" size="small">
                Modulo 1
              </Button>
              <Button variant="text" color="info" size="small">
                Modulo 2
              </Button>
              <Button variant="text" color="info" size="small">
                Modulo 3
              </Button>
              <Button variant="text" color="info" size="small">
                Modulo 4
              </Button>
              <Button variant="text" color="info" size="small" sx={{ minWidth: 0 }}>
                Modulo 5
              </Button>
              <Button variant="text" color="info" size="small" sx={{ minWidth: 0 }}>
                Modulo 6
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >           
            <ColorModeSelect/>
            <Button color="primary" variant="text" size="small"onClick={logout}>
              <LogoutIcon />
            </Button>
          </Box>
          <Box sx={{ display: { sm: 'flex', md: 'none' } }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <Divider sx={{ my: 3 }} />
                <MenuItem>Modulo 1</MenuItem>
                <MenuItem>Modulo 2</MenuItem>
                <MenuItem>Modulo 3</MenuItem>
                <MenuItem>Modulo 4</MenuItem>
                <MenuItem>Modulo 5</MenuItem>
                <MenuItem>Modulo 6</MenuItem>
                <MenuItem>
                  Log Out
                  <Button color="primary" variant="text" size="small"onClick={logout}>
                    <LogoutIcon />
                  </Button>
                </MenuItem>
                <MenuItem>
                  <ColorModeSelect/>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
