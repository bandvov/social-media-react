import { api } from "../api";

export const addComment = async (data) => {
  return await api.post("/comments", { data });
};

export const fetchComments = async ({ entity_id, ...params }) => {
  return await api.get(`/comments/${entity_id}`, { params });
};
