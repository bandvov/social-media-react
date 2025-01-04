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
import { fetchProfileRequest } from "../features/profile/profileSlice";
import { postsRequest } from "../features/posts/postsSlice";
import ProfileForm from "../components/profileForm";

const ProfilePage = ({ userId }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);

  const [menuAnchor, setMenuAnchor] = React.useState(null);

  useEffect(() => {
    if (userId) {
      dispatch(fetchProfileRequest(userId));
    }
  }, [dispatch, userId]);

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  return (
    <Box>
      {/* Profile Info */}
      <Container maxWidth="md">
        {user && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
            borderBottom={1}
            borderColor="divider"
            pb={2}
          >
            {/* Avatar and Name */}
            <Box display="flex" alignItems="center">
              <Avatar
                src={user.image}
                alt={user.email}
                sx={{ width: 64, height: 64, mr: 2 }}
              />
              <Box>
                <Typography variant="h6">{user.email}</Typography>
                <Typography variant="body2">
                  Joined: {new Date(user.created_at).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>

            {/* Stats */}
            <Box display="flex" alignItems="center" gap={4}>
              <Typography variant="body2">
                <strong>{user.posts_count}</strong> Posts
              </Typography>
              <Typography variant="body2">
                <strong>{user.followers_count}</strong> Followers
              </Typography>
              <Typography variant="body2">
                <strong>{user.followees_count}</strong> Following
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
        )}
        <ProfileForm />
      </Container>
    </Box>
  );
};

export default ProfilePage;
