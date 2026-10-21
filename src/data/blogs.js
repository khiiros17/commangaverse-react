
//  ARTÍCULOS DEL BLOG


export const blogs = [
    {
        id: 1,
        titulo: 'Cómic vs Manga: ¿en qué se diferencian?',
        resumen: '¿Por qué el manga se lee al revés y casi siempre es en blanco y negro? Te contamos las diferencias principales.',
        imagen: '/img/blog1.jpg',
        secciones: [
            {
                titulo: '',
                texto: 'Aunque ambos cuentan historias con viñetas y dibujos, el cómic occidental y el manga japonés tienen diferencias que se notan apenas abres uno.'
            },
            {
                titulo: '1. Se leen en sentido contrario',
                texto: 'El manga se lee de derecha a izquierda, igual que la escritura japonesa tradicional. Por eso, la "primera página" está donde para nosotros estaría la última. Muchas ediciones en español mantienen este sentido para respetar el dibujo original.'
            },
            {
                titulo: '2. Blanco y negro vs color',
                texto: 'La mayoría del manga se publica en blanco y negro. Muchas series salen cada semana en revistas, y trabajar sin color permite a los autores cumplir esos plazos tan exigentes y abaratar la impresión. El cómic americano, en cambio, suele ser a todo color.'
            },
            {
                titulo: '3. Formato de publicación',
                texto: 'El cómic americano suele salir en números delgados, de unas pocas decenas de páginas. El manga primero aparece por capítulos en revistas y luego se reúne en tomos de alrededor de 200 páginas, que son los que solemos coleccionar.'
            },
            {
                titulo: 'Conclusión',
                texto: 'Ninguno es mejor que el otro: son dos formas distintas de contar historias. En ComMangaVerse tenemos de ambos, ¡así que puedes probar los dos mundos!'
            }
        ]
    },
    {
        id: 2,
        titulo: 'Action Comics #1: el cómic que cambió todo',
        resumen: 'En 1938 apareció un héroe con capa roja. Conoce la historia del primer cómic de Superman.',
        imagen: '/img/blog2.jpg',
        secciones: [
            {
                titulo: '',
                texto: 'En junio de 1938 llegó a los quioscos de Estados Unidos un cómic que costaba apenas 10 centavos. En su portada, un hombre de traje azul y capa roja levantaba un auto sobre su cabeza. Era Superman, y nadie imaginaba lo que vendría.'
            },
            {
                titulo: 'Los creadores',
                texto: 'Superman fue creado por dos jóvenes de Cleveland: el escritor Jerry Siegel y el dibujante Joe Shuster. Pasaron años intentando vender su idea a distintas editoriales, hasta que finalmente apareció en Action Comics #1.'
            },
            {
                titulo: 'El nacimiento de los superhéroes',
                texto: 'El éxito fue tan grande que dio inicio a lo que hoy se conoce como la "Edad de Oro" de los cómics. Después llegaron Batman, la Mujer Maravilla y muchos otros héroes que siguen vivos hasta hoy.'
            },
            {
                titulo: 'Un tesoro de coleccionista',
                texto: 'Hoy quedan muy pocas copias originales en buen estado. Por eso, Action Comics #1 es uno de los cómics más valiosos del mundo: algunas copias se han vendido en subastas por millones de dólares. ¡No está mal para algo que costó 10 centavos!'
            }
        ]
    }
];

/** Devuelve un blog por su id, o null. */
export function obtenerBlogPorId(id) {
    return blogs.find(b => b.id === Number(id)) || null;
}