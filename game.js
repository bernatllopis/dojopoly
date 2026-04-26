const canvas = document.getElementById("tablero");
const ctx = canvas.getContext("2d");

const tablero = new Image();
tablero.src = "tablero.png";

// Coordenadas aproximadas de cada casilla (x, y)
const casillas = [
    {x: 700, y: 700}, // Casilla 1
    {x: 600, y: 700}, // Casilla 2
    {x: 500, y: 700}, // Casilla 3
    {x: 400, y: 700}, // Casilla 4
    {x: 300, y: 700}, // Casilla 5
    {x: 200, y: 700}, // Casilla 6
    {x: 100, y: 700}, // Casilla 7
    {x: 100, y: 600}, // Casilla 8
    {x: 100, y: 500}, // Casilla 9
    {x: 100, y: 400}, // Casilla 10
    {x: 100, y: 300}, // Casilla 11
    {x: 100, y: 200}  // Casilla 12
];

function dibujarFicha() {
    const pos = casillas[posicion - 1];
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 15, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
}


tablero.onload = () => {
    ctx.drawImage(tablero, 0, 0, canvas.width, canvas.height);
    dibujarFicha();
};


let turno = 1;
let posicion = 1;

document.getElementById("btnDado").addEventListener("click", () => {
    const resultado = Math.floor(Math.random() * 6) + 1;

    posicion += resultado;
    if (posicion > casillas.length) posicion = 1;

    document.getElementById("resultado").textContent = resultado;
    document.getElementById("posicion").textContent = "Casilla " + posicion;

    turno = turno === 1 ? 2 : 1;
    document.getElementById("turno").textContent = "Equipo " + turno;

    // Redibujar tablero + ficha
    ctx.drawImage(tablero, 0, 0, canvas.width, canvas.height);
    dibujarFicha();
});

