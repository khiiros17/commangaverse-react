
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
            stats: 'errors-only',
            devtool: 'inline-source-map',
            resolve: {
                extensions: ['.js', '.jsx']
            },
            module: {
                rules: [
                    {
                        test: /\.(js|jsx)$/,
                        exclude: /node_modules/,

                        resolve: { fullySpecified: false },
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    '@babel/preset-env',
                                    ['@babel/preset-react', { runtime: 'automatic' }]
                                ],

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


        reporters: ['progress', 'coverage'],

        coverageReporter: {
            dir: 'coverage/',
            reporters: [
                { type: 'html', subdir: 'html' },     // informe visual para abrir en el navegador
                { type: 'text-summary' }              // resumen en la terminal
            ]
        },


        browsers: ['ChromeHeadless'],


        singleRun: true,


        browserNoActivityTimeout: 60000
    });
};