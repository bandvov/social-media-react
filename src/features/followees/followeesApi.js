import { api } from "../api";

export const fetchFollowees = async ({ userId, ...params }) => {
  return await api.get(`/users/${userId}/followees`, {
    params,
    withCredentials: true,
  });
};

export async function removeFollower(followerId) {
  return await api.delete(`/followees/${followerId}`, {
    mwithCredentials: true,
  });
}
