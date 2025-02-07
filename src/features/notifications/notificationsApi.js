export const fetchNotifications = async ({ userId, ...params }) => {
  return await api.get({
    params,
  });
};
