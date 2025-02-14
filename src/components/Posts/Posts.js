import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress, Container, Typography } from "@mui/material";
import PostCard from "./PostCard";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserPostsRequest,
  setInitialPostsState,
} from "../../features/posts/postsSlice";
import CardWrapper from "./CardWrapper";

export default function Posts() {
  const dispatch = useDispatch();
  const { data, loading, hasMore } = useSelector((state) => state.post);
  const profile = useSelector((state) => state.user.profile);

  useEffect(() => {
    if (data?.length === 0 && profile?.id) {
      dispatch(setInitialPostsState());
      dispatch(fetchUserPostsRequest({ userId: profile?.id, limit: 8 }));
    }
  }, [dispatch, data?.length, profile?.id]);

  const loadMorePosts = () => {
    dispatch(fetchUserPostsRequest({ userId: profile?.id, limit: 8 }));
  };
  return (
    <Container
      maxWidth="md"
      sx={{
        overflowY: "auto",
      }}
    >
      <InfiniteScroll
        dataLength={data.length}
        next={loadMorePosts}
        hasMore={hasMore}
        loader={loading.fetchUserPosts && <CircularProgress />}
        endMessage={<Typography textAlign="center">No more posts</Typography>}
      >
        {data?.map((post) => (
          <CardWrapper {...post} />
        ))}
      </InfiniteScroll>
    </Container>
  );
}
