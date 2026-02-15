"use client";

import { useEffect, useState } from "react";

import { User } from "@/types/user";
import { usersService } from "../../services/user.service";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchUsers() {
    setLoading(true);
    try {
      const res = await usersService.list();
      setUsers(res.data.data);
    } finally {
      setLoading(false);
    }
  }

  async function inviteUser(payload: Parameters<typeof usersService.invite>[0]) {
    await usersService.invite(payload);
    await fetchUsers();
  }

  async function deleteUser(id: string) {
    await usersService.remove(id);
    setUsers(prev => prev.filter(u => u._id !== id));
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    inviteUser,
    deleteUser,
    refresh: fetchUsers,
  };
}
