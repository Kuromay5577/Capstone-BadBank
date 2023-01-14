import { useCallback } from "react";
import { createContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = useCallback(
    async (data) => {
      setUser(data);
      navigate("/dashboard", { replace: true });
    },
    [navigate, setUser]
  );

  // call this function to sign out logged in user
  const logout = useCallback(() => {
    setUser(null);
    navigate("/", { replace: true });
  }, [navigate, setUser]);

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [login, logout, user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext };
export default AuthProvider;
