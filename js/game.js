/* =========================================================
   CYBER MEMORY - GAME.JS
   ========================================================= */

/* =========================================================
CONTROL DE LA MÚSICA DEL INICIO
========================================================= */
const musicaMenu = document.getElementById("musicaMenu");
const btnAudio = document.getElementById("btn-audio");

let audioActivo = true;
if (musicaMenu) {
  musicaMenu.volume = 0.2;

  setTimeout(() => {
    musicaMenu.play()
      .then(() => {
        if (btnAudio) btnAudio.textContent = "🔊";
      })
      .catch(err => {
        console.log("Autoplay bloqueado en nivel:", err);
        if (btnAudio) btnAudio.textContent = "🔇";
      });
  }, 500);
}

if (btnAudio && musicaMenu) {

  btnAudio.addEventListener("click", () => {

    if (musicaMenu.paused) {
      musicaMenu.muted = false;
      musicaMenu.volume = 0.2;

      musicaMenu.play()
        .then(() => {
          audioActivo = true;
          btnAudio.textContent = "🔊";
        })
        .catch(err => {
          console.log("No se pudo reproducir:", err);
        });

    } else {
      musicaMenu.pause();
      audioActivo = false;
      btnAudio.textContent = "🔇";
    }

  });

}

/* =========================================================
   ESTADO GLOBAL DEL JUEGO
   ---------------------------------------------------------
   Estas variables guardan la situación de la partida actual.
   Se reinician cada vez que se carga un nivel.
   ========================================================= */

let nivelActual = 1;
let datosNivelActual = null;

let combinaciones = 0;
let combinacionesMaximas = 14;

let primeraCarta = null;
let segundaCarta = null;
let tableroBloqueado = false;

let intervaloTemporizador = null;

const PUNTUACION_MAXIMA = 480;
let puntuacion = Number(localStorage.getItem("cyberMemoryScore")) || 0;


/* =========================================================
   INICIALIZACIÓN
   ---------------------------------------------------------
   Al cargar la página se detecta si estamos en la portada o
   en juego.html. Así el mismo archivo sirve para ambas pantallas.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  configurarBotonInicioPortada();

  // Si no existe el tablero, estamos en la portada y no hace falta iniciar el juego.
  if (!document.getElementById("grid-def") || !document.getElementById("grid-habito")) {
    return;
  }

  iniciarPantallaJuego();
});


/* =========================================================
   PORTADA
   ========================================================= */

/**
 * Configura el botón "Empezar" de index.html.
 * Al comenzar una partida se reinician puntuación, tiempo y progreso.
 */
function configurarBotonInicioPortada() {
  const botonEmpezar = document.getElementById("btn-start");

  if (!botonEmpezar) return;

  botonEmpezar.addEventListener("click", () => {
    reiniciarDatosPartida();
    window.location.href = "juego.html?nivel=1";
  });
}

/**
 * Borra los datos de la partida anterior y deja preparado el nivel 1.
 */
function reiniciarDatosPartida() {
  localStorage.setItem("cyberMemoryScore", 0);
  localStorage.setItem("gameStartTime", Date.now());
  localStorage.setItem("cyberMemoryNivelDesbloqueado", 1);
  localStorage.setItem("cyberMemoryNivelActual", 1);
}


/* =========================================================
   CARGA DE NIVEL
   ========================================================= */

/**
 * Inicia juego.html:
 * - obtiene el nivel solicitado;
 * - valida que esté desbloqueado;
 * - carga textos, intentos y cartas;
 * - configura botones y temporizador.
 */
function iniciarPantallaJuego() {
  nivelActual = obtenerNivelSolicitado();
  nivelActual = validarNivelDesbloqueado(nivelActual);

  datosNivelActual = obtenerDatosNivel(nivelActual);

  if (!datosNivelActual) {
    window.location.href = "index.html";
    return;
  }

  combinaciones = 0;
  combinacionesMaximas = datosNivelActual.intentosMaximos;

  pintarInformacionNivel(datosNivelActual);
  pintarCartasNivel(datosNivelActual);

  configurarBotonesReinicio();
  configurarBotonesAvance();

  actualizarMarcador();
  actualizarCombinaciones();
  iniciarTemporizadorGlobal();
  actualizarTemporizadorGlobal();
}

