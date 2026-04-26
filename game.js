const canvas = document.getElementById("tablero");
const ctx = canvas.getContext("2d");

const tablero = new Image();
tablero.src = "tablero.png";

// Coordenadas aproximadas de cada casilla (x, y)
const casillas = [
    // Abajo (de derecha a izquierda)
    {x: 720, y: 720}, // 1
    {x: 630, y: 720}, // 2
    {x: 560, y: 720}, // 3
    {x: 490, y: 720}, // 4
    {x: 420, y: 720}, // 5
    {x: 350, y: 720}, // 6
    {x: 280, y: 720}, // 7
    {x: 210, y: 720}, // 8
    {x: 140, y: 720}, // 9
    {x: 70,  y: 720}, // 10

    // Izquierda (de abajo a arriba)
    {x: 70,  y: 630}, // 11
    {x: 70,  y: 560}, // 12
    {x: 70,  y: 490}, // 13
    {x: 70,  y: 420}, // 14
    {x: 70,  y: 350}, // 15
    {x: 70,  y: 280}, // 16
    {x: 70,  y: 210}, // 17
    {x: 70,  y: 140}, // 18
    {x: 70,  y: 70},  // 19

    // Arriba (de izquierda a derecha)
    {x: 140, y: 70},  // 20
    {x: 210, y: 70},  // 21
    {x: 280, y: 70},  // 22
    {x: 350, y: 70},  // 23
    {x: 420, y: 70},  // 24
    {x: 490, y: 70},  // 25
    {x: 560, y: 70},  // 26
    {x: 630, y: 70},  // 27
    {x: 720, y: 70},  // 28

    // Derecha (de arriba a abajo)
    {x: 720, y: 140}, // 29
    {x: 720, y: 210}, // 30
    {x: 720, y: 280}, // 31
    {x: 720, y: 350}, // 32
    {x: 720, y: 420}, // 33
    {x: 720, y: 490}, // 34
    {x: 720, y: 560}, // 35
    {x: 720, y: 630}, // 36

    // Última casilla antes de volver al inicio
    {x: 720, y: 700}, // 37
    {x: 720, y: 720}, // 38 (repetida para cerrar el ciclo)
    {x: 720, y: 720}, // 39
    {x: 720, y: 720}  // 40
];


function dibujarFicha() {
    const pos = casillas[posicion - 1];
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 15, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
}


function moverFichaPasos(pasosRestantes) {
    if (pasosRestantes === 0) {
        // Cuando termina de moverse, cambiar turno
        turno = turno === 1 ? 2 : 1;
        document.getElementById("turno").textContent = "Equipo " + turno;
        return;
    }

    // Avanzar una casilla
    posicion++;
    if (posicion > casillas.length) posicion = 1;

    // Redibujar tablero y ficha
    ctx.drawImage(tablero, 0, 0, canvas.width, canvas.height);
    dibujarFicha();

    // Esperar y mover el siguiente paso
    setTimeout(() => moverFichaPasos(pasosRestantes - 1), 150);
}


tablero.onload = () => {
    ctx.drawImage(tablero, 0, 0, canvas.width, canvas.height);
    dibujarFicha();
};


let turno = 1;
let posicion = 1;

document.getElementById("btnDado").addEventListener("click", () => {
    const resultado = Math.floor(Math.random() * 6) + 1;

    document.getElementById("resultado").textContent = resultado;

    // Mostrar casilla destino
    let destino = posicion + resultado;
    if (destino > casillas.length) destino -= casillas.length;
    document.getElementById("posicion").textContent = "Casilla " + destino;

    // Iniciar animación
    moverFichaPasos(resultado);
});


