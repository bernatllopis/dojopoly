/* ============================================================
   INVENTARIO DEL JUGADOR - Dojopoly
   ============================================================ */

/* ------------------------------------------------------------
   MOSTRAR POPUP DE PIEZA GANADA
------------------------------------------------------------ */

function mostrarPiezaGanada(jugador, pieza) {
    const popup = document.getElementById("piezaPopup");
    const icono = document.getElementById("piezaIcono");
    const nombre = document.getElementById("piezaNombre");

    icono.style.backgroundImage = `url('img/${pieza}.png')`;
    nombre.textContent = pieza.toUpperCase();

    popup.classList.add("activo");

    // Sonido de la pieza
    playSound(pieza);

    // Partículas
    lanzarParticulas(window.innerWidth / 2, window.innerHeight / 2);

    setTimeout(() => popup.classList.remove("activo"), 2000);
}

/* ------------------------------------------------------------
   AÑADIR PIEZA AL INVENTARIO
------------------------------------------------------------ */

function ganarPieza(jugador, pieza) {
    if (jugador.inventario[pieza]) return; // ya la tiene

    jugador.inventario[pieza] = true;
    jugador.piezas.push(pieza);

    mostrarPiezaGanada(jugador, pieza);
    actualizarInventario(jugador);

    // Logro por primera pieza
    if (jugador.piezas.length === 1) desbloquearLogro(jugador, "primeraPieza");

    // Misión diaria
    completarMision(jugador, "pieza");

    // Comprobar capítulo de historia
    comprobarCapitulo(jugador);
}

/* ------------------------------------------------------------
   ACTUALIZAR INVENTARIO VISUAL (panel pequeño)
------------------------------------------------------------ */

function actualizarInventario(jugador) {
    const piezas = ["cpu", "ram", "gpu", "ssd", "placa", "fuente"];

    piezas.forEach(p => {
        const elem = document.getElementById(`inv-${p}`);
        if (!elem) return;

        if (jugador.inventario[p]) {
            elem.classList.add("activo");
            elem.style.backgroundImage = `url('img/${p}.png')`;
        } else {
            elem.classList.remove("activo");
            elem.style.backgroundImage = "";
        }
    });
}

/* ------------------------------------------------------------
   ABRIR INVENTARIO RPG
------------------------------------------------------------ */

function abrirInventarioRPG(jugador) {
    const pantalla = document.getElementById("pantallaInventarioRPG");

    document.getElementById("rpgAvatarImg").src = jugador.avatar;
    document.getElementById("rpgNombreJugador").textContent = jugador.nombre;
    document.getElementById("rpgMonedas").textContent = jugador.monedas;
    document.getElementById("rpgRacha").textContent = jugador.racha;
    document.getElementById("rpgLogros").textContent = jugador.logros.length;

    actualizarInventarioRPG(jugador);

    pantalla.classList.add("activo");
    playSound("clic");
}

/* ------------------------------------------------------------
   CERRAR INVENTARIO RPG
------------------------------------------------------------ */

document.getElementById("cerrarInventarioRPG").onclick = () => {
    document.getElementById("pantallaInventarioRPG").classList.remove("activo");
    playSound("clic");
};

/* ------------------------------------------------------------
   ACTUALIZAR INVENTARIO RPG (pantalla grande)
------------------------------------------------------------ */

function actualizarInventarioRPG(jugador) {
    const piezas = ["cpu", "ram", "gpu", "ssd", "placa", "fuente"];

    piezas.forEach(p => {
        const elem = document.getElementById(`rpg-${p}`);

        if (jugador.inventario[p]) {
            elem.classList.add("activo");
            elem.style.backgroundImage = `url('img/${p}.png')`;
        } else {
            elem.classList.remove("activo");
            elem.style.backgroundImage = "";
        }
    });
}

/* ------------------------------------------------------------
   COFRE SORPRESA (puede dar piezas o monedas)
------------------------------------------------------------ */

function abrirCofre(jugador) {
    const popup = document.getElementById("cofrePopup");
    const texto = document.getElementById("cofreResultado");

    popup.classList.add("activo");
    playSound("cofre");

    const recompensa = Math.random();

    if (recompensa < 0.4) {
        // Monedas
        const cantidad = Math.floor(Math.random() * 15) + 5;
        jugador.monedas += cantidad;
        texto.textContent = `Has ganado ${cantidad} monedas`;
    } else {
        // Pieza aleatoria
        const piezas = ["cpu", "ram", "gpu", "ssd", "placa", "fuente"];
        const pieza = piezas[Math.floor(Math.random() * piezas.length)];

        ganarPieza(jugador, pieza);
        texto.textContent = `¡Has encontrado una pieza: ${pieza.toUpperCase()}!`;
    }

    completarMision(jugador, "cofre");

    setTimeout(() => popup.classList.remove("activo"), 2000);
}

/* ------------------------------------------------------------
   SONIDO DE PIEZAS
------------------------------------------------------------ */

function playSound(nombre) {
    const audio = document.getElementById(`sonido-${nombre}`) ||
                  document.getElementById(`snd-${nombre}`);

    if (audio) {
        audio.currentTime = 0;
        audio.play();
    }
}
