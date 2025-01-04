import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postsRequest } from "../../features/posts/postsSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { fetchProfilePostsRequest } from "../../features/profile/profileSlice";

export default function UserPosts({ userId }) {
  const dispatch = useDispatch();
  const { posts, page, hasMorePosts } = useSelector((state) => state.profile);

  const [postMenuAnchor, setPostMenuAnchor] = React.useState(null);

  useEffect(() => {
    dispatch(fetchProfilePostsRequest(userId, { page: 1 }));
  }, []);

  const loadMorePosts = () => {
    dispatch(postsRequest({ userId, page }));
  };

  const handlePostMenuOpen = (event) => {
    setPostMenuAnchor(event.currentTarget);
  };

  const handlePostMenuClose = () => {
    setPostMenuAnchor(null);
  };

  return (
    <Container maxWidth="md">
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
  );
}
