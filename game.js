/* =========================================================
   CYBER MEMORY - GAME.JS
   Lógica general del juego:
   - inicio y reinicio
   - puntuación
   - temporizador global
   - intentos por nivel
   - checkpoints
   - renderizado de cartas
   - comprobación de parejas
   - modales de fin de nivel
   ========================================================= */


/* =========================================================
   MENSAJES DE LOS MODALES DE FIN DE NIVEL
   Cada nivel puede mostrar un título y un texto educativo
   cuando el jugador completa todas las parejas.
   ========================================================= */
const LEVEL_MESSAGES = {
  nivel1: {
    title: "¡Enhorabuena! Has completado el nivel 1",
    text: "Has identificado varios hábitos digitales del día a día, como la necesidad de estar siempre conectado, ignorar a otras personas por mirar el móvil o compartir demasiada información en redes. Reconocer estos comportamientos es el primer paso para desarrollar un uso más consciente y equilibrado de la tecnología."
  },
  nivel2: {
    title: "¡Nivel 2 completado!",
    text: "Has descubierto algunos conceptos de la cultura digital y las modas en internet. Términos como crush, shippear o hype forman parte del lenguaje que utilizan muchas personas en redes, videojuegos y comunidades online. Comprender estas expresiones nos ayuda a entender mejor cómo se comunican y se relacionan las personas en el mundo digital. El mundo digital tiene muchas capas. Prepárate para el siguiente nivel."
  },
  nivel3: {
    title: "¡Reto superado!",
    text: "Has identificado varias formas de incivismo en internet, como ignorar deliberadamente a alguien, difundir rumores o provocar discusiones en línea. Estos comportamientos pueden deteriorar la comunicación y el respeto entre personas. Detectarlos es clave para fomentar una convivencia digital más saludable."
  },
  nivel4: {
    title: "¡Desafío superado!",
    text: "Has identificado distintas formas de manipulación y humillación en internet, como difundir contenido falso, provocar discusiones o burlarse de otras personas en línea. Detectar estas conductas nos ayuda a comprender mejor cómo pueden afectar a la convivencia digital y cómo actuar de forma responsable en la red."
  },
  nivel5: {
    title: "¡Gran avance! Has superado el nivel 5",
    text: "Has identificado distintos riesgos relacionados con la privacidad y la identidad digital, como la suplantación de identidad, el robo de datos o la manipulación de contenidos en internet. Reconocer estas situaciones es fundamental para proteger la información personal y navegar de forma más segura en el entorno digital."
  },
  nivel6: {
    title: "¡Sigue así! Has completado el nivel 6",
    text: "Has identificado distintas formas de acoso, control y amenazas en el entorno digital, como la vigilancia constante, la intimidación o la presión para actuar de una determinada manera. Estas conductas pueden afectar al bienestar emocional y a la libertad de las personas. Reconocerlas es fundamental para prevenir el acoso y fomentar relaciones más seguras y respetuosas en internet."
  },

  nivel7: {
    title: "¡Nivel 7 superado!",
    text: "Has identificado diversas formas de violencia y acoso sexual en el entorno digital, como el envío de contenido no consentido o la difusión de imágenes íntimas. Estas prácticas vulneran la intimidad, el respeto y los derechos de las personas. Comprender estos comportamientos es clave para proteger la privacidad y promover relaciones basadas en el consentimiento y el respeto."
  },

  nivel8: {
    title: "¡Enhorabuena! Has completado el juego",
    text: "Has identificado situaciones relacionadas con delitos graves en internet, como el engaño, la extorsión o la difusión de contenido sin consentimiento. Estas conductas pueden causar un daño importante y tener consecuencias legales. Comprender estos riesgos es esencial para actuar con responsabilidad y contribuir a un entorno digital más seguro para todos."
  }
};


/* =========================================================
   ESTADO GLOBAL DEL JUEGO
   ========================================================= */

// Intentos / combinaciones realizadas en el nivel actual
let attempts = 0;
let attemptsMax = 14;

// Estado de selección de cartas
let firstCard = null;   // primera carta seleccionada
let secondCard = null;  // segunda carta seleccionada
let isLocked = false;   // bloquea clics durante animaciones

// Temporizador global
let timerInterval = null;

// Puntuación
const scoreContainer = document.querySelector(".score");
const scoreMax = scoreContainer
  ? Number(scoreContainer.textContent.split("/")[1])
  : 480;

let score = Number(localStorage.getItem("cyberMemoryScore")) || 0;


