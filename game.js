//Mensajes para los modales
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
    title: "¡Reto Superado!",
    text: "Has identificado varias formas de incivismo en internet, como ignorar deliberadamente a alguien, difundir rumores o provocar discusiones en línea. Estos comportamientos pueden deteriorar la comunicación y el respeto entre personas. Detectarlos es clave para fomentar una convivencia digital más saludable."
  },
  nivel4: {
    title: "¡Desafío superado!",
    text: "Has identificado distintas formas de manipulación y humillación en internet, como difundir contenido falso, provocar discusiones o burlarse de otras personas en línea. Detectar estas conductas nos ayuda a comprender mejor cómo pueden afectar a la convivencia digital y cómo actuar de forma responsable en la red."
  },
   nivel5: {
    title: "¡Gran avance!, has superado el nivel 5",
    text: "Has identificado distintos riesgos relacionados con la privacidad y la identidad digital, como la suplantación de identidad, el robo de datos o la manipulación de contenidos en internet. Reconocer estas situaciones es fundamental para proteger la información personal y navegar de forma más segura en el entorno digital."
  }
};


//comenzar
document.addEventListener("DOMContentLoaded", () => {
  let empezar = document.getElementById("btn-start");
  if (empezar) {
    empezar.addEventListener("click", function () {
      localStorage.setItem("cyberMemoryScore", 0);
      window.location.href = "niveles/nivel1.html";
    })
  }
  document.querySelectorAll(".empezar").forEach(btn => {
    console.log(btn)
    btn.addEventListener("click", () => {
      localStorage.removeItem("cyberMemoryScore");
      window.location.href = "nivel1.html";
      console.log(localStorage.getItem("cyberMemoryScore"))
    });
  });
});

//extraer puntuaciones

const scoreContainer = document.querySelector(".score");
const scoreMax = Number(scoreContainer.textContent.split("/")[1]);
let score = Number(localStorage.getItem("cyberMemoryScore")) || 0;
updateProgress();

// actualizar puntuaciones en la barra
function updateProgress() {
  const bar = document.getElementById("bar");
  const scoreEl = document.getElementById("score");
  scoreEl.textContent = score;
  const percent = (score / scoreMax) * 100;
  bar.style.width = percent + "%";
}

// ====== utilidades ======

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ====== estado del juego ======
let firstCard = null;   // carta elegida en el lado izquierdo
let secondCard = null;  // carta elegida en el lado derecho
let isLocked = false;   // bloqueo durante animaciones

// ====== construcción de cartas ======

function handleCardClick(card) {
  if (isLocked) return;
  if (card.classList.contains('matched')) return; // ya acertada
  const side = card.dataset.side;

  // Si no hay aún primera carta, sólo aceptamos clics del lado izquierdo
  if (!firstCard) {
    if (side !== 'left') return;
    firstCard = card;
    card.classList.add('is-flipped');
    return;
  }

  // Ya hay primera carta, ahora sólo aceptamos del lado derecho
  if (!secondCard) {
    if (side !== 'right') return;
    // No dejar elegir la misma carta (por si acaso, aunque en lados distintos no pasa)
    secondCard = card;
    card.classList.add('is-flipped');

    // Ahora comprobamos si hacen pareja
    checkMatch();
  }
}

function checkMatch() {
  if (!firstCard || !secondCard) return;
  isLocked = true;

  const pairA = firstCard.dataset.pair;
  const pairB = secondCard.dataset.pair;
  const isMatch = pairA === pairB;

  if (isMatch) {
    // Correcto: se quedan giradas y bloqueadas
    setTimeout(() => {
      firstCard.classList.add('matched');
      secondCard.classList.add('matched');
      score = Math.min(score + 10, scoreMax);
      localStorage.setItem("cyberMemoryScore", score);
      console.log(localStorage.getItem("cyberMemoryScore"))
      updateProgress();
      checkLevelComplete();
      resetSelection();
    }, 500);
  } else {
    // Incorrecto: se giran de nuevo después de un momento
    setTimeout(() => {
      firstCard.classList.remove('is-flipped');
      secondCard.classList.remove('is-flipped');
      resetSelection();
    }, 800);
  }
}

function resetSelection() {
  firstCard = null;
  secondCard = null;
  isLocked = false;
}

function createCard(src, side, pairIndex) {
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.side = side;
  card.dataset.pair = String(pairIndex);

  const btn = document.createElement('button');
  btn.className = 'card-button';
  btn.type = 'button';

  const inner = document.createElement('div');
  inner.className = 'card-inner';

  const back = document.createElement('div');
  back.className = 'card-face card-face--back';

  const front = document.createElement('div');
  front.className = 'card-face card-face--front';

  if (src) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = '';
    front.appendChild(img);
  }

  inner.appendChild(back);
  inner.appendChild(front);
  btn.appendChild(inner);
  card.appendChild(btn);

  btn.addEventListener('click', () => handleCardClick(card));

  return card;
}

// Renderiza una columna (lado izquierdo o lado derecho)
function renderSide(rootId, images, side) {
  const root = document.getElementById(rootId);
  if (!root) return;

  // Creamos objetos con info de pareja
  const items = (images && images.length ? images : Array(9).fill(null))
    .map((src, index) => ({ src, pairIndex: index }));

  // Barajamos las cartas
  const shuffled = shuffle(items);

  root.innerHTML = '';
  shuffled.forEach(item => {
    root.appendChild(createCard(item.src, side, item.pairIndex));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Arrays definidos en nivel1.js (o en cada nivel correspondiente)
  const habitoImgs = typeof HABITO_IMAGES !== 'undefined' ? HABITO_IMAGES : [];
  const defImgs = typeof DEF_IMAGES !== 'undefined' ? DEF_IMAGES : [];

  // Render lateral izquierdo y derecho
  renderSide('grid-habito', habitoImgs, 'right');
  renderSide('grid-def', defImgs, 'left');
});

function checkLevelComplete() {

  const totalCards = document.querySelectorAll(".card").length;
  const matchedCards = document.querySelectorAll(".card.matched").length;

  if (matchedCards === totalCards) {

    setTimeout(() => {
       showLevelCompleteModal();
    }, 800);

  }
}
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
    window.location.href = "final.html";
  }
}

//función para mostrar los modales
function showLevelCompleteModal() {
  const currentPath = window.location.pathname;
  let currentLevel = "nivel1";

  if (currentPath.includes("nivel2")) currentLevel = "nivel2";
  else if (currentPath.includes("nivel3")) currentLevel = "nivel3";
  else if (currentPath.includes("nivel4")) currentLevel = "nivel4";

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