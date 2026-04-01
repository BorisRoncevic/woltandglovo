const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!token;

  const decodeToken = (token) => {
    const decoded = jwtDecode(token);
    return { username: decoded.sub, role: decoded.role };
  };

  useEffect(() => {
    const stored = localStorage.getItem("token");

    if (stored) {
      setToken(stored);
      setUser(decodeToken(stored));
    }

    setLoading(false);
  }, []);

  const login = async (data) => {
    const token = await loginApi(data);

    localStorage.setItem("token", token);
    setToken(token);
    setUser(decodeToken(token));
  };

  

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const getAuthHeaders = () => {
    if (!token) return {};
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    };
  };

  

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        isAuthenticated,
        loading,
        getAuthHeaders
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
    return useContext(AuthContext);
  }