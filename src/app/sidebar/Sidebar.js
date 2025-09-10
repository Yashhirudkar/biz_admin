'use client';

import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Typography,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Menu as MenuIcon,
  People as UsersIcon,
  Settings as SettingsIcon,
  Assessment as ReportsIcon,
  Dashboard as DashboardIcon
} from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';

const drawerWidthOpen = 240;
const drawerWidthClosed = 56;
const headerHeight = 64;

const Sidebar = ({ open, toggleSidebar }) => {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const drawerOpen = open;

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard', color: '#1976d2' },
    { text: 'Users', icon: <UsersIcon />, path: '/users', color: '#2e7d32' },
    { text: 'Categories', icon: <SettingsIcon />, path: '/Categories', color: '#ed6c02' },
    { text: 'Data', icon: <ReportsIcon />, path: '/Data', color: '#9c27b0' },
  ];

  const handleNavigation = (path) => {
    router.push(path);
    if (isMobile) toggleSidebar();
  };

  return (
    <>
      {isMobile && (
        <IconButton
          onClick={toggleSidebar}
          sx={{
            position: 'fixed',
            top: 16,
            left: 16,
            zIndex: theme.zIndex.drawer + 1,
            backgroundColor: "#fff",
            color: theme.palette.primary.main,
            '&:hover': { backgroundColor: theme.palette.action.hover },
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={drawerOpen}
        onClose={toggleSidebar}
        sx={{
          width: drawerOpen && !isMobile ? drawerWidthOpen : drawerWidthClosed,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerOpen && !isMobile ? drawerWidthOpen : drawerWidthClosed,
            boxSizing: 'border-box',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            backgroundColor: '#fff',
            borderRight: '1px solid rgba(0,0,0,0.1)',
            top: isMobile ? 0 : headerHeight,
            height: isMobile ? '100%' : `calc(100% - ${headerHeight}px)`,
            overflowX: 'hidden',
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: drawerOpen ? 'space-between' : 'center',
            padding: theme.spacing(1, 3),
          }}
        >
          {drawerOpen && (
            <Typography
              variant="h6"
              noWrap
              sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}
            >
              Admin Panel
            </Typography>
          )}
          <IconButton onClick={toggleSidebar} sx={{ color: theme.palette.primary.main }}>
            <MenuIcon />
          </IconButton>
        </Box>

        <Divider />

        {/* Menu Items */}
        <List>
          {menuItems.map((item, index) => (
            <React.Fragment key={item.text}>
              <ListItem disablePadding sx={{ m: 0.5, borderRadius: 2 }}>
                <ListItemButton
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    '&:hover': { backgroundColor: theme.palette.action.hover },
                    ...(pathname === item.path && {
                      backgroundColor: theme.palette.primary.light,
                      color: theme.palette.primary.contrastText,
                      '&:hover': { backgroundColor: theme.palette.primary.main },
                      '& .MuiListItemIcon-root': { color: theme.palette.primary.contrastText },
                    }),
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: drawerOpen ? 56 : 'auto',
                      justifyContent: 'center',
                      color: pathname === item.path ? theme.palette.primary.contrastText : item.color,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {drawerOpen && <ListItemText primary={item.text} />}
                </ListItemButton>
              </ListItem>

              {/* Add divider after certain groups */}
              {index === 0 && <Divider sx={{ my: 1 }} />} {/* After Dashboard */}
              {index === 2 && <Divider sx={{ my: 1 }} />} {/* After Categories */}
            </React.Fragment>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
