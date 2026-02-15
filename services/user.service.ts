
import { api } from "@/lib/api/axios";
import {
  InviteUserPayload,
  SetupAccountPayload,
  User,
} from "@/types/user";

export const usersService = {
  invite(payload: InviteUserPayload) {
    return api.post("/users/invite", payload);
  },

  setupAccount(payload: SetupAccountPayload) {
    return api.post("/users/setup-account", payload);
  },

  list() {
    return api.get<{ data: User[] }>("/users");
  },

  getById(id: string) {
    return api.get<{ data: User }>(`/users/${id}`);
  },

  update(id: string, payload: Partial<User>) {
    return api.put(`/users/${id}`, payload);
  },

  remove(id: string) {
    return api.delete(`/users/${id}`);
  },
};
