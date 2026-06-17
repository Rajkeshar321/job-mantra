import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');  // ✅ Changed from 'jobmantra_token'
    if (storedToken) {
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      const { token: newToken, user: newUser } = response;
      
      localStorage.setItem('token', newToken);  // ✅ Changed from 'jobmantra_token'
      setToken(newToken);
      setUser(newUser);
      return newUser;
    } catch (err) {
      throw err;
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      const { token: newToken, user: newUser } = response;
      
      localStorage.setItem('token', newToken);  // ✅ Changed from 'jobmantra_token'
      setToken(newToken);
      setUser(newUser);
      return newUser;
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');  // ✅ Changed from 'jobmantra_token'
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token,
      login, 
      logout, 
      register,
      loading, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);