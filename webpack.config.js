import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
    entry: './client/index.js',
    output: {
        path: '/',
        filename: 'bundle.js'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react'],
                        // plugins: [
                        //   ["@babel/plugin-proposal-decorators", { "legacy": true }],
                        // ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'client/index.html'
        })
    ]
};
