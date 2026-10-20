import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { blogs } from '../data/blogs';

function Blogs() {
    return (
        <Container className="my-5">
            <h1 className="text-warning">Blog ComMangaVerse</h1>
            <p className="text-secondary mb-4">Noticias, curiosidades y datos del mundo del cómic y el manga.</p>

            <Row className="g-4">
                {blogs.map(blog => (
                    <Col key={blog.id} md={6}>
                        <Card as="article" bg="dark" text="white" className="h-100 tarjeta-blog">
                            <Card.Img variant="top" src={blog.imagen} alt={blog.titulo} />
                            <Card.Body className="d-flex flex-column">
                                <Card.Title className="text-warning">{blog.titulo}</Card.Title>
                                <Card.Text>{blog.resumen}</Card.Text>
                                <Button as={Link} to={`/blogs/${blog.id}`} variant="outline-warning" className="mt-auto align-self-start">
                                    Leer más
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Blogs;