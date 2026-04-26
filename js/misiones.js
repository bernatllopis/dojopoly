/* ============================================================
   SISTEMA DE MISIONES - Dojopoly
   ============================================================ */

/* ------------------------------------------------------------
   LISTA DE MISIONES DISPONIBLES
------------------------------------------------------------ */

const MISIONES_DIARIAS = [
    { id: "mover10", texto: "Mover 10 casillas", objetivo: 10, recompensa: 10 },
    { id: "pieza", texto: "Conseguir una pieza del ordenador", objetivo: 1, recompensa: 15 },
    { id: "cofre", texto: "Abrir un cofre sorpresa", objetivo: 1, recompensa: 10 },
    { id: "comercio", texto: "Realizar un intercambio con otro equipo", objetivo: 1, recompensa: 20 }
];

const MISIONES_SEMANALES = [
    { id: "ganar3", texto: "Ganar 3 partidas", objetivo: 3, recompensa: 50 },
    { id: "preguntas20", texto: "Responder 20 preguntas correctamente", objetivo: 20, recompensa: 40 }
];

/* ------------------------------------------------------------
   INICIALIZAR MISIONES DEL JUGADOR
------------------------------------------------------------ */

function inicializarMisiones(jugador) {
    jugador.misiones = [];

    // 2 misiones diarias aleatorias
    const copia = [...MISIONES_DIARIAS];
    for (let i = 0; i < 2; i++) {
        const index = Math.floor(Math.random() * copia.length);
        jugador.misiones.push({
            ...copia[index],
            progreso: 0,
            tipo: "diaria"
        });
        copia.splice(index, 1);
    }

    // 1 misión semanal fija
    jugador.misiones.push({
        ...MISIONES_SEMANALES[0],
        progreso: 0,
        tipo: "semanal"
    });
}

/* ------------------------------------------------------------
   COMPROBAR PROGRESO DE MISIÓN
------------------------------------------------------------ */

function completarMision(jugador, id) {
    jugador.misiones.forEach(m => {
        if (m.id === id && m.progreso < m.objetivo) {
            m.progreso++;

            if (m.progreso >= m.objetivo) {
                otorgarRecompensa(jugador, m);
            }
        }
    });
}

/* ------------------------------------------------------------
   OTORGAR RECOMPENSA
------------------------------------------------------------ */

function otorgarRecompensa(jugador, mision) {
    jugador.monedas += mision.recompensa;

    // Logro por completar misiones
    if (mision.tipo === "diaria") {
        desbloquearLogro(jugador, "primeraMision");
    }

    actualizarPanelJugador();
    actualizarInventarioRPG(jugador);
}

/* ------------------------------------------------------------
   ABRIR PANTALLA DE MISIONES RPG
------------------------------------------------------------ */

function abrirMisionesRPG(jugador) {
    const pantalla = document.getElementById("pantallaMisionesRPG");
    const lista = document.getElementById("listaMisionesRPG");

    lista.innerHTML = "";

    jugador.misiones.forEach(m => {
        const div = document.createElement("div");
        div.classList.add("mision-rpg");

        if (m.progreso >= m.objetivo) {
            div.classList.add("completada");
        }

        div.innerHTML = `
            <h3>${m.texto}</h3>
            <p>Progreso: ${m.progreso}/${m.objetivo}</p>
            <p>Recompensa: ${m.recompensa} monedas</p>
            <p class="tipo">(${m.tipo})</p>
        `;

        lista.appendChild(div);
    });

    pantalla.classList.add("activo");
    playSound("clic");
}

/* ------------------------------------------------------------
   CERRAR PANTALLA DE MISIONES RPG
------------------------------------------------------------ */

document.getElementById("cerrarMisionesRPG").onclick = () => {
    document.getElementById("pantallaMisionesRPG").classList.remove("activo");
    playSound("clic");
};
