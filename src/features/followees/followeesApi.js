import { api } from "../api";

export const fetchFollowees = async ({ userId, page }) => {
  return await api.get(`/users/${userId}/followees?page=${page}`);
};