/**
 * Lee el nivel desde la URL: juego.html?nivel=3.
 * Si no hay parámetro o es inválido, usa el nivel guardado o el nivel 1.
 */
function obtenerNivelSolicitado() {
  const parametros = new URLSearchParams(window.location.search);
  const nivelUrl = Number(parametros.get("nivel"));
  const nivelGuardado = Number(localStorage.getItem("cyberMemoryNivelActual")) || 1;

  if (Number.isInteger(nivelUrl) && nivelUrl >= 1) {
    return nivelUrl;
  }

  return nivelGuardado;
}

/**
 * Evita el acceso directo a niveles bloqueados escribiendo la URL.
 * No es un sistema anti-trampas imposible de romper, pero sí evita
 * la trampa básica de entrar directamente a juego.html?nivel=8.
 */
function validarNivelDesbloqueado(nivelSolicitado) {
  const nivelMaximo = DATOS_NIVELES.length;
  const nivelDesbloqueado = Number(localStorage.getItem("cyberMemoryNivelDesbloqueado")) || 1;

  let nivelValido = Math.min(Math.max(nivelSolicitado, 1), nivelMaximo);

  if (nivelValido > nivelDesbloqueado) {
    nivelValido = nivelDesbloqueado;
  }

  localStorage.setItem("cyberMemoryNivelActual", nivelValido);

  // Ajusta la URL visible sin recargar la página si alguien intentó manipularla.
  const urlCorrecta = `juego.html?nivel=${nivelValido}`;
  if (!window.location.href.endsWith(urlCorrecta)) {
    window.history.replaceState(null, "", urlCorrecta);
  }

  return nivelValido;
}

/**
 * Busca en DATOS_NIVELES la información correspondiente al nivel indicado.
 */
function obtenerDatosNivel(numeroNivel) {
  return DATOS_NIVELES.find(nivel => nivel.numero === numeroNivel);
}

/**
 * Pinta en la interfaz el número, título, descripción e intentos del nivel.
 */
function pintarInformacionNivel(nivel) {
  const numeroNivel = document.getElementById("numero-nivel");
  const tituloNivel = document.getElementById("titulo-nivel");
  const textoNivel = document.getElementById("texto-nivel");
  const intentosMaximos = document.getElementById("attempts-max");

  if (numeroNivel) numeroNivel.textContent = nivel.numero;
  if (tituloNivel) tituloNivel.textContent = nivel.titulo;
  if (textoNivel) textoNivel.textContent = nivel.descripcion;
  if (intentosMaximos) intentosMaximos.textContent = nivel.intentosMaximos;

  document.title = `Cyber Memory — Nivel ${nivel.numero}`;
}

/**
 * Genera las rutas de imágenes del nivel y renderiza las dos columnas.
 */
function pintarCartasNivel(nivel) {
  const rutaNivel = `./assets/img/nivel${nivel.numero}/`;

  const nombresConceptos = nivel.nombresConceptos || nivel.nombresCartas;
  const nombresDefiniciones = nivel.nombresDefiniciones || nivel.nombresCartas;

  const imagenesConceptos = nombresConceptos.map(nombre => `${rutaNivel}c${nombre}.png`);
  const imagenesDefiniciones = nombresDefiniciones.map(nombre => `${rutaNivel}d${nombre}.png`);

  renderizarColumna("grid-def", imagenesDefiniciones, "left");
  renderizarColumna("grid-habito", imagenesConceptos, "right");
}


/* =========================================================
   BOTONES
   ========================================================= */

/**
 * Configura los botones "Volver a empezar" de escritorio y móvil.
 */
function configurarBotonesReinicio() {
  document.querySelectorAll(".empezar").forEach(boton => {
    boton.addEventListener("click", () => {
      reiniciarDatosPartida();
      window.location.href = "juego.html?nivel=1";
    });
  });
}

