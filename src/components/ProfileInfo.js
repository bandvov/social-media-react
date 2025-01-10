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
import {
  fetchUserProfileRequest,
  setInitialUserState,
} from "../features/user/userSlice";
import { Link as RouterLink } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useTranslation } from "react-i18next";
import { removeFollowerRequest } from "../features/followers/followersSlice";

export default function ProfileInfo({ userId }) {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);
  const user = useSelector((state) => state.auth.user);

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
      dispatch(setInitialUserState());
      dispatch(fetchUserProfileRequest(userId));
    }
  }, [dispatch, userId]);

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleRemoveFollower = () => {
    handleMenuClose();
    dispatch(removeFollowerRequest(userId));
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
              sx={{ width: 64, height: 64, mr: 2, border: "4px solid white" }}
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
              <Link component={RouterLink} to={`/user/${profile?.id}/posts`}>
                <strong>{posts_count}</strong> Posts
              </Link>
            </Typography>
            <Typography color="text.primary" variant="body2">
              <Link
                component={RouterLink}
                to={`/user/${profile?.id}/followers`}
              >
                <strong>{followers_count}</strong> Followers
              </Link>
            </Typography>
            <Typography color="text.primary" variant="body2">
              <Link
                component={RouterLink}
                to={`/user/${profile?.id}/followees`}
              >
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
            {user?.id === profile.id && (
              <MenuItem onClick={handleMenuClose}>
                <Link component={RouterLink} to={`/user/${userId}/edit`}>
                  Edit profile
                </Link>
              </MenuItem>
            )}
            {profile.is_follower && (
              <MenuItem onClick={handleRemoveFollower}>
                {t("unfollow")}
              </MenuItem>
            )}
            {!profile.is_followee &&
              !profile.is_follower &&
              user?.id !== profile.id && (
                <MenuItem onClick={handleMenuClose}>{t("follow")}</MenuItem>
              )}
            {profile.is_followee && (
              <MenuItem onClick={handleMenuClose}>{t("remove")}</MenuItem>
            )}
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
