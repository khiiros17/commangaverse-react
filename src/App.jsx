import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { obtenerProductos } from './data/productosService';
import { obtenerCarrito, guardarCarrito } from './data/carritoService';

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
  // ===== ESTADO =====

  const [productos] = useState(() => obtenerProductos());


  const [carrito, setCarrito] = useState(() => obtenerCarrito());


  useEffect(() => {
    guardarCarrito(carrito);
  }, [carrito]);

  // ===== AGREGAR AL CARRITO =====
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
          {/* ⬅️ CAMBIO: ahora se pasa "productos" (del servicio) en vez de "productosIniciales" */}
          <Route path="/" element={<Home productos={productos} onAgregar={agregarAlCarrito} />} />
          <Route path="/productos" element={<Productos productos={productos} onAgregar={agregarAlCarrito} />} />
          <Route path="/producto/:id" element={<DetalleProducto productos={productos} onAgregar={agregarAlCarrito} />} />
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
          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;