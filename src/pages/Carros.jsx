import { useState, useEffect } from 'react';
import { useTheme } from '../components/ThemeContext';
import ListaItem from '../components/ListaItem';
import { Toast } from '../components/Toast';

function Carros() {
  const generarCarrosEjemplo = () => [
    'Toyota Corolla', 'Honda Civic', 'Ford Focus', 'Volkswagen Golf',
    'Chevrolet Cruze', 'Nissan Sentra', 'Hyundai Elantra', 'Mazda 3',
    'Kia Forte', 'Subaru Impreza'
  ];

  const [carros, setCarros] = useState(() => {
    const saved = localStorage.getItem('carros');
    return saved ? JSON.parse(saved) : generarCarrosEjemplo();
  });

  const [nuevoCarro, setNuevoCarro] = useState('');
  const [filtro, setFiltro] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState({ show: false, message: '' });
  const { modoOscuro } = useTheme();

  const itemsPerPage = 5;

  useEffect(() => {
    localStorage.setItem('carros', JSON.stringify(carros));
  }, [carros]);

  const agregarCarro = () => {
    if (nuevoCarro.trim()) {
      setCarros([...carros, nuevoCarro]);
      setNuevoCarro('');
      setToast({ show: true, message: '¡Carro agregado con éxito!' });
    }
  };

  const eliminarCarro = (index) => {
    const nuevosCarros = [...carros];
    nuevosCarros.splice(index, 1);
    setCarros(nuevosCarros);
    setToast({ show: true, message: '¡Carro eliminado!' });
  };

  const carrosFiltrados = carros.filter(carro =>
    carro.toLowerCase().includes(filtro.toLowerCase())
  );

  const totalPages = Math.ceil(carrosFiltrados.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const carrosPaginados = carrosFiltrados.slice(startIndex, startIndex + itemsPerPage);

  // === Estilos ===
  const styles = {
    container: {
      padding: '2rem',
      minHeight: '100vh',
      backgroundColor: modoOscuro ? '#121212' : '#f4f7fa',
      color: modoOscuro ? '#f0f0f0' : '#222',
      transition: 'background-color 0.3s ease'
    },
    title: {
      fontSize: '2rem',
      fontWeight: '700',
      marginBottom: '1.5rem',
      textAlign: 'center'
    },
    searchContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '1rem'
    },
    searchInput: {
      padding: '0.5rem 1rem',
      width: '100%',
      maxWidth: '400px',
      borderRadius: '10px',
      border: '1px solid #ccc',
      outline: 'none',
      background: modoOscuro ? '#1e1e1e' : '#fff',
      color: modoOscuro ? '#f0f0f0' : '#000'
    },
    form: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '2rem',
      gap: '0.5rem',
      flexWrap: 'wrap'
    },
    formInput: {
      padding: '0.5rem 1rem',
      borderRadius: '10px',
      border: '1px solid #ccc',
      flex: '1',
      maxWidth: '300px',
      background: modoOscuro ? '#1e1e1e' : '#fff',
      color: modoOscuro ? '#f0f0f0' : '#000'
    },
    formButton: {
      padding: '0.5rem 1.2rem',
      borderRadius: '10px',
      background: modoOscuro ? '#4caf50' : '#2e7d32',
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '600'
    },
    list: {
      listStyle: 'none',
      padding: 0,
      maxWidth: '600px',
      margin: '0 auto 2rem auto'
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '1rem'
    },
    paginationBtn: {
      padding: '0.4rem 0.8rem',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: 'bold',
      background: modoOscuro ? '#333' : '#ddd',
      color: modoOscuro ? '#fff' : '#000'
    },
    pageInfo: {
      fontWeight: '500'
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Listado de Carros</h2>

      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Buscar carros..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      <div style={styles.form}>
        <input
          type="text"
          placeholder="Nuevo carro"
          value={nuevoCarro}
          onChange={(e) => setNuevoCarro(e.target.value)}
          style={styles.formInput}
        />
        <button onClick={agregarCarro} style={styles.formButton}>Agregar</button>
      </div>

      <ul style={styles.list}>
        {carrosPaginados.map((carro, i) => (
          <ListaItem
            key={startIndex + i}
            item={carro}
            onDelete={() => eliminarCarro(startIndex + i)}
          />
        ))}
      </ul>

      {totalPages > 1 && (
        <div style={styles.pagination}>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            style={styles.paginationBtn}
          >
            Anterior
          </button>
          <span style={styles.pageInfo}>
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            style={styles.paginationBtn}
          >
            Siguiente
          </button>
        </div>
      )}

      <Toast
        message={toast.message}
        show={toast.show}
        setShow={(show) => setToast({ ...toast, show })}
      />
    </div>
  );
}

export default Carros;
