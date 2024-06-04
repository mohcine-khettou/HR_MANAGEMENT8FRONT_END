import React, { useContext, useEffect, useState } from "react";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
} from "../utils/localStorage";
import { login as loginApi } from "../api/auth";
import { getUserByEmail as getUserByEmailApi } from "../api/users";
import { jwtDecode } from "jwt-decode";

const AppContext = React.createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(getUserFromLocalStorage());
  const login = async (email, password) => {
    const { data: accessToken } = await loginApi(email, password);
    if (!accessToken) {
      // handle error
      return;
    }
    const { data: user } = await getUserByEmailApi(jwtDecode(accessToken).sub);
    if (!user) {
      // handle error
      return;
    }
    addUserToLocalStorage({ ...user, accessToken });
    setUser({ ...user, accessToken });
  };
  const showMe = async () => {
    const accessToken = user.accessToken;
    if (accessToken) {
      const { data: user } = await getUserByEmailApi(
        jwtDecode(accessToken).sub
      );
      if (!user) {
        // handle error
        return;
      }
      addUserToLocalStorage({ ...user, accessToken });
      setUser({ ...user, accessToken });
    }
  };
  useEffect(() => {
    showMe();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        login,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(AppContext);
};

export default UserProvider;
