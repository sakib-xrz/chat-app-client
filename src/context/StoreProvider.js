"use client";

import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";

import APIKit from "@/common/APIkit";
import { AUTH_TOKEN_KEY } from "@/common/KeyChain";
import { setJWTokenAndRedirect } from "@/common/UtilKit";
import { toast } from "sonner";

const StoreContext = createContext();

export default function StoreProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const fetchMe = async () => {
    try {
      const { data } = await APIKit.me.getMe();
      setUser(data[0]);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      router.push("/logout");
    }
  };

  const refetchMe = () => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      setJWTokenAndRedirect(token)
        .then(fetchMe())
        .catch((error) => {
          console.log(error?.response);
        });
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_TOKEN_KEY);
    router.push("/login");
  };

  const userInfo = {
    user,
    fetchMe,
    refetchMe,
    logout,
  };

  return (
    <StoreContext.Provider value={userInfo}>{children}</StoreContext.Provider>
  );
}

export const useStore = () => {
  return useContext(StoreContext);
};