/**
 * Configura los botones de avance manual.
 * Se mantienen porque existían en la versión original, aunque el avance
 * normal se produce desde el modal de nivel completado.
 */
function configurarBotonesAvance() {
  ["btn-next", "btn-next-movil"].forEach(id => {
    const boton = document.getElementById(id);
    if (!boton) return;

    boton.addEventListener("click", avanzarAlSiguienteNivel);
  });
}


/* =========================================================
   MARCADOR Y PROGRESO
   ========================================================= */

/**
 * Actualiza la puntuación numérica y la barra de progreso.
 */
function actualizarMarcador() {
  const barra = document.getElementById("bar");
  const puntuacionElemento = document.getElementById("score");

  if (puntuacionElemento) {
    puntuacionElemento.textContent = puntuacion;
  }

  if (barra) {
    const porcentaje = (puntuacion / PUNTUACION_MAXIMA) * 100;
    barra.style.width = porcentaje + "%";
  }
}

/**
 * Actualiza el contador visual de combinaciones realizadas.
 */
function actualizarCombinaciones() {
  const combinacionesElemento = document.getElementById("attempts");
  const combinacionesMaximasElemento = document.getElementById("attempts-max");

  if (combinacionesElemento) combinacionesElemento.textContent = combinaciones;
  if (combinacionesMaximasElemento) combinacionesMaximasElemento.textContent = combinacionesMaximasimasTextoSeguro();
}

/**
 * Devuelve el máximo de combinaciones en formato texto.
 * Se separa en una función pequeña para facilitar cambios futuros.
 */
function combinacionesMaximasimasTextoSeguro() {
  return String(combinacionesMaximas);
}


/* =========================================================
   TEMPORIZADOR GLOBAL
   ---------------------------------------------------------
   El tiempo se mantiene entre niveles usando localStorage.
   ========================================================= */

/**
 * Convierte milisegundos en formato MM:SS.
 */
function formatearTiempo(ms) {
  const segundosTotales = Math.floor(ms / 1000);
  const minutos = String(Math.floor(segundosTotales / 60)).padStart(2, "0");
  const segundos = String(segundosTotales % 60).padStart(2, "0");

  return `${minutos}:${segundos}`;
}

/**
 * Actualiza el reloj visible en pantalla.
 */
function actualizarTemporizadorGlobal() {
  const temporizador = document.getElementById("timer");
  if (!temporizador) return;

  const inicioPartida = localStorage.getItem("gameStartTime");
  if (!inicioPartida) return;

  const tiempoTranscurrido = Date.now() - Number(inicioPartida);
  temporizador.textContent = formatearTiempo(tiempoTranscurrido);
}

/**
 * Arranca el temporizador una sola vez por carga de página.
 */
function iniciarTemporizadorGlobal() {
  if (intervaloTemporizador) return;

  intervaloTemporizador = setInterval(actualizarTemporizadorGlobal, 1000);
}


/* =========================================================
   CHECKPOINTS Y DERROTA
   ---------------------------------------------------------
   Si el jugador agota las combinaciones, vuelve al último
   checkpoint y conserva solo la puntuación consolidada.
   ========================================================= */

/**
 * Calcula a qué nivel y puntuación debe volver el jugador.
 */
function obtenerCheckpoint(numeroNivel) {
  if (numeroNivel >= 6) {
    return { nivel: 6, puntuacion: 300 };
  }

  if (numeroNivel >= 3) {
    return { nivel: 3, puntuacion: 120 };
  }

  return { nivel: 1, puntuacion: 0 };
}

/**
 * Gestiona la derrota por agotar combinaciones.
 */
function gestionarDerrota() {
  const checkpoint = obtenerCheckpoint(nivelActual);
  const puntuacionGuardada = Number(localStorage.getItem("cyberMemoryScore")) || 0;

  // Se conserva el criterio original: al caer, la puntuación baja al máximo consolidado.
  puntuacion = Math.min(puntuacionGuardada, checkpoint.puntuacion);
  localStorage.setItem("cyberMemoryScore", puntuacion);

  actualizarMarcador();
  mostrarModalDerrota(checkpoint);
}

