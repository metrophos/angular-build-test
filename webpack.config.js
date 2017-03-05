var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (env) {
    var commonConfig = {
        entry: {
            'app': './src/main.ts',
            'vendor': './src/vendor.ts'
        },
        output: {
            path: __dirname + '/target/classes/META-INF/resources',
            filename: '[name].js'
        },
        resolve: {
            extensions: ['.ts', '.js']
        },
        devtool: 'cheap-module-source-map',
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: [
                        'awesome-typescript-loader',
                        'angular2-template-loader'
                    ],
                    exclude: /node_modules/
                },
                {
                    test: /\.html$/,
                    use: 'raw-loader'
                }
            ]
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}),
            new HtmlWebpackPlugin({
                title: 'Example',
                template: './src/index.ejs'
            }),
            new webpack.DefinePlugin({
                ENV: JSON.stringify(env)
            })
        ]
    };

    if (env === 'prod') {
        var customConfig = {
            plugins: [
                new webpack.optimize.UglifyJsPlugin({
                    output: {comments: false}
                })
            ]
        };
    }

    return merge.smart(commonConfig, customConfig);
};