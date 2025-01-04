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
  Box,
  Menu,
  MenuItem,
  Avatar,
  Switch,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search,
  Brightness7,
  Brightness4,
  People,
  FollowTheSigns,
  Person2,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/theme/themeSlice";
import { Link } from "react-router-dom";

const Layout = ({ userId, children }) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [profileMenuAnchor, setProfileMenuAnchor] = React.useState(null);

  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const user = useSelector((state) => state.auth.user);

  const handleThemeChange = () => {
    dispatch(toggleTheme());
  };
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
          <Switch
            checked={darkMode}
            color="secondary"
            onChange={handleThemeChange}
            icon={<Brightness7 />} // Icon for light mode
            checkedIcon={<Brightness4 />} // Icon for dark mode
          />

          {/* Profile Menu */}
          <IconButton color="inherit" onClick={handleProfileMenuOpen}>
            <Avatar alt="User Avatar" src={user?.profile_pic} />
          </IconButton>
          <Menu
            anchorEl={profileMenuAnchor}
            open={isProfileMenuOpen}
            onClose={handleProfileMenuClose}
          >
            {userId && (
              <MenuItem onClick={handleProfileMenuClose}>
                <Link to="/profile">Profile</Link>
              </MenuItem>
            )}
            {!userId && (
              <MenuItem onClick={handleProfileMenuClose}>
                <Link to="/login">Log in</Link>
              </MenuItem>
            )}
            {userId && (
              <MenuItem onClick={handleProfileMenuClose}>
                <Link to="/"> Logout</Link>
              </MenuItem>
            )}
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
            {[
              { label: "Profile", url: "/profile", icon: <Person2 /> },
              { label: "Followers", url: "/followers", icon: <People /> },
              {
                label: "Followees",
                url: "/followees",
                icon: <FollowTheSigns />,
              },
            ].map((item, index) => (
              <ListItem button key={item.label}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <Link to={item.url}>{item.label}</Link>
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
