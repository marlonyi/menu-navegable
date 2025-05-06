import { useState, useEffect } from 'react';
import { useTheme } from '../components/ThemeContext';
import { Toast } from '../components/Toast';

function Configuracion() {
  const { modoOscuro } = useTheme();

  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('config');
    return saved ? JSON.parse(saved) : {
      idioma: 'es',
      notificaciones: true,
      fuente: 'medium',
      mostrarAyuda: true
    };
  });

  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ show: false, message: '' });

  useEffect(() => {
    localStorage.setItem('config', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const guardarConfiguracion = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.idioma) {
      newErrors.idioma = 'Debes seleccionar un idioma';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    localStorage.setItem('config', JSON.stringify(formData));
    setToast({ show: true, message: '¡Configuración guardada correctamente!' });
  };

  // === Estilos ===
  const styles = {
    container: {
      padding: '2rem',
      backgroundColor: modoOscuro ? '#121212' : '#f4f7fa',
      color: modoOscuro ? '#f0f0f0' : '#222',
      minHeight: '100vh',
      transition: 'background-color 0.3s ease'
    },
    title: {
      fontSize: '2rem',
      fontWeight: '700',
      marginBottom: '1.5rem',
      textAlign: 'center'
    },
    formGroup: {
      marginBottom: '1.5rem'
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontWeight: '600'
    },
    select: {
      padding: '0.5rem',
      borderRadius: '8px',
      border: '1px solid #ccc',
      background: modoOscuro ? '#1e1e1e' : '#fff',
      color: modoOscuro ? '#f0f0f0' : '#000',
      width: '100%',
      maxWidth: '300px'
    },
    checkboxContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    radioGroup: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap'
    },
    radioLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.4rem',
      fontWeight: '500'
    },
    errorMessage: {
      color: 'tomato',
      fontSize: '0.9rem',
      marginTop: '0.25rem'
    },
    button: {
      marginTop: '1rem',
      padding: '0.6rem 1.2rem',
      borderRadius: '10px',
      border: 'none',
      background: modoOscuro ? '#4caf50' : '#2e7d32',
      color: '#fff',
      fontWeight: 'bold',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>⚙️ Configuración del Sistema</h2>

      <form onSubmit={guardarConfiguracion}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Idioma:</label>
          <select
            name="idioma"
            value={formData.idioma}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="">Selecciona un idioma</option>
            <option value="es">Español</option>
            <option value="en">Inglés</option>
            <option value="fr">Francés</option>
          </select>
          {errors.idioma && <div style={styles.errorMessage}>{errors.idioma}</div>}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Notificaciones:</label>
          <div style={styles.checkboxContainer}>
            <input
              type="checkbox"
              name="notificaciones"
              checked={formData.notificaciones}
              onChange={handleChange}
            />
            <span>Activar notificaciones</span>
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Tamaño de fuente:</label>
          <div style={styles.radioGroup}>
            {['small', 'medium', 'large'].map(size => (
              <label key={size} style={styles.radioLabel}>
                <input
                  type="radio"
                  name="fuente"
                  value={size}
                  checked={formData.fuente === size}
                  onChange={handleChange}
                />
                <span>{size === 'small' ? 'Pequeña' : size === 'medium' ? 'Media' : 'Grande'}</span>
              </label>
            ))}
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Otras opciones:</label>
          <div style={styles.checkboxContainer}>
            <input
              type="checkbox"
              name="mostrarAyuda"
              checked={formData.mostrarAyuda}
              onChange={handleChange}
            />
            <span>Mostrar ayuda contextual</span>
          </div>
        </div>

        <button type="submit" style={styles.button}>Guardar configuración</button>
      </form>

      <Toast
        message={toast.message}
        show={toast.show}
        setShow={(show) => setToast({ ...toast, show })}
      />
    </div>
  );
}

export default Configuracion;