/* =========================================================
   INICIALIZACIÓN GENERAL
   - Configura botones de inicio / reinicio
   - Renderiza cartas si estamos en un nivel
   - Inicializa puntuación, intentos y temporizador
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  setupStartButtons();
  setupRestartButtons();
  setupNextButtons();

  updateProgress();

  // Si existen arrays del nivel actual, renderiza el tablero
  const habitoImgs = typeof HABITO_IMAGES !== "undefined" ? HABITO_IMAGES : [];
  const defImgs = typeof DEF_IMAGES !== "undefined" ? DEF_IMAGES : [];

  if (document.getElementById("grid-habito") && document.getElementById("grid-def")) {
    renderSide("grid-habito", habitoImgs, "right");
    renderSide("grid-def", defImgs, "left");
  }

  // Configurar intentos máximos según nivel
  const currentLevel = getCurrentLevelNumber();
  attemptsMax = getAttemptsLimit(currentLevel);
  updateAttemptsDisplay();

  // Arrancar temporizador global
  startGlobalTimer();
  updateGlobalTimer();
});


/* =========================================================
   BOTONES DE INICIO / REINICIO / AVANCE
   ========================================================= */

/**
 * Configura el botón "Empezar" de la portada.
 * Reinicia puntuación y tiempo global, y manda al nivel 1.
 */
function setupStartButtons() {
  const empezar = document.getElementById("btn-start");

  if (!empezar) return;

  empezar.addEventListener("click", () => {
    localStorage.setItem("cyberMemoryScore", 0);
    localStorage.setItem("gameStartTime", Date.now());
    window.location.href = "niveles/nivel1.html";
  });
}

/**
 * Configura todos los botones de clase ".empezar"
 * para reiniciar la partida desde el nivel 1.
 */
function setupRestartButtons() {
  document.querySelectorAll(".empezar").forEach(btn => {
    btn.addEventListener("click", () => {
      localStorage.setItem("cyberMemoryScore", 0);
      localStorage.setItem("gameStartTime", Date.now());
      window.location.href = "nivel1.html";
    });
  });
}

/**
 * Configura los botones de "Avanzar nivel" para que
 * usen la misma lógica que el final automático del nivel.
 */
function setupNextButtons() {
  const btnNext = document.getElementById("btn-next");
  const btnNextMovil = document.getElementById("btn-next-movil");

  [btnNext, btnNextMovil].forEach(btn => {
    if (!btn) return;
    btn.addEventListener("click", () => {
      goToNextLevel();
    });
  });
}


/* =========================================================
   PUNTUACIÓN Y BARRA DE PROGRESO
   ========================================================= */

/**
 * Actualiza la puntuación numérica y el ancho de la barra de progreso.
 */
function updateProgress() {
  const bar = document.getElementById("bar");
  const scoreEl = document.getElementById("score");

  if (scoreEl) {
    scoreEl.textContent = score;
  }

  if (bar) {
    const percent = (score / scoreMax) * 100;
    bar.style.width = percent + "%";
  }
}


/* =========================================================
   TEMPORIZADOR GLOBAL
   Se mantiene entre niveles usando localStorage.
   ========================================================= */

/**
 * Convierte milisegundos en formato MM:SS.
 */
function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

/**
 * Actualiza el reloj visible en pantalla usando la hora
 * de inicio guardada en localStorage.
 */
function updateGlobalTimer() {
  const timerEl = document.getElementById("timer");
  if (!timerEl) return;

  const startTime = localStorage.getItem("gameStartTime");
  if (!startTime) return;

  const elapsed = Date.now() - Number(startTime);
  timerEl.textContent = formatTime(elapsed);
}

/**
 * Arranca el temporizador global solo una vez por página.
 */
function startGlobalTimer() {
  if (timerInterval) return;

  timerInterval = setInterval(updateGlobalTimer, 1000);
}


/* =========================================================
   INTENTOS / COMBINACIONES
   ========================================================= */

/**
 * Actualiza el contador visual de combinaciones realizadas
 * y el máximo permitido para el nivel actual.
 */
function updateAttemptsDisplay() {
  const attemptsEl = document.getElementById("attempts");
  const attemptsMaxEl = document.getElementById("attempts-max");

  if (attemptsEl) attemptsEl.textContent = attempts;
  if (attemptsMaxEl) attemptsMaxEl.textContent = attemptsMax;
}

/**
 * Devuelve el número del nivel actual a partir de la URL.
 */
function getCurrentLevelNumber() {
  const currentPath = window.location.pathname;

  if (currentPath.includes("nivel1")) return 1;
  if (currentPath.includes("nivel2")) return 2;
  if (currentPath.includes("nivel3")) return 3;
  if (currentPath.includes("nivel4")) return 4;
  if (currentPath.includes("nivel5")) return 5;
  if (currentPath.includes("nivel6")) return 6;
  if (currentPath.includes("nivel7")) return 7;
  if (currentPath.includes("nivel8")) return 8;

  return 1;
}

