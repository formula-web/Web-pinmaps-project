export default class FMpreloader {
    // preloadImagenes()   {imagenes: array paths de imagenes,  completado: funcion a ejecutar cuando acabe la carga asincrona}
    static preloadImagenes ({imagenes, completado}) {
        // Lanza una promise de carga de imagen por cada imagen del array
        const promises= imagenes.map( pathImagen => preloadImagen ( {pathImagen}));
        // Una vez cargadas todas las imagenes invoca a la funcion completado()
        Promise.all(promises).then(completado);
    }

    static preloadImagen ({ pathImagen }) {
        // precarga la impagen pathImagen: simplemente crea un objeto imagen y hace que cuando esté cargada en el objeto (evento onload) se
        // invoque a la funcion que le indica al Promise que la accion terminó correctamente
        return new Promise( (finok, finerror)=> {
            let imagen = new Image();
            imagen.src = pathImagen;
            imagen.onload = finok;      
        })
    }
}

//EJEMPLO DE USO PARA DETECTAR CUANDO SE HAN CARGADO UN CONJUNTO DE IMAGENES y MOSTRAR LOS CONTROLES
// FMpreloader,preloadImagenes({
//    imagenes: pathImagenes,
//    completado: function() { document.querySelector(".controles").getElementsByClassName.display="block"}
// })