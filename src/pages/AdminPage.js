import React, { useContext, useState } from 'react';
import { AuthContext } from '../components/AuthContext';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';

const AdminPage = () => {
  const { user, logout } = useContext(AuthContext);
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);
  const [newUser, setNewUser] = useState({ name: '', role: 'client', password: '' });
  const [editMode, setEditMode] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  // Función para crear usuario
  const createUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.password) return alert("El nombre y la contraseña no pueden estar vacíos");

    // Verificar si el nombre de usuario ya existe
    if (users.some(u => u.name === newUser.name)) {
      return alert("El nombre de usuario ya existe");
    }

    const updatedUsers = [...users, { ...newUser, id: Date.now() }];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    setNewUser({ name: '', role: 'client', password: '' });
    setOpenCreateDialog(false);
  };

  // Función para abrir el popup de edición
  const handleEditUser = (userId) => {
    const userToEdit = users.find(u => u.id === userId);
    setNewUser({ ...userToEdit, password: '' }); // Deja el campo de contraseña vacío
    setEditMode(userId);
    setOpenEditDialog(true);
  };

  // Función para actualizar usuario
  const updateUser = (e) => {
    e.preventDefault();

    // Verificar si el nombre de usuario ya existe (excepto el que se está editando)
    if (users.some(u => u.name === newUser.name && u.id !== editMode)) {
      return alert("El nombre de usuario ya existe");
    }

    const updatedUsers = users.map(u =>
      u.id === editMode ? { ...u, ...newUser, password: newUser.password || u.password } : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    setNewUser({ name: '', role: 'client', password: '' });
    setEditMode(null);
    setOpenEditDialog(false);
  };

  // Función para eliminar usuario
  const handleDeleteUser = (userId) => {
    setDeleteUserId(userId);
    setOpenDeleteDialog(true);
  };

  const confirmDeleteUser = () => {
    const updatedUsers = users.filter(u => u.id !== deleteUserId);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    setOpenDeleteDialog(false);
    setDeleteUserId(null);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Page</h1>
      <Button variant="contained" color="secondary" onClick={logout}>
        Logout
      </Button>
      <h2>Gestión de Usuarios</h2>

      {/* Botón para abrir el popup de crear usuario */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenCreateDialog(true)}
        style={{ marginBottom: '20px' }}
      >
        Crear Usuario
      </Button>

      {/* Tabla de usuarios */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u) => (
              u.id !== user.id && (
                <TableRow key={u.id}>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.role}</TableCell>
                  <TableCell>
                    <Button variant="outlined" color="primary" onClick={() => handleEditUser(u.id)}>
                      Editar
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={() => handleDeleteUser(u.id)}>
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              )
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Popup de creación de usuario */}
      <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)}>
        <DialogTitle>Crear Usuario</DialogTitle>
        <DialogContent>
          <DialogContentText>Ingresa los detalles del nuevo usuario.</DialogContentText>
          <form onSubmit={createUser}>
            <TextField
              label="Nombre de Usuario"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              required
              fullWidth
              margin="dense"
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Rol</InputLabel>
              <Select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              >
                <MenuItem value="client">Cliente</MenuItem>
                <MenuItem value="admin">Administrador</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Contraseña"
              type="password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              required
              fullWidth
              margin="dense"
            />
            <DialogActions>
              <Button onClick={() => setOpenCreateDialog(false)} color="primary">
                Cancelar
              </Button>
              <Button type="submit" color="primary">
                Crear
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      {/* Popup de edición */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Editar Usuario</DialogTitle>
        <DialogContent>
          <DialogContentText>Edita los detalles del usuario seleccionado.</DialogContentText>
          <form onSubmit={updateUser}>
            <TextField
              label="Nombre de Usuario"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              required
              fullWidth
              margin="dense"
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Rol</InputLabel>
              <Select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              >
                <MenuItem value="client">Cliente</MenuItem>
                <MenuItem value="admin">Administrador</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Contraseña"
              type="password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              placeholder="Deja vacío para no cambiar"
              fullWidth
              margin="dense"
            />
            <DialogActions>
              <Button onClick={() => setOpenEditDialog(false)} color="primary">
                Cancelar
              </Button>
              <Button type="submit" color="primary">
                Guardar
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      {/* Popup de confirmación de eliminación */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar este usuario?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={confirmDeleteUser} color="secondary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminPage;
