import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { modoOscuro } = useTheme();

  // Verifica si es vista móvil
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setIsOpen(!mobile);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const styles = {
    sidebar: {
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100%',
      width: isOpen ? 200 : 60,
      backgroundColor: modoOscuro ? '#1e1e1e' : '#f0f0f0',
      color: modoOscuro ? '#fff' : '#222',
      transition: 'width 0.3s',
      overflowX: 'hidden',
      boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
      zIndex: 1000,
      paddingTop: '1rem'
    },
    toggleBtn: {
      position: 'absolute',
      top: 10,
      right: -35,
      width: 30,
      height: 30,
      borderRadius: '50%',
      border: 'none',
      background: modoOscuro ? '#333' : '#ddd',
      color: modoOscuro ? '#fff' : '#000',
      cursor: 'pointer',
      fontSize: '1.2rem'
    },
    link: {
      display: 'flex',
      alignItems: 'center',
      padding: '0.8rem',
      textDecoration: 'none',
      color: modoOscuro ? '#fff' : '#222',
      fontWeight: 500,
      transition: 'background 0.2s',
      borderRadius: '8px',
      margin: '0.5rem'
    },
    icon: {
      marginRight: isOpen ? 10 : 0,
      fontSize: '1.2rem'
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.3)',
      zIndex: 999
    }
  };

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/carros', label: 'Carros', icon: '🚗' },
    { path: '/conductores', label: 'Conductores', icon: '🧑‍✈️' },
    { path: '/configuracion', label: 'Configuración', icon: '⚙️' }
  ];

  return (
    <>
      <div style={styles.sidebar}>
        <button onClick={() => setIsOpen(!isOpen)} style={styles.toggleBtn}>
          {isOpen ? '✖' : '☰'}
        </button>

        <div>
          {navItems.map(({ path, label, icon }) => (
            <Link to={path} key={path} style={styles.link}>
              <span style={styles.icon}>{icon}</span>
              {isOpen && <span>{label}</span>}
            </Link>
          ))}
        </div>
      </div>

      {isMobile && isOpen && (
        <div style={styles.overlay} onClick={() => setIsOpen(false)} />
      )}
    </>
  );
}

export default Sidebar;