/**
 * Muestra un modal más visual que un alert para informar de la derrota.
 */
function mostrarModalDerrota(checkpoint) {
  const modal = document.getElementById("gameover-modal");
  const titulo = document.getElementById("gameover-title");
  const texto = document.getElementById("gameover-text");
  const boton = document.getElementById("gameover-btn");

  if (!modal || !titulo || !texto || !boton) {
    window.location.href = `juego.html?nivel=${checkpoint.nivel}`;
    return;
  }

  titulo.textContent = "💥 Combinaciones agotadas";
  texto.textContent = `Has superado el límite de combinaciones de este nivel. Volverás al último checkpoint con ${puntuacion} puntos consolidados.`;

  modal.classList.remove("hidden");

  boton.onclick = () => {
    modal.classList.add("hidden");
    localStorage.setItem("cyberMemoryNivelActual", checkpoint.nivel);
    window.location.href = `juego.html?nivel=${checkpoint.nivel}`;
  };
}


/* =========================================================
   UTILIDADES
   ========================================================= */

/**
 * Baraja un array usando el algoritmo Fisher-Yates.
 */
function barajar(lista) {
  const copia = [...lista];

  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }

  return copia;
}


/* =========================================================
   CREACIÓN Y RENDERIZADO DE CARTAS
   ========================================================= */

/**
 * Crea una carta del memory con su estructura HTML interna.
 *
 * Cada carta guarda:
 * - lado: left para definiciones y right para conceptos;
 * - pareja: índice que permite saber si concepto y definición coinciden.
 */
function crearCarta(rutaImagen, lado, indicePareja) {
  const carta = document.createElement("div");
  carta.className = "card";
  carta.dataset.side = lado;
  carta.dataset.pair = String(indicePareja);

  const boton = document.createElement("button");
  boton.className = "card-button";
  boton.type = "button";

  const interior = document.createElement("div");
  interior.className = "card-inner";

  const reverso = document.createElement("div");
  reverso.className = "card-face card-face--back";

  const frontal = document.createElement("div");
  frontal.className = "card-face card-face--front";

  if (rutaImagen) {
    const imagen = document.createElement("img");
    imagen.src = rutaImagen;
    imagen.alt = "";
    frontal.appendChild(imagen);
  }

  interior.appendChild(reverso);
  interior.appendChild(frontal);
  boton.appendChild(interior);
  carta.appendChild(boton);

  boton.addEventListener("click", () => gestionarClickCarta(carta));

  return carta;
}

/**
 * Renderiza una columna completa del tablero.
 */
function renderizarColumna(idContenedor, imagenes, lado) {
  const contenedor = document.getElementById(idContenedor);
  if (!contenedor) return;

  const cartas = imagenes.map((ruta, indice) => ({
    ruta,
    indicePareja: indice
  }));

  const cartasBarajadas = barajar(cartas);

  contenedor.innerHTML = "";

  cartasBarajadas.forEach(carta => {
    contenedor.appendChild(crearCarta(carta.ruta, lado, carta.indicePareja));
  });
}


/* =========================================================
   LÓGICA DEL MEMORY
   ========================================================= */

/**
 * Gestiona el clic en una carta.
 *
 * Regla actual del juego:
 * - primero se elige una definición;
 * - después se elige un concepto;
 * - no se pueden seleccionar cartas ya acertadas;
 * - se bloquean clics mientras se comprueba la pareja.
 */
function gestionarClickCarta(carta) {
  if (tableroBloqueado) return;
  if (carta.classList.contains("matched")) return;

  const lado = carta.dataset.side;

  if (!primeraCarta) {
    if (lado !== "left") return;

    primeraCarta = carta;
    carta.classList.add("is-flipped");
    return;
  }

  if (!segundaCarta) {
    if (lado !== "right") return;

    segundaCarta = carta;
    carta.classList.add("is-flipped");
    comprobarPareja();
  }
}

