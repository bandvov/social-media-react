
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
  Typography,
} from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  fetchNotificationsStart,
  fetchNotificationsSuccess,
} from "../../features/notifications/notificationsSlice";
import { Link } from "react-router-dom";

const Notifications = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const { data, hasMore, loading } = useSelector(
    (state) => state.notifications
  );

  useEffect(() => {
    if (data?.length === 0) {
      dispatch(fetchNotificationsStart({ user_id: user?.id }));
    }
  }, [dispatch, data?.length, user]);

  useEffect(() => {
    // Initialize EventSource to listen for SSE from the server
    const eventSource = new EventSource(
      `http://localhost:8081/listen?user_id=${user?.id}`
    ); // Replace with your SSE endpoint

    // Handle incoming messages
    eventSource.onmessage = (event) => {
      const newNotification = JSON.parse(event.data); // Assuming the data is JSON
      dispatch(
        fetchNotificationsSuccess({ data: [newNotification], hasMore: false })
      );
    };

    // Handle errors (if needed)
    eventSource.onerror = (error) => {
      console.error("SSE error:", JSON.stringify(error, null, 2));
    };

    // Clean up when the component is unmounted
    return () => {
      eventSource.close();
    };
  }, [user]);

  const loadMoreNotifications = () => {
    if (hasMore && !loading) {
      dispatch(fetchNotificationsStart({ user_id: user?.id }));
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h1">Notifications</Typography>
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreNotifications}
        hasMore={hasMore}
        loader={
          <Box display="flex" justifyContent="center" my={2}>
            <CircularProgress />
          </Box>
        }
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
