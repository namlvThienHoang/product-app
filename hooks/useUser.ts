
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { AuthResponse, UserResponse } from "@/types/auth";
import useCookie from "./useCookie";
import useSWR from "swr";
import { authService } from "@/services/authService";

export const useUser = () => {
  const { user, setUser } = useContext(AuthContext);
  const { setCookie, removeCookie } = useCookie();

  const addUser = (user: AuthResponse) => {    
    setUser(user);
    setCookie("user", JSON.stringify(user));
  };

  const getUser = () => {
    const { data, error } = useSWR<UserResponse>('auth/me', () => authService.getAuthUser());
  
    return {
      user: data, 
      isLoading: !error && !data,
      isError: !!error,
    };
  };

  const removeUser = () => {
    setUser(null);
    removeCookie("user");
  };

  return { user, addUser, removeUser, getUser };
};