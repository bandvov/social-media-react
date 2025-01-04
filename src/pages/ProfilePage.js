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
import InfiniteScroll from "react-infinite-scroll-component";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { profileRequest } from "../features/profile/profileSlice";
import { postsRequest } from "../features/posts/postsSlice";

const ProfilePage = ({ userId }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);

  const { posts, page, hasMorePosts } = useSelector((state) => state.post);

  const [menuAnchor, setMenuAnchor] = React.useState(null);
  const [postMenuAnchor, setPostMenuAnchor] = React.useState(null);

  useEffect(() => {
    if (userId) {
      dispatch(profileRequest(userId));
      dispatch(postsRequest({ userId, page: 1 }));
    }
  }, [dispatch, userId]);

  const loadMorePosts = () => {
    dispatch(postsRequest({ userId: user?.id, page }));
  };

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };
  const handlePostMenuOpen = (event) => {
    setPostMenuAnchor(event.currentTarget);
  };

  const handlePostMenuClose = () => {
    setPostMenuAnchor(null);
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

        {/* Posts Section */}
        <InfiniteScroll
          dataLength={posts.length}
          next={loadMorePosts}
          hasMore={hasMorePosts}
          loader={<Typography>Loading...</Typography>}
        >
          {posts.map((post) => (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
              }}
              key={post.id}
              border={1}
              borderRadius={1}
              p={2}
              mb={2}
            >
              <Box>
                <Box
                  display="grid"
                  gridTemplateColumns={"auto 1fr"}
                  alignItems="center"
                  gap={2}
                >
                  <Typography variant="subtitle2">
                    Author: {post.author_name}
                  </Typography>
                  <Typography variant="subtitle2">
                    {new Date(post.created_at).toLocaleDateString()}
                  </Typography>
                </Box>

                <Typography variant="body2">{post.content}</Typography>
              </Box>
              {/* Action Menu */}
              <IconButton onClick={handlePostMenuOpen}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={postMenuAnchor}
                open={Boolean(postMenuAnchor)}
                onClose={handlePostMenuClose}
              >
                <MenuItem onClick={handlePostMenuClose}>Remove</MenuItem>
              </Menu>
            </Box>
          ))}
        </InfiniteScroll>
      </Container>
    </Box>
  );
};

export default ProfilePage;
