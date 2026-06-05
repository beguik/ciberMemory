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
      text: "¡Impresionante! Has conseguido la máxima puntuación. Demuestras un excelente conocimiento de los conceptos trabajados y una gran capacidad para reconocer situaciones relacionadas con la convivencia digital, la privacidad y las violencias que podemos encontrarnos en internet. ¡Felicidades! ."
    };
  }

  if (score >= 400) {
    return {
      title: "🌟 Excelente resultado",
      text: "¡Muy buen trabajo! Conoces muy bien muchos conceptos relacionados con la convivencia digital, los riesgos en internet y las violencias digitales. Sigue aplicando ese conocimiento para crear entornos más seguros."
    };
  }

  if (score >= 300) {
    return {
      title: "👏 Buen trabajo",
      text: "Has reconocido gran parte de los conceptos del juego. Tienes una buena base para identificar riesgos y comportamientos dañinos en internet, aunque todavía puedes seguir mejorando. ¿Te apetece otra partida?"
    };
  }

  if (score >= 100) {
    return {
      title: "⚠️ Necesitas reforzar conceptos",
      text: "Has identificado algunos conceptos importantes, pero todavía hay cuestiones que merece la pena seguir descubriendo. Muchas pueden aparecer en tu entorno cercano y reconocerlas ayuda a prevenirla, ¡prueba de nuevo!."
    };
  }

  return {
    title: "🚨 Toca seguir aprendiendo",
    text: "Tu puntuación indica que todavía necesitas familiarizarte mejor con estos conceptos. No te preocupes: aprender a reconocer estas situaciones es el primer paso para navegar de forma más segura, ayudar a otras personas y actuar con responsabilidad en internet. ¡Confiamos en ti, prueba de nuevo!."
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