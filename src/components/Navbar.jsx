import { useTheme } from './ThemeContext';

function Navbar() {
  const { modoOscuro, toggleTema } = useTheme();

  const styles = {
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.8rem 1.5rem',
      backgroundColor: modoOscuro ? '#1e1e1e' : '#f5f5f5',
      color: modoOscuro ? '#fff' : '#000',
      borderBottom: `1px solid ${modoOscuro ? '#333' : '#ccc'}`,
      position: 'sticky',
      top: 0,
      zIndex: 100,
    },
    button: {
      padding: '0.5rem 1rem',
      backgroundColor: modoOscuro ? '#333' : '#e0e0e0',
      color: modoOscuro ? '#fff' : '#000',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: 'bold'
    }
  };

  return (
    <div style={styles.navbar}>
      <div></div>
      <button onClick={toggleTema} style={styles.button}>
        {modoOscuro ? '☀️ Claro' : '🌙 Oscuro'}
      </button>
    </div>
  );
}

export default Navbar;
