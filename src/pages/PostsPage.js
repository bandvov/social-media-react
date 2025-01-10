import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Posts from "../components/Posts/Posts";
import { useParams } from "react-router-dom";
import CreatePostForm from "../components/Posts/CreatePostForm";
import {
  fetchUserPostsRequest,
  setInitialPostsState,
} from "../features/posts/postsSlice";

export default function PostsPage() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { posts, page, hasMorePosts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(setInitialPostsState());
    dispatch(fetchUserPostsRequest(userId, { page: 1 }));
  }, [dispatch, userId]);

  const loadMorePosts = () => {
    dispatch(fetchUserPostsRequest(userId, { page }));
  };
  return (
    <>
      <CreatePostForm />
      <Posts
        posts={posts}
        hasMorePosts={hasMorePosts}
        loadMorePosts={loadMorePosts}
      />
    </>
  );
}
