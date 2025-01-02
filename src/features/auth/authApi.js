import { api } from "../api";

export async function registration(credentials) {
  return await api.post("/users", credentials);
}

export async function login(credentials) {
  return await api.post("/users/login", credentials);
}
