import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, ListItem, ListItemAvatar, ListItemText, Avatar, CircularProgress, Box } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchNotificationsStart } from '../../features/notifications/notificationsSlice';

const Notifications = () => {
  const dispatch = useDispatch();
  const { data, hasMore, loading } = useSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(fetchNotificationsStart());
  }, [dispatch]);

  const loadMoreNotifications = () => {
    if (hasMore && !loading) {
      dispatch(fetchNotificationsStart());
    }
  };

  return (
    <Box>
      <InfiniteScroll
        dataLength={notifications.length}
        next={loadMoreNotifications}
        hasMore={hasMore}
        loader={<CircularProgress />}
        scrollThreshold={0.9}
      >
        <List>
          {data.map((notification, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar alt={notification.username} src={notification.profilePic} />
              </ListItemAvatar>
              <ListItemText
                primary={notification.username}
                secondary="Followed you"
              />
            </ListItem>
          ))}
        </List>
      </InfiniteScroll>
    </Box>
  );
};

export default Notifications;
