const canvas = document.getElementById("tablero");
const ctx = canvas.getContext("2d");

const tablero = new Image();
tablero.src = "tablero.png";

tablero.onload = () => {
    ctx.drawImage(tablero, 0, 0, canvas.width, canvas.height);
};

let turno = 1;
let posicion = 1;

document.getElementById("btnDado").addEventListener("click", () => {
    const resultado = Math.floor(Math.random() * 6) + 1;

    posicion += resultado;
    if (posicion > 40) posicion -= 40;

    document.getElementById("resultado").textContent = resultado;
    document.getElementById("posicion").textContent = "Casilla " + posicion;

    turno = turno === 1 ? 2 : 1;
    document.getElementById("turno").textContent = "Equipo " + turno;
});
