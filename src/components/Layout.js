import React, { useState } from "react";
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
  Link,
  FormControlLabel,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search,
  Brightness7,
  Brightness4,
  Person2,
  Home,
  PostAdd,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/theme/themeSlice";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Layout = ({ children }) => {
  const { t, i18n } = useTranslation();
  const [checked, setChecked] = useState(i18n.language === "ua"); // Default state based on current language

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);

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

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.checked ? "ua" : "en";
    i18n.changeLanguage(newLanguage);
    setChecked(event.target.checked);
  };

  const isProfileMenuOpen = Boolean(profileMenuAnchor);

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        display: "flex",
        height: "100vh",
        overflowY: "scroll",
      }}
    >
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
          <FormControlLabel
            control={
              <Switch
                checked={checked}
                color="primar"
                onChange={handleLanguageChange}
                icon={<Typography variant="body2">EN</Typography>}
                checkedIcon={<Typography variant="body2">UA</Typography>}
              />
            }
          />
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
            {user?.id && (
              <MenuItem onClick={handleProfileMenuClose}>
                <Link component={RouterLink} to={`/user/${user?.id}/profile`}>
                  {t("Profile")}
                </Link>
              </MenuItem>
            )}
            {!user?.id && (
              <MenuItem onClick={handleProfileMenuClose}>
                <Link component={RouterLink} to="/login">
                  {t("login")}
                </Link>
              </MenuItem>
            )}
            {user?.id && (
              <MenuItem onClick={handleProfileMenuClose}>
                <Link component={RouterLink} to="/login">
                  {t("logout")}
                </Link>
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
              { label: t("homePage"), url: "/", icon: <Home /> },
              {
                label: t("myPosts"),
                url: `/user/${user?.id}/posts/`,
                icon: <PostAdd />,
              },
              {
                label: t("profile"),
                url: `/user/${user?.id}`,
                icon: <Person2 />,
              },
            ].map((item, index) => (
              <ListItem button key={item.label}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <Link component={RouterLink} to={item.url}>
                  {item.label}
                </Link>
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
