import { api } from "../api";

export const addComment = (data) => {
  return api.post("/comments", data, { withCredentials: true });
};
