import React from "react";
import Comments from "../components/Comments/Comments";
import { useParams } from "react-router-dom";

export default function PostDetailPage() {
  const {postId} = useParams()
  return <Comments postId={postId}/>;
}
