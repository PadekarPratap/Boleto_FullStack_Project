import { createContext, useCallback, useEffect, useState } from "react";
import useGenerateToken from "../hooks/useGenerateToken";

export const CreateAuthContext = createContext();

let logoutTimer;

const AuthContext = ({ children }) => {
  const { mutate: generateToken } = useGenerateToken();

  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const [userId, setUserId] = useState(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && new Date(userData.expirationDate) > new Date())
      return userData.userId;

    return null;
  });

  const [accessToken, setAccessToken] = useState(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && new Date(userData.expirationDate) > new Date())
      return userData.accessToken;

    return null;
  });

  const [refreshToken, setRefreshToken] = useState(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && new Date(userData.expirationDate) > new Date())
      return userData.refreshToken;

    return null;
  });

  // storing the name of the user
  const [username, setUsername] = useState(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && new Date(userData.expirationDate) > new Date())
      return userData.username;

    return null;
  });

  const login = (userId, accessToken, refreshToken, name) => {
    setUserId(userId);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setUsername(name);

    const expirationDate = new Date(new Date().getTime() + 7200 * 1000);
    setTokenExpirationDate(expirationDate);

    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId,
        accessToken,
        refreshToken,
        username: name,
        expirationDate: expirationDate.toISOString(),
      })
    );
  };

  const logout = () => {
    setUserId(null);
    setUsername(null);
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("userData");
  };

  const updateAccessToken = useCallback(
    (newAccessToken) => {
      setAccessToken(newAccessToken);
      const expirationDate = new Date(new Date().getTime() + 7200 * 1000);
      setTokenExpirationDate(expirationDate);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId,
          username,
          refreshToken,
          accessToken: newAccessToken,
          expirationDate: expirationDate.toISOString(),
        })
      );
    },
    [refreshToken, userId, username]
  );

  // auto logout in case the token is expired
  useEffect(() => {
    if (userId && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(() => {
        // instead of logging out i.e. -> logout() we will auto generate the accesstoken using refresh_token
        // logout();
        generateToken(
          { refresh_token: refreshToken },
          {
            onSuccess: (data) => updateAccessToken(data.access_token),
          }
        );
      }, remainingTime);
    } else {
      clearInterval(logoutTimer);
    }
  }, [
    tokenExpirationDate,
    userId,
    refreshToken,
    generateToken,
    updateAccessToken,
  ]);

  return (
    <CreateAuthContext.Provider
      value={{
        userId,
        accessToken,
        refreshToken,
        username,
        login,
        logout,
        updateAccessToken,
      }}
    >
      {children}
    </CreateAuthContext.Provider>
  );
};
export default AuthContext;
