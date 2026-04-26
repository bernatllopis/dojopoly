// ===============================
// CONFIGURACIÓN INICIAL
// ===============================

const canvas = document.getElementById("tablero");
const ctx = canvas.getContext("2d");

// Ajustar canvas al tamaño visible (responsive)
function ajustarCanvas() {
    const rect = canvas.getBoundingClientRect();

    // Ancho visible del canvas
    const ancho = rect.width;

    // Alto máximo disponible en pantalla (75% de la pantalla)
    const altoPantalla = window.innerHeight * 0.75;

    // El tablero es cuadrado, así que usamos el menor valor
    const lado = Math.min(ancho, altoPantalla);

    canvas.width = lado;
    canvas.height = lado;

    if (tablero.complete) {
        ctx.drawImage(tablero, 0, 0, canvas.width, canvas.height);
        dibujarFicha();
    }
}


window.addEventListener("resize", ajustarCanvas);

// ===============================
// TABLERO
// ===============================

const tablero = new Image();
tablero.src = "tablero.png";

tablero.onload = () => {
    ajustarCanvas();
};

// Coordenadas reales de las 40 casillas (tablero 800x800)
const casillas = [
    {x: 720, y: 720}, {x: 630, y: 720}, {x: 560, y: 720}, {x: 490, y: 720},
    {x: 420, y: 720}, {x: 350, y: 720}, {x: 280, y: 720}, {x: 210, y: 720},
    {x: 140, y: 720}, {x: 70,  y: 720},

    {x: 70,  y: 630}, {x: 70,  y: 560}, {x: 70,  y: 490}, {x: 70,  y: 420},
    {x: 70,  y: 350}, {x: 70,  y: 280}, {x: 70,  y: 210}, {x: 70,  y: 140},
    {x: 70,  y: 70},

    {x: 140, y: 70}, {x: 210, y: 70}, {x: 280, y: 70}, {x: 350, y: 70},
    {x: 420, y: 70}, {x: 490, y: 70}, {x: 560, y: 70}, {x: 630, y: 70},
    {x: 720, y: 70},

    {x: 720, y: 140}, {x: 720, y: 210}, {x: 720, y: 280}, {x: 720, y: 350},
    {x: 720, y: 420}, {x: 720, y: 490}, {x: 720, y: 560}, {x: 720, y: 630},

    {x: 720, y: 700}, {x: 720, y: 720}, {x: 720, y: 720}, {x: 720, y: 720}
];

// ===============================
// ESCALADO
// ===============================

function escalar(valor) {
    return valor * (canvas.width / 800);
}

// ===============================
// FICHA
// ===============================

let posicion = 1;
let turno = 1;

let fichaX = casillas[0].x;
let fichaY = casillas[0].y;

let velocidad = 6;

function dibujarFicha() {
    ctx.beginPath();
    ctx.arc(escalar(fichaX), escalar(fichaY), escalar(15), 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
}

// ===============================
// ANIMACIÓN SUAVE
// ===============================

function moverSuave(destinoX, destinoY, callback) {
    function animar() {
        const dx = destinoX - fichaX;
        const dy = destinoY - fichaY;
        const distancia = Math.sqrt(dx*dx + dy*dy);

        // SNAP final
        if (distancia < velocidad) {
            fichaX = destinoX;
            fichaY = destinoY;

            ctx.drawImage(tablero, 0, 0, canvas.width, canvas.height);
            dibujarFicha();

            callback();
            return;
        }

        fichaX += (dx / distancia) * velocidad;
        fichaY += (dy / distancia) * velocidad;

        ctx.drawImage(tablero, 0, 0, canvas.width, canvas.height);
        dibujarFicha();

        requestAnimationFrame(animar);
    }

    animar();
}

function moverFichaPasos(pasosRestantes) {
    if (pasosRestantes === 0) {
        turno = turno === 1 ? 2 : 1;
        document.getElementById("turno").textContent = "Equipo " + turno;
        return;
    }

    posicion++;
    if (posicion > casillas.length) posicion = 1;

    const destino = casillas[posicion - 1];

    moverSuave(destino.x, destino.y, () => {

        // SNAP definitivo
        fichaX = destino.x;
        fichaY = destino.y;

        ctx.drawImage(tablero, 0, 0, canvas.width, canvas.height);
        dibujarFicha();

        moverFichaPasos(pasosRestantes - 1);
    });
}

// ===============================
// BOTÓN DADO
// ===============================

document.getElementById("btnDado").addEventListener("click", () => {
    const resultado = Math.floor(Math.random() * 6) + 1;

    document.getElementById("resultado").textContent = resultado;

    let destino = posicion + resultado;
    if (destino > casillas.length) destino -= casillas.length;

    document.getElementById("posicion").textContent = "Casilla " + destino;

    moverFichaPasos(resultado);
});
