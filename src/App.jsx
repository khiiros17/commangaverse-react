// aqui van las importaciones de react y react-router-dom
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { obtenerProductos, crearProducto, actualizarProducto, eliminarProducto } from './data/productosService';
import { obtenerCarrito, guardarCarrito } from './data/carritoService';
import { obtenerSesion, cerrarSesion, actualizarSesion } from './data/sesionService';
import { procesarCompra } from './data/ordenesService';
import { agregarItem, cambiarCantidad, quitarItem, contarUnidades } from './utils/carrito';

//  aqui van las importaciones de las paginas.
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
import DetalleBlog from './pages/DetalleBlog';
import Contacto from './pages/Contacto';
import NoEncontrada from './pages/NoEncontrada';

// paginas del admin.
import RutaAdmin from './components/RutaAdmin';
import LayoutAdmin from './pages/admin/LayoutAdmin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProductos from './pages/admin/AdminProductos';
import FormularioProducto from './pages/admin/FormularioProducto';
import AdminOrdenes from './pages/admin/AdminOrdenes';
import AdminDetalleOrden from './pages/admin/AdminDetalleOrden';
import AdminUsuarios from './pages/admin/AdminUsuarios';
import FormularioUsuario from './pages/admin/FormularioUsuario';
import HistorialUsuario from './pages/admin/HistorialUsuario';
import AdminReportes from './pages/admin/AdminReportes';
import AdminPerfil from './pages/admin/AdminPerfil';

function App() {
  // estado de la app productos, carrito y usuario conectado
  const [productos, setProductos] = useState(() => obtenerProductos());
  const [carrito, setCarrito] = useState(() => obtenerCarrito());
  const [usuario, setUsuario] = useState(() => obtenerSesion());

  // para guardar el carrito cada vez que cambie.
  useEffect(() => {
    guardarCarrito(carrito);
  }, [carrito]);

  // para guardar la sesion del usuario cada vez que cambie.
  function manejarLogin(usuarioIngresado) {
    setUsuario(usuarioIngresado);
  }

  function manejarLogout() {
    cerrarSesion();
    setUsuario(null);
  }

  // pra actualizar la sesiond del usuario.
  function refrescarSesion(usuarioActualizado) {
    setUsuario(actualizarSesion(usuarioActualizado));
  }

  // Busca el stock de un producto y asi no se pueda superar.
  function stockDe(id) {
    const producto = productos.find(p => p.id === id);
    return producto ? producto.stock : 0;
  }

  // para agregar, cambiar cantidad, quitar y vaciar el carrito.
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

  // para procesar el pago y devolver la orden. Si se pagó, refresca el stock y vacía el carrito.

  function confirmarCompra(cliente, tarjeta) {
    const orden = procesarCompra(carrito, productos, cliente, tarjeta);

    if (orden.estado === 'Pagada') {
      setProductos(obtenerProductos());  // para refrescar el stock.
      setCarrito([]);
    }


    return orden;
  }

  // para crear, actualizar y eliminar productos desde el admin.

  function guardarProducto(datosProducto, id) {
    if (id === null) {
      crearProducto(datosProducto);
    } else {
      actualizarProducto(id, datosProducto);
    }
    setProductos(obtenerProductos());
  }

  // Elimina el producto y también lo quita del carrito
  function eliminarProductoAdmin(id) {
    eliminarProducto(id);
    setProductos(obtenerProductos());
    setCarrito(quitarItem(carrito, id));
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
          <Route
            path="/checkout"
            element={
              <Checkout
                carrito={carrito}
                productos={productos}
                usuario={usuario}
                onConfirmarCompra={confirmarCompra}
              />
            }
          />
          <Route path="/pago-exitoso/:id" element={<PagoExitoso />} />
          <Route path="/pago-error/:id" element={<PagoError />} />
          <Route path="/login" element={<Login onLogin={manejarLogin} />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<DetalleBlog />} />
          <Route path="/contacto" element={<Contacto />} />

          {/* ===== PANEL ADMIN (rutas anidadas y protegidas) ===== */}
          <Route path="/admin" element={<RutaAdmin usuario={usuario}><LayoutAdmin /></RutaAdmin>}>
            <Route index element={<AdminDashboard productos={productos} />} />
            <Route path="productos" element={<AdminProductos productos={productos} onEliminar={eliminarProductoAdmin} />} />
            <Route path="productos/nuevo" element={<FormularioProducto key="nuevo" productos={productos} onGuardar={guardarProducto} />} />
            <Route path="productos/editar/:id" element={<FormularioProducto key="editar" productos={productos} onGuardar={guardarProducto} />} />
            {/* ⬅️ NUEVO: órdenes, usuarios, reportes y perfil */}
            <Route path="ordenes" element={<AdminOrdenes />} />
            <Route path="ordenes/:id" element={<AdminDetalleOrden />} />
            <Route path="usuarios" element={<AdminUsuarios usuarioSesion={usuario} />} />
            <Route path="usuarios/nuevo" element={<FormularioUsuario key="nuevo" usuarioSesion={usuario} onSesionActualizada={refrescarSesion} />} />
            <Route path="usuarios/editar/:run" element={<FormularioUsuario key="editar" usuarioSesion={usuario} onSesionActualizada={refrescarSesion} />} />
            <Route path="usuarios/:run/historial" element={<HistorialUsuario />} />
            <Route path="reportes" element={<AdminReportes productos={productos} />} />
            <Route path="perfil" element={<AdminPerfil usuarioSesion={usuario} />} />
          </Route>

          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;