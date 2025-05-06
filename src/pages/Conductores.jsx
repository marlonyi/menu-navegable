import { useState, useEffect } from 'react';
import { useTheme } from '../components/ThemeContext';
import ListaItem from '../components/ListaItem';
import { Toast } from '../components/Toast';

function Conductores() {
  const generarConductoresEjemplo = () => [
    'Juan Pérez', 'María García', 'Carlos López', 'Ana Martínez',
    'Luis González', 'Laura Rodríguez', 'Miguel Sánchez', 'Sofía Fernández',
    'Pedro Díaz', 'Valentina Torres'
  ];

  const [conductores, setConductores] = useState(() => {
    const saved = localStorage.getItem('conductores');
    return saved ? JSON.parse(saved) : generarConductoresEjemplo();
  });

  const [nuevoConductor, setNuevoConductor] = useState('');
  const [filtro, setFiltro] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState({ show: false, message: '' });
  const { modoOscuro } = useTheme();

  const itemsPerPage = 5;

  useEffect(() => {
    localStorage.setItem('conductores', JSON.stringify(conductores));
  }, [conductores]);

  const agregarConductor = () => {
    if (nuevoConductor.trim()) {
      setConductores([...conductores, nuevoConductor]);
      setNuevoConductor('');
      setToast({ show: true, message: '¡Conductor agregado con éxito!' });
    }
  };

  const eliminarConductor = (index) => {
    const nuevos = [...conductores];
    nuevos.splice(index, 1);
    setConductores(nuevos);
    setToast({ show: true, message: '¡Conductor eliminado!' });
  };

  const conductoresFiltrados = conductores.filter(c =>
    c.toLowerCase().includes(filtro.toLowerCase())
  );

  const totalPages = Math.ceil(conductoresFiltrados.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const conductoresPaginados = conductoresFiltrados.slice(startIndex, startIndex + itemsPerPage);

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
      <h2 style={styles.title}>Listado de Conductores</h2>

      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Buscar conductores..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      <div style={styles.form}>
        <input
          type="text"
          placeholder="Nuevo conductor"
          value={nuevoConductor}
          onChange={(e) => setNuevoConductor(e.target.value)}
          style={styles.formInput}
        />
        <button onClick={agregarConductor} style={styles.formButton}>Agregar</button>
      </div>

      <ul style={styles.list}>
        {conductoresPaginados.map((conductor, i) => (
          <ListaItem
            key={startIndex + i}
            item={conductor}
            onDelete={() => eliminarConductor(startIndex + i)}
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

export default Conductores;
