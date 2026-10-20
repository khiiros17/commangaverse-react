import { Container } from 'react-bootstrap';

function Footer() {
    const anioActual = new Date().getFullYear();

    return (
        <footer className="bg-dark text-light text-center py-4 mt-5 border-top border-warning">
            <Container>
                <p className="mb-1">© {anioActual} ComMangaVerse — Tienda de cómics y mangas</p>
                <small className="text-secondary">Envíos a todo Chile</small>
            </Container>
        </footer>
    );
}

export default Footer;