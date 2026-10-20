
//  KARMA
//  Karma ejecuta las pruebas de Jasmine en un navegador

const fs = require('fs');


if (!process.env.CHROME_BIN) {
    const rutasChrome = [
        'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
    ];
    const rutasEdge = [
        'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
        'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
    ];

    const hayChrome = rutasChrome.some(ruta => fs.existsSync(ruta));
    const rutaEdge = rutasEdge.find(ruta => fs.existsSync(ruta));

    if (!hayChrome && rutaEdge) {
        process.env.CHROME_BIN = rutaEdge;
    }
}

module.exports = function (config) {
    config.set({
        // Jasmine para escribir las pruebas; webpack para preparar el código
        frameworks: ['jasmine', 'webpack'],

        // Archivos de prueba: todos los que terminan en .spec.js o .spec.jsx dentro de src
        files: [
            { pattern: 'src/**/*.spec.js', watched: false },
            { pattern: 'src/**/*.spec.jsx', watched: false }
        ],

        // Antes de ejecutar las pruebas, webpack las "traduce" (JSX → JavaScript)
        preprocessors: {
            'src/**/*.spec.js': ['webpack'],
            'src/**/*.spec.jsx': ['webpack']
        },

        // Configuración de webpack solo para las pruebas
        webpack: {
            mode: 'development',
            stats: 'errors-only',                 // muestra solo los errores al compilar
            devtool: 'inline-source-map',
            resolve: {
                extensions: ['.js', '.jsx']
            },
            module: {
                rules: [
                    {
                        test: /\.(js|jsx)$/,
                        exclude: /node_modules/,
                        // Permite importar archivos sin escribir la extensión (./formato en vez de ./formato.js)
                        resolve: { fullySpecified: false },
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    '@babel/preset-env',
                                    ['@babel/preset-react', { runtime: 'automatic' }]
                                ],
                                // Mide la cobertura del código de la app (no de las pruebas)
                                plugins: [
                                    ['istanbul', { exclude: ['**/*.spec.js', '**/*.spec.jsx'] }]
                                ]
                            }
                        }
                    },
                    {
                        // Si un componente importa CSS, en las pruebas se ignora
                        test: /\.css$/,
                        type: 'asset/source'
                    }
                ]
            }
        },

        // Cómo mostrar los resultados: progreso en la terminal + informe de cobertura
        reporters: ['progress', 'coverage'],

        coverageReporter: {
            dir: 'coverage/',
            reporters: [
                { type: 'html', subdir: 'html' },     // informe visual para abrir en el navegador
                { type: 'text-summary' }              // resumen en la terminal
            ]
        },

        // Navegador donde se ejecutan las pruebas (Chrome/Edge sin ventana)
        browsers: ['ChromeHeadless'],

        // true: ejecuta una vez y termina. false: se queda vigilando los cambios
        singleRun: true,

        // Más tiempo de espera, por si el computador es lento
        browserNoActivityTimeout: 60000
    });
};