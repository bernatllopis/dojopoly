/* ============================================================
   SISTEMA DE PREGUNTAS - Dojopoly
   ============================================================ */

/* ------------------------------------------------------------
   PREGUNTAS FÁCILES
------------------------------------------------------------ */

const preguntasFaciles = [
    {
        pregunta: "¿Qué componente es el 'cerebro' del ordenador?",
        opciones: ["CPU", "RAM", "SSD", "Fuente"],
        correcta: 0
    },
    {
        pregunta: "¿Qué dispositivo usamos para mover el cursor?",
        opciones: ["Teclado", "Ratón", "Monitor", "Altavoz"],
        correcta: 1
    },
    {
        pregunta: "¿Qué componente almacena archivos?",
        opciones: ["GPU", "SSD", "RAM", "Fuente"],
        correcta: 1
    }
];

/* ------------------------------------------------------------
   PREGUNTAS MEDIAS
------------------------------------------------------------ */

const preguntasMedias = [
    {
        pregunta: "¿Qué componente se encarga de los gráficos?",
        opciones: ["CPU", "GPU", "RAM", "SSD"],
        correcta: 1
    },
    {
        pregunta: "¿Qué memoria es volátil?",
        opciones: ["RAM", "SSD", "USB", "DVD"],
        correcta: 0
    },
    {
        pregunta: "¿Qué componente alimenta al ordenador?",
        opciones: ["Fuente", "CPU", "Placa base", "GPU"],
        correcta: 0
    }
];

/* ------------------------------------------------------------
   PREGUNTAS DIFÍCILES
------------------------------------------------------------ */

const preguntasDificiles = [
    {
        pregunta: "¿Qué componente conecta todos los demás?",
        opciones: ["Placa base", "CPU", "RAM", "Fuente"],
        correcta: 0
    },
    {
        pregunta: "¿Qué unidad mide la velocidad de la CPU?",
        opciones: ["GHz", "MB", "FPS", "RPM"],
        correcta: 0
    },
    {
        pregunta: "¿Qué tipo de memoria usa la GPU?",
        opciones: ["GDDR", "DDR4", "SSD", "Flash"],
        correcta: 0
    }
];

/* ------------------------------------------------------------
   PREGUNTAS TEMÁTICAS
------------------------------------------------------------ */

const preguntasTematicas = {
    robots: [
        {
            pregunta: "¿Cómo se llama la ciencia que estudia los robots?",
            opciones: ["Robótica", "Cibernética", "Automática", "Mecatrónica"],
            correcta: 0
        },
        {
            pregunta: "¿Qué robot famoso explora Marte?",
            opciones: ["Curiosity", "Atlas", "Pepper", "Asimo"],
            correcta: 0
        }
    ],

    videojuegos: [
        {
            pregunta: "¿Qué empresa creó la consola Nintendo Switch?",
            opciones: ["Sony", "Microsoft", "Nintendo", "Sega"],
            correcta: 2
        },
        {
            pregunta: "¿Cómo se llama el fontanero más famoso de los videojuegos?",
            opciones: ["Luigi", "Mario", "Sonic", "Crash"],
            correcta: 1
        }
    ],

    internet: [
        {
            pregunta: "¿Qué significa WWW?",
            opciones: ["World Wide Web", "Web World Window", "Wide Web World", "World Web Wide"],
            correcta: 0
        },
        {
            pregunta: "¿Qué navegador es de Google?",
            opciones: ["Firefox", "Safari", "Chrome", "Opera"],
            correcta: 2
        }
    ],

    ia: [
        {
            pregunta: "¿Qué significa IA?",
            opciones: ["Inteligencia Artificial", "Interfaz Avanzada", "Información Automática", "Integración Algorítmica"],
            correcta: 0
        },
        {
            pregunta: "¿Qué técnica permite a una IA aprender de datos?",
            opciones: ["Machine Learning", "Deep Painting", "Data Drawing", "Smart Coding"],
            correcta: 0
        }
    ]
};

/* ------------------------------------------------------------
   FUNCIÓN PARA OBTENER PREGUNTA ALEATORIA TEMÁTICA
------------------------------------------------------------ */

function preguntaAleatoria(categoria) {
    const lista = preguntasTematicas[categoria];
    return lista[Math.floor(Math.random() * lista.length)];
}

/* ------------------------------------------------------------
   SISTEMA DE DIFICULTAD DINÁMICA
------------------------------------------------------------ */

function actualizarDificultad(jugador) {
    const piezas = Object.values(jugador.inventario).filter(v => v).length;

    if (piezas >= 5) jugador.nivel = "jefe";
    else if (piezas >= 4) jugador.nivel = "dificil";
    else if (piezas >= 2) jugador.nivel = "medio";
    else jugador.nivel = "facil";
}

function obtenerPreguntaSegunNivel(jugador) {
    actualizarDificultad(jugador);

    switch (jugador.nivel) {
        case "facil":
            return preguntasFaciles[Math.floor(Math.random() * preguntasFaciles.length)];
        case "medio":
            return preguntasMedias[Math.floor(Math.random() * preguntasMedias.length)];
        case "dificil":
            return preguntasDificiles[Math.floor(Math.random() * preguntasDificiles.length)];
        case "jefe":
            return preguntaModoJefe();
    }
}

/* ------------------------------------------------------------
   MODO JEFE FINAL (3 preguntas seguidas)
------------------------------------------------------------ */

function preguntaModoJefe() {
    return {
        tipo: "jefe",
        preguntas: [
            preguntasDificiles[Math.floor(Math.random() * preguntasDificiles.length)],
            preguntasTematicas.ia[Math.floor(Math.random() * preguntasTematicas.ia.length)],
            preguntasDificiles[Math.floor(Math.random() * preguntasDificiles.length)]
        ]
    };
}
