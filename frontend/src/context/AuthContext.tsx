import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";
import { login as loginApi } from "../api/authApi";

export interface AuthUser {
  username: string;
  role: string;
}

export interface AuthContextValue {
  token: string | null;
  user: AuthUser | null;
  guestId: string | null;

  login: (data: { username: string; password: string }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function decodeToken(token: string): AuthUser {
  const decoded = jwtDecode<{ sub: string; role: string }>(token);
  return {
    username: decoded.sub,
    role: decoded.role,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [guestId, setGuestId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!token;

  // 🔹 INIT (rehydration iz localStorage)
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedGuestId = localStorage.getItem("guestId");

    // token
    if (storedToken) {
      try {
        setToken(storedToken);
        setUser(decodeToken(storedToken));
      } catch {
        localStorage.removeItem("token");
      }
    }

    // guestId
    if (storedGuestId) {
      setGuestId(storedGuestId);
    } else {
      const newGuestId = crypto.randomUUID();
      localStorage.setItem("guestId", newGuestId);
      setGuestId(newGuestId);
    }

    setLoading(false);
  }, []);

  // 🔹 LOGIN
  const login = async (data: { username: string; password: string }) => {
    const newToken = await loginApi(data);

    localStorage.setItem("token", newToken);

    setToken(newToken);
    setUser(decodeToken(newToken));
  };

  // 🔹 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");

    const newGuestId = crypto.randomUUID();
    localStorage.setItem("guestId", newGuestId);

    setGuestId(newGuestId);
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        guestId,
        login,
        logout,
        isAuthenticated,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// 🔹 HOOK
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);

  if (ctx === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return ctx;
}