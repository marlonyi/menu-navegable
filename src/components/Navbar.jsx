import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  const styles = {
    navbar: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      backgroundColor: '#ffffff',
      padding: '1rem',
      borderBottom: '1px solid #e0e0e0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    },
    link: (isActive) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '10px 20px',
      borderRadius: '8px',
      textDecoration: 'none',
      fontWeight: isActive ? 'bold' : 'normal',
      color: isActive ? '#ffffff' : '#333333',
      backgroundColor: isActive ? '#4caf50' : '#f9f9f9',
      border: '1px solid ' + (isActive ? '#4caf50' : '#ccc'),
      transition: 'all 0.3s ease',
    }),
  };

  const menuItems = [
    { to: '/', label: 'Home', icon: '🏠' },
    { to: '/carros', label: 'Carros', icon: '🚗' },
    { to: '/conductores', label: 'Conductores', icon: '🧑‍✈️' },
    { to: '/configuracion', label: 'Configuración', icon: '⚙️' },
  ];

  return (
    <nav style={styles.navbar}>
      {menuItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          style={styles.link(location.pathname === item.to)}
        >
          {item.icon} {item.label}
        </Link>
      ))}
    </nav>
  );
}

export default Navbar;
