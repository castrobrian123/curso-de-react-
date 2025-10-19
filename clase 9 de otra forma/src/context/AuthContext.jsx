import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [perfilVisible, setPerfilVisible] = useState(false);

  const login = async (username, password, USERS_URL) => {
    try {
      const res = await fetch(USERS_URL);
      const data = await res.json();

      const userFound = data.find(
        (u) => u.username === username && u.password === password
      );

      if (userFound) {
        setUsuario(userFound);
        setPerfilVisible(true);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      return false;
    }
  };

  const loginUsuarioDirecto = (user) => {
    setUsuario(user);
    setPerfilVisible(true);
  };

  const logout = () => {
    setUsuario(null);
    setPerfilVisible(false);
  };

  return (
    <AuthContext.Provider
      value={{ usuario, login, logout, perfilVisible, setPerfilVisible, loginUsuarioDirecto }}
    >
      {children}
    </AuthContext.Provider>
  );
};










