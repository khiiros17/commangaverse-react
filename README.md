# ComMangaVerse

Tienda online de **cómics, mangas y novelas gráficas**, desarrollada para la
**Evaluación Parcial 2** de **DSY1104 – Desarrollo Fullstack II** (Duoc UC).

Esta versión migra el sitio de la Evaluación 1 (HTML, CSS y JavaScript) a **React**. Agrega
categorías, ofertas, un flujo de compra completo, un panel de administrador y
**129 pruebas unitarias** con Jasmine y Karma.

**Autor:** Javier Miranda

---

##  Tecnologías

| Uso | Herramienta |
|---|---|
| Framework de frontend | **React 19** con **Vite** |
| Diseño responsivo | **React Bootstrap** (Bootstrap 5) |
| Navegación entre páginas | **React Router** |
| Persistencia simulada | `localStorage` (productos, usuarios, carrito, órdenes) y `sessionStorage` (sesión) |
| Pruebas unitarias | **Jasmine** + **Karma** + React Testing Library |
| Cobertura | istanbul (`babel-plugin-istanbul` + `karma-coverage`) |
| Calidad de código | ESLint |

##  Cómo ejecutar el proyecto

Requisito: **Node.js** 20 o superior.

```bash
npm install      # instala las dependencias (solo la primera vez)
npm run dev      # abre la tienda en http://localhost:5173
```

| Comando | Qué hace |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm test` | Ejecuta las 129 pruebas y genera el reporte de cobertura |
| `npm run lint` | Revisa el código con ESLint |
| `npm run build` | Genera la versión de producción en `dist/` |

##  Datos para probar

| Qué | Valor |
|---|---|
| Usuario administrador | `admin@duoc.cl` / `admin123` |
| RUN válido para registrarse | `123456785` |
| Tarjeta que **se aprueba** | `4111 1111 1111 1111` (cualquier tarjeta de 16 números) |
| Tarjeta que **se rechaza** | Cualquier tarjeta que **termine en 0000**, por ejemplo `4111 1111 1111 0000` |

> El pago es **simulado**: no se conecta a ningún banco. Solo se guardan los 4 últimos números de la tarjeta.

Para volver a los datos iniciales: F12 → Application → Local Storage → borrar las claves y recargar.

##  Funcionalidades

### Tienda (público)
- **Inicio** con banner y productos destacados.
- **Productos** con buscador, y **detalle** de cada producto con breadcrumb.
- **Categorías** (calculadas desde los productos) y **Ofertas** con el precio anterior tachado.
- **Carrito:** suma y resta unidades, respeta el stock, cobra el precio de oferta y se guarda al recargar.
- **Checkout:** si hay sesión, los datos del cliente ya vienen escritos. Validaciones en tiempo real y región/comuna dependientes.
- **Pago exitoso** con boleta imprimible, y **pago con error** que conserva el carrito para reintentar.
- **Registro** (RUN con dígito verificador, correo con dominios permitidos), **Login**, **Contacto**, **Nosotros** con video y **Blogs**.

### Panel de administrador (`/admin`, solo el tipo Administrador)
- **Dashboard:** ventas totales, órdenes, productos, usuarios y tabla de **stock crítico**.
- **Productos:** CRUD completo y filtro de stock crítico. Código único y oferta menor al precio.
- **Órdenes:** listado con filtro por estado y **boleta** de cada orden.
- **Usuarios:** CRUD completo e **historial de compras** de cada usuario.
- **Reportes:** ventas por categoría y Top 5 de productos más vendidos.
- **Mi perfil:** editar los datos propios. El Header se actualiza al instante.

##  Estructura

```
src/
├── main.jsx               → Punto de entrada (BrowserRouter + Bootstrap)
├── App.jsx                → Estado global (productos, carrito, sesión) y rutas
├── index.css              → Estilos propios (colores, tarjetas, panel admin, impresión)
│
├── components/            → Piezas reutilizables (Atomic Design)
│   ├── Header.jsx, Footer.jsx
│   ├── TarjetaProducto.jsx, ListaProductos.jsx, Precio.jsx
│   ├── CampoFormulario.jsx
│   ├── ResumenOrden.jsx, DatosCliente.jsx, EstadoOrden.jsx
│   └── RutaAdmin.jsx      → Protege el panel de administrador
│
├── pages/                 → Una página por ruta de la tienda
│   ├── Home, Productos, DetalleProducto, Categorias, Ofertas
│   ├── Carrito, Checkout, PagoExitoso, PagoError
│   ├── Login, Registro, Contacto, Nosotros, Blogs, DetalleBlog, NoEncontrada
│   └── admin/             → Páginas del panel (rutas anidadas con <Outlet />)
│       ├── LayoutAdmin, AdminDashboard
│       ├── AdminProductos, FormularioProducto
│       ├── AdminOrdenes, AdminDetalleOrden
│       ├── AdminUsuarios, FormularioUsuario, HistorialUsuario
│       └── AdminReportes, AdminPerfil
│
├── data/                  → "Base de datos" simulada y sus servicios CRUD
│   ├── baseDatos.js       → leerDatos / guardarDatos (localStorage)
│   ├── productos.js, regiones.js, blogs.js → datos iniciales
│   └── productosService, usuariosService, ordenesService, carritoService, sesionService
│
└── utils/                 → Lógica de negocio en funciones puras (fácil de probar)
    ├── carrito.js, pago.js, reportes.js
    ├── validaciones.js, validacionesProducto.js
    └── formato.js, fechas.js
```

Cada archivo `*.spec.js` / `*.spec.jsx` está **junto al archivo que prueba**.

##  Pruebas

```bash
npm test
```

Resultado esperado: `Executed 129 of 129 SUCCESS`.

- **29 archivos de prueba, 129 casos**: renderizado, renderizado condicional, props, estado, eventos y reglas de negocio.
- **Mocks** con `jasmine.createSpy`, `.and.returnValue` y `spyOn(window, 'confirm')`.
- **Cobertura:** alrededor de **90 % de líneas**. Abre `coverage/html/index.html` para ver el detalle.

El análisis completo está en el **Documento de cobertura del testing**.

##  Rutas principales

| Ruta | Página |
|---|---|
| `/` | Inicio |
| `/productos`, `/producto/:id` | Catálogo y detalle |
| `/categorias`, `/categorias/:nombre` | Categorías |
| `/ofertas` | Ofertas |
| `/carrito`, `/checkout` | Compra |
| `/pago-exitoso/:id`, `/pago-error/:id` | Resultado del pago |
| `/login`, `/registro`, `/contacto`, `/nosotros`, `/blogs`, `/blogs/:id` | Otras páginas |
| `/admin/...` | Panel de administrador (protegido) |

##  Mejoras futuras

- Conectar un **backend** con base de datos real y un pago real (por ejemplo, Webpay).
- Validar permisos también en el servidor, no solo en el navegador.
- Un panel propio para el tipo **Vendedor** (productos y órdenes).
- Más pruebas para las páginas que solo muestran datos (Productos, Detalle, Dashboard).
