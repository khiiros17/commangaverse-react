import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { productosIniciales } from './data/productos';

// ===== PÁGINAS =====
import Home from './pages/Home';
import Productos from './pages/Productos';
import DetalleProducto from './pages/DetalleProducto';
import Categorias from './pages/Categorias';
import Ofertas from './pages/Ofertas';
import Carrito from './pages/Carrito';
import Checkout from './pages/Checkout';
import PagoExitoso from './pages/PagoExitoso';
import PagoError from './pages/PagoError';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Nosotros from './pages/Nosotros';
import Blogs from './pages/Blogs';
import Contacto from './pages/Contacto';
import NoEncontrada from './pages/NoEncontrada';

function App() {
  // ===== ESTADO DEL CARRITO =====
  const [carrito, setCarrito] = useState([]);

  function agregarAlCarrito(id) {
    const existe = carrito.find(item => item.id === id);
    if (existe) {
      setCarrito(
        carrito.map(item =>
          item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
        )
      );
    } else {
      setCarrito([...carrito, { id: id, cantidad: 1 }]);
    }
  }

  const cantidadTotal = carrito.reduce((suma, item) => suma + item.cantidad, 0);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header cantidadCarrito={cantidadTotal} />

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home productos={productosIniciales} onAgregar={agregarAlCarrito} />} />
          <Route path="/productos" element={<Productos productos={productosIniciales} onAgregar={agregarAlCarrito} />} />
          <Route path="/producto/:id" element={<DetalleProducto productos={productosIniciales} onAgregar={agregarAlCarrito} />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/ofertas" element={<Ofertas />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/pago-exitoso" element={<PagoExitoso />} />
          <Route path="/pago-error" element={<PagoError />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contacto" element={<Contacto />} />

          {/* Cualquier otra dirección → página 404 */}
          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;