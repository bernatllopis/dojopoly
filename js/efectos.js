/* ============================================================
   EFECTOS VISUALES Y SONIDOS - Dojopoly
   ============================================================ */

/* ------------------------------------------------------------
   PARTÍCULAS (usadas al ganar piezas)
------------------------------------------------------------ */

function lanzarParticulas(x, y) {
    for (let i = 0; i < 25; i++) {
        crearParticula(x, y);
    }
}

function crearParticula(x, y) {
    const p = document.createElement("div");
    p.classList.add("particula");

    const dx = (Math.random() - 0.5) * 200;
    const dy = (Math.random() - 0.5) * 200;

    p.style.left = x + "px";
    p.style.top = y + "px";
    p.style.setProperty("--dx", dx + "px");
    p.style.setProperty("--dy", dy + "px");

    document.body.appendChild(p);

    setTimeout(() => p.remove(), 800);
}

/* ------------------------------------------------------------
   DESTELLO (efecto brillante)
------------------------------------------------------------ */

function destello(x, y) {
    const d = document.createElement("div");
    d.classList.add("destello");

    d.style.left = x + "px";
    d.style.top = y + "px";

    document.body.appendChild(d);

    setTimeout(() => d.remove(), 600);
}

/* ------------------------------------------------------------
   EFECTO DE IMPACTO (golpe visual)
------------------------------------------------------------ */

function impacto(x, y) {
    const i = document.createElement("div");
    i.classList.add("impacto");

    i.style.left = x + "px";
    i.style.top = y + "px";

    document.body.appendChild(i);

    setTimeout(() => i.remove(), 500);
}

/* ------------------------------------------------------------
   CONFETI (usado en victoria.js)
------------------------------------------------------------ */

function lanzarConfetiSimple() {
    for (let i = 0; i < 40; i++) {
        crearConfetiSimple();
    }
}

function crearConfetiSimple() {
    const c = document.createElement("div");
    c.classList.add("confeti");

    const colores = ["#ff0", "#0ff", "#f0f", "#0f0", "#f00", "#00f"];
    c.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];

    c.style.left = Math.random() * 100 + "vw";
    c.style.animationDuration = (Math.random() * 2 + 2) + "s";

    document.body.appendChild(c);

    setTimeout(() => c.remove(), 4000);
}

/* ------------------------------------------------------------
   SONIDO GLOBAL
------------------------------------------------------------ */

function playSound(nombre) {
    const audio =
        document.getElementById(`snd-${nombre}`) ||
        document.getElementById(`sonido-${nombre}`);

    if (audio) {
        audio.currentTime = 0;
        audio.play();
    }
}
