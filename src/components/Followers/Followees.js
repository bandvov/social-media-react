import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { Typography, CircularProgress, Button, Container } from "@mui/material";
import FollowerCard from "./FollowerCard";
import { fetchFolloweesRequest } from "../../features/followees/followeesSlice";
import { useTranslation } from "react-i18next";

const Followees = ({ userId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { data, isLoading, hasMore } = useSelector((state) => state.followees);

  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchFolloweesRequest(userId));
    }
  }, [dispatch, data, userId]);

  const fetchMoreFollowees = () => {
    if (!isLoading && hasMore) {
      dispatch(fetchFolloweesRequest(userId));
    }
  };
  return (
    <Container maxWidth="md">
      <InfiniteScroll
        dataLength={data.length}
        next={fetchMoreFollowees}
        hasMore={hasMore}
        loader={<CircularProgress />}
        endMessage={<Typography align="center">No more followees</Typography>}
      >
        {data.map((followee) => (
          <FollowerCard
            user={followee}
            action={<Button>{t("unfollow")}</Button>}
          />
        ))}
      </InfiniteScroll>
    </Container>
  );
};

export default Followees;
