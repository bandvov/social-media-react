import {
  Avatar,
  Box,
  Container,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfileRequest } from "../features/user/userSlice";
import { Link as RouterLink } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function ProfileInfo({ userId }) {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);
  const {
    email,
    posts_count,
    profile_pic,
    followees_count,
    followers_count,
    created_at,
    bio,
  } = profile;
  const [menuAnchor, setMenuAnchor] = React.useState(null);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserProfileRequest(userId));
    }
  }, [dispatch, userId]);

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };
  return (
    <Container maxWidth="md">
      <Box borderBottom={1} borderColor="divider" mb={2}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          pb={2}
        >
          {/* Avatar and Name */}
          <Box display="flex" alignItems="center">
            <Avatar
              src={profile_pic}
              alt={email}
              sx={{ width: 64, height: 64, mr: 2 }}
            />
            <Box>
              <Typography color="text.primary" variant="h6">
                {email}
              </Typography>
              <Typography color="text.primary" variant="body2">
                Joined: {new Date(created_at).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>

          {/* Stats */}
          <Box display="flex" alignItems="center" gap={4}>
            <Typography color="text.primary" variant="body2">
              <Link component={RouterLink} to="/posts">
                <strong>{posts_count}</strong> Posts
              </Link>
            </Typography>
            <Typography color="text.primary" variant="body2">
              <Link component={RouterLink} to="/followers">
                <strong>{followers_count}</strong> Followers
              </Link>
            </Typography>
            <Typography color="text.primary" variant="body2">
              <Link component={RouterLink} to="/followees">
                <strong>{followees_count}</strong> Following
              </Link>
            </Typography>
          </Box>

          {/* Action Menu */}
          <IconButton onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={handleMenuClose}
          >
            {userId && (
              <MenuItem onClick={handleMenuClose}>Edit profile</MenuItem>
            )}
            <MenuItem onClick={handleMenuClose}>Follow</MenuItem>
            <MenuItem onClick={handleMenuClose}>Unfollow</MenuItem>
          </Menu>
        </Box>
        {bio && (
          <Box pb={2}>
            <Typography color="text.primary">Bio: {bio}</Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
}
