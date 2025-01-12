import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Container, Typography } from "@mui/material";
import PostCard from "./PostCard";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserPostsRequest,
  setInitialPostsState,
} from "../../features/posts/postsSlice";

export default function Posts({ userId }) {
  const dispatch = useDispatch();
  const { data, hasMorePosts } = useSelector((state) => state.post);
  const profile = useSelector((state) => state.user.profile);

  useEffect(() => {
    if (data?.length === 0 && profile?.id){
      dispatch(setInitialPostsState());
      dispatch(fetchUserPostsRequest({ userId: profile?.id, limit: 2 }));
    }
  }, [dispatch,data?.length, profile?.id]);

  const loadMorePosts = () => {
    dispatch(fetchUserPostsRequest({ userId: profile?.id, limit: 2 }));
  };
  return (
    <Container maxWidth="md">
      <InfiniteScroll
        dataLength={data.length}
        next={loadMorePosts}
        hasMore={hasMorePosts}
        loader={<Typography>Loading...</Typography>}
      >
        {data?.map((post) => (
          <PostCard key={post.created_at} post={post} />
        ))}
      </InfiniteScroll>
    </Container>
  );
}
