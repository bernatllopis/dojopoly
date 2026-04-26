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
        dibujarFichas();
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
// FICHAS PERSONALIZADAS
// ===============================

const imagenesFichas = [
    new Image(),
    new Image(),
    new Image(),
    new Image()
];

imagenesFichas[0].src = "ficha1.png";
imagenesFichas[1].src = "ficha2.png";
imagenesFichas[2].src = "ficha3.png";
imagenesFichas[3].src = "ficha4.png";

// ===============================
// JUGADORES
// ===============================

let jugadores = [
    { nombre: "Equipo 1", posicion: 1, oro: 0, plata: 0, ficha: 0 },
    { nombre: "Equipo 2", posicion: 1, oro: 0, plata: 0, ficha: 1 },
    { nombre: "Equipo 3", posicion: 1, oro: 0, plata: 0, ficha: 2 },
    { nombre: "Equipo 4", posicion: 1, oro: 0, plata: 0, ficha: 3 }
];

let turno = 0; // índice del jugador actual

// ===============================
// DIBUJAR FICHAS
// ===============================

function dibujarFichas() {
    jugadores.forEach(j => {
        const casilla = casillas[j
