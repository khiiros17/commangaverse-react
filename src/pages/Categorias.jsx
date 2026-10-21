import { Container, Row, Col, Card, Button, Breadcrumb } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import ListaProductos from '../components/ListaProductos';

function Categorias({ productos, onAgregar }) {

    const { nombre } = useParams();


    const categorias = [...new Set(productos.map(p => p.categoria))].map(categoria => ({
        nombre: categoria,
        cantidad: productos.filter(p => p.categoria === categoria).length
    }));


    if (nombre) {
        const productosDeCategoria = productos.filter(p => p.categoria === nombre);

        return (
            <Container className="my-5">
                <Breadcrumb>
                    <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Inicio</Breadcrumb.Item>
                    <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/categorias' }}>Categorías</Breadcrumb.Item>
                    <Breadcrumb.Item active>{nombre}</Breadcrumb.Item>
                </Breadcrumb>

                <h1 className="text-warning mb-4">{nombre}</h1>
                <ListaProductos productos={productosDeCategoria} onAgregar={onAgregar} />
            </Container>
        );
    }

    // vista 2 para todas las categorias: muestra tarjetas con el nombre y cuantos productos tiene cada una
    return (
        <Container className="my-5">
            <h1 className="text-warning mb-4">Categorías</h1>

            <Row className="g-4">
                {categorias.map(categoria => (
                    <Col key={categoria.nombre} xs={12} sm={6} lg={4}>
                        <Card bg="dark" text="white" className="h-100 tarjeta-categoria text-center">
                            <Card.Body>
                                <Card.Title className="fs-3">{categoria.nombre}</Card.Title>
                                <Card.Text className="text-secondary">{categoria.cantidad} producto(s)</Card.Text>
                                <Button
                                    as={Link}
                                    to={`/categorias/${encodeURIComponent(categoria.nombre)}`}
                                    variant="warning"
                                >
                                    Ver {categoria.nombre}
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Categorias;