/* =========================================================
   CYBER MEMORY - DATOS DE NIVELES
   ========================================================= */

const DATOS_NIVELES = [
  {
    numero: 1,
    titulo: "Hábitos Digitales",
    descripcion: "¡Saludos! En este nivel descubrirás conceptos comunes del uso diario del móvil y las redes, y es que al final, pasamos mucho tiempo ya sea para comunicarnos, aprender, informarnos o entretenernos. Algunos pasan desapercibidos, pero influyen en nuestra atención, en cómo nos comunicamos y en el tiempo que dedicamos a la tecnología. Tu misión será identificar estos hábitos digitales y reconocer cómo afectan a nuestra vida cotidiana.",
    intentosMaximos: 14,
    nombresCartas: ["Fomo", "Fail", "Phubbing", "Phonbie", "Oversharing", "Nomofobia"],
    mensajeFinal: {
      titulo: "¡Enhorabuena! Has completado el nivel 1",
      texto: "Has identificado varios hábitos digitales del día a día, como la necesidad de estar siempre en línea, ignorar a otras personas por mirar el móvil o compartir demasiada información en redes. Reconocer estos comportamientos es el primer paso para desarrollar un uso más consciente y saludable de la tecnología."
    }
  },
  {
    numero: 2,
    titulo: "Lenguaje propio",
    descripcion: "Internet también tiene su propio lenguaje. Las redes sociales, los videojuegos y las comunidades digitales generan constantemente nuevas expresiones, tendencias y formas de comunicación. Tu misión será reconocer estos conceptos y entender cómo forman parte del lenguaje digital que usamos cada día.",
    intentosMaximos: 14,
    nombresCartas: ["Boomer", "Crush", "Gamer", "Hype", "Photobombear", "Shippear"],
    mensajeFinal: {
      titulo: "¡Nivel 2 completado!",
      texto: "Has descubierto diferentes expresiones y conceptos propios de la cultura digital. Términos como crush, shippear o hype forman parte del lenguaje que utilizan muchas personas en redes, videojuegos y comunidades online. Comprender estas expresiones nos ayuda a entender mejor cómo se comunican y se relacionan las personas en el mundo digital. El mundo digital tiene muchas capas. Prepárate para el siguiente nivel."
    }
  },
  {
    numero: 3,
    titulo: "Convivencia digital",
    descripcion: "En internet no solo compartimos información y nos divertimos: también interactuamos con otras personas. En este nivel descubrirás algunas conductas que existen en redes sociales, chats o comunidades, que pueden parecer bromas o comportamientos sin importancia, pero que afectan a la convivencia digital.  Tu misión será reconocer estas actitudes y aprender a identificarlas.",
    intentosMaximos: 14,
    nombresCartas: ["Denigration", "Flaming", "Ghosting", "Gossip", "Orbiting", "Vamping"],
    mensajeFinal: {
      titulo: "¡Reto superado!",
      texto: "Has identificado varias formas que afectan a la convivencia en internet, como ignorar deliberadamente a alguien, difundir rumores o provocar discusiones en línea. Estos comportamientos pueden deteriorar la comunicación y el respeto entre personas. Identificarlas es un paso importante para promover entornos digitales más seguros, respetuosos y participativos."
    }
  },
  {
    numero: 4,
    titulo: "Manipulación, desinformación y humillación.",
    descripcion: "En internet no todo es lo que parece. En ocasiones, los entornos digitales pueden utilizarse para difundir información falsa, manipular opiniones, ridiculizar a otras personas o generar conflictos de forma intencionada. En este nivel aprenderás a reconocer distintas estrategias de manipulación y humillación que circulan por la red, es importante que seas capaz analizar la información que consumes y compartes.",
    intentosMaximos: 12,
    nombresCartas: ["Ciberbaiting", "Fake", "Fat-Shaming", "Gaslight", "Gendertrolling", "Sealioning"],
    nombresDefiniciones: ["Ciberbaiting", "Fake", "Fat-shaming", "Gaslight", "Gendertrolling", "Sealioning"],
    mensajeFinal: {
      titulo: "¡Desafío superado!",
      texto: "Has identificado distintas formas de manipulación, desinformación y humillación en internet, como difundir contenido falso, provocar discusiones o burlarse de otras personas en línea. Detectar estas conductas nos ayuda a comprender mejor cómo pueden afectar a la convivencia digital y cómo actuar de forma responsable en la red."
    }
  },
  {
    numero: 5,
    titulo: "Privacidad e Identidad Digital",
    descripcion: "En internet, la información personal y la identidad digital son muy valiosas. En este nivel descubrirás algunos riesgos relacionados con la suplantación de identidad, la difusión de datos privados o la manipulación de imágenes y contenidos. A través de diferentes conceptos aprenderás a reconocer situaciones en las que alguien puede hacerse pasar por otra persona o utilizar información personal sin permiso. Comprender estos riesgos es clave para proteger nuestra privacidad en el mundo digital.",
    intentosMaximos: 12,
    nombresCartas: ["Deepfake", "Doxing", "Frapping", "Phishing", "Sharenting", "Spoofing"],
    mensajeFinal: {
      titulo: "¡Gran avance! Has superado el nivel 5",
      texto: "Has identificado distintos riesgos relacionados con la privacidad y la identidad digital, como la suplantación de identidad, el robo de datos o la manipulación de contenidos en internet. Reconocer estas situaciones es fundamental para proteger la información personal y navegar de forma más segura en el entorno digital. La seguridad digital comienza con la información y la prevención."
    }
  },
  {
    numero: 6,
    titulo: "Acoso, control y amenazas digitales",
    descripcion: "Las relaciones en internet también deben basarse en el respeto y la libertad. Sin embargo, algunas personas utilizan las tecnologías para controlar, vigilar, intimidar o presionar a otras. Estas conductas pueden afectar al bienestar emocional y limitar la autonomía de quienes las sufren. En este nivel aprenderás a identificar diferentes formas de acoso, control y amenazas que pueden producirse en los espacios digitales.",
    intentosMaximos: 12,
    nombresCartas: ["Ciberacoso", "Ciberbullying", "Stalking", "Ciberamenazas", "Cibercoacciones", "Ciberstalking"],
    mensajeFinal: {
      titulo: "¡Sigue así! Has completado el nivel 6",
      texto: "Has identificado distintas formas de acoso, control y amenazas en el entorno digital, como la vigilancia constante, la intimidación o la presión para actuar de una determinada manera. Estas conductas pueden afectar al bienestar emocional y a la libertad de las personas. Reconocerlas es fundamental para prevenir el acoso y fomentar relaciones más seguras y respetuosas en internet. . Toda persona tiene derecho a sentirse segura en los entornos digitales."
    }
  },
  {
    numero: 7,
    titulo: "Violencia y acoso sexual digital",
    descripcion: "Los derechos, la intimidad y el consentimiento también deben respetarse en internet. Las tecnologías digitales pueden ser utilizadas para vulnerar la privacidad, ejercer acoso sexual o difundir contenidos sin consentimiento. En este nivel descubrirás conductas relacionadas con la violencia y el acoso sexual en internet. Comprender estos comportamientos es clave para proteger la intimidad, promover relaciones saludables y actuar con responsabilidad en el mundo digital.",
    intentosMaximos: 10,
    nombresCartas: ["Ciberacososexual", "Cyberflashing", "Downblousing", "Upskirting", "Slut-shaming", "Sexting"],
    mensajeFinal: {
      titulo: "¡Nivel 7 superado!",
      texto: "Has identificado distintas formas de violencia y acoso sexual digital. Reconocer estas situaciones es esencial para proteger la intimidad, promover relaciones basadas en el consentimiento y contribuir a la prevención de las violencias machistas en los entornos digitales. El respeto y la igualdad también se construyen en la red."
    }
  },
  {
    numero: 8,
    titulo: "Delitos digitales y agresiones graves.",
    descripcion: "Algunas conductas que ocurren en internet no son simples conflictos o malas prácticas: pueden constituir delitos con graves consecuencias para las personas afectadas: el engaño, la extorsión, la difusión no consentida de contenidos o la manipulación con fines de abuso,… estos son ejemplos de situaciones que vulneran derechos y pueden causar daños importantes. En este nivel identificarás algunas de las formas más graves de violencia y delincuencia digital para comprender sus riesgos y prevenirlas.",
    intentosMaximos: 10,
    nombresCartas: ["VirtualRape", "Sextorsion", "Pornovenganza", "Happyslapping", "Castfishing", "Grooming"],
    mensajeFinal: {
      titulo: "¡Enhorabuena! Has completado el juego",
      texto: "A lo largo del juego has explorado conceptos relacionados con los hábitos digitales, la convivencia online, la privacidad, la seguridad y las diferentes formas de violencia que pueden producirse en internet. Conocer estos conceptos es un paso importante para construir una ciudadanía digital crítica, feminista, responsable y comprometida con los derechos humanos, la igualdad y el buen trato en los entornos digitales."
    }
  }
];
