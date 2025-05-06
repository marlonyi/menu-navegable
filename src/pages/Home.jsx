import { useEffect, useState } from 'react';
import { useTheme } from '../components/ThemeContext';

function Home() {
  const { modoOscuro } = useTheme();
  const [date, setDate] = useState(new Date());
  const [config, setConfig] = useState({ idioma: 'es' });

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    const savedConfig = localStorage.getItem('config');
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    }

    return () => clearInterval(timer);
  }, []);

  const texts = {
    es: {
      welcome: 'Bienvenido al Sistema de Gestión',
      description: 'Este sistema te permite administrar carros y conductores de forma simple.',
      time: 'Hora actual:',
      functionalities: 'Funcionalidades:',
      functions: [
        'Gestión de carros con búsqueda y paginación',
        'Administración de conductores',
        'Configuración personalizada',
        'Tema claro/oscuro'
      ]
    },
    en: {
      welcome: 'Welcome to the Management System',
      description: 'This system allows you to manage cars and drivers in an easy way.',
      time: 'Current time:',
      functionalities: 'Features:',
      functions: [
        'Car management with search and pagination',
        'Driver administration',
        'Custom settings',
        'Light/dark theme'
      ]
    },
    fr: {
      welcome: 'Bienvenue au Système de Gestion',
      description: 'Ce système vous permet de gérer les voitures et les conducteurs simplement.',
      time: 'Heure actuelle:',
      functionalities: 'Fonctionnalités:',
      functions: [
        'Gestion des voitures avec recherche et pagination',
        'Administration des conducteurs',
        'Configuration personnalisée',
        'Thème clair/sombre'
      ]
    }
  };

  const t = texts[config.idioma] || texts.es;

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem',
      minHeight: '100vh',
      backgroundColor: modoOscuro ? '#1a1c1f' : '#f7f9fc',
      color: modoOscuro ? '#f0f0f0' : '#222',
      transition: 'background-color 0.3s ease'
    },
    card: {
      backgroundColor: modoOscuro ? '#2b2e33' : '#ffffff',
      padding: '2rem',
      borderRadius: '20px',
      boxShadow: modoOscuro
        ? '0 10px 20px rgba(0, 0, 0, 0.3)'
        : '0 10px 20px rgba(0, 0, 0, 0.05)',
      maxWidth: '700px',
      width: '100%',
      animation: 'fadeIn 0.6s ease-out'
    },
    title: {
      fontSize: '2.5rem',
      marginBottom: '1rem',
      fontWeight: '700'
    },
    description: {
      fontSize: '1.2rem',
      marginBottom: '2rem',
      lineHeight: '1.6'
    },
    clockContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '2rem'
    },
    clock: {
      fontSize: '1.5rem',
      fontWeight: '600',
      padding: '0.3rem 1rem',
      background: modoOscuro ? 'rgba(255, 255, 255, 0.05)' : 'rgba(100, 100, 255, 0.1)',
      borderRadius: '8px'
    },
    featuresTitle: {
      fontSize: '1.4rem',
      marginBottom: '1rem'
    },
    featureItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '0.75rem',
      fontSize: '1.1rem'
    },
    featureIcon: {
      color: '#4caf50',
      marginRight: '0.6rem',
      fontWeight: 'bold',
      fontSize: '1.2rem'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>{t.welcome}</h1>
        <p style={styles.description}>{t.description}</p>

        <div style={styles.clockContainer}>
          <p>{t.time}</p>
          <div style={styles.clock}>{date.toLocaleTimeString()}</div>
        </div>

        <div>
          <h3 style={styles.featuresTitle}>{t.functionalities}</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {t.functions.map((func, index) => (
              <li key={index} style={styles.featureItem}>
                <span style={styles.featureIcon}>✓</span>
                <span>{func}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
