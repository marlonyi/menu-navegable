import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTheme } from './components/ThemeContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Carros from './pages/Carros';
import Conductores from './pages/Conductores';
import Configuracion from './pages/Configuracion';


function App() {
  const { modoOscuro } = useTheme();
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setShowSidebar(window.innerWidth > 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Router>
      <div className={`app ${modoOscuro ? 'dark' : 'light'}`}>
        <Navbar />
        <div className="main-container">
          <Sidebar />
          <main className="content" style={{ marginLeft: showSidebar ? (isMobile ? '0' : '200px') : '60px' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/carros" element={<Carros />} />
              <Route path="/conductores" element={<Conductores />} />
              <Route path="/configuracion" element={<Configuracion />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;