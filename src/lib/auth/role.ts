import { User } from "./getUser";

export function isAdmin(role: string | undefined) {
  return role === "admin";
}

export function isEntryOfficer(role: string | undefined) {
  return role === "entry_officer";
}

export function isManager(role: string | undefined) {
  return role === "manager";
}