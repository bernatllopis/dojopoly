/* ============================================================
   TABLERO ESTILO MONOPOLY
============================================================ */

#tablero {
    width: 700px;
    height: 700px;
    margin: 40px auto;
    display: grid;
    grid-template-columns: repeat(11, 1fr);
    grid-template-rows: repeat(11, 1fr);
    background: #111;
    border: 4px solid #555;
    position: relative;
}

.casilla {
    border: 1px solid #333;
    background: #222;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    color: #bbb;
}

.casilla.esquina {
    background: #333;
    font-weight: bold;
}

.jugador-ficha {
    width: 20px;
    height: 20px;
    background: gold;
    border-radius: 50%;
    border: 2px solid white;
}
