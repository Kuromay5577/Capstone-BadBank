import {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import useFetch from "./useFetch";

const AuthContext = createContext();

export const AuthProvider = ({ children, userData }) => {
  const { storedValue, setStoredValue } = useLocalStorage("user", userData);
  const { loading, error, getData, postData } = useFetch("users");
  const [authError, setAuthError] = useState(error);
  const navigate = useNavigate();

  useEffect(() => {
    setAuthError(error);
  }, [error]);

  const register = useCallback(
    async (_data) => {
      await postData(_data);
      setStoredValue(_data);
      navigate("/dashboard", { replace: true });
    },
    [navigate, postData, setStoredValue]
  );

  const login = useCallback(
    async (email, password) => {
      let currentUser = null;
      getData()
        .then((users) => {
          currentUser = users.filter((item) => {
            return item.email === email && item.password === password;
          });
          if (currentUser) {
            setStoredValue(currentUser[0]);
            navigate("/dashboard", { replace: true });
          } else {
            setAuthError(error);
          }
        })
        .catch((error) => {
          setAuthError(error);
        });
    },
    [error, getData, navigate, setStoredValue]
  );

  const logout = useCallback(() => {
    setStoredValue(null);
    navigate("/", { replace: true });
  }, [navigate, setStoredValue]);

  const resetError = () => {
    setAuthError(null);
  };

  const value = useMemo(
    () => ({
      error: authError,
      loading,
      user: storedValue,
      resetError,
      register,
      login,
      logout,
    }),
    [authError, loading, storedValue, register, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
