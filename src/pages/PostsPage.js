import React, { useEffect } from "react";
import { Box } from "@mui/material";
import ProfileInfo from "../components/ProfileInfo";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPostsRequest } from "../features/user/userSlice";
import { postsRequest } from "../features/posts/postsSlice";
import Posts from "../components/Posts/Posts";

export default function PostsPage({ userId = 1 }) {
  const dispatch = useDispatch();
  const { posts, page, hasMorePosts } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserPostsRequest(userId, { page: 1 }));
  }, [dispatch, userId]);

  const loadMorePosts = () => {
    dispatch(postsRequest({ userId, page }));
  };
  return (
    <Box>
      <ProfileInfo />
      <Posts
        posts={posts}
        hasMorePosts={hasMorePosts}
        loadMorePosts={loadMorePosts}
      />
      ;
    </Box>
  );
}
