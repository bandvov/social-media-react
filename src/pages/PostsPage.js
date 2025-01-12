import React from "react";
import Posts from "../components/Posts/Posts";
import { useParams } from "react-router-dom";
import CreatePostForm from "../components/Posts/CreatePostForm";
export default function PostsPage() {
  const { userId } = useParams();

  return (
    <>
      <CreatePostForm />
      <Posts userId={userId} />
    </>
  );
}
