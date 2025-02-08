import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  CircularProgress,
  Box,
  AvatarGroup,
  Container,
} from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchNotificationsStart } from "../../features/notifications/notificationsSlice";
import { Link } from "react-router-dom";

const Notifications = () => {
  const dispatch = useDispatch();
  const { data, hasMore, loading } = useSelector(
    (state) => state.notifications
  );

  useEffect(() => {
    dispatch(fetchNotificationsStart());
  }, [dispatch]);

  const loadMoreNotifications = () => {
    if (hasMore && !loading) {
      dispatch(fetchNotificationsStart());
    }
  };

  return (
    <Container maxWidth="sm">
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreNotifications}
        hasMore={hasMore}
        loader={
          <Box display="flex" justifyContent="center" my={2}>
            <CircularProgress />
          </Box>
        }
        scrollThreshold={0.9}
      >
        <List>
          {data.map((notification, index) => (
            <ListItem
              key={notification.id || index}
              sx={{ borderBottom: "1px solid black", mb: 2 }}
            >
              <ListItemText
                primary={
                  <Box display="flex" sx={{ mb: 2 }}>
                    <AvatarGroup max={4}>
                      {notification?.actor_ids?.map((actorId) => (
                        <Link to={`/user/${actorId}`}>
                          <Avatar
                            key={actorId}
                            alt={`User ${actorId}`}
                            src={`/static/images/avatar/${actorId}.jpg`}
                          />
                        </Link>
                      ))}
                    </AvatarGroup>
                  </Box>
                }
                secondary={notification?.message}
              />
            </ListItem>
          ))}
        </List>
      </InfiniteScroll>
    </Container>
  );
};

export default Notifications;
