var webpack = require('webpack');

module.exports = function (config) {
    config.set({
        // Das benötigte Test Framework
        frameworks: ['jasmine'],

        // Ausgabe der Testergebnisse über verschiedene Module
        reporters: ['progress', 'junit', 'coverage', 'karma-remap-istanbul'],

        // Der ausführende Browser
        browsers: ['PhantomJS'],

        // Durch diesen Flag werden die Tests ausgeführt und Karma sowie der Browser danach beendet
        singleRun: true,

        // Konfiguration aller Dateien welche während des Tests benötigt werden
        files: [
            'src/main.spec.ts'
        ],

        // Dateien welche vor dem eigentlichen Test durch ein preprocessor Modul bearbeitet werden müssen
        preprocessors: {
            'src/main.spec.ts': ['webpack', 'sourcemap']
        },

        // Die webpack preprocessor Konfiguration um TypeScript in JavaScript zu transpilieren
        // Die Loader und Plugin Optionen sind notwendig um korrekte source map Dateien für remap-istanbul zu erhalten
        webpack: {
            devtool: 'inline-source-map',
            module: {
                rules: [
                    {
                        test: /\.ts$/,
                        use: [
                            'awesome-typescript-loader?compilerOptions={"sourceMap": false,"inlineSourceMap": true}'
                        ]
                    },
                    {
                        test: /\.ts$/,
                        use: 'istanbul-instrumenter-loader?embedSource=true&noAutoWrap=true',
                        exclude: ['node_modules', /\.spec\.ts$/],
                        enforce: 'post'
                    }
                ]
            },
            resolve: {
                extensions: ['.ts', '.js']
            },
            plugins: [
                new webpack.SourceMapDevToolPlugin({
                    filename: null,
                    test: /\.(ts|js)($|\?)/i
                })
            ]
        },

        // Der webpack preprocessor soll nur relevante Log Dateien ausgeben
        webpackMiddleware: {stats: 'errors-only'},

        // Junit Report Konfiguration
        junitReporter: {
            outputDir: 'target/surefire-reports/'
        },

        // Coverage Report über istanbul
        coverageReporter: {
            reporters: [
                {type: 'in-memory'}
            ]
        },

        // Konvertiert istanbul Ergebnis so das TypeScript und nicht JavaScript angezeigt wird
        remapIstanbulReporter: {
            reports: {
                html: 'target/coverage',
                cobertura: 'target/coverage-reports/cobertura.xml'
            }
        }
    });
};
