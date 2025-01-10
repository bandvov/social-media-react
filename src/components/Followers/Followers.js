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
  const user = useSelector((state) => state.user.profile);

  useEffect(() => {
    if (data?.length === 0 && user?.id) {
      dispatch(setInitialFollowersState());
      dispatch(fetchFollowersRequest({ userId: user?.id }));
    }
  }, [dispatch, data, user?.id]);

  const fetchMoreFollowers = () => {
    if (!isLoading && hasMore) {
      dispatch(fetchFollowersRequest({ userId: user?.id }));
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
        {data?.map((o) => {
          return (
            <FollowerCard
              key={o.id}
              user={o}
              action={
                <FollowerButton
                  handler={() => {
                    dispatch(removeFollowerRequest(o.id));
                  }}
                  followedByFollower={o.followed_by_follower}
                  followsFollower={o.follows_follower}
                />
              }
            />
          );
        })}
      </InfiniteScroll>
    </Container>
  );
};

export default Followers;
