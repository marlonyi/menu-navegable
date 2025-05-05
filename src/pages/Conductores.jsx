function Conductores() {
    const mockConductores = ['Marlon Yi Arnedo',  'Luis Fernando', 'Jorge Ramos', 'Carlos Alberto', 'Juan Carlos',  'Andres Felipe', 'Diego Fernando'];
  
    const styles = {
      container: {
        maxWidth: '600px',
        margin: '2rem auto',
        padding: '2rem',
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        textAlign: 'center',
      },
      heading: {
        fontSize: '1.8rem',
        marginBottom: '1.5rem',
        color: '#333',
      },
      list: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
      },
      item: {
        padding: '12px 20px',
        margin: '8px 0',
        backgroundColor: '#f4f4f4',
        borderRadius: '6px',
        fontSize: '1rem',
        color: '#444',
        border: '1px solid #ddd',
        transition: 'transform 0.2s ease',
      },
    };
  
    return (
      <div style={styles.container}>
        <h2 style={styles.heading}>🧑‍✈️ Listado de Conductores</h2>
        <ul style={styles.list}>
          {mockConductores.map((c, i) => (
            <li key={i} style={styles.item}>
              {c}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default Conductores;
  