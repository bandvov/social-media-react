import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import { Menu as MenuIcon, Search, AccountCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [profileMenuAnchor, setProfileMenuAnchor] = React.useState(null);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const isProfileMenuOpen = Boolean(profileMenuAnchor);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Top Navigation */}
      <AppBar position="fixed">
        <Toolbar>
          {/* Menu Icon for Drawer */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            MyApp
          </Typography>
          {/* Search Bar */}
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <InputBase
              placeholder="Search…"
              sx={{
                background: "rgba(255, 255, 255, 0.15)",
                color: "white",
                padding: "0 10px",
                borderRadius: 2,
              }}
              startAdornment={
                <Search sx={{ color: "white", marginRight: 1 }} />
              }
            />
          </Box>
          {/* Profile Menu */}
          <IconButton color="inherit" onClick={handleProfileMenuOpen}>
            <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" />
          </IconButton>
          <Menu
            anchorEl={profileMenuAnchor}
            open={isProfileMenuOpen}
            onClose={handleProfileMenuClose}
          >
            <MenuItem onClick={handleProfileMenuClose}>
              <Link to="/profile">Profile</Link>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuClose}>
              <Link to="/login">Log in</Link>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuClose}>
              <Link to="/"> Logout</Link>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Left Drawer Menu */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {["Dashboard", "Settings", "About"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  <MenuIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: 3,
          marginTop: "64px", // Space below AppBar
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
