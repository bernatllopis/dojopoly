/* ============================================================
   SISTEMA PRINCIPAL DEL JUEGO - Dojopoly
============================================================ */

/* ------------------------------------------------------------
   VARIABLES GENERALES
------------------------------------------------------------ */

let jugadores = [];
let jugadorActual = null;
let turno = 0;

const totalCasillas = 30;

/* ------------------------------------------------------------
   INICIALIZAR JUGADORES
------------------------------------------------------------ */

function crearJugador(nombre, avatar) {
    return {
        nombre,
        avatar,
        posicion: 0,
        monedas: 0,
        racha: 0,
        inventario: {
            cpu: false,
            ram: false,
            gpu: false,
            ssd: false,
            placa: false,
            fuente: false
        },
        piezas: [],
        logros: [],
        misiones: [],
        campania: {
            capituloActual: 1
        },
        derrotoJefe: false,
        nivel: "facil"
    };
}

function iniciarJuego() {
    jugadores = [
        crearJugador("Equipo 1", "img/avatar_default.png"),
        crearJugador("Equipo 2", "img/avatar_default.png")
    ];

    jugadorActual = jugadores[0];

    jugadores.forEach(j => inicializarMisiones(j));

    actualizarPanelJugador();
    iniciarCapitulo(jugadorActual);
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
   CAMBIAR DE TURNO
------------------------------------------------------------ */

function siguienteTurno() {
    turno++;
    jugadorActual = jugadores[turno % jugadores.length];
    actualizarPanelJugador();
}

/* ------------------------------------------------------------
   MOVER JUGADOR
------------------------------------------------------------ */

function moverJugador(casillas) {
    playSound("mover");

    jugadorActual.posicion += casillas;

    if (jugadorActual.posicion >= totalCasillas) {
        jugadorActual.posicion = totalCasillas;
        mostrarVictoria(jugadorActual);
        return;
    }

    completarMision(jugadorActual, "mover10");

    comprobarCasillaEspecial();
}

/* ------------------------------------------------------------
   CASILLAS ESPECIALES
------------------------------------------------------------ */

function comprobarCasillaEspecial() {
    const pos = jugadorActual.posicion;

    if (pos % 5 === 0) {
        abrirCofre(jugadorActual);
        return;
    }

    if (pos === 30) {
        iniciarJefeFinal();
        return;
    }

    mostrarPreguntaNormal();
}

/* ------------------------------------------------------------
   PREGUNTAS NORMALES
------------------------------------------------------------ */

function mostrarPreguntaNormal() {
    const pregunta = obtenerPreguntaSegunNivel(jugadorActual);

    if (pregunta.tipo === "jefe") {
        iniciarJefeFinal();
        return;
    }

    mostrarPopupPregunta(pregunta);
}

/* ------------------------------------------------------------
   MOSTRAR POPUP DE PREGUNTA
------------------------------------------------------------ */

function mostrarPopupPregunta(p) {
    const popup = document.getElementById("popupPregunta");
    const texto = document.getElementById("preguntaTexto");
    const opciones = document.getElementById("opcionesPregunta");

    texto.textContent = p.pregunta;
    opciones.innerHTML = "";

    p.opciones.forEach((op, i) => {
        const btn = document.createElement("button");
        btn.textContent = op;
        btn.onclick = () => responderPregunta(p, i);
        opciones.appendChild(btn);
    });

    popup.classList.remove("oculto");
}

/* ------------------------------------------------------------
   RESPONDER PREGUNTA NORMAL
------------------------------------------------------------ */

function responderPregunta(p, indice) {
    document.getElementById("popupPregunta").classList.add("oculto");

    if (indice === p.correcta) {
        jugadorActual.racha++;
        jugadorActual.monedas += 5;
        playSound("clic");

        if (jugadorActual.racha === 5) {
            desbloquearLogro(jugadorActual, "racha5");
        }

        // 30% de ganar pieza
        if (Math.random() < 0.3) {
            const piezas = ["cpu", "ram", "gpu", "ssd", "placa", "fuente"];
            const pieza = piezas[Math.floor(Math.random() * piezas.length)];
            ganarPieza(jugadorActual, pieza);
        }

    } else {
        jugadorActual.racha = 0;
        playSound("error");
    }

    actualizarPanelJugador();
    comprobarCapitulo(jugadorActual);
    siguienteTurno();
}

/* ------------------------------------------------------------
   MODO JEFE FINAL
------------------------------------------------------------ */

function iniciarJefeFinal() {
    const jefe = preguntaModoJefe();
    mostrarPreguntaJefe(jefe);
}

function mostrarPreguntaJefe(jefe) {
    const popup = document.getElementById("popupPregunta");
    const texto = document.getElementById("preguntaTexto");
    const opciones = document.getElementById("opcionesPregunta");

    let index = 0;

    function siguientePregunta() {
        if (index >= jefe.preguntas.length) {
            jefeDerrotado(jugadorActual);
            document.getElementById("popupPregunta").classList.add("oculto");
            return;
        }

        const p = jefe.preguntas[index];
        texto.textContent = p.pregunta;
        opciones.innerHTML = "";

        p.opciones.forEach((op, i) => {
            const btn = document.createElement("button");
            btn.textContent = op;
            btn.onclick = () => {
                if (i === p.correcta) {
                    index++;
                    siguientePregunta();
                } else {
                    playSound("error");
                    document.getElementById("popupPregunta").classList.add("oculto");
                    siguienteTurno();
                }
            };
            opciones.appendChild(btn);
        });
    }

    popup.classList.remove("oculto");
    siguientePregunta();
}

/* ------------------------------------------------------------
   INICIAR JUEGO AUTOMÁTICAMENTE
------------------------------------------------------------ */

window.onload = iniciarJuego;
