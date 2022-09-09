const path = require('path');

// PROBLEMA DE ESTE ARCHIVO
//  - No procesa los archivos de imagenes referenciados en los JS (si de CSS y HTML): Hay que copiarlos a mano a PRO


// --------- PLUGIN GENERA ARCHIVO CSS FINAL ----------------------------------------------
const MiniCssExtractPlugin = require("mini-css-extract-plugin");  //manipulador scss para produccion
const miniCssExtractPlugin = new MiniCssExtractPlugin( {
    filename: "micss.css",  //Nombre archivo css generado  ([name] = nombre original del entry index.js)
    chunkFilename: "[id].css"
});


// --------- PLUGIN GENERA INDEX HTML -------------------------------------------------
// -- doc: https://github.com/jantimon/html-webpack-plugin 
const HtmlWebpackPlugin = require('html-webpack-plugin'); //Plugin que genera el index.html
const htmlWebpack = new HtmlWebpackPlugin ( { 
    template:  '././assets/index.template.html', //html de entrada
    filename:  'index.html',                     //fichero generado
    //publicPath: '/',                      //Directorio donde se genera bundle.js ????
    favicon: '././assets/img/favicon.png', // favicon
    minify: false,                       // true en produccion
    //hash: false,                         //añade parametro hash en links a js y css
    title: 'Produccion',
     templateParameters: {
        titulo: 'sitio de produccion',               //Se mete en el html:  <%= titulo %>
        descripcion: 'Descripcion del sitio web',  // idem...
        lenguaje: 'es'                             // idem...
    }
} );
//---------------------------------

module.exports = {
    mode: 'production',
    entry: { index: '././assets/index.js' },
    output: {  
            filename: 'dist/js/bundle.js',      //la carpeta dist y js la genera webpackc 
            publicPath: '.',            //root path que se añade a path ?? '.' para que funcione en subcarpetas del root
            path: path.join(__dirname,'../PROD'), //root de archivos generados
            assetModuleFilename: 'img/[hash][ext][query]'  //ruta imagenes generada por assetModule
    },
    plugins: [ htmlWebpack, miniCssExtractPlugin ],
    module: {
        rules: [ 
            //  Reglas para Generacion del CSS ----------------------------------------
            {
                test: /\.(c|sc|sa)ss$/,       //regex para detectar archivos con sass y css
                use: [ { loader: MiniCssExtractPlugin.loader},  //Procesador CSS
                    'css-loader', 'sass-loader'],  //Cargador CSS y SCSS

            },
            //----- carga de imagenes sin plugin ni loader, modulo Webpack: assetModule --------------
            //--- ver https://webpack.js.org/guides/asset-modules/
            {
                test: /\.(png|jpg|jpeg|svg)$/,
                type: 'asset/resource',
            },
            //------ Loader HTML CF: carga las imagenes encontradas en el HTML solo (no las de los .JS) -----
            {
                test:/\.(html)$/,
                use:[{loader: 'html-loader', options: {minimize:false}}]
            }, 
            //-----------------------------------------------------

        ]
    },

}

