/* ============================================================
   SISTEMA PRINCIPAL DEL JUEGO - Dojopoly
   ============================================================ */

/* ------------------------------------------------------------
   VARIABLES GLOBALES
------------------------------------------------------------ */

let jugadores = [];
let jugadorActual = null;
let turno = 0;

const casillas = {
    3: { tipo: "tema", categoria: "robots" },
    7: { tipo: "tema", categoria: "videojuegos" },
    12: { tipo: "tema", categoria: "internet" },
    18: { tipo: "tema", categoria: "ia" },
    22: { tipo: "cofre" },
    30: { tipo: "jefe" },
    35: { tipo: "inventario" },
    40: { tipo: "victoria" }
};

/* ------------------------------------------------------------
   INICIALIZACIÓN DEL JUEGO
------------------------------------------------------------ */

function iniciarJuego() {
    jugadores = [
        crearJugador("Equipo 1", "img/avatar_default.png"),
        crearJugador("Equipo 2", "img/avatar_default.png")
    ];

    jugadorActual = jugadores[0];

    actualizarPanelJugador();
    iniciarCapitulo(jugadorActual);
}

/* ------------------------------------------------------------
   CREAR JUGADOR
------------------------------------------------------------ */

function crearJugador(nombre, avatar) {
    return {
        nombre,
        avatar,
        posicion: 0,
        monedas: 0,
        racha: 0,
        piezas: [],
        inventario: {
            cpu: false,
            ram: false,
            gpu: false,
            ssd: false,
            placa: false,
            fuente: false
        },
        logros: [],
        misiones: [],
        casillasMovidas: 0,
        campania: { capituloActual: 1 }
    };
}

/* ------------------------------------------------------------
   ACTUALIZAR PANEL DEL JUGADOR
------------------------------------------------------------ */

function actualizarPanelJugador() {
    document.getElementById("nombreJugador").textContent = jugadorActual.nombre;
    document.getElementById("monedasJugador").textContent = jugadorActual.monedas;
    document.getElementById("rachaJugador").textContent = jugadorActual.racha;
}

/* ------------------------------------------------------------
   TIRAR DADO Y MOVER
------------------------------------------------------------ */

function tirarDado() {
    const dado = Math.floor(Math.random() * 6) + 1;
    moverJugador(dado);
}

function moverJugador(pasos) {
    playSound("mover");

    jugadorActual.posicion += pasos;
    jugadorActual.casillasMovidas += pasos;

    if (jugadorActual.posicion > 40) jugadorActual.posicion -= 40;

    comprobarMision(jugadorActual, "mover10");

    procesarCasilla(jugadorActual.posicion);
}

/* ------------------------------------------------------------
   PROCESAR CASILLA
------------------------------------------------------------ */

function procesarCasilla(num) {
    const casilla = casillas[num];

    if (!casilla) {
        mostrarPreguntaNormal();
        return;
    }

    switch (casilla.tipo) {
        case "tema":
            mostrarPreguntaTematica(casilla.categoria);
            break;

        case "cofre":
            abrirCofre(jugadorActual);
            break;

        case "jefe":
            iniciarModoJefe(jugadorActual, preguntaModoJefe());
            break;

        case "inventario":
            abrirInventarioRPG(jugadorActual);
            break;

        case "victoria":
            mostrarVictoria(jugadorActual);
            break;

        default:
            mostrarPreguntaNormal();
            break;
    }
}

/* ------------------------------------------------------------
   PREGUNTAS NORMALES
------------------------------------------------------------ */

function mostrarPreguntaNormal() {
    const pregunta = obtenerPreguntaSegunNivel(jugadorActual);
    mostrarPregunta(pregunta);
}

/* ------------------------------------------------------------
   PREGUNTAS TEMÁTICAS
------------------------------------------------------------ */

function mostrarPreguntaTematica(cat) {
    const pregunta = preguntaAleatoria(cat);
    mostrarPregunta(pregunta);
}

/* ------------------------------------------------------------
   MOSTRAR PREGUNTA EN POPUP
------------------------------------------------------------ */

function mostrarPregunta(pregunta) {
    const popup = document.getElementById("popupPregunta");
    const texto = document.getElementById("preguntaTexto");
    const opciones = document.getElementById("opcionesPregunta");

    texto.textContent = pregunta.pregunta;
    opciones.innerHTML = "";

    pregunta.opciones.forEach((op, i) => {
        const btn = document.createElement("button");
        btn.classList.add("btn-rpg");
        btn.textContent = op;

        btn.onclick = () => responderPregunta(i === pregunta.correcta);

        opciones.appendChild(btn);
    });

    popup.classList.remove("oculto");
}

/* ------------------------------------------------------------
   RESPONDER PREGUNTA
------------------------------------------------------------ */

function responderPregunta(correcto) {
    document.getElementById("popupPregunta").classList.add("oculto");

    if (correcto) {
        jugadorActual.racha++;
        jugadorActual.monedas += 5;

        playSound("logro");

        if (jugadorActual.racha === 3) completarMision(jugadorActual, "racha3");
        if (jugadorActual.racha === 5) desbloquearLogro(jugadorActual, "racha5");

    } else {
        jugadorActual.racha = 0;
        playSound("error");
    }

    actualizarPanelJugador();
    comprobarCapitulo(jugadorActual);
    siguienteTurno();
}

/* ------------------------------------------------------------
   SIGUIENTE TURNO
------------------------------------------------------------ */

function siguienteTurno() {
    turno++;
    jugadorActual = jugadores[turno % jugadores.length];
    actualizarPanelJugador();
}

/* ------------------------------------------------------------
   INICIAR COMERCIO ENTRE EQUIPOS
------------------------------------------------------------ */

function iniciarComercio() {
    abrirComercio(jugadores[0], jugadores[1]);
}

/* ------------------------------------------------------------
   INICIAR JUEGO AUTOMÁTICAMENTE
------------------------------------------------------------ */

window.onload = iniciarJuego;
