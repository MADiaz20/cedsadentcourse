import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import { AuthContext } from './components/AuthContext';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import ClientPage from './pages/ClientPage';

const App = () => {
  const { user } = useContext(AuthContext);

  return (
      <Routes>
        <Route path="/login" element={user ? <Navigate to={user.role === 'admin' ? "/admin" : "/client"} /> : <LoginPage />} />
        <Route path="/admin" element={user && user.role === 'admin' ? <AdminPage /> : <Navigate to="/login" />} />
        <Route path="/client" element={user && user.role === 'client' ? <ClientPage /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} /> {/* Redirigir cualquier ruta no encontrada a /login */}
      </Routes>
  );
};

export default App;
