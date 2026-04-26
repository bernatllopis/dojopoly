/* ============================================================
   SISTEMA DE HISTORIA / CAMPAÑA
============================================================ */

/* ------------------------------------------------------------
   TEXTOS DE LOS CAPÍTULOS
------------------------------------------------------------ */

const capitulosHistoria = {
    1: "El Sistema en Peligro: Un misterioso virus ha corrompido el ordenador maestro. Tu misión es recuperar las piezas esenciales para restaurarlo.",
    2: "Avance Crítico: Has recuperado varias piezas, pero el virus evoluciona. Nuevos desafíos aparecen en el sistema.",
    3: "Alerta Roja: El núcleo del sistema está comprometido. Solo los equipos más preparados podrán continuar.",
    4: "Cuenta Atrás Final: El virus ha tomado control del procesador central. Prepárate para el enfrentamiento definitivo.",
    5: "Victoria Inminente: Estás a un paso de restaurar el sistema. El jefe final te espera."
};

/* ------------------------------------------------------------
   MOSTRAR CINEMÁTICA
------------------------------------------------------------ */

function mostrarCinematica(texto) {
    const popup = document.getElementById("popupCinematica");
    const contenido = document.getElementById("textoCinematica");

    contenido.textContent = texto;
    popup.classList.remove("oculto");
}

/* ------------------------------------------------------------
   INICIAR CAPÍTULO
------------------------------------------------------------ */

function iniciarCapitulo(jugador) {
    const cap = jugador.campania.capituloActual;
    const texto = capitulosHistoria[cap];

    if (texto) {
        mostrarCinematica(texto);
    }
}

/* ------------------------------------------------------------
   AVANZAR CAPÍTULO
------------------------------------------------------------ */

function comprobarCapitulo(jugador) {
    const piezas = Object.values(jugador.inventario).filter(v => v).length;

    if (piezas >= 2 && jugador.campania.capituloActual === 1) {
        jugador.campania.capituloActual = 2;
        mostrarCinematica(capitulosHistoria[2]);
    }

    if (piezas >= 4 && jugador.campania.capituloActual === 2) {
        jugador.campania.capituloActual = 3;
        mostrarCinematica(capitulosHistoria[3]);
    }

    if (piezas >= 5 && jugador.campania.capituloActual === 3) {
        jugador.campania.capituloActual = 4;
        mostrarCinematica(capitulosHistoria[4]);
    }

    if (piezas === 6 && jugador.campania.capituloActual === 4) {
        jugador.campania.capituloActual = 5;
        mostrarCinematica(capitulosHistoria[5]);
    }
}

/* ------------------------------------------------------------
   CERRAR CINEMÁTICA (IMPORTANTE PARA QUE SE VEA EL TABLERO)
------------------------------------------------------------ */

document.getElementById("popupCinematica").onclick = function () {
    document.getElementById("popupCinematica").classList.add("oculto");
};
