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
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
//import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children, userData }) => {
  const { storedValue, setStoredValue } = useLocalStorage("user", userData);
  const { loading, error, getData, postData, updateData } = useFetch("users");
  const [authError, setAuthError] = useState(error);
  const navigate = useNavigate();

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyAyh3eLvzSeiARhklrGDnAZeIT_kyfC0bs",
      authDomain: "badbank-2e860.firebaseapp.com",
      projectId: "badbank-2e860",
      storageBucket: "badbank-2e860.appspot.com",
      messagingSenderId: "974562135218",
      appId: "1:974562135218:web:ad91c33e1b9710c77ecdab",
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }, []);

  useEffect(() => {
    setAuthError(error);
  }, [error]);

  const register = useCallback(
    async (_data) => {
      const finalData = { ..._data, balance: 0 };
      try {
        const response = await postData(finalData);
        setStoredValue({ ...finalData, ...response });
        navigate("/dashboard/main", { replace: true });
      } catch (error) {
        setAuthError(error);
      }
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

  const googleLogin = useCallback(async () => {
    const auth = firebase.auth();

    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    auth
      .signInWithPopup(provider)
      .then((result) => {
        getData()
          .then((users) => {
            let currentUser = null;
            currentUser = users.filter((item) => {
              return result.user.email === item.email;
            });
            if (currentUser) {
              setStoredValue(currentUser[0]);
              navigate("/dashboard/main", { replace: true });
            } else {
              setAuthError(error);
            }
          })
          .catch((_error) => {
            setAuthError(_error);
          });
      })
      .catch((_error) => {
        setAuthError(_error);
      });
  }, [error, getData, navigate, setStoredValue]);

  const googleRegister = useCallback(async () => {
    const auth = firebase.auth();

    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    auth
      .signInWithPopup(provider)
      .then(async (result) => {
        const finalData = {
          name: result.user.displayName,
          email: result.user.email,
          password: "google_provider",
          balance: "user".balance,
        };
        await postData(finalData);
        setStoredValue(finalData);
        navigate("/dashboard/main", { replace: true });
      })
      .catch((_error) => {
        setAuthError(_error);
      });
  }, [navigate, postData, setStoredValue]);

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
      googleLogin,
      googleRegister,
    }),
    [
      authError,
      loading,
      storedValue,
      updateUser,
      register,
      login,
      logout,
      googleLogin,
      googleRegister,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
