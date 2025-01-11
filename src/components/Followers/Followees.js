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
  const { data, isLoading, hasMore } = useSelector((state) => state.followees);
  const user = useSelector((state) => state.user.profile);

  useEffect(() => {
    if (data?.length === 0 && user?.id) {
      dispatch(setInitialFolloweesState());
      dispatch(fetchFolloweesRequest({ userId: user?.id }));
    }
  }, [dispatch, data, user?.id]);

  const fetchMoreFollowees = () => {
    if (!isLoading && hasMore) {
      dispatch(fetchFolloweesRequest({ userId: user?.id }));
    }
  };
  return (
    <Container maxWidth="md">
      <InfiniteScroll
        dataLength={data?.length}
        next={fetchMoreFollowees}
        hasMore={hasMore}
        loader={isLoading && <CircularProgress />}
        endMessage={<Typography align="center">No more followees</Typography>}
      >
        {data?.map((followee) => (
          <FollowerCard
            key={followee.id}
            user={followee}
            action={
              <FollowerButton
                handler={() => {
                  dispatch(removeFolloweeRequest(followee.id));
                }}
                followedByFollower={followee.followed_by_follower}
                followsFollower={followee.follows_follower}
              />
            }
          />
        ))}
      </InfiniteScroll>
    </Container>
  );
};

export default Followees;
