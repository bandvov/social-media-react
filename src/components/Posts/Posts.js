import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Container, Typography } from "@mui/material";
import PostCard from "./PostCard";

export default function Posts({ posts, loadMorePosts, hasMorePosts }) {
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