/**
 * Define el límite de combinaciones permitido según el nivel:
 * - niveles 1 a 3 -> 14
 * - niveles 4 a 6 -> 12
 * - niveles 7 y 8 -> 10
 */
function getAttemptsLimit(level) {
  if (level >= 1 && level <= 3) return 14;
  if (level >= 4 && level <= 6) return 12;
  if (level >= 7 && level <= 8) return 10;

  return 14;
}


/* =========================================================
   CHECKPOINTS / DERROTA
   Si el jugador agota las combinaciones, vuelve al último
   checkpoint y pierde los puntos no consolidados.
   ========================================================= */

/**
 * Devuelve el checkpoint correspondiente al nivel actual:
 * - desde nivel 1/2 -> vuelve a nivel1 con 0 puntos
 * - desde nivel 3/4/5 -> vuelve a nivel3 con 120 puntos
 * - desde nivel 6/7/8 -> vuelve a nivel6 con 300 puntos
 */
function getCheckpointData(level) {
  if (level >= 6) {
    return {
      levelFile: "nivel6.html",
      score: 300
    };
  }

  if (level >= 3) {
    return {
      levelFile: "nivel3.html",
      score: 120
    };
  }

  return {
    levelFile: "nivel1.html",
    score: 0
  };
}

/**
 * Gestiona la derrota del jugador:
 * - calcula el checkpoint correspondiente
 * - ajusta puntuación al máximo consolidado anterior
 * - redirige al nivel bandera
 */
function handleGameOver() {
  const currentLevel = getCurrentLevelNumber();
  const checkpoint = getCheckpointData(currentLevel);

  const currentScore = Number(localStorage.getItem("cyberMemoryScore")) || 0;

  // Solo baja la puntuación si supera el máximo consolidado del checkpoint.
  // Si tiene menos puntos, se respeta su puntuación actual.
  score = Math.min(currentScore, checkpoint.score);

  localStorage.setItem("cyberMemoryScore", score);
  updateProgress();

  alert("Has agotado tus combinaciones. Vuelves al último checkpoint.");

  window.location.href = checkpoint.levelFile;
}


/* =========================================================
   UTILIDADES
   ========================================================= */

/**
 * Baraja un array usando el algoritmo Fisher-Yates.
 */
function shuffle(array) {
  const arr = [...array];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}


/* =========================================================
   CONSTRUCCIÓN Y RENDERIZADO DE CARTAS
   ========================================================= */

/**
 * Crea una carta del memory con su estructura HTML interna.
 * Cada carta conoce:
 * - el lado al que pertenece (left/right)
 * - el identificador de pareja
 */
function createCard(src, side, pairIndex) {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.side = side;
  card.dataset.pair = String(pairIndex);

  const btn = document.createElement("button");
  btn.className = "card-button";
  btn.type = "button";

  const inner = document.createElement("div");
  inner.className = "card-inner";

  const back = document.createElement("div");
  back.className = "card-face card-face--back";

  const front = document.createElement("div");
  front.className = "card-face card-face--front";

  if (src) {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "";
    front.appendChild(img);
  }

  inner.appendChild(back);
  inner.appendChild(front);
  btn.appendChild(inner);
  card.appendChild(btn);

  btn.addEventListener("click", () => handleCardClick(card));

  return card;
}

/**
 * Renderiza una columna completa del tablero.
 * Se usa tanto para definiciones como para conceptos.
 */
function renderSide(rootId, images, side) {
  const root = document.getElementById(rootId);
  if (!root) return;

  const items = (images && images.length ? images : Array(9).fill(null))
    .map((src, index) => ({ src, pairIndex: index }));

  const shuffled = shuffle(items);

  root.innerHTML = "";

  shuffled.forEach(item => {
    root.appendChild(createCard(item.src, side, item.pairIndex));
  });
}


/* =========================================================
   LÓGICA DE JUEGO
   - clic en cartas
   - comprobación de parejas
   - reseteo de selección
   ========================================================= */

/**
 * Gestiona el clic en una carta:
 * - bloquea clics si hay animación
 * - impide seleccionar cartas ya acertadas
 * - obliga a seleccionar primero una carta de la izquierda
 *   y luego una de la derecha
 */
