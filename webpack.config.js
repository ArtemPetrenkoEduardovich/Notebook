var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/app/app.jsx", // входная точка - исходный файл
    output: {
        path: path.resolve(__dirname, './server/dist'),     // путь к каталогу выходных файлов - папка dist
        // publicPath: '/dist/',
        filename: "bundle.js"       // название создаваемого файла
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Notebook',
            template: 'src/index.html'
        })
    ],
    module: {
        rules: [   //загрузчик для js
            {
                test: /\.jsx?$/, // определяем тип файлов
                exclude: /(node_modules)/,  // исключаем из обработки папку node_modules
                loader: "babel-loader",   // определяем загрузчик
                options: {
                    presets: [
                        "@babel/preset-env",
                        "@babel/preset-react"
                        // "@babel/preset-flow"
                    ]    // используемые плагины
                }
            },
            {
                // test: /\.css?$/,
                test: /\.less?$/,
                exclude: /(node_modules)/,
                loader: 'style-loader!css-loader!less-loader'
                /* npm install less --save */
            }
        ]
    }
};