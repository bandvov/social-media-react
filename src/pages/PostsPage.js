import React, { useEffect } from "react";
import { Box } from "@mui/material";
import ProfileInfo from "../components/ProfileInfo";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPostsRequest } from "../features/user/userSlice";
import Posts from "../components/Posts/Posts";
import { useParams } from "react-router-dom";

export default function PostsPage() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { posts, page, hasMorePosts } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserPostsRequest(userId, { page: 1 }));
  }, []);

  const loadMorePosts = () => {
    dispatch(fetchUserPostsRequest(userId, { page }));
  };
  return (
    <Box>
      <ProfileInfo userId={userId} />
      <Posts
        posts={posts}
        hasMorePosts={hasMorePosts}
        loadMorePosts={loadMorePosts}
      />
      ;
    </Box>
  );
}
