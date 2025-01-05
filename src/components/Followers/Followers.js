import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  CardHeader,
  Avatar,
  Button,
} from "@mui/material";
import { fetchFollowersRequest } from "../../features/followers/followersSlice";
import FollowerCard from "./FollowerCard";

const Followers = () => {
  const dispatch = useDispatch();
  const { data, isLoading, hasMore } = useSelector((state) => state.followers);

  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchFollowersRequest());
    }
  }, [dispatch, data]);

  const fetchMoreFollowers = () => {
    if (!isLoading && hasMore) {
      dispatch(fetchFollowersRequest());
    }
  };

  return (
    <InfiniteScroll
      dataLength={data.length}
      next={fetchMoreFollowers}
      hasMore={hasMore}
      loader={<CircularProgress />}
      endMessage={<Typography align="center">No more followers</Typography>}
    >
      {data.map((follower) => (
        <FollowerCard follower={follower} />
      ))}
    </InfiniteScroll>
  );
};

export default Followers;