function handleCardClick(card) {
  if (isLocked) return;
  if (card.classList.contains("matched")) return;

  const side = card.dataset.side;

  // Primera selección: solo lado izquierdo
  if (!firstCard) {
    if (side !== "left") return;
    firstCard = card;
    card.classList.add("is-flipped");
    return;
  }

  // Segunda selección: solo lado derecho
  if (!secondCard) {
    if (side !== "right") return;

    secondCard = card;
    card.classList.add("is-flipped");

    checkMatch();
  }
}

/**
 * Comprueba si las dos cartas seleccionadas forman pareja.
 * También:
 * - consume una combinación
 * - suma puntos si acierta
 * - verifica derrota por exceso de intentos
 */
function checkMatch() {
  if (!firstCard || !secondCard) return;

  isLocked = true;

  // Cada combinación realizada consume un intento
  attempts++;
  updateAttemptsDisplay();

  // Si supera el máximo, pierde
  if (attempts >= attemptsMax) {
    setTimeout(() => {
      handleGameOver();
    }, 400);
    return;
  }

  const pairA = firstCard.dataset.pair;
  const pairB = secondCard.dataset.pair;
  const isMatch = pairA === pairB;

  if (isMatch) {
    // Pareja correcta: se mantienen visibles y suman puntos
    setTimeout(() => {
      firstCard.classList.add("matched");
      secondCard.classList.add("matched");

      score = Math.min(score + 10, scoreMax);
      localStorage.setItem("cyberMemoryScore", score);

      updateProgress();
      checkLevelComplete();
      resetSelection();
    }, 500);
  } else {
    // Pareja incorrecta: se giran de nuevo
    setTimeout(() => {
      firstCard.classList.remove("is-flipped");
      secondCard.classList.remove("is-flipped");
      resetSelection();

      if (attempts >= attemptsMax) {
        handleGameOver();
      }
    }, 800);
  }
}

/**
 * Resetea la selección actual para permitir una nueva jugada.
 */
function resetSelection() {
  firstCard = null;
  secondCard = null;
  isLocked = false;
}


/* =========================================================
   FINAL DE NIVEL
   ========================================================= */

/**
 * Comprueba si todas las cartas del tablero han sido emparejadas.
 * Si es así, muestra el modal de nivel completado.
 */
function checkLevelComplete() {
  const totalCards = document.querySelectorAll(".card").length;
  const matchedCards = document.querySelectorAll(".card.matched").length;

  if (matchedCards === totalCards) {
    setTimeout(() => {
      showLevelCompleteModal();
    }, 800);
  }
}

/**
 * Cambia automáticamente al siguiente nivel o a la pantalla final.
 */
function goToNextLevel() {
  const currentPath = window.location.pathname;

  if (currentPath.includes("nivel1")) {
    window.location.href = "nivel2.html";
  } else if (currentPath.includes("nivel2")) {
    window.location.href = "nivel3.html";
  } else if (currentPath.includes("nivel3")) {
    window.location.href = "nivel4.html";
  } else if (currentPath.includes("nivel4")) {
    window.location.href = "nivel5.html";
  } else if (currentPath.includes("nivel5")) {
    window.location.href = "nivel6.html";
  } else if (currentPath.includes("nivel6")) {
    window.location.href = "nivel7.html";
  } else if (currentPath.includes("nivel7")) {
    window.location.href = "nivel8.html";
  } else if (currentPath.includes("nivel8")) {
    window.location.href = "../final.html";
  }
}

/**
 * Muestra el modal correspondiente al nivel actual.
 * Si no encuentra datos o elementos del modal, avanza directamente.
 */
function showLevelCompleteModal() {
  const currentPath = window.location.pathname;
  let currentLevel = "nivel1";

  if (currentPath.includes("nivel2")) currentLevel = "nivel2";
  else if (currentPath.includes("nivel3")) currentLevel = "nivel3";
  else if (currentPath.includes("nivel4")) currentLevel = "nivel4";
  else if (currentPath.includes("nivel5")) currentLevel = "nivel5";
  else if (currentPath.includes("nivel6")) currentLevel = "nivel6";
  else if (currentPath.includes("nivel7")) currentLevel = "nivel7";
  else if (currentPath.includes("nivel8")) currentLevel = "nivel8";

  const levelData = LEVEL_MESSAGES[currentLevel];
  const modal = document.getElementById("level-modal");
  const title = document.getElementById("level-modal-title");
  const text = document.getElementById("level-modal-text");
  const btn = document.getElementById("level-modal-btn");

  if (!modal || !title || !text || !btn || !levelData) {
    goToNextLevel();
    return;
  }

  title.textContent = levelData.title;
  text.textContent = levelData.text;
  modal.classList.remove("hidden");

  btn.onclick = () => {
    modal.classList.add("hidden");
    goToNextLevel();
  };
}