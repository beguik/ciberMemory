/* =========================================================
   FINAL.JS
   Lógica de la pantalla final del juego:
   - Mostrar puntuación
   - Mostrar tiempo total
   - Generar mensaje según resultado
   - Botón volver a jugar
   ========================================================= */


/* =========================================================
   MENSAJE FINAL SEGÚN PUNTUACIÓN
   ========================================================= */
function getFinalMessage(score) {
  if (score === 480) {
    return {
      title: "🏆 Puntuación perfecta",
      text: "Has conseguido la máxima puntuación. Demuestras un gran conocimiento sobre los conceptos trabajados y una alta conciencia sobre las violencias digitales."
    };
  }

  if (score >= 400) {
    return {
      title: "🌟 Excelente resultado",
      text: "Conoces muy bien muchos conceptos relacionados con la convivencia digital, los riesgos en internet y las violencias digitales. Sigue aplicando ese conocimiento para crear entornos más seguros."
    };
  }

  if (score >= 300) {
    return {
      title: "👏 Buen trabajo",
      text: "Has reconocido bastantes conceptos importantes. Tienes una buena base para identificar riesgos y comportamientos dañinos en internet, aunque todavía puedes seguir aprendiendo."
    };
  }

  if (score >= 100) {
    return {
      title: "⚠️ Necesitas reforzar conceptos",
      text: "Has identificado algunos conceptos, pero conviene prestar más atención a estas formas de violencia digital. Muchas pueden aparecer en tu entorno cercano y reconocerlas ayuda a prevenirlas."
    };
  }

  return {
    title: "🚨 Toca seguir aprendiendo",
    text: "Tu puntuación indica que todavía necesitas familiarizarte mejor con estos conceptos. Reconocer las violencias digitales es importante para protegerte, ayudar a otras personas y actuar con responsabilidad en internet."
  };
}


/* =========================================================
   FORMATEO DE TIEMPO
   ========================================================= */
function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}


/* =========================================================
   INICIALIZACIÓN DE LA PANTALLA FINAL
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {

  /* ===== PUNTUACIÓN ===== */
  const score = Number(localStorage.getItem("cyberMemoryScore")) || 0;

  const scoreEl = document.getElementById("final-score");
  if (scoreEl) scoreEl.textContent = score;


  /* ===== TIEMPO ===== */
  const startTime = localStorage.getItem("gameStartTime");
  const timeEl = document.getElementById("final-time");

  if (startTime && timeEl) {
    const elapsed = Date.now() - Number(startTime);
    timeEl.textContent = formatTime(elapsed);
  }


  /* ===== MENSAJE FINAL PERSONALIZADO ===== */
  const result = getFinalMessage(score);

  const titleEl = document.getElementById("final-title");
  const messageEl = document.getElementById("final-message");

  if (titleEl) titleEl.textContent = result.title;
  if (messageEl) messageEl.textContent = result.text;


  /* ===== BOTÓN VOLVER A JUGAR ===== */
  const btnRestart = document.getElementById("btn-restart-final");

  if (btnRestart) {
    btnRestart.addEventListener("click", () => {
      localStorage.setItem("cyberMemoryScore", 0);
      localStorage.setItem("gameStartTime", Date.now());

      // Ajusta ruta según tu estructura
      window.location.href = "juego.html?nivel=1";
    });
  }

});