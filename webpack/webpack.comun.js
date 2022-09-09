const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");  //LECTOR CSS

const htmlWebpack = new HtmlWebpackPlugin ( { 
    template:  '././assets/index.template.html', //html de entrada
    filename:  'index.html'
     } )


module.exports = {
    devServer: {  
        port: 8080,
       
    
    },
    devtool: "inline-source-map",
    mode: 'development',            //development = no minifica JS / production = minifica
    entry: '././assets/index.js',   //Fichero JS PRINCIPAL
    output: {  
            filename: 'dist/js/bundle.js',      //Fichero de SALIDA 
            publicPath: '/',
            path: path.join(__dirname,'..'),    //ROOT fichero de SALIDA
      
    
    },
    // PLUGINS usados aqui
    plugins: [ htmlWebpack, new MiniCssExtractPlugin() ],
    module: {
        rules: [ 
            {
            test: /\.(c|sc|sa)ss$/,       //regex para detectar archivos con sass y css
            use: [ { loader: MiniCssExtractPlugin.loader},  //Procesador CSS
                'css-loader', 'sass-loader']  //Cargador CSS y SCSS
            },
            //{
            //test: /\.(jpe?g|png|gif|svg)$/i,
            //use: [ 'image-webpack-loader']  //no se para que sirve este módulo
            //}
            {
                test: /\.jpg$/,
                loader: 'url-loader'
            }




        ]
    },

}

