import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { Typography, CircularProgress, Button, Container } from "@mui/material";
import { fetchFollowersRequest } from "../../features/followers/followersSlice";
import FollowerCard from "./FollowerCard";
import { useTranslation } from "react-i18next";

const Followers = ({ userId }) => {
  const { t } = useTranslation();
  const [hovered, setHovered] = useState(false);

  const dispatch = useDispatch();
  const { data, isLoading, hasMore } = useSelector((state) => state.followers);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchFollowersRequest(userId));
    }
  }, [dispatch, data, userId]);

  const fetchMoreFollowers = () => {
    if (!isLoading && hasMore) {
      dispatch(fetchFollowersRequest(userId));
    }
  };

  return (
    <Container maxWidth="md">
      <InfiniteScroll
        dataLength={data.length}
        next={fetchMoreFollowers}
        hasMore={hasMore}
        loader={<CircularProgress />}
        endMessage={<Typography align="center">No more followers</Typography>}
      >
        {data.map((o) => {
          const isFollowing = user?.id === o?.id;
          return (
            <FollowerCard
              key={o.id}
              user={o}
              action={
                <Button
                  sx={{
                    "&:hover": {
                      backgroundColor: hovered && isFollowing ? "pink" : "",
                      color: hovered && isFollowing ? "red" : "",
                    },
                  }}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                >
                  {hovered && isFollowing
                    ? t("unfollow")
                    : isFollowing
                      ? t("following")
                      : t("follow")}
                </Button>
              }
            />
          );
        })}
      </InfiniteScroll>
    </Container>
  );
};

export default Followers;
