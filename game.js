// ---------------------------
// CONFIGURACIÓN BÁSICA
// ---------------------------

// Número de casillas del tablero
const NUM_CASILLAS = 20;

// Coordenadas aproximadas de cada casilla (ajusta a tu tablero)
const casillas = [];
for (let i = 0; i < NUM_CASILLAS; i++) {
  // Distribución simple en línea (luego puedes personalizar)
  casillas.push({
    x: 80 + i * 40, // ajusta según tu tablero
    y: 80
  });
}

// Estado del jugador
let posicion = 0; // índice en el array casillas
let oro = 0;
let plata = 0;

// Referencias DOM
const token = document.getElementById("player-token");
const diceBtn = document.getElementById("roll-dice");
const diceResult = document.getElementById("dice-result");
const positionDisplay = document.getElementById("position-display");
const goldDisplay = document.getElementById("gold-coins");
const silverDisplay = document.getElementById("silver-coins");

// Modal tarjeta
const cardModal = document.getElementById("card-modal");
const cardTypeEl = document.getElementById("card-type");
const cardContentEl = document.getElementById("card-content");
const cardOptionsEl = document.getElementById("card-options");
const optionAEl = document.getElementById("optionA");
const optionBEl = document.getElementById("optionB");
const optionCEl = document.getElementById("optionC");
const cardOkBtn = document.getElementById("card-ok");
const cardFeedbackEl = document.getElementById("card-feedback");

// ---------------------------
// MAZOS DE TARJETAS (EJEMPLO)
// Aquí puedes pegar las que ya hemos creado
// ---------------------------

const mazoIdeas = [
  { tipo: "Idea", contenido: "¿Sabías que…? Un algoritmo es como una receta de cocina." },
  { tipo: "Idea", contenido: "¿Sabías que…? Los robots pueden ayudar a personas mayores en casa." },
  { tipo: "Idea", contenido: "¿Sabías que…? El código binario solo usa 0 y 1." }
];

const mazoPreguntas = [
  {
    tipo: "Pregunta",
    contenido: "¿Qué es un algoritmo?",
    A: "Un robot",
    B: "Una serie de pasos",
    C: "Un videojuego",
    respuesta: "B"
  },
  {
    tipo: "Pregunta",
    contenido: "¿Qué es un dron?",
    A: "Un robot volador",
    B: "Un cable",
    C: "Un programa",
    respuesta: "A"
  }
];

const mazoRetos = [
  {
    tipo: "Reto",
    contenido: "Imita a un robot durante 5 segundos."
  },
  {
    tipo: "Reto",
    contenido: "Crea un algoritmo para lavarte las manos."
  }
];

const mazoDesenchufado = [
  {
    tipo: "Desenchufado",
    contenido: "Representa un sensor con tu cuerpo (reacciona solo a la luz)."
  },
  {
    tipo: "Desenchufado",
    contenido: "Ordena 5 objetos de menor a mayor tamaño."
  }
];

// ---------------------------
// ASIGNAR TIPOS A CASILLAS
// ---------------------------

function tipoDeCasilla(index) {
  // Ejemplo simple: alternar tipos
  if (index % 4 === 0) return "idea";
  if (index % 4 === 1) return "pregunta";
  if (index % 4 === 2) return "reto";
  return "desenchufado";
}

// ---------------------------
// INICIALIZACIÓN
// ---------------------------

function colocarFicha() {
  const { x, y } = casillas[posicion];
  token.style.left = x + "px";
  token.style.top = y + "px";
  positionDisplay.textContent = posicion + 1;
}

function actualizarMonedas() {
  goldDisplay.textContent = oro;
  silverDisplay.textContent = plata;
}

function inicio() {
  posicion = 0;
  oro = 0;
  plata = 0;
  colocarFicha();
  actualizarMonedas();
}

inicio();

// ---------------------------
// LÓGICA DEL DADO Y MOVIMIENTO
// ---------------------------

diceBtn.addEventListener("click", () => {
  const valor = Math.floor(Math.random() * 6) + 1;
  diceResult.textContent = valor;

  posicion += valor;
  if (posicion >= NUM_CASILLAS) {
    posicion = NUM_CASILLAS - 1;
  }

  colocarFicha();

  // Mostrar tarjeta según tipo de casilla
  const tipo = tipoDeCasilla(posicion);
  mostrarTarjeta(tipo);
});

// ---------------------------
// MOSTRAR TARJETAS
// ---------------------------

let tarjetaActual = null;

function mostrarTarjeta(tipo) {
  cardFeedbackEl.textContent = "";
  cardOptionsEl.classList.add("hidden");
  optionAEl.onclick = null;
  optionBEl.onclick = null;
  optionCEl.onclick = null;

  let carta = null;

  if (tipo === "idea") {
    carta = mazoIdeas[Math.floor(Math.random() * mazoIdeas.length)];
  } else if (tipo === "pregunta") {
    carta = mazoPreguntas[Math.floor(Math.random() * mazoPreguntas.length)];
  } else if (tipo === "reto") {
    carta = mazoRetos[Math.floor(Math.random() * mazoRetos.length)];
  } else if (tipo === "desenchufado") {
    carta = mazoDesenchufado[Math.floor(Math.random() * mazoDesenchufado.length)];
  }

  if (!carta) return;

  tarjetaActual = carta;
  cardTypeEl.textContent = carta.tipo;
  cardContentEl.textContent = carta.contenido;

  if (carta.tipo === "Pregunta") {
    cardOptionsEl.classList.remove("hidden");
    optionAEl.textContent = "A) " + carta.A;
    optionBEl.textContent = "B) " + carta.B;
    optionCEl.textContent = "C) " + carta.C;

    optionAEl.onclick = () => responder("A");
    optionBEl.onclick = () => responder("B");
    optionCEl.onclick = () => responder("C");
  }

  cardModal.classList.remove("hidden");
}

function responder(opcion) {
  if (!tarjetaActual) return;
  if (opcion === tarjetaActual.respuesta) {
    cardFeedbackEl.textContent = "¡Correcto! Ganas 1 moneda de oro.";
    oro += 1;
  } else {
    cardFeedbackEl.textContent = "Incorrecto. El siguiente equipo podría ganar 1 moneda de plata (rebote).";
    plata += 1;
  }
  actualizarMonedas();
}

// Cerrar tarjeta
cardOkBtn.addEventListener("click", () => {
  cardModal.classList.add("hidden");
});
