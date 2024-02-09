"use client";

import { useStore } from "@/context/StoreProvider";
import { useEffect } from "react";

export default function Logout() {
  const { logout } = useStore();

  useEffect(() => {
    logout();
  }, [logout]);

  return null;
}
