import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />

      <Container className="my-5">
        <h1 className="text-warning">¡Bienvenido a ComMangaVerse!</h1>
        <p>Nuestra tienda ahora esta Mejorada!</p>
      </Container>

      <Footer />
    </>
  );
}

export default App;
