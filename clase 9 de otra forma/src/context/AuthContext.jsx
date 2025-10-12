import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [perfilVisible, setPerfilVisible] = useState(false);

  // Cargar usuario guardado al iniciar la app
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("usuario");
    if (token && userData) {
      setUsuario(JSON.parse(userData));
      setPerfilVisible(true); // Mostrar perfil si ya había sesión
    }
  }, []);

  // Simula login contra MockAPI
  const login = async (username, password) => {
    try {
      const res = await fetch(
        "https://68d87e112144ea3f6da833c6.mockapi.io/ListaDeUsuarios"
      );
      const users = await res.json();

      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        localStorage.setItem("token", "fake-token");
        localStorage.setItem("usuario", JSON.stringify(user));
        setUsuario(user);
        setPerfilVisible(true); // <-- activar perfil al login
        return { success: true, user };
      } else {
        return { success: false, message: "Usuario o contraseña incorrectos" };
      }
    } catch (error) {
      console.error("Error al autenticar:", error);
      return { success: false, message: "Error de conexión con el servidor" };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setUsuario(null);
    setPerfilVisible(false); // <-- ocultar perfil al logout
  };

  const togglePerfil = () => setPerfilVisible(!perfilVisible);

  return (
    <AuthContext.Provider
      value={{ usuario, login, logout, perfilVisible, togglePerfil }}
    >
      {children}
    </AuthContext.Provider>
  );
};





