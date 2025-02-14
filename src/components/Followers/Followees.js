import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Typography, CircularProgress, Container } from "@mui/material";
import FollowerCard from "./FollowerCard";
import FollowerButton from "./FollowerButton";
import {
  fetchFolloweesRequest,
  removeFolloweeRequest,
  setInitialFolloweesState,
} from "../../features/followees/followeesSlice";
import useUserData from "../../hooks/useUserData";

const Followees = () => {
  const profile = useSelector((state) => state.user.profile);
  const authenticatedUser = useSelector((state) => state.auth.user);

  const { data, loading, hasMore, fetchMore } = useUserData({
    type: "followees",
    userId: profile?.id,
    actions: {
      fetchRequest: () =>
        fetchFolloweesRequest({ userId: profile?.id, limit: 4 }),
      setInitialState: setInitialFolloweesState,
    },
  });

  return (
    <Container maxWidth="md">
      <InfiniteScroll
        dataLength={data?.length}
        next={fetchMore}
        hasMore={hasMore}
        loader={loading?.fetchFollowees && <CircularProgress />}
        endMessage={<Typography align="center">No more followees</Typography>}
      >
        {data?.map((followee) => (
          <FollowerCard
            key={followee.id}
            user={followee}
            action={
              authenticatedUser.id !== followee.id && (
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
