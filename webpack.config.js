const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './App/index.js',
    output: {
        path:path.resolve(__dirname,'dist'),
        filename: 'bundle.js'
    },
    mode:'development',
    module:{
        rules:[
            {test:/\.(js|jsx)$/, use:'babel-loader'},
            {test:/\.css$/, use:['style-loader', 'css-loader']}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'App/index.html'
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devServer: {
        port: 3000
    },
}