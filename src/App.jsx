import { useState } from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import ListaProductos from './components/ListaProductos';
import { productosIniciales } from './data/productos';

function App() {
  // ===== ESTADO =====
  const [carrito, setCarrito] = useState([]);

  // ===== AGREGAR AL CARRITO =====
  function agregarAlCarrito(id) {
    const existe = carrito.find(item => item.id === id);

    if (existe) {
      // Ya estaba: crea una lista NUEVA con la cantidad + 1
      setCarrito(
        carrito.map(item =>
          item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
        )
      );
    } else {
      // No estaba: crea una lista NUEVA con el producto al final
      setCarrito([...carrito, { id: id, cantidad: 1 }]);
    }
  }

  // ===== CANTIDAD TOTAL (se calcula a partir del estado) =====
  const cantidadTotal = carrito.reduce((suma, item) => suma + item.cantidad, 0);

  return (
    <>
      <Header cantidadCarrito={cantidadTotal} />

      <Container className="my-5">
        <h1 className="text-warning mb-4">Productos destacados</h1>
        <ListaProductos productos={productosIniciales} onAgregar={agregarAlCarrito} />
      </Container>

      <Footer />
    </>
  );
}

export default App;