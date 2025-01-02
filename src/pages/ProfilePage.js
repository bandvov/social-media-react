import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Container,
  Button,
} from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { profileRequest } from "../features/profile/profileSlice";

const ProfilePage = ({ userId }) => {
  const dispatch = useDispatch();
  const { user, posts, page, hasMorePosts } = useSelector(
    (state) => state.profile
  );

  const [menuAnchor, setMenuAnchor] = React.useState(null);

  useEffect(() => {
    dispatch(profileRequest(userId));
    // dispatch(fetchUserPosts({ userId, page: 1 }));
  }, [dispatch, userId]);

  const loadMorePosts = () => {
    // dispatch(fetchUserPosts({ userId, page }));
  };

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  return (
    <Box>
      {/* AppBar */}

      {/* Profile Info */}
      <Container>
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
                  Joined: {new Date(user.dateCreated).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>

            {/* Stats */}
            <Box display="flex" alignItems="center" gap={4}>
              <Typography variant="body2">
                <strong>{user.postsCount}</strong> Posts
              </Typography>
              <Typography variant="body2">
                <strong>{user.followersCount}</strong> Followers
              </Typography>
              <Typography variant="body2">
                <strong>{user.followeesCount}</strong> Following
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
              <MenuItem onClick={handleMenuClose}>Follow</MenuItem>
              <MenuItem onClick={handleMenuClose}>Unfollow</MenuItem>
            </Menu>
          </Box>
        )}

        {/* Posts Section */}
        {/* <InfiniteScroll
          dataLength={posts.length}
          next={loadMorePosts}
          hasMore={hasMorePosts}
          loader={<Typography>Loading...</Typography>}
        >
          {posts.map((post) => (
            <Box key={post.id} border={1} borderRadius={1} p={2} mb={2}>
              <Typography variant="h6">{post.title}</Typography>
              <Typography variant="body2">{post.content}</Typography>
              <Typography variant="subtitle2">Author: {post.authorName}</Typography>
              <Button size="small">See more</Button>
              <Box mt={1}>
                <Button size="small">Like</Button>
                <Button size="small">Dislike</Button>
              </Box>
            </Box>
          ))}
        </InfiniteScroll> */}
      </Container>
    </Box>
  );
};

export default ProfilePage;
