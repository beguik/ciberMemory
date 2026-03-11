// ========== DEFINICIÓN DE 6 PAREJAS PARA NIVEL 1 ==========
// Pon exactamente 6 nombres base (sin la letra inicial y sin extensión)
const CARD_BASE_NAMES = [
  "Boomer",
  "Crush",
  "Gamer",
  "Hype",
  "Photobombear",
  "Shippear"
];

// Carpeta donde están las imágenes de este nivel
const IMG_PATH = "../img/nivel2/";

// Creamos rutas automáticamente:
// izquierda → cxxxxx.jpg
// derecha   → dxxxxx.jpg
const HABITO_IMAGES = CARD_BASE_NAMES.map(name => IMG_PATH + "c" + name + ".png");
const DEF_IMAGES = CARD_BASE_NAMES.map(name => IMG_PATH + "d" + name + ".png");

document.addEventListener("DOMContentLoaded", () => {
  const btnNext = document.getElementById("btn-next");
  if (btnNext) {
    btnNext.addEventListener("click", () => {
      goToNextLevel();
    });
  }
});
