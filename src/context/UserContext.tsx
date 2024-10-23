"use client";

import { UserType } from "@/types/user";
import { createContext } from "react";

interface UserContextType {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export default UserContext;
