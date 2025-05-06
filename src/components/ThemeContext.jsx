import { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Verificar si hay un tema guardado en localStorage
  const [modoOscuro, setModoOscuro] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  // Guardar el tema en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('theme', modoOscuro ? 'dark' : 'light');
  }, [modoOscuro]);

  const toggleTema = () => setModoOscuro(!modoOscuro);

  const valor = { modoOscuro, toggleTema };

  return (
    <ThemeContext.Provider value={valor}>
      <div style={{ 
        backgroundColor: modoOscuro ? '#121212' : '#f0f0f0', 
        color: modoOscuro ? '#ffffff' : '#000000', 
        minHeight: '100vh',
        transition: 'background-color 0.3s, color 0.3s' // Animación de transición
      }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}