import { api } from "@/lib/api/axios";
import {
  InviteUserPayload,
  SetupAccountPayload,
  User,
  UsersListResponse,
} from "@/types/user";

export const usersService = {
  invite(payload: InviteUserPayload) {
    return api.post("/users/invite", payload);
  },

  setupAccount(payload: SetupAccountPayload) {
    return api.post("/users/setup-account", payload);
  },

  list() {
    return api.get<UsersListResponse>("/users").then((res) => res.data.data);
  },

  getById(id: string) {
    return api.get<{ data: User }>(`/users/${id}`);
  },

  update(id: string, payload: Partial<User>) {
    return api
      .put<{ ok: boolean; data: User }>(`/users/${id}`, payload)
      .then((res) => res.data.data);
  },

  remove(id: string) {
    return api.delete(`/users/${id}`);
  },
};
