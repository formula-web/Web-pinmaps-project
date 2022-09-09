import '../assets/js/elementos';
import '../assets/css/app.scss';
import '../assets/js/slider.js';
import '../assets/js/sliderDOM.js';
import { empezar } from '../assets/js/sliderDOM.js';
import '../assets/js/menu.js';
import '../public/js/sw.js';
import '../assets/js/mapas.js';



//arrancar SLIDER
document.querySelector("#botonstart").addEventListener('click', function(ev) { empezar();} )


//REGISTRAR SERVICE WORKERS
//let registrado = sessionStorage.getItem('registrado');
let registrado='true';

if ( registrado != 'true' ) {
    if (navigator.serviceWorker) {
        console.log('SI Registrando SW...');
        navigator.serviceWorker.register('../js/sw.js');
        sessionStorage.setItem('registrado', true);

    }
} else {
    console.log('NO Registra SW');
}


