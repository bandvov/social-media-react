import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postsRequest } from "../../features/posts/postsSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import { Container, Typography } from "@mui/material";
import { fetchProfilePostsRequest } from "../../features/profile/profileSlice";
import PostCard from "./PostCard";

export default function UserPosts({ userId }) {
  const dispatch = useDispatch();
  const { posts, page, hasMorePosts } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchProfilePostsRequest(userId, { page: 1 }));
  }, []);

  const loadMorePosts = () => {
    dispatch(postsRequest({ userId, page }));
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
          <PostCard key={post.created_at} post={post} />
        ))}
      </InfiniteScroll>
    </Container>
  );
}
