const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlWebpack = new HtmlWebpackPlugin ( { 
    template:  '././assets/index.template.html', //html de entrada
    filename:  'index.html'
     } )


module.exports = {
    devServer: {  
        port: 8080,
       
    
    },
    devtool: "inline-source-map",
    mode: 'development',
    entry: '././assets/index.js',
    output: {  
            filename: 'dist/js/bundle.js',      //la carpeta dist y js la genera webpackc 
            publicPath: '/',
            path: path.join(__dirname,'..'),
      
    
    },
    plugins: [ htmlWebpack ],
    module: {
        rules: [ 
            {
            test: /\.scss$/,       //regex para detectar archivos con sass
            use: ['style-loader', 'css-loader', 'sass-loader']  
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

