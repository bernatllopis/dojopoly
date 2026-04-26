/* ============================================================
   MODO HISTORIA / CAMPAÑA - Dojopoly
   ============================================================ */

/* ------------------------------------------------------------
   DEFINICIÓN DE CAPÍTULOS
------------------------------------------------------------ */

const HISTORIA = [
    {
        id: 1,
        titulo: "El Sistema en Peligro",
        texto: "Un misterioso virus ha corrompido el ordenador maestro. Tu misión es recuperar las piezas esenciales para restaurarlo.",
        objetivo: "conseguir1" // conseguir 1 pieza
    },
    {
        id: 2,
        titulo: "Amenaza en la Red",
        texto: "El virus se expande por la red. Necesitas reunir más piezas para frenar su avance.",
        objetivo: "conseguir3" // conseguir 3 piezas
    },
    {
        id: 3,
        titulo: "El Núcleo Corrupto",
        texto: "El núcleo del sistema está dañado. Solo un equipo con 5 piezas podrá acceder al núcleo.",
        objetivo: "conseguir5"
    },
    {
        id: 4,
        titulo: "El Enfrentamiento Final",
        texto: "Has llegado al corazón del sistema. Enfréntate al virus en un combate de preguntas de alto nivel.",
        objetivo: "jefe" // modo jefe final
    },
    {
        id: 5,
        titulo: "Sistema Restaurado",
        texto: "Has derrotado al virus y restaurado el ordenador maestro. ¡El sistema vuelve a estar a salvo!",
        objetivo: "victoria"
    }
];

/* ------------------------------------------------------------
   MOSTRAR CINEMÁTICA
------------------------------------------------------------ */

function mostrarCinematica(texto) {
    const popup = document.getElementById("popupCinematica");
    const contenido = document.getElementById("textoCinematica");

    contenido.textContent = texto;
    popup.classList.remove("oculto");

    playSound("clic");

    setTimeout(() => {
        popup.classList.add("oculto");
    }, 4000);
}

/* ------------------------------------------------------------
   INICIAR CAPÍTULO
------------------------------------------------------------ */

function iniciarCapitulo(jugador) {
    const cap = HISTORIA.find(c => c.id === jugador.campania.capituloActual);
    if (!cap) return;

    mostrarCinematica(`${cap.titulo}: ${cap.texto}`);
}

/* ------------------------------------------------------------
   COMPROBAR SI EL JUGADOR AVANZA DE CAPÍTULO
------------------------------------------------------------ */

function comprobarCapitulo(jugador) {
    const cap = HISTORIA.find(c => c.id === jugador.campania.capituloActual);
    if (!cap) return;

    const piezas = Object.values(jugador.inventario).filter(v => v).length;

    switch (cap.objetivo) {

        case "conseguir1":
            if (piezas >= 1) avanzarCapitulo(jugador);
            break;

        case "conseguir3":
            if (piezas >= 3) avanzarCapitulo(jugador);
            break;

        case "conseguir5":
            if (piezas >= 5) avanzarCapitulo(jugador);
            break;

        case "jefe":
            // El jefe se activa en la casilla 30, pero aquí comprobamos si ya lo derrotó
            if (jugador.derrotoJefe) avanzarCapitulo(jugador);
            break;

        case "victoria":
            mostrarVictoria(jugador);
            break;
    }
}

/* ------------------------------------------------------------
   AVANZAR AL SIGUIENTE CAPÍTULO
------------------------------------------------------------ */

function avanzarCapitulo(jugador) {
    jugador.campania.capituloActual++;

    const nuevoCap = HISTORIA.find(c => c.id === jugador.campania.capituloActual);

    if (nuevoCap) {
        mostrarCinematica(`${nuevoCap.titulo}: ${nuevoCap.texto}`);
    }

    // Logro por avanzar en la historia
    if (jugador.campania.capituloActual === 3) {
        desbloquearLogro(jugador, "historiaAvanzada");
    }

    // Si llega al final, activar victoria
    if (jugador.campania.capituloActual > HISTORIA.length) {
        mostrarVictoria(jugador);
    }
}

/* ------------------------------------------------------------
   MARCAR JEFE COMO DERROTADO
------------------------------------------------------------ */

function jefeDerrotado(jugador) {
    jugador.derrotoJefe = true;
    completarMision(jugador, "jefe");
    desbloquearLogro(jugador, "jefeFinal");
    comprobarCapitulo(jugador);
}
