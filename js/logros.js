/* ============================================================
   SISTEMA DE LOGROS - Dojopoly
   ============================================================ */

/* ------------------------------------------------------------
   LISTA DE LOGROS DISPONIBLES
------------------------------------------------------------ */

const LOGROS = {
    primeraPieza: {
        nombre: "Primera Pieza",
        descripcion: "Has conseguido tu primera pieza del ordenador",
        recompensa: 10
    },
    racha5: {
        nombre: "Racha Imparable",
        descripcion: "Has conseguido una racha de 5 aciertos",
        recompensa: 15
    },
    comerciante: {
        nombre: "Comerciante Experto",
        descripcion: "Has realizado tu primer intercambio",
        recompensa: 10
    },
    victoriaFinal: {
        nombre: "Héroe del Sistema",
        descripcion: "Has completado el ordenador y ganado la partida",
        recompensa: 50
    }
};

/* ------------------------------------------------------------
   DESBLOQUEAR LOGRO
------------------------------------------------------------ */

function desbloquearLogro(jugador, id) {
    if (jugador.logros.includes(id)) return; // ya lo tiene

    jugador.logros.push(id);

    const logro = LOGROS[id];
    mostrarPopupLogro(logro);

    jugador.monedas += logro.recompensa;

    actualizarPanelJugador();
    actualizarInventarioRPG(jugador);
}

/* ------------------------------------------------------------
   POPUP DE LOGRO DESBLOQUEADO
------------------------------------------------------------ */

function mostrarPopupLogro(logro) {
    const popup = document.getElementById("logroPopup");

    document.getElementById("logroTitulo").textContent = logro.nombre;
    document.getElementById("logroDesc").textContent = logro.descripcion;

    popup.classList.add("activo");
    playSound("logro");

    setTimeout(() => popup.classList.remove("activo"), 3000);
}

/* ------------------------------------------------------------
   ABRIR PANTALLA DE LOGROS RPG
------------------------------------------------------------ */

function abrirLogrosRPG(jugador) {
    const pantalla = document.getElementById("pantallaLogrosRPG");
    const lista = document.getElementById("listaLogrosRPG");

    lista.innerHTML = "";

    for (const id in LOGROS) {
        const logro = LOGROS[id];

        const div = document.createElement("div");
        div.classList.add("logro-rpg");

        if (jugador.logros.includes(id)) {
            div.classList.add("desbloqueado");
        }

        div.innerHTML = `
            <h3>${logro.nombre}</h3>
            <p>${logro.descripcion}</p>
            <p class="recompensa">Recompensa: ${logro.recompensa} monedas</p>
        `;

        lista.appendChild(div);
    }

    pantalla.classList.add("activo");
    playSound("clic");
}

/* ------------------------------------------------------------
   CERRAR PANTALLA DE LOGROS RPG
------------------------------------------------------------ */

document.getElementById("cerrarLogrosRPG").onclick = () => {
    document.getElementById("pantallaLogrosRPG").classList.remove("activo");
    playSound("clic");
};
