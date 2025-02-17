import { api } from "../api";

export async function registration(credentials) {
  return await api.post("/users", { data: credentials });
}

export async function login(credentials) {
  return await api.post("/users/login", { data: credentials });
}
export async function Logout(credentials) {
  return await api.post("/users/logout", { data: credentials });
}
