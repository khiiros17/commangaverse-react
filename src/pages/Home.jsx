import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ListaProductos from '../components/ListaProductos';

function Home({ productos, onAgregar }) {
    // Solo los primeros 4 productos como "destacados"
    const destacados = productos.slice(0, 4);

    return (
        <Container className="my-4">

            {/* ===== BANNER ===== */}
            <section className="banner rounded p-4 p-md-5 mb-5">
                <Row className="align-items-center g-4">
                    <Col md={6}>
                        <h1 className="titulo-principal">COMICS</h1>
                        <p className="fs-5">
                            Cómics, mangas y novelas gráficas con envío a todo Chile.
                        </p>
                        <Button as={Link} to="/productos" variant="warning" size="lg">
                            Ver productos
                        </Button>
                    </Col>
                    <Col md={6}>
                        <img src="/img/banner.jpg" alt="Colección de cómics y mangas" className="img-fluid rounded" />
                    </Col>
                </Row>
            </section>

            {/* ===== DESTACADOS ===== */}
            <section>
                <h2 className="text-warning mb-4">Productos destacados</h2>
                <ListaProductos productos={destacados} onAgregar={onAgregar} />
            </section>

        </Container>
    );
}

export default Home;