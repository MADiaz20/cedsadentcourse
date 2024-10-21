import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const loggedUser = localStorage.getItem('loggedUser');
    return loggedUser ? JSON.parse(loggedUser) : null;
  });

  useEffect(() => {
    // Cargar usuarios por defecto si no existen en localStorage
    const defaultUsers = [
      { id: 1, name: 'admin', password: 'admin123', role: 'admin' },
      { id: 2, name: 'client', password: 'client123', role: 'client' },
    ];

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Verificar si el usuario 'admin' ya existe
    const adminExists = existingUsers.some(user => user.name === 'admin');

    // Si el usuario 'admin' no existe, agregarlo
    if (!adminExists) {
      existingUsers.push(defaultUsers[0]); // Agregar solo el admin
    }

    // Comprobar si existe el cliente y agregarlo si no existe
    const clientExists = existingUsers.some(user => user.name === 'client');
    if (!clientExists) {
      existingUsers.push(defaultUsers[1]); // Agregar solo el cliente
    }

    // Guardar los usuarios actualizados en localStorage
    localStorage.setItem('users', JSON.stringify(existingUsers));
  }, []);

  const login = (username, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = users.find(u => u.name === username && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('loggedUser', JSON.stringify(foundUser));
    } else {
      alert('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('loggedUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
