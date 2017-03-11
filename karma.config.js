var webpack = require('webpack');

module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],
        reporters: ['progress', 'junit', 'coverage', 'karma-remap-istanbul'],
        browsers: ['PhantomJS'],
        singleRun: true,
        files: [
            'src/main.spec.ts'
        ],
        preprocessors: {
            'src/main.spec.ts': ['webpack', 'sourcemap']
        },
        webpack: {
            devtool: 'inline-source-map',
            module: {
                rules: [
                    {
                        test: /\.ts$/,
                        use: [
                            'awesome-typescript-loader?compilerOptions={"sourceMap": false,"inlineSourceMap": true}',
                            'angular2-template-loader'
                        ]
                    },
                    {test: /\.html$/, use: 'raw-loader'},
                    {
                        test: /\.ts$/,
                        use: 'istanbul-instrumenter-loader?embedSource=true&noAutoWrap=true',
                        exclude: [
                            'node_modules',
                            /\.spec\.ts$/
                        ],
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
        webpackMiddleware: {stats: 'errors-only'},
        junitReporter: {
            outputDir: 'target/surefire-reports/'
        },
        coverageReporter: {
            reporters: [
                {type: 'in-memory'}
            ]
        },
        remapIstanbulReporter: {
            reports: {
                html: 'target/coverage',
                cobertura: 'target/coverage-reports/cobertura.xml'
            }
        }
    });
};
