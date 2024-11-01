"use client";
import { ReactNode, createContext, useEffect, useState } from "react";
import { AuthResponse } from "@/types/auth";
import useCookie from "@/hooks/useCookie";

interface TAuthContext {
  user: AuthResponse | null;
  setUser: (user: AuthResponse | null) => void;
}

export const AuthContext = createContext<TAuthContext>({
  user: null,
  setUser: () => {},
});

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<AuthResponse | null>(null);
  const { getCookie } = useCookie();

  useEffect(() => {
    if (!user) {
      let existingUser = null;
      const getFromCookie = async () => (existingUser = getCookie("user"));
      getFromCookie();

      if (existingUser) {
        try {
          setUser(JSON.parse(existingUser));
        } catch (e) {
          console.log(e);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};