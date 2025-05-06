import { useEffect } from 'react';
import { useTheme } from './ThemeContext';

export function Toast({ message, show, setShow }) {
  const { modoOscuro } = useTheme();
  
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => setShow(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [show, setShow]);

  if (!show) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      padding: '10px 20px',
      borderRadius: '4px',
      backgroundColor: modoOscuro ? '#444' : '#333',
      color: 'white',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      zIndex: 1000,
      animation: 'fadeIn 0.3s',
    }}>
      {message}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}