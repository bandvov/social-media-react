import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { Typography, CircularProgress, Container } from "@mui/material";
import FollowerCard from "./FollowerCard";
import {
  fetchFolloweesRequest,
  removeFolloweeRequest,
  setInitialFolloweesState,
} from "../../features/followees/followeesSlice";
import FollowerButton from "./FollowerButton";

const Followees = () => {
  const dispatch = useDispatch();
  const { data, loading, hasMore } = useSelector((state) => state.followees);
  const user = useSelector((state) => state.auth.user);
  const profile = useSelector((state) => state.user.profile);

  useEffect(() => {
    if (data?.length === 0 && profile?.id) {
      dispatch(setInitialFolloweesState());
      dispatch(fetchFolloweesRequest({ userId: profile?.id, limit: 4 }));
    }
  }, [dispatch, data, profile?.id]);

  const fetchMoreFollowees = () => {
    if (!loading && hasMore) {
      dispatch(fetchFolloweesRequest({ userId: profile?.id, limit: 4 }));
    }
  };
  return (
    <Container maxWidth="md">
      <InfiniteScroll
        dataLength={data?.length}
        next={fetchMoreFollowees}
        hasMore={hasMore}
        loader={loading.fetchFollowees && <CircularProgress />}
        endMessage={<Typography align="center">No more followees</Typography>}
      >
        {data?.map((followee) => (
          <FollowerCard
            key={followee.id}
            user={followee}
            action={
              user.id !== followee.id && (
                <FollowerButton
                  handler={() => {
                    dispatch(removeFolloweeRequest(followee.id));
                  }}
                  followedByFollower={followee.followed_by_follower}
                  followsFollower={followee.follows_follower}
                />
              )
            }
          />
        ))}
      </InfiniteScroll>
    </Container>
  );
};

export default Followees;
