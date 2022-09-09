const path = require('path');

// --------- PLUGIN CARGA HTML -------------------------------------------------
const HtmlWebpackPlugin = require('html-webpack-plugin'); //Plugin que genera el index.html
const htmlWebpack = new HtmlWebpackPlugin ( { 
    template:  '././assets/index.template.html', //html de entrada
    filename:  'index.html',                     //fichero generado
    publicPath: '/',                      //Directorio donde se genera bundle.js ????
    //favicon: '',                         // favicon
    minify: false,                       // true en produccion
    hash: false,                         //añade parametro hash en links a js y css
    title: 'Desarrollo',
    templateParameters: {
        titulo: 'Desarrollo',                    //se mete en el html template: <=%titulo%>
        descripcion: 'Descripcion del sitio web',  // idem...
        lenguaje: 'es'                             // idem...
    }
} );
//---------------------------------

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
            path: path.join(__dirname,'../TEST'),
      
    
    },
    plugins: [ htmlWebpack ],
    module: {
        rules: [ 
            //  LOADER DE CSS Y SASS CSS ----------------------------------------
            {
            test: /\.scss$/,       //regex para detectar archivos con sass
            use: ['style-loader', 'css-loader', 'sass-loader']  
            },
            //----- carga de imagenes sin plugin ni loader, modulo Webpack: assetModule --------------
            {
                test: /\.(png|jpg|jpeg|svg)$/,
                type: 'asset/resource',
            },

        ]
    },

}



