/* =========================================================
   CYBER MEMORY - DATOS DE NIVELES
   ========================================================= */

const DATOS_NIVELES = [
  {
    numero: 1,
    titulo: "Hábitos Digitales",
    descripcion: "¡Saludos! En este nivel descubrirás comportamientos comunes del uso diario del móvil y las redes. Algunos pasan desapercibidos, pero influyen en nuestra atención, en cómo nos comunicamos y en el tiempo que dedicamos a la tecnología. Tu misión será identificar estos hábitos digitales y reconocer cómo afectan a nuestra vida cotidiana.",
    intentosMaximos: 14,
    nombresCartas: ["Fomo", "Fail", "Phubbing", "Phonbie", "Oversharing", "Nomofobia"],
    mensajeFinal: {
      titulo: "¡Enhorabuena! Has completado el nivel 1",
      texto: "Has identificado varios hábitos digitales del día a día, como la necesidad de estar siempre conectado, ignorar a otras personas por mirar el móvil o compartir demasiada información en redes. Reconocer estos comportamientos es el primer paso para desarrollar un uso más consciente y equilibrado de la tecnología."
    }
  },
  {
    numero: 2,
    titulo: "Cultura Digital y Modas en Línea",
    descripcion: "¡Bienvenido al siguiente desafío! En este nivel explorarás algunos términos y expresiones que forman parte de la cultura digital actual. Muchas de estas palabras nacen en redes sociales, videojuegos o comunidades online y se utilizan para describir tendencias, bromas o formas de relacionarnos en internet. Tu misión será reconocer estos conceptos y entender cómo forman parte del lenguaje digital que usamos cada día.",
    intentosMaximos: 14,
    nombresCartas: ["Boomer", "Crush", "Gamer", "Hype", "Photobombear", "Shippear"],
    mensajeFinal: {
      titulo: "¡Nivel 2 completado!",
      texto: "Has descubierto algunos conceptos de la cultura digital y las modas en internet. Términos como crush, shippear o hype forman parte del lenguaje que utilizan muchas personas en redes, videojuegos y comunidades online. Comprender estas expresiones nos ayuda a entender mejor cómo se comunican y se relacionan las personas en el mundo digital. El mundo digital tiene muchas capas. Prepárate para el siguiente nivel."
    }
  },
  {
    numero: 3,
    titulo: "Incivismo en la Red",
    descripcion: "En internet no solo compartimos información y nos divertimos: también interactuamos con otras personas. En este nivel descubrirás algunas conductas molestas o poco respetuosas que pueden aparecer en redes sociales, chats o comunidades online. Aunque a veces parecen bromas o comportamientos sin importancia, pueden afectar a la convivencia digital. Tu misión será reconocer estas actitudes y aprender a identificarlas.",
    intentosMaximos: 14,
    nombresCartas: ["Denigration", "Flaming", "Ghosting", "Gossip", "Orbiting", "Vamping"],
    mensajeFinal: {
      titulo: "¡Reto superado!",
      texto: "Has identificado varias formas de incivismo en internet, como ignorar deliberadamente a alguien, difundir rumores o provocar discusiones en línea. Estos comportamientos pueden deteriorar la comunicación y el respeto entre personas. Detectarlos es clave para fomentar una convivencia digital más saludable."
    }
  },
  {
    numero: 4,
    titulo: "Manipulación y Engaño en la Red",
    descripcion: "En internet no todo es lo que parece. En este nivel descubrirás algunas conductas que utilizan la manipulación, el engaño o la burla para afectar a otras personas. A través de distintos conceptos aprenderás a identificar situaciones en las que se difunde información falsa, se provoca a otros usuarios o se ridiculiza a alguien en redes. Reconocer estas prácticas es importante para mantener un entorno digital más respetuoso.",
    intentosMaximos: 12,
    nombresCartas: ["Ciberbaiting", "Fake", "Fat-Shaming", "Gaslight", "Gendertrolling", "Sealioning"],
    nombresDefiniciones: ["Ciberbaiting", "Fake", "Fat-shaming", "Gaslight", "Gendertrolling", "Sealioning"],
    mensajeFinal: {
      titulo: "¡Desafío superado!",
      texto: "Has identificado distintas formas de manipulación y humillación en internet, como difundir contenido falso, provocar discusiones o burlarse de otras personas en línea. Detectar estas conductas nos ayuda a comprender mejor cómo pueden afectar a la convivencia digital y cómo actuar de forma responsable en la red."
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
      texto: "Has identificado distintos riesgos relacionados con la privacidad y la identidad digital, como la suplantación de identidad, el robo de datos o la manipulación de contenidos en internet. Reconocer estas situaciones es fundamental para proteger la información personal y navegar de forma más segura en el entorno digital."
    }
  },
  {
    numero: 6,
    titulo: "Acoso, control y amenazas psicológicas",
    descripcion: "En internet, las relaciones también pueden verse afectadas por comportamientos de control, intimidación o acoso. En este nivel descubrirás situaciones en las que una persona puede vigilar, presionar o amenazar a otra a través de medios digitales. A través de diferentes conceptos aprenderás a identificar conductas que generan miedo, incomodidad o pérdida de libertad en el entorno online. Comprender estas situaciones es fundamental para reconocer el acoso digital y fomentar relaciones más seguras y respetuosas en la red.",
    intentosMaximos: 12,
    nombresCartas: ["Ciberacoso", "Ciberbullying", "Stalking", "Ciberamenazas", "Cibercoacciones", "Ciberstalking"],
    mensajeFinal: {
      titulo: "¡Sigue así! Has completado el nivel 6",
      texto: "Has identificado distintas formas de acoso, control y amenazas en el entorno digital, como la vigilancia constante, la intimidación o la presión para actuar de una determinada manera. Estas conductas pueden afectar al bienestar emocional y a la libertad de las personas. Reconocerlas es fundamental para prevenir el acoso y fomentar relaciones más seguras y respetuosas en internet."
    }
  },
  {
    numero: 7,
    titulo: "Violencia y acoso sexual digital",
    descripcion: "En el entorno digital también pueden producirse situaciones que afectan a la intimidad y a la dignidad de las personas. En este nivel descubrirás conductas relacionadas con la violencia y el acoso sexual en internet. A través de diferentes conceptos aprenderás a reconocer prácticas que vulneran el consentimiento y el respeto hacia los demás. Comprender estos comportamientos es clave para proteger la intimidad, promover relaciones saludables y actuar con responsabilidad en el mundo digital.",
    intentosMaximos: 10,
    nombresCartas: ["Ciberacososexual", "Cyberflashing", "Downblousing", "Upskirting", "Slut-shaming", "Sexting"],
    mensajeFinal: {
      titulo: "¡Nivel 7 superado!",
      texto: "Has identificado diversas formas de violencia y acoso sexual en el entorno digital, como el envío de contenido no consentido o la difusión de imágenes íntimas. Estas prácticas vulneran la intimidad, el respeto y los derechos de las personas. Comprender estos comportamientos es clave para proteger la privacidad y promover relaciones basadas en el consentimiento y el respeto."
    }
  },
  {
    numero: 8,
    titulo: "Delitos graves y agresión directa",
    descripcion: "En internet existen conductas que van más allá del mal uso de las redes y pueden constituir delitos graves. En este nivel descubrirás situaciones en las que se producen engaños, extorsiones o agresiones que afectan directamente a otras personas. A través de diferentes conceptos aprenderás a identificar comportamientos que pueden tener consecuencias legales y causar un daño importante. Comprender estos riesgos es esencial para actuar con responsabilidad y contribuir a un entorno digital más seguro.",
    intentosMaximos: 10,
    nombresCartas: ["VirtualRape", "Sextorsion", "Pornovenganza", "Happyslapping", "Castfishing", "Grooming"],
    mensajeFinal: {
      titulo: "¡Enhorabuena! Has completado el juego",
      texto: "Has identificado situaciones relacionadas con delitos graves en internet, como el engaño, la extorsión o la difusión de contenido sin consentimiento. Estas conductas pueden causar un daño importante y tener consecuencias legales. Comprender estos riesgos es esencial para actuar con responsabilidad y contribuir a un entorno digital más seguro para todos."
    }
  }
];
