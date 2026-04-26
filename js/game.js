/* ============================================================
   SISTEMA PRINCIPAL DEL JUEGO - Dojopoly
============================================================ */

/* ------------------------------------------------------------
   VARIABLES GENERALES
------------------------------------------------------------ */

let jugadores = [];
let jugadorActual = null;
let turno = 0;

const totalCasillas = 40; // 40 casillas estilo Monopoly

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
        campania: {
            capituloActual: 1
        },
        derrotoJefe: false,
        nivel: "facil"
    };
}

/* ------------------------------------------------------------
   INICIAR JUEGO
------------------------------------------------------------ */

function iniciarJuego() {
    jugadores = [
        crearJugador("Equipo 1", "img/avatar_default.png"),
        crearJugador("Equipo 2", "img/avatar_default.png")
    ];

    jugadorActual = jugadores[0];

    jugadores.forEach(j => inicializarMisiones(j));

    crearTablero();
    dibujarJugador();

    actualizarPanelJugador();
    iniciarCapitulo(jugadorActual);
}

/* ------------------------------------------------------------
   PANEL DEL JUGADOR
------------------------------------------------------------ */

function actualizarPanelJugador() {
    document.getElementById("nombreJugador").textContent = jugadorActual.nombre;
    document.getElementById("monedasJugador").textContent = jugadorActual.monedas;
    document.getElementById("rachaJugador").textContent = jugadorActual.racha;
}

/* ============================================================
   TABLERO ESTILO MONOPOLY
============================================================ */

function crearTablero() {
    const t = document.getElementById("tablero");
    t.innerHTML = "";

    const posiciones = [];

    // Top row (0 → 10)
    for (let i = 0; i < 11; i++) posiciones.push({ fila: 0, col: i });

    // Right column (1 → 10)
    for (let i = 1; i < 11; i++) posiciones.push({ fila: i, col: 10 });

    // Bottom row (9 → 0)
    for (let i = 9; i >= 0; i--) posiciones.push({ fila: 10, col: i });

    // Left column (9 → 1)
    for (let i = 9; i >= 1; i--) posiciones.push({ fila: i, col: 0 });

    posiciones.forEach((pos, index) => {
        const c = document.createElement("div");
        c.classList.add("casilla");

        if (index === 0 || index === 10 || index === 20 || index === 30) {
            c.classList.add("esquina");
        }

        c.dataset.id = index;
        c.textContent = index;

        c.style.gridRow = pos.fila + 1;
        c.style.gridColumn = pos.col + 1;

        t.appendChild(c);
    });
}

/* ------------------------------------------------------------
   DIBUJAR FICHA DEL JUGADOR
------------------------------------------------------------ */

function dibujarJugador() {
    document.querySelectorAll(".jugador-ficha").forEach(f => f.remove());

    const casilla = document.querySelector(`.casilla[data-id='${jugadorActual.posicion}']`);
    if (!casilla) return;

    const ficha = document.createElement("div");
    ficha.classList.add("jugador-ficha");

    casilla.appendChild(ficha);
}

/* ------------------------------------------------------------
   CAMBIAR DE TURNO
------------------------------------------------------------ */

function siguienteTurno() {
    turno++;
    jugadorActual = jugadores[turno % jugadores.length];
    actualizarPanelJugador();
    dibujarJugador();
}

/* ------------------------------------------------------------
   MOVER JUGADOR
------------------------------------------------------------ */

function moverJugador(casillas) {
    playSound("mover");

    jugadorActual.posicion += casillas;

    if (jugadorActual.posicion >= totalCasillas) {
        jugadorActual.posicion = totalCasillas - 1;
        mostrarVictoria(jugadorActual);
        return;
    }

    completarMision(jugadorActual, "mover10");

    dibujarJugador();
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

/* ============================================================
   PREGUNTAS NORMALES
============================================================ */

function mostrarPreguntaNormal() {
    const pregunta = obtenerPreguntaSegunNivel(jugadorActual);

    if (pregunta.tipo === "jefe") {
        iniciarJefeFinal();
        return;
    }

    mostrarPopupPregunta(pregunta);
}

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

function responderPregunta(p, indice) {
    document.getElementById("popupPregunta").classList.add("oculto");

    if (indice === p.correcta) {
        jugadorActual.racha++;
        jugadorActual.monedas += 5;
        playSound("clic");

        if (jugadorActual.racha === 5) {
            desbloquearLogro(jugadorActual, "racha5");
        }

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

/* ============================================================
   JEFE FINAL
============================================================ */

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

        p.opciones.forEach
