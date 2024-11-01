import { useUser } from "@/hooks/useUser";
import useCookie from "./useCookie";
import { authService } from "@/services/authService";

export const useAuth = () => {
  const { user, addUser, removeUser } = useUser();

  const { getCookie } = useCookie();

  const refresh = () => {
    let existingUser = null;
    const getFromCookie = async () => (existingUser = getCookie("user"));
    getFromCookie();

    if (existingUser) {
      try {
        addUser(JSON.parse(existingUser));
      } catch (e) {
        console.log(e);
      }
    }
  };

//   const register = async (creds: TRegister) => {
//     return await axios
//       .post(`${API_URL}auth/register`, creds)
//       .then((res) => {
//         if (res.data?.data && res.data.data?.token) addUser(res.data.data);
//         return res.data as AuthResponse;
//       })
//       .catch((err) => {
//         if (err && err?.response && err.response?.data)
//           return { ...err.response.data, success: false } as AuthResponse;
//         else return err as AuthResponse;
//       });
//   };


  const login = async (username: string, password: string) => {
    const data = await authService.login(username, password);
    if(data) {
      addUser(data);
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
    }
    return data;
  };

  const logout = () => {
    removeUser();
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  };

  return { user, login, logout, refresh };
};