import React, { useEffect } from "react";
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
    <Posts
      posts={posts}
      hasMorePosts={hasMorePosts}
      loadMorePosts={loadMorePosts}
    />
  );
}
