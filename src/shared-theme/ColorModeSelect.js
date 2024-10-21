import * as React from 'react';
import { useColorScheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import { Box } from '@mui/material';
import { createTheme } from '@mui/material';
import getBlogTheme from '../course/theme/getBlogTheme';

export default function ColorModeSelect(props) {
  const { mode, setMode } = useColorScheme();
  const [dropdownMode, setDropdownMode] = React.useState(''); // Maneja el valor del dropdown

  // Efecto para inicializar el modo basado en localStorage o el modo del sistema
  React.useEffect(() => {
    const savedMode = localStorage.getItem('dropdownMode');
      setDropdownMode(savedMode);
  }, []);

  // Guardar el modo en localStorage cuando cambie
  const handleModeChange = (event) => {
    const selectedMode = event.target.value;
    localStorage.setItem('dropdownMode', selectedMode);
    if (selectedMode === 'system') {
      // Ajustar el modo al preferido del sistema
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const newMode = prefersDarkMode ? 'dark' : 'light';
      setDropdownMode(selectedMode);
      setMode(newMode); // Actualiza el modo de color en el contexto
      localStorage.setItem('themeMode', newMode); // Guardar el modo preferido en localStorage
    } else {
      setDropdownMode(selectedMode);
      setMode(selectedMode); // Actualiza el modo de color en el contexto
      localStorage.setItem('themeMode', selectedMode); // Guardar el modo seleccionado
    }
    createTheme(getBlogTheme(mode))
  };

  return (
    <Select
      value={dropdownMode || 'light'} // Asegurarse de que haya un valor predeterminado
      onChange={handleModeChange}
      SelectDisplayProps={{
        'data-screenshot': 'toggle-mode',
      }}
      {...props}
    >
      <MenuItem value="system">
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AutoModeIcon sx={{ marginRight: 1 }} />
          Auto
        </Box>
      </MenuItem>
      <MenuItem value="light">
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LightModeIcon sx={{ marginRight: 1 }} />
          Light
        </Box>
      </MenuItem>
      <MenuItem value="dark">
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <DarkModeIcon sx={{ marginRight: 1 }} />
          Dark
        </Box>
      </MenuItem>
    </Select>
  );
}
