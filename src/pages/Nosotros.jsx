import { Container, Row, Col, Card, Ratio } from 'react-bootstrap';


const CODIGO_VIDEO = 'hyTs5eUaqvc?si=hqGLACjGioQR9_tK"';

function Nosotros() {
    return (
        <Container className="my-5 seccion-texto">

            <section className="mb-5">
                <h1 className="text-warning">¿Quiénes somos?</h1>
                <p>
                    <strong>ComMangaVerse</strong> nació de la pasión por las historias en viñetas. Somos una
                    tienda online chilena dedicada a la venta de cómics, mangas y novelas gráficas, pensada para
                    lectores que recién comienzan y para coleccionistas que buscan ese número especial.
                </p>
                <p>
                    Trabajamos con editoriales nacionales e internacionales y hacemos envíos a todo Chile, para
                    que tu próxima aventura llegue directo a tus manos.
                </p>
            </section>

            <Row className="g-4 mb-5">
                <Col md={6}>
                    <Card bg="dark" text="white" className="h-100 caja-info">
                        <Card.Body>
                            <Card.Title className="text-warning">🎯 Misión</Card.Title>
                            <Card.Text>
                                Acercar el mundo del cómic y el manga a todos los lectores de Chile, con un catálogo
                                variado, precios justos y una atención cercana.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card bg="dark" text="white" className="h-100 caja-info">
                        <Card.Body>
                            <Card.Title className="text-warning"> Visión</Card.Title>
                            <Card.Text>
                                Ser la tienda online de referencia para la comunidad de lectores de cómics y mangas del país.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <section className="mb-5">
                <h2 className="text-warning h3 mb-3">Conoce más sobre el mundo del cómic</h2>
                <Ratio aspectRatio="16x9">
                    <iframe
                        src={`https://www.youtube.com/embed/${'hyTs5eUaqvc?si=hqGLACjGioQR9_tK'}`}
                        title="Video sobre cómics"
                        allowFullScreen
                    ></iframe>
                </Ratio>
            </section>

            <section>
                <h2 className="text-warning h3 mb-3">Desarrollador</h2>
                <Card bg="dark" text="white" className="caja-info">
                    <Card.Body>
                        <Card.Title>Javier [Miranda]</Card.Title>
                        <Card.Text className="text-secondary">
                            Desarrollador Frontend — React, Bootstrap, pruebas con Jasmine y Karma
                        </Card.Text>
                    </Card.Body>
                </Card>
            </section>

        </Container>
    );
}

export default Nosotros;