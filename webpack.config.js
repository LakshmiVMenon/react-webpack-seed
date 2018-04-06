const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

module.exports = {
    devtool : 'cheap-module-eval-source-map',
    entry : './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        chunkFilename: '[id].js',  // for lazy  loadin chunks
        publicPath: '' //absolute path to dist folder
    },
    devServer: {
        host: '127.0.0.1',
        port: 4040,
    },
    resolve : {
        extensions: ['.js', '.jsx']
    },
    module : {
        rules : [
            {
                test : /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    { loader : 'style-loader'},
                    { 
                        loader :  'css-loader',
                        options : {
                            importLoaders : 1, //inform that 1 loader(postcss) is being run before this
                            modules : true,
                            localIdentName : '[name]__[local]__[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options : {
                            ident: 'postcss',
                            plugins: () => [
                                autoprefixer({
                                    browsers: [
                                        "> 1%",
                                        "last 2 versions"
                                    ]
                                })
                            ]
                        }
                    }
                ] 
            },
            {
                test: /\.css$/, //bootstrap loader
                include: /node_modules/, 
                loaders: ['style-loader','css-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader : 'url-loader?limit=8000&name=images/[name].[ext]'
            },
            {
             test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
              loader: 'url-loader? limit=10000&mimetype=application/font-woff'
             },
             {
              test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
              loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
             },
             {
              test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
              loader: 'file-loader'
              },
              {
              test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
              loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
             }
        ]
    },
    plugins : [
        new HtmlWebpackPlugin({
            template : __dirname + '/src/index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        //plugins being additionally added
    ]
};  