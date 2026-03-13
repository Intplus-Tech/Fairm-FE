import { User } from "./getUser";

export function isAdmin(role: string | undefined) {
  return role === "super_admin";
}

export function isEntryOfficer(role: string | undefined) {
  return role === "staff";
}

export function isManager(role: string | undefined) {
  return role === "manager";
}
