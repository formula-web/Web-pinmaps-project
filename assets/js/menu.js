// MENU PRINCIPAL incluye scroll smooth
document.querySelector(".iconomenu")
     .addEventListener("click", function() {
         document.querySelector(".menuprincipal").classList.add("menuactivo");
     })
document.querySelector(".closemenu")
     .addEventListener("click", function() {
         document.querySelector(".menuprincipal").classList.remove("menuactivo");
     })

let links = document.querySelectorAll(".menuprincipal a");
links.forEach (enlace=> {
    enlace.addEventListener('click', function(ev) {
        document.querySelector(".menuprincipal").classList.remove("menuactivo");
        // extraer #ancla del href para conseguir elemento destino y hacer el movimiento suave hacia el
        let segmentos=this.href.split("/");
        const ancla = segmentos[segmentos.length -1];
        ev.preventDefault(); //suprimir redireccion a <a href
        scrollSuave2Elemnento( document.querySelector(ancla));
        return false; // evitar el comportamiento por defecto de click ??
    })
})

function scrollSuave2Elemnento (elemento) {
// Desplazamiento cursor ventana con window.strollTo
window.scrollTo( {
    'behavior': 'smooth',
    'top': elemento.offsetTop
})

}