import React from "react";
import { Typography, CircularProgress, Container } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import FollowerCard from "./FollowerCard";
import FollowerButton from "./FollowerButton";
import useFollowData from "../../hooks/useFollowData"; // Import the custom hook

const Followers = () => {
  const profile = useSelector((state) => state.user.profile);
  const authenticatedUser = useSelector((state) => state.auth.user);

  const { data, loading, hasMore, fetchMore } = useFollowData(
    "followers",
    profile?.id
  );

  return (
    <Container maxWidth="md">
      <InfiniteScroll
        dataLength={data?.length}
        next={fetchMore}
        hasMore={hasMore}
        loader={loading.fetchFollowers && <CircularProgress />}
        endMessage={<Typography align="center">No more followers</Typography>}
      >
        {data?.map((follower) => (
          <FollowerCard
            key={follower.id}
            user={follower}
            action={
              authenticatedUser.id !== follower.id && (
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
        ))}
      </InfiniteScroll>
    </Container>
  );
};

export default Followers;
