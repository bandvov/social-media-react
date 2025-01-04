import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Typography,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Container,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ProfileForm from "../components/profileForm";
import { fetchUserProfileRequest } from "../features/user/userSlice";

const ProfilePage = ({ userId }) => {
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
      {profile && (
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
                <Typography variant="h6">{email}</Typography>
                <Typography variant="body2">
                  Joined: {new Date(created_at).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>

            {/* Stats */}
            <Box display="flex" alignItems="center" gap={4}>
              <Typography variant="body2">
                <strong>{posts_count}</strong> Posts
              </Typography>
              <Typography variant="body2">
                <strong>{followers_count}</strong> Followers
              </Typography>
              <Typography variant="body2">
                <strong>{followees_count}</strong> Following
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
          {bio && <Box pb={2}>Bio: {bio}</Box>}
        </Box>
      )}
      <ProfileForm />
    </Container>
  );
};

export default ProfilePage;
