import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { obtenerProductos } from './data/productosService';
import { obtenerCarrito, guardarCarrito } from './data/carritoService';
import { obtenerSesion, cerrarSesion } from './data/sesionService';
import { agregarItem, cambiarCantidad, quitarItem, contarUnidades } from './utils/carrito';

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
import DetalleBlog from './pages/DetalleBlog';                                             // ⬅️ NUEVO
import Contacto from './pages/Contacto';
import NoEncontrada from './pages/NoEncontrada';

function App() {
  // ===== ESTADO =====
  const [productos] = useState(() => obtenerProductos());
  const [carrito, setCarrito] = useState(() => obtenerCarrito());
  const [usuario, setUsuario] = useState(() => obtenerSesion());

  // Guarda el carrito en localStorage cada vez que cambia
  useEffect(() => {
    guardarCarrito(carrito);
  }, [carrito]);

  // ===== SESIÓN =====
  function manejarLogin(usuarioIngresado) {
    setUsuario(usuarioIngresado);
  }

  function manejarLogout() {
    cerrarSesion();
    setUsuario(null);
  }

  // Busca el stock de un producto (para no superarlo)
  function stockDe(id) {
    const producto = productos.find(p => p.id === id);
    return producto ? producto.stock : 0;
  }

  // ===== ACCIONES DEL CARRITO =====
  function agregarAlCarrito(id) {
    setCarrito(agregarItem(carrito, id, stockDe(id)));
  }

  function cambiarCantidadCarrito(id, cambio) {
    setCarrito(cambiarCantidad(carrito, id, cambio, stockDe(id)));
  }

  function quitarDelCarrito(id) {
    setCarrito(quitarItem(carrito, id));
  }

  function vaciarCarrito() {
    setCarrito([]);
  }

  const cantidadTotal = contarUnidades(carrito);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header cantidadCarrito={cantidadTotal} usuario={usuario} onLogout={manejarLogout} />

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home productos={productos} onAgregar={agregarAlCarrito} />} />
          <Route path="/productos" element={<Productos productos={productos} onAgregar={agregarAlCarrito} />} />
          <Route path="/producto/:id" element={<DetalleProducto productos={productos} onAgregar={agregarAlCarrito} />} />
          {/* ⬅️ CAMBIO: Categorías (con y sin nombre) y Ofertas reciben los productos */}
          <Route path="/categorias" element={<Categorias productos={productos} onAgregar={agregarAlCarrito} />} />
          <Route path="/categorias/:nombre" element={<Categorias productos={productos} onAgregar={agregarAlCarrito} />} />
          <Route path="/ofertas" element={<Ofertas productos={productos} onAgregar={agregarAlCarrito} />} />
          <Route
            path="/carrito"
            element={
              <Carrito
                carrito={carrito}
                productos={productos}
                onCambiarCantidad={cambiarCantidadCarrito}
                onQuitar={quitarDelCarrito}
                onVaciar={vaciarCarrito}
              />
            }
          />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/pago-exitoso" element={<PagoExitoso />} />
          <Route path="/pago-error" element={<PagoError />} />
          <Route path="/login" element={<Login onLogin={manejarLogin} />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<DetalleBlog />} />                                {/* ⬅️ NUEVO */}
          <Route path="/contacto" element={<Contacto />} />
          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;