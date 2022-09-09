
function initMap() {

    const coordenadas = {
        lat: 40.39323612903854, 
        lng: -3.7046094335668536, 
    };
    const estilos = [ 
        //{ elementType:'geometry', stylers:[ {color:'#bbbbff'}]  },
        { elementType:'labels.text.fill', stylers:[ {color:'#ff0000'}]  }
    ];
        
  
    //MAPA  google.maps.Map
    let mapa = new google.maps.Map (document.querySelector("#mapa") , {
        center: coordenadas,
        zoom: 17,
        styles: estilos,

    })

    //MARCADOR   google.maps.Marker
    // ver documentacion: https://developers.google.com/maps/documentation/javascript/reference/marker?hl=es-419#MarkerOptions
    let marcador= new google.maps.Marker ( {
        position: coordenadas,
        map:mapa,
        title: 'Mi marcador',
        label: 'A',
        //icon: 'img/favicon.png',
        visible: true,
    });


}

initMap();

