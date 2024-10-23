"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { UserType } from "@/types/user";

const useDecodeToken = () => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decodedUser = jwtDecode<UserType>(token);
      setUser(decodedUser);
    }
  }, []);

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
  };

  return { user, setUser, logout };
};

export default useDecodeToken;
