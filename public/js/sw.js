const CACHE_NAME = 'MICACHE-V49';

  // -----------------------------------------------------------
  self.addEventListener('fetch', event=>{            
    console.log(event);
    if ( event.request.url.includes('.jpg')) {
        event.respondWith( null ); 
    } else {
        event.respondWith( fetch (event.request));
    }

});
 //----------------------------------------------------------------


//guardar archivos en cache al instalar el sw
self.addEventListener('install', function( ) {
    console.log("Instalando SW...");
    caches.open(CACHE_NAME).then(function(cache){
        cache.addAll(['/index.html', '/dist/js/bundle.js','/img/gordini.jpg']);
    } );
});

//Borrar cachés antiguos al modificar el SW
addEventListener('xxxxactivate', function (ev){         //evento actualizacion del sw
    console.log("Actualizando SW...");
    ev.waitUntil(  //ejecutar en asíncrono porque al invocarse este código el sw podría estar ya detenido
        caches.keys().then( function(cacheNames) {       //obtener array de keys (nombres de los caches) en modo asíncrono
            let promises = cacheNames.map(nombrecache=>{ //con map se recorre el array de keys y ejecuta la funcion con cada cache key
                if (CACHE_NAME !== nombrecache) return caches.delete(nombrecache); //la funcion retorna una promesa que borra el cache si cache key no es el actual
            });
            return Promise.all(promises);  // Ejecutar las promises del array de promises. Cada promise borrará un caché.
        })  
    )
} )


//Servir desde cache si disponible
self.addEventListener('xxxxfetch', event => {
    // Permite al navegador hacer este asunto por defecto
    // para peticiones non-GET.
    //alert('fetch');
    console.log('MÉTODO: ',event.request.method);
    if (event.request.method != 'GET') return;
  
    // Evita el valor predeterminado, y manejar solicitud nosostros mismos.
    event.respondWith(async function() {
      // Intenta obtener la respuesta de el cache.
      const cache = await caches.open('dynamic-v1');
      const cachedResponse = await cache.match(event.request);
  
      if (cachedResponse) {
        // Si encontramos una coincidencia en el cache, lo devuelve, pero también
        // actualizar la entrada en el cache en segundo plano.
        event.waitUntil(cache.add(event.request));
        return cachedResponse;
      }
  
      // Si no encontramos una coincidencia en el cache, usa la red.
      return fetch(event.request);
    }());
  });





//Servir desde cache si offline
self.addEventListener('xxfetch', event => {            //evento fetch = ejecucion para cada peticion a servidor web
    console.log("Evento fetch...");
    event.respondWith(                                     //respondWith: sustituir respuesta http al evento fetch 
        caches.match(event.request)                             //buscar y extraer de cache contenido asociado a 'event.request'
        .then(function(response){                                   //si lo encuentra: funcion que retorna el cache y además...
            return buscaEnCacheOHazRequest(event.request);          // lanza actualizacion del cache
        }).catch(function(err){  
            console.log("no en cache");                                   //si no lo encuentra en el cache...
            if(event.request.mode =='navigate')                         //..y la peticion es de tipo mostrar en navegador/requiere respuesta..
                return caches.match(event.request);                     //..retorna promesa que busca contenido en cache
        })
    )
} );

function buscaEnCacheOHazRequest(request) {              //funcion: obtiene contenido del cache para la request y actualiza cache
    console.log("actualizando cache...");
    const cachePromise = caches.open(CACHE_NAME);               // promise que obtiene todo el cache cache
    const matchPromise = cachePromise.then(function(cache){     // promise que extrae del cache la request buscada
        return cache.match(request);                                // retorna la request buscada en asíncrono. Y además...
    });
    return Promise.all([cachePromise,matchPromise]).then(function([cache,cacheResponse]){ // cuando acaben las promises...
        fetch(request).then(function(fetchResponse){                //.. hace un fetch para actualizar cahe
            cache.put(request, fetchResponse.clone());              // añade al cache una copia de la response del fetch  
            return fetchResponse || fetchPromise;                   // retorna la respuesta del fetch y si es undefined bien la promise del fecth 
        });

    })
}
