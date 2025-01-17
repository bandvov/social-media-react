import { api } from "../api";

export const fetchFollowees = async ({ userId, ...params }) => {
  return await api.get(`/users/${userId}/followees`, {
    params,
  });
};

export async function removeFollowee(followerId) {
  return await api.delete(`/followees/${followerId}`);
}
