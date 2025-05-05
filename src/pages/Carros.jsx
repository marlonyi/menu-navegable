function Carros() {
    const mockCarros = ['Toyota Corolla', 'Ford Fiesta', 'Honda Civic', 'Chevrolet Spark', 'Nissan Altima', 'Hyundai Elantra', 'Kia Rio'];
  
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
        <h2 style={styles.heading}>🚗 Listado de Carros</h2>
        <ul style={styles.list}>
          {mockCarros.map((carro, i) => (
            <li key={i} style={styles.item}>
              {carro}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default Carros;
  