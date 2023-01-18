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
  const { loading, error, getData, postData, updateData } = useFetch("users");
  const [authError, setAuthError] = useState(error);
  const navigate = useNavigate();

  useEffect(() => {
    setAuthError(error);
  }, [error]);

  const register = useCallback(
    async (_data) => {
      const finalData = { ..._data, balance: 0 };
      await postData(finalData);
      setStoredValue(finalData);
      navigate("/dashboard/main", { replace: true });
    },
    [navigate, postData, setStoredValue]
  );

  const updateUser = useCallback(
    async (_data) => {
      await updateData(_data);
      setStoredValue(_data);
    },
    [setStoredValue, updateData]
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
            navigate("/dashboard/main", { replace: true });
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
      updateUser,
      resetError,
      register,
      login,
      logout,
    }),
    [authError, loading, storedValue, updateUser, register, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
