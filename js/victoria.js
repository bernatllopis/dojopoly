/* ============================================================
   PANTALLA DE VICTORIA - Dojopoly
   ============================================================ */

/* ------------------------------------------------------------
   MOSTRAR PANTALLA DE VICTORIA
------------------------------------------------------------ */

function mostrarVictoria(jugador) {
    const pantalla = document.getElementById("pantallaVictoria");

    document.getElementById("victoriaAvatar").src = jugador.avatar;
    document.getElementById("victoriaTitulo").textContent = "¡Victoria!";
    document.getElementById("victoriaMensaje").textContent =
        `${jugador.nombre} ha completado el ordenador y restaurado el sistema`;

    pantalla.classList.add("activo");

    // Música épica
    playSound("victoria");

    // Confeti
    lanzarConfeti();

    // Logro final
    desbloquearLogro(jugador, "victoriaFinal");
}

/* ------------------------------------------------------------
   CERRAR PANTALLA DE VICTORIA
------------------------------------------------------------ */

document.getElementById("btnCerrarVictoria").onclick = () => {
    const pantalla = document.getElementById("pantallaVictoria");
    pantalla.classList.remove("activo");
    playSound("clic");
};

/* ------------------------------------------------------------
   CONFETI ANIMADO
------------------------------------------------------------ */

function lanzarConfeti() {
    for (let i = 0; i < 80; i++) {
        setTimeout(() => crearConfeti(), i * 20);
    }
}

function crearConfeti() {
    const confeti = document.createElement("div");
    confeti.classList.add("confeti");

    const colores = ["#ff0", "#0ff", "#f0f", "#0f0", "#f00", "#00f"];
    confeti.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];

    confeti.style.left = Math.random() * 100 + "vw";
    confeti.style
