import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { Typography, CircularProgress, Container } from "@mui/material";
import {
  fetchFollowersRequest,
  removeFollowerRequest,
  setInitialFollowersState,
} from "../../features/followers/followersSlice";
import FollowerCard from "./FollowerCard";
import FollowerButton from "./FollowerButton";

const Followers = () => {
  const dispatch = useDispatch();
  const { data, isLoading, hasMore } = useSelector((state) => state.followers);
  const user = useSelector((state) => state.auth.user);
  const profile = useSelector((state) => state.user.profile);

  useEffect(() => {
    if (data?.length === 0 && profile?.id) {
      dispatch(setInitialFollowersState());
      dispatch(fetchFollowersRequest({ userId: profile?.id, limit: 4 }));
    }
  }, [dispatch, data?.length, profile?.id]);

  const fetchMoreFollowers = () => {
    if (!isLoading && hasMore) {
      dispatch(fetchFollowersRequest({ userId: profile?.id, limit: 4 }));
    }
  };

  return (
    <Container maxWidth="md">
      <InfiniteScroll
        dataLength={data?.length}
        next={fetchMoreFollowers}
        hasMore={hasMore}
        loader={isLoading && <CircularProgress />}
        endMessage={<Typography align="center">No more followers</Typography>}
      >
        {data?.map((follower) => {
          return (
            <FollowerCard
              key={follower.id}
              user={follower}
              action={
                user.id !== follower.id && (
                  <FollowerButton
                    handler={() => {
                      dispatch(removeFollowerRequest(follower.id));
                    }}
                    followedByFollower={follower.followed_by_follower}
                    followsFollower={follower.follows_follower}
                  />
                )
              }
            />
          );
        })}
      </InfiniteScroll>
    </Container>
  );
};

export default Followers;
