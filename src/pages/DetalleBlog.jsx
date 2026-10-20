import { Container, Alert } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { obtenerBlogPorId } from '../data/blogs';

function DetalleBlog() {
    const { id } = useParams();
    const blog = obtenerBlogPorId(id);

    if (!blog) {
        return (
            <Container className="my-5">
                <Alert variant="danger">El artículo que buscas no existe.</Alert>
                <Link to="/blogs">← Volver al blog</Link>
            </Container>
        );
    }

    return (
        <Container as="article" className="my-5 blog-completo">
            <Link to="/blogs">← Volver al blog</Link>

            <h1 className="text-warning mt-3">{blog.titulo}</h1>
            <img src={blog.imagen} alt={blog.titulo} className="img-fluid rounded my-4" />

            {blog.secciones.map((seccion, indice) => (
                <section key={indice}>
                    {seccion.titulo && <h2 className="h4 text-warning mt-4">{seccion.titulo}</h2>}
                    <p>{seccion.texto}</p>
                </section>
            ))}
        </Container>
    );
}

export default DetalleBlog;