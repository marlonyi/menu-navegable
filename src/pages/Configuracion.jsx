function Configuracion() {
    const styles = {
      container: {
        maxWidth: '600px',
        margin: '2rem auto',
        padding: '2rem',
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
      },
      heading: {
        fontSize: '1.8rem',
        marginBottom: '1.5rem',
        color: '#333',
        textAlign: 'center',
      },
      formGroup: {
        marginBottom: '1.5rem',
      },
      label: {
        display: 'block',
        marginBottom: '0.5rem',
        fontWeight: 'bold',
        color: '#555',
      },
      select: {
        width: '100%',
        padding: '10px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        fontSize: '1rem',
      },
      checkboxContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      },
      checkbox: {
        width: '18px',
        height: '18px',
      },
    };
  
    return (
      <div style={styles.container}>
        <h2 style={styles.heading}>⚙️ Configuración del Sistema</h2>
        <form>
          <div style={styles.formGroup}>
            <label style={styles.label}>Idioma:</label>
            <select style={styles.select}>
              <option>Español</option>
              <option>Inglés</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Notificaciones:</label>
            <div style={styles.checkboxContainer}>
              <input type="checkbox" style={styles.checkbox} />
              <span>Activar notificaciones</span>
            </div>
          </div>
        </form>
      </div>
    );
  }
  
  export default Configuracion;
  