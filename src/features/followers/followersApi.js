import { api } from "../api";

export const fetchFollowers = async ({ userId, ...params }) => {
  return await api.get(`/users/${userId}/followers`, {
    params,
  });
};

export async function removeFollower(followeeId) {
  return await api.delete(`/followers/${followeeId}`);
}
