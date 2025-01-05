import { api } from "../api";

export const fetchFollowers = async (userId, page) => {
  return await api.get(`/users/${userId}/followers?page=${page}`);
};
