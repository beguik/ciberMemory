//comenzar
document.addEventListener("DOMContentLoaded", () => {
  let empezar= document.getElementById("btn-start");
  empezar.addEventListener("click", function(){
    window.location.href = "niveles/nivel1.html";
  })
});

//extraer puntuaciones

const scoreContainer = document.querySelector(".score");
const scoreMax = Number(scoreContainer.textContent.split("/")[1]);
let score = 0;


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
      updateProgress();
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
  const defImgs    = typeof DEF_IMAGES !== 'undefined' ? DEF_IMAGES    : [];

  // Render lateral izquierdo y derecho
  renderSide('grid-habito', habitoImgs, 'left');
  renderSide('grid-def', defImgs, 'right');
});
