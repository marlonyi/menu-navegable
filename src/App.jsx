import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Carros from './pages/Carros';
import Conductores from './pages/Conductores';
import Configuracion from './pages/Configuracion';

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: "20px", textAlign: "center" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carros" element={<Carros />} />
          <Route path="/conductores" element={<Conductores />} />
          <Route path="/configuracion" element={<Configuracion />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
