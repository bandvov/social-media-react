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
 
  return (
    <>
      <CreatePostForm />
      <Posts
        userId={userId}
            />
    </>
  );
}
