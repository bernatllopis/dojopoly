/* ============================================================
   SISTEMA DE COMERCIO ENTRE EQUIPOS - Dojopoly
   ============================================================ */

/* ------------------------------------------------------------
   VARIABLES DEL COMERCIO
------------------------------------------------------------ */

let equipoA = null;
let equipoB = null;

let piezaASeleccionada = null;
let piezaBSeleccionada = null;

/* ------------------------------------------------------------
   ABRIR PANTALLA DE COMERCIO
------------------------------------------------------------ */

function abrirComercio(j1, j2) {
    equipoA = j1;
    equipoB = j2;

    piezaASeleccionada = null;
    piezaBSeleccionada = null;

    document.getElementById("nombreEquipoA").textContent = j1.nombre;
    document.getElementById("nombreEquipoB").textContent = j2.nombre;

    cargarInventarioComercio(j1, "itemsEquipoA", "A");
    cargarInventarioComercio(j2, "itemsEquipoB", "B");

    document.getElementById("textoOferta").textContent = "Selecciona una pieza de cada equipo";

    document.getElementById("pantallaComercio").classList.add("activo");
    playSound("clic");
}

/* ------------------------------------------------------------
   CERRAR PANTALLA DE COMERCIO
------------------------------------------------------------ */

document.getElementById("cerrarComercio").onclick = () => {
    document.getElementById("pantallaComercio").classList.remove("activo");
    playSound("clic");
};

/* ------------------------------------------------------------
   CARGAR INVENTARIO EN LA PANTALLA DE COMERCIO
------------------------------------------------------------ */

function cargarInventarioComercio(jugador, contenedorId, lado) {
    const contenedor = document.getElementById(contenedorId);
    contenedor.innerHTML = "";

    const piezas = ["cpu", "ram", "gpu", "ssd", "placa", "fuente"];

    piezas.forEach(p => {
        const div = document.createElement("div");
        div.classList.add("item-comercio");

        if (jugador.inventario[p]) {
            div.style.backgroundImage = `url('img/${p}.png')`;
            div.onclick = () => seleccionarPieza(lado, p, div);
        } else {
            div.style.opacity = "0.15";
        }

        contenedor.appendChild(div);
    });
}

/* ------------------------------------------------------------
   SELECCIONAR PIEZA PARA INTERCAMBIO
------------------------------------------------------------ */

function seleccionarPieza(lado, pieza, elemento) {
    playSound("clic");

    if (lado === "A") {
        piezaASeleccionada = pieza;
        limpiarSeleccion("itemsEquipoA");
        elemento.classList.add("seleccionado");
    } else {
        piezaBSeleccionada = pieza;
        limpiarSeleccion("itemsEquipoB");
        elemento.classList.add("seleccionado");
    }

    actualizarTextoOferta();
}

/* ------------------------------------------------------------
   LIMPIAR SELECCIÓN VISUAL
------------------------------------------------------------ */

function limpiarSeleccion(contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    contenedor.querySelectorAll(".item-comercio").forEach(i => {
        i.classList.remove("seleccionado");
    });
}

/* ------------------------------------------------------------
   ACTUALIZAR TEXTO DE LA OFERTA
------------------------------------------------------------ */

function actualizarTextoOferta() {
    const texto = document.getElementById("textoOferta");

    if (!piezaASeleccionada || !piezaBSeleccionada) {
        texto.textContent = "Selecciona una pieza de cada equipo";
        return;
    }

    texto.textContent = `${equipoA.nombre} ofrece ${piezaASeleccionada.toUpperCase()} ↔ ${equipoB.nombre} ofrece ${piezaBSeleccionada.toUpperCase()}`;
}

/* ------------------------------------------------------------
   BOTÓN ACEPTAR OFERTA
------------------------------------------------------------ */

document.getElementById("btnAceptarOferta").onclick = () => {
    if (!piezaASeleccionada || !piezaBSeleccionada) {
        playSound("error");
        return;
    }

    realizarIntercambio();
};

/* ------------------------------------------------------------
   BOTÓN RECHAZAR OFERTA
------------------------------------------------------------ */

document.getElementById("btnRechazarOferta").onclick = () => {
    playSound("error");
    document.getElementById("pantallaComercio").classList.remove("activo");
};

/* ------------------------------------------------------------
   REALIZAR INTERCAMBIO
------------------------------------------------------------ */

function realizarIntercambio() {
    // Quitar piezas
    equipoA.inventario[piezaASeleccionada] = false;
    equipoB.inventario[piezaBSeleccionada] = false;

    // Dar piezas
    equipoA.inventario[piezaBSeleccionada] = true;
    equipoB.inventario[piezaASeleccionada] = true;

    // Actualizar inventarios visuales
    actualizarInventario(equipoA);
    actualizarInventario(equipoB);

    // Misiones y logros
    completarMision(equipoA, "comercio");
    completarMision(equipoB, "comercio");

    desbloquearLogro(equipoA, "comerciante");
    desbloquearLogro(equipoB, "comerciante");

    playSound("clic");

    document.getElementById("pantallaComercio").classList.remove("activo");
}

/* ------------------------------------------------------------
   FUNCIÓN AUXILIAR DE SONIDO
------------------------------------------------------------ */

function playSound(nombre) {
    const audio = document.getElementById(`snd-${nombre}`);
    if (audio) {
        audio.currentTime = 0;
        audio.play();
    }
}