/**
 * Comprueba si las dos cartas seleccionadas forman pareja.
 * También consume una combinación y suma puntos si se acierta.
 */
function comprobarPareja() {
  if (!primeraCarta || !segundaCarta) return;

  tableroBloqueado = true;
  combinaciones++;
  actualizarCombinaciones();

  // Se mantiene la lógica de la versión original: al llegar al máximo, se pierde.
  if (combinaciones >= combinacionesMaximas) {
    setTimeout(gestionarDerrota, 400);
    return;
  }

  const parejaPrimera = primeraCarta.dataset.pair;
  const parejaSegunda = segundaCarta.dataset.pair;
  const esParejaCorrecta = parejaPrimera === parejaSegunda;

  if (esParejaCorrecta) {
    setTimeout(() => {
      primeraCarta.classList.add("matched");
      segundaCarta.classList.add("matched");

      puntuacion = Math.min(puntuacion + 10, PUNTUACION_MAXIMA);
      localStorage.setItem("cyberMemoryScore", puntuacion);

      actualizarMarcador();
      comprobarNivelCompletado();
      limpiarSeleccionCartas();
    }, 500);
  } else {
    setTimeout(() => {
      primeraCarta.classList.remove("is-flipped");
      segundaCarta.classList.remove("is-flipped");
      limpiarSeleccionCartas();
    }, 800);
  }
}

/**
 * Limpia la selección para permitir una nueva jugada.
 */
function limpiarSeleccionCartas() {
  primeraCarta = null;
  segundaCarta = null;
  tableroBloqueado = false;
}


/* =========================================================
   FINAL DE NIVEL
   ========================================================= */

/**
 * Comprueba si todas las cartas han sido emparejadas.
 */
function comprobarNivelCompletado() {
  const totalCartas = document.querySelectorAll(".card").length;
  const cartasAcertadas = document.querySelectorAll(".card.matched").length;

  if (cartasAcertadas === totalCartas) {
    desbloquearSiguienteNivel();

    setTimeout(() => {
      mostrarModalNivelCompletado();
    }, 800);
  }
}

/**
 * Guarda el siguiente nivel como desbloqueado.
 */
function desbloquearSiguienteNivel() {
  const nivelDesbloqueado = Number(localStorage.getItem("cyberMemoryNivelDesbloqueado")) || 1;
  const nuevoNivelDesbloqueado = Math.max(nivelDesbloqueado, nivelActual + 1);

  localStorage.setItem("cyberMemoryNivelDesbloqueado", nuevoNivelDesbloqueado);
}

/**
 * Muestra el modal educativo al completar un nivel.
 */
function mostrarModalNivelCompletado() {
  const modal = document.getElementById("level-modal");
  const titulo = document.getElementById("level-modal-title");
  const texto = document.getElementById("level-modal-text");
  const boton = document.getElementById("level-modal-btn");

  if (!modal || !titulo || !texto || !boton || !datosNivelActual) {
    avanzarAlSiguienteNivel();
    return;
  }

  titulo.textContent = datosNivelActual.mensajeFinal.titulo;
  texto.textContent = datosNivelActual.mensajeFinal.texto;
  modal.classList.remove("hidden");

  boton.onclick = () => {
    modal.classList.add("hidden");
    avanzarAlSiguienteNivel();
  };
}

/**
 * Avanza al siguiente nivel o muestra la pantalla final si ya terminó el nivel 8.
 */
function avanzarAlSiguienteNivel() {
  const ultimoNivel = DATOS_NIVELES.length;

  if (nivelActual >= ultimoNivel) {
    window.location.href = "final.html";
    return;
  }
  desbloquearSiguienteNivel();
  const siguienteNivel = nivelActual + 1;
  localStorage.setItem("cyberMemoryNivelActual", siguienteNivel);
  window.location.href = `juego.html?nivel=${siguienteNivel}`;
}
