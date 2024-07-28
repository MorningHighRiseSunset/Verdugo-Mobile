// Check if the browser supports the Web Speech API
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US'; // Default to English

  const phoneticMap = {
      'a': 'A', 'ay': 'A', 'ah': 'A', 'alpha': 'A',
      'b': 'B', 'bee': 'B', 'bravo': 'B',
      'c': 'C', 'see': 'C', 'charlie': 'C',
      'd': 'D', 'dee': 'D', 'delta': 'D',
      'e': 'E', 'ee': 'E', 'echo': 'E',
      'f': 'F', 'ef': 'F', 'foxtrot': 'F',
      'g': 'G', 'gee': 'G', 'golf': 'G',
      'h': 'H', 'aitch': 'H', 'hotel': 'H',
      'i': 'I', 'eye': 'I', 'india': 'I',
      'j': 'J', 'jay': 'J', 'juliet': 'J',
      'k': 'K', 'kay': 'K', 'kilo': 'K',
      'l': 'L', 'el': 'L', 'lima': 'L',
      'm': 'M', 'em': 'M', 'mike': 'M',
      'n': 'N', 'en': 'N', 'november': 'N',
      'o': 'O', 'oh': 'O', 'oscar': 'O',
      'p': 'P', 'pee': 'P', 'papa': 'P',
      'q': 'Q', 'cue': 'Q', 'quebec': 'Q',
      'r': 'R', 'ar': 'R', 'romeo': 'R',
      's': 'S', 'es': 'S', 'sierra': 'S',
      't': 'T', 'tee': 'T', 'tango': 'T',
      'u': 'U', 'you': 'U', 'uniform': 'U',
      'v': 'V', 'vee': 'V', 'victor': 'V',
      'w': 'W', 'double-u': 'W', 'whiskey': 'W',
      'x': 'X', 'ex': 'X', 'x-ray': 'X',
      'y': 'Y', 'why': 'Y', 'yankee': 'Y',
      'z': 'Z', 'zee': 'Z', 'zulu': 'Z',
      'á': 'Á', 'é': 'É', 'í': 'Í', 'ó': 'Ó', 'ú': 'Ú', 'ñ': 'Ñ', 'ene': 'Ñ'
  };

  const spanishPhoneticMap = {
      'a': 'A', 'ah': 'A', 'á': 'Á', 'aa': 'A', 'aaa': 'A',
      'be': 'B', 'b': 'B', 'bay': 'B', 'beh': 'B', 'bee': 'B', 'bey': 'B',
      'ce': 'C', 'c': 'C', 'say': 'C', 'seh': 'C', 'see': 'C', 'cee': 'C',
      'che': 'CH', 'ch': 'CH', 'cheh': 'CH', 'chay': 'CH',
      'de': 'D', 'd': 'D', 'day': 'D', 'deh': 'D', 'dee': 'D', 'dah': 'D',
      'e': 'E', 'é': 'É', 'eh': 'E', 'ay': 'E', 'ee': 'E', 'ehh': 'E',
      'efe': 'F', 'f': 'F', 'effe': 'F', 'ef': 'F', 'eff': 'F',
      'ge': 'G', 'g': 'G', 'hey': 'G', 'geh': 'G', 'gee': 'G', 'guh': 'G',
      'hache': 'H', 'h': 'H', 'ahche': 'H', 'ache': 'H', 'hatch': 'H',
      'i': 'I', 'í': 'Í', 'ee': 'I', 'e': 'I', 'eye': 'I', 'aye': 'I',
      'jota': 'J', 'j': 'J', 'hotah': 'J', 'hoh': 'J', 'joh': 'J', 'jay': 'J',
      'ka': 'K', 'k': 'K', 'kah': 'K', 'kay': 'K', 'kaa': 'K',
      'ele': 'L', 'l': 'L', 'elle': 'L', 'el': 'L', 'ell': 'L', 'ellay': 'L',
      'elle': 'LL', 'll': 'LL', 'ehyeh': 'LL', 'elye': 'LL', 'yay': 'LL', 'yey': 'LL',
      'eme': 'M', 'm': 'M', 'emme': 'M', 'em': 'M', 'emm': 'M', 'meh': 'M',
      'ene': 'N', 'n': 'N', 'enne': 'N', 'en': 'N', 'enn': 'N', 'neh': 'N',
      'eñe': 'Ñ', 'ñ': 'Ñ', 'enye': 'Ñ', 'enyeh': 'Ñ', 'ny': 'Ñ', 'nyah': 'Ñ',
      'o': 'O', 'ó': 'Ó', 'oh': 'O', 'oo': 'O', 'owe': 'O', 'aw': 'O',
      'pe': 'P', 'p': 'P', 'pay': 'P', 'peh': 'P', 'pee': 'P', 'puh': 'P', 'p': 'P', 'papa': 'P',
      'cu': 'Q', 'q': 'Q', 'koo': 'Q', 'ku': 'Q', 'cue': 'Q', 'qu': 'Q',
      'erre': 'R', 'r': 'R', 'erreh': 'R', 'er': 'R', 'err': 'R', 'air': 'R',
      'ese': 'S', 's': 'S', 'esse': 'S', 'es': 'S', 'ess': 'S', 'seh': 'S',
      'te': 'T', 't': 'T', 'tay': 'T', 'teh': 'T', 'tee': 'T', 'tuh': 'T',
      'u': 'U', 'ú': 'Ú', 'oo': 'U', 'uh': 'U', 'you': 'U', 'yoo': 'U',
      'uve': 'V', 'v': 'V', 'vay': 'V', 'veh': 'V', 'vee': 'V', 'vuh': 'V',
      'doble ve': 'W', 'w': 'W', 'doble u': 'W', 'doble v': 'W', 'double ve': 'W', 'double u': 'W',
      'equis': 'X', 'x': 'X', 'ehkees': 'X', 'eks': 'X', 'ex': 'X', 'ecks': 'X',
      'i griega': 'Y', 'y': 'Y', 'yeh': 'Y', 'ee griega': 'Y', 'yay': 'Y', 'yuh': 'Y',
      'zeta': 'Z', 'z': 'Z', 'seta': 'Z', 'zeh': 'Z', 'zee': 'Z', 'zed': 'Z'
  };

  let options = {
    "Verdugo": [
        {
            word: "lágrima",
            definition: "Definition of tear: A hole or break caused by tearing. - (Un agujero o rotura causado por un desgarro.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "tear"
          },
          {
            word: "gratitud",
            definition: "Definition of gratitude: The state of being grateful. - (El estado de estar agradecido.)",
            pronunciation: "/ˈɡɹætɪt(j)ud/",
            englishEquivalent: "gratitude"
          },
          {
            word: "marino",
            definition: "Definition of Blue: The colour of the clear sky or the deep sea, between green and violet in the visible spectrum, and one of the primary additive colours for transmitted light; the colour obtained by subtracting red and green from white light using magenta and cyan filters; or any colour resembling this. - (El color del cielo claro o del mar profundo, entre el verde y el violeta en el espectro visible, y uno de los colores aditivos primarios para la luz transmitida; el color obtenido restando el rojo y el verde de la luz blanca utilizando filtros magenta y cian; o cualquier color que se parezca a este.)",
            pronunciation: "/bluː/",
            englishEquivalent: "Blue"
          },
          {
            word: "delincuentes",
            definition: "Definition of Criminals: A person who is guilty of a crime, notably breaking the law. - (Una persona que es culpable de un delito, en particular de infringir la ley.)",
            pronunciation: "/ˈkɹɪmɪnəlz/",
            englishEquivalent: "Criminals"
          },
          {
            word: "desolación",
            definition: "Definition of desolation: The act of desolating or laying waste; destruction of inhabitants; depopulation. - (El acto de desolación o devastación; destrucción de habitantes; despoblación.)",
            pronunciation: "/ˌdɛsəˈleɪʃən/",
            englishEquivalent: "desolation"
          },
          {
            word: "octarquía",
            definition: "Definition of octarchy: A group of eight states. - (Un grupo de ocho estados.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "octarchy"
          },
          {
            word: "aromatización",
            definition: "Definition of flavouring: To add flavoring to something. - (Para añadir sabor a algo.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "flavouring"
          },
          {
            word: "rapaz",
            definition: "Definition of predatory: Of, or relating to a predator. - (Perteneciente o relacionado con un depredador.)",
            pronunciation: "/ˈpɹedətəɹi/",
            englishEquivalent: "predatory"
          },
          {
            word: "ciegamente",
            definition: "Definition of blindly: In a blind manner; without sight; sightlessly. - (De manera ciega; sin vista; ciegos.)",
            pronunciation: "/ˈblaɪndli/",
            englishEquivalent: "blindly"
          },
          {
            word: "exageración",
            definition: "Definition of elevation: The act of raising from a lower place, condition, or quality to a higher; said of material things, persons, the mind, the voice, etc. - (El acto de elevarse de un lugar, condición o cualidad inferior a una más alta; dicho de las cosas materiales, las personas, la mente, la voz, etc.)",
            pronunciation: "/ˌɛlɪˈveɪʃən/",
            englishEquivalent: "elevation"
          },
          {
            word: "mujeres",
            definition: "Definition of women: An adult female human. - (Una mujer humana adulta.)",
            pronunciation: "/ˈwɪmən/",
            englishEquivalent: "women"
          },
          {
            word: "recaídas",
            definition: "Definition of Relapses: To fall back again; to slide or turn back into a former state or practice. - (Volver a caer; deslizarse o volver a un estado o práctica anterior.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "Relapses"
          },
          {
            word: "conformidad",
            definition: "Definition of accordance: Agreement; harmony; conformity; compliance. - (Acuerdo; armonía; conformidad; cumplimiento.)",
            pronunciation: "/ə.ˈkɔɹd.əns/",
            englishEquivalent: "accordance"
          },
          {
            word: "soborno",
            definition: "Definition of bribery: The making of illegal payment, or bribes, to persons in official positions as a means of influencing their decisions - (La realización de pagos ilegales, o sobornos, a personas en puestos oficiales como medio de influir en sus decisiones)",
            pronunciation: "/ˈbɹaɪbəɹi/",
            englishEquivalent: "bribery"
          },
          {
            word: "acumulado",
            definition: "Definition of accumulated: To heap up in a mass; to pile up; to collect or bring together (either literally or figuratively) - (Para amontonarse en una masa; para amontonarse; para recoger o reunir (ya sea literal o figurativamente))",
            pronunciation: "/əˈkjuːmjʊleɪtɪd/",
            englishEquivalent: "accumulated"
          },
          {
            word: "superando",
            definition: "Definition of Overcoming: To surmount (a physical or abstract obstacle); to prevail over, to get the better of. - (Superar (un obstáculo físico o abstracto); prevalecer sobre, sacar lo mejor de.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "Overcoming"
          },
          {
            word: "espeluznante",
            definition: "Definition of spooky: Eerie, or suggestive of ghosts or the supernatural. - (Extraño, o sugestivo de fantasmas o lo sobrenatural.)",
            pronunciation: "/spuːki/",
            englishEquivalent: "spooky"
          },
          {
            word: "mascones",
            definition: "Definition of mascons: A region within a solid astronomical body that is of higher density than the surrounding material. - (Una región dentro de un cuerpo astronómico sólido que es de mayor densidad que el material circundante.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "mascons"
          },
          {
            word: "ociosos",
            definition: "Definition of Loungers: One who lounges; an idler. - (Uno que descansa; un holgazán.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "Loungers"
          },
          {
            word: "frijoles",
            definition: "Definition of kidney beans: A variety of common bean, Phaseolus vulgaris, with a dark-red skin. - (Una variedad de frijol común, Phaseolus vulgaris, con una piel de color rojo oscuro.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "kidney beans"
          },
          {
            word: "carteles",
            definition: "Definition of posters: A picture of a celebrity, an event etc., intended to be attached to a wall. - (Una imagen de una celebridad, un evento, etc., destinada a ser pegada a una pared.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "posters"
          },
          {
            word: "encantador",
            definition: "Definition of lovely: An attractive, lovely person, especially a (professional) beauty. - (Una persona atractiva y encantadora, especialmente una belleza (profesional).)",
            pronunciation: "/ˈlʌvli/",
            englishEquivalent: "lovely"
          },
          {
            word: "carlingas",
            definition: "Definition of cockpits: The driver's compartment in a racing car (or, by extension, in a sports car or other automobile). - (El compartimento del conductor en un coche de carreras (o, por extensión, en un coche deportivo u otro automóvil).)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "cockpits"
          },
          {
            word: "asiduidad",
            definition: "Definition of assiduity: Great and persistent toil or effort. - (Gran y persistente trabajo o esfuerzo.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "assiduity"
          },
          {
            word: "Maltrato",
            definition: "Definition of Abuse: Improper treatment or usage; application to a wrong or bad purpose; an unjust, corrupt or wrongful practice or custom. - (Tratamiento o uso indebido; aplicación a un propósito incorrecto o malo; una práctica o costumbre injusta, corrupta o ilícita.)",
            pronunciation: "/əˈbjuːs/",
            englishEquivalent: "Abuse"
          },
          {
            word: "reapariciones",
            definition: "Definition of reappearances: The act of appearing again following absence - (El acto de comparecer de nuevo tras la ausencia)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "reappearances"
          },
          {
            word: "transpirado",
            definition: "Definition of transpired: To give off (vapour, waste matter etc.); to exhale (an odour etc.). - (Para desprender (vapor, materia de desecho, etc.); para exhalar (un olor, etc.).)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "transpired"
          },
          {
            word: "superposición",
            definition: "Definition of flash: A device that produces a short flash of light to help illuminate a scene, mostly for night-time or indoors photography. - (Un dispositivo que produce un breve destello de luz para ayudar a iluminar una escena, principalmente para la fotografía nocturna o en interiores.)",
            pronunciation: "/flæʃ/",
            englishEquivalent: "flash"
          },
          {
            word: "conquistado",
            definition: "Definition of conquered: To defeat in combat; to subjugate. - (Derrotar en combate; subyugar.)",
            pronunciation: "/ˈkɒŋkəd/",
            englishEquivalent: "conquered"
          },
          {
            word: "Reconocimiento",
            definition: "Definition of Acknowledgement: The act of acknowledging - (El acto de reconocer)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "Acknowledgement"
          },
          {
            word: "domiciliarios",
            definition: "Definition of Domiciliary: : A person who legally resides in a particular place. - (: Una persona que reside legalmente en un lugar en particular.)",
            pronunciation: "/ˌdɒmɪˈsɪli.əɹi/",
            englishEquivalent: "Domiciliary"
          },
          {
            word: "robo",
            definition: "Definition of Stealing: To take illegally, or without the owner's permission, something owned by someone else. - (Tomar ilegalmente, o sin el permiso del propietario, algo propiedad de otra persona.)",
            pronunciation: "/ˈstiːlɪŋ/",
            englishEquivalent: "Stealing"
          },
          {
            word: "etécnica",
            definition: "Definition of technical: A pickup truck with a gun mounted on it. - (Una camioneta con una pistola montada en ella.)",
            pronunciation: "/ˈtɛk.nɪk.əl/",
            englishEquivalent: "technical"
          },
          {
            word: "cofradías",
            definition: "Definition of Brotherhoods: The state of being brothers or a brother. - (El estado de ser hermanos o un hermano.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "Brotherhoods"
          },
          {
            word: "articulación",
            definition: "Definition of articulation: A joint or the collection of joints at which something is articulated, or hinged, for bending. - (Una junta o la colección de juntas en las que algo está articulado, o articulado, para doblarse.)",
            pronunciation: "/ɑːˌtɪk.jəˈleɪ.ʃən/",
            englishEquivalent: "articulation"
          },
          {
            word: "escolares",
            definition: "Definition of escolars: Lepidocybium flavobrunneum, one of the snake mackerels. - (Lepidocybium flavobrunneum, una de las caballas serpiente.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "escolars"
          },
          {
            word: "Empieza",
            definition: "Definition of Get started: To begin an activity - (Para comenzar una actividad)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "Get started"
          },
          {
            word: "solemnemente",
            definition: "Definition of solemnly: In a solemn manner. - (De manera solemne.)",
            pronunciation: "/ˈsɒləmli/",
            englishEquivalent: "solemnly"
          },
          {
            word: "espumada",
            definition: "Definition of foamed: To form or emit foam. - (Para formar o emitir espuma.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "foamed"
          },
          {
            word: "divisionistas",
            definition: "Definition of divisive: Having a quality that divides or separates - (Tener una cualidad que divide o separa)",
            pronunciation: "/dɪˈvɪsɪv/",
            englishEquivalent: "divisive"
          },
          {
            word: "pansexuales",
            definition: "Definition of pansexual: Someone who is attracted to all types of people regardless of gender. - (Alguien que se siente atraído por todo tipo de personas, independientemente de su género.)",
            pronunciation: "/pænˈsɛkʃuəl/",
            englishEquivalent: "pansexual"
          },
          {
            word: "injerto",
            definition: "Definition of graft: A small shoot or scion of a tree inserted in another tree, the stock of which is to support and nourish it. The two unite and become one tree, but the graft determines the kind of fruit. - (Un pequeño brote o vástago de un árbol insertado en otro árbol, cuyo tronco es para apoyarlo y nutrirlo. Los dos se unen y se convierten en un árbol, pero el injerto determina el tipo de fruta.)",
            pronunciation: "/ɡɹæft/",
            englishEquivalent: "graft"
          },
          {
            word: "personal",
            definition: "Definition of required: To ask (someone) for something; to request. - (Pedirle algo a (alguien); pedir.)",
            pronunciation: "/ɹɪˈkwaɪəd/",
            englishEquivalent: "required"
          },
          {
            word: "Reído",
            definition: "Definition of Laughed: To show mirth, satisfaction, or derision, by peculiar movement of the muscles of the face, particularly of the mouth, causing a lighting up of the face and eyes, and usually accompanied by the emission of explosive or chuckling sounds from the chest and throat; to indulge in laughter. - (Para mostrar alegría, satisfacción o burla, por el movimiento peculiar de los músculos de la cara, particularmente de la boca, causando una iluminación de la cara y los ojos, y generalmente acompañado por la emisión de sonidos explosivos o de risa desde el pecho y la garganta; para disfrutar de la risa.)",
            pronunciation: "/lɑːft/",
            englishEquivalent: "Laughed"
          },
          {
            word: "progresistas",
            definition: "Definition of Progressivism: A political ideology that favours progress towards better conditions in society. - (Una ideología política que favorece el progreso hacia mejores condiciones en la sociedad.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "Progressivism"
          },
          {
            word: "ortodox",
            definition: "Definition of orthodox: Conforming to the accepted, established, or traditional doctrines of a given faith, religion, or ideology. - (Conforme a las doctrinas aceptadas, establecidas o tradicionales de una fe, religión o ideología determinada.)",
            pronunciation: "/ˈɔːθədɒks/",
            englishEquivalent: "orthodox"
          },
          {
            word: "Fallo",
            definition: "Definition of Fail: Poor quality; substandard workmanship. - (Mala calidad; mano de obra deficiente.)",
            pronunciation: "/feɪl/",
            englishEquivalent: "Fail"
          },
          {
            word: "escoria",
            definition: "Definition of clinker: A very hard brick used for paving customarily made in the Netherlands. - (Un ladrillo muy duro utilizado para pavimentar hecho habitualmente en los Países Bajos.)",
            pronunciation: "/klɪŋkə/",
            englishEquivalent: "clinker"
          },
          {
            word: "ellipsoide",
            definition: "Definition of ellipsoid: A surface, all of whose cross sections are elliptic or circular (including the sphere), that generalises the ellipse and in Cartesian coordinates (x, y, z) is a quadric with equation x2/a2 + y2/b2 + z2/c2 = 0. - (Una superficie, todas cuyas secciones transversales son elípticas o circulares (incluida la esfera), que generaliza la elipse y en coordenadas cartesianas (x, y, z) es una cuádrica con la ecuación x2/a2 + y2/b2 + z2/c2 = 0.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "ellipsoid"
          },
          {
            word: "cronógrafos",
            definition: "Definition of chronographs: A chronogram. - (Un cronograma.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "chronographs"
          },
          {
            word: "hada",
            definition: "Definition of Fairy: The realm of faerie; enchantment, illusion. - (El reino de las hadas; encantamiento, ilusión.)",
            pronunciation: "/ˈfɛə̯ɹi/",
            englishEquivalent: "Fairy"
          },
          {
            word: "ficciones",
            definition: "Definition of Fictions: Literary type using invented or imaginative writing, instead of real facts, usually written as prose. - (Tipo literario que utiliza escritura inventada o imaginativa, en lugar de hechos reales, generalmente escritos en prosa.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "Fictions"
          },
          {
            word: "petrogénesis",
            definition: "Definition of petrogenesis: The branch of petrology dealing with the origin of igneous rocks. - (La rama de la petrología que se ocupa del origen de las rocas ígneas.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "petrogenesis"
          },
          {
            word: "mujer",
            definition: "Definition of women: An adult female human. - (Una mujer humana adulta.)",
            pronunciation: "/ˈwɪmən/",
            englishEquivalent: "women"
          },
          {
            word: "vigilantes",
            definition: "Definition of watchers: Someone who watches or observes. - (Alguien que mira u observa.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "watchers"
          },
          {
            word: "colosales",
            definition: "Definition of colossal: Extremely large or on a great scale. - (Extremadamente grande o a gran escala.)",
            pronunciation: "/kəˈlɒsəl/",
            englishEquivalent: "colossal"
          },
          {
            word: "subescalas",
            definition: "Definition of Subscales: A subdivision of a scale. - (Una subdivisión de una escala.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "Subscales"
          },
          {
            word: "automatismo",
            definition: "Definition of automatism: Acting automatically or involuntarily. - (Actuar de forma automática o involuntaria.)",
            pronunciation: "/ɔːˈtɒmətɪzəm/",
            englishEquivalent: "automatism"
          },
          {
            word: "glucanes",
            definition: "Definition of glucans: Any polysaccharide that is a polymer of glucose - (Cualquier polisacárido que sea un polímero de glucosa)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "glucans"
          },
          {
            word: "necesitado",
            definition: "Definition of needful: Ready money; wherewithal. - (Dinero listo; con qué medios.)",
            pronunciation: "/ˈniːdfəl/",
            englishEquivalent: "needful"
          },
          {
            word: "Cuarto",
            definition: "Definition of Fourth: (not used in the plural) The person or thing in the fourth position. - ((no se usa en plural) La persona o cosa en la cuarta posición.)",
            pronunciation: "/fɔːθ/",
            englishEquivalent: "Fourth"
          },
          {
            word: "alergistas",
            definition: "Definition of allergists: A doctor who specializes in the treatment of allergies. - (Médico especializado en el tratamiento de alergias.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "allergists"
          },
          {
            word: "anestesia",
            definition: "Definition of anaesthesia: An artificial method of preventing sensation, used to eliminate pain without causing loss of vital functions, by the administration of one or more agents which block pain impulses before transmitted to the brain. - (Un método artificial para prevenir la sensación, utilizado para eliminar el dolor sin causar pérdida de funciones vitales, mediante la administración de uno o más agentes que bloquean los impulsos de dolor antes de transmitirlos al cerebro.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "anaesthesia"
          },
          {
            word: "plegables",
            definition: "Definition of Accordions: A small, portable, keyed wind instrument, whose tones are generated by play of the wind from a squeezed bellows upon free metallic reeds. - (Un instrumento de viento pequeño, portátil y con teclas, cuyos tonos se generan por el juego del viento a partir de un fuelle apretado sobre lengüetas metálicas libres.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "Accordions"
          },
          {
            word: "superávit",
            definition: "Definition of surplus: That which remains when use or need is satisfied, or when a limit is reached; excess; overplus. - (Lo que queda cuando se satisface el uso o la necesidad, o cuando se alcanza un límite; exceso; sobreexceso.)",
            pronunciation: "/ˈsɜːpləs/",
            englishEquivalent: "surplus"
          },
          {
            word: "adductores",
            definition: "Definition of adductors: A muscle which draws a limb or part of the body toward the middle line of the body, or closes extended parts of the body; -- opposed to abductor - (Un músculo que atrae una extremidad o parte del cuerpo hacia la línea media del cuerpo, o cierra partes extendidas del cuerpo; -- opuesto al abductor)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "adductors"
          },
          {
            word: "mujer",
            definition: "Definition of women: An adult female human. - (Una mujer humana adulta.)",
            pronunciation: "/ˈwɪmən/",
            englishEquivalent: "women"
          },
          {
            word: "digresiones",
            definition: "Definition of Digression: An aside, an act of straying from the main subject in speech or writing. - (Un aparte, un acto de alejamiento del tema principal en el habla o la escritura.)",
            pronunciation: "/dɪˈɡɹɛʃən/",
            englishEquivalent: "Digression"
          },
          {
            word: "calumnias",
            definition: "Definition of Slander: A false or unsupported, malicious statement (spoken, not written), especially one which is injurious to a person's reputation; the making of such a statement. - (Una declaración falsa o no respaldada, maliciosa (hablada, no escrita), especialmente una que es perjudicial para la reputación de una persona; la realización de dicha declaración.)",
            pronunciation: "/ˈslændɚ/",
            englishEquivalent: "Slander"
          },
          {
            word: "estratagemas",
            definition: "Definition of stratagems: A tactic or artifice designed to gain the upper hand, especially one involving underhanded dealings or deception. - (Una táctica o artificio diseñado para ganar ventaja, especialmente uno que involucra tratos o engaños solapados.)",
            pronunciation: "/ˈstɹæt.ə.dʒəmz/",
            englishEquivalent: "stratagems"
          },
          {
            word: "resistente",
            definition: "Definition of resistant: A person who resists; especially a member of a resistance movement. - (Una persona que se resiste; especialmente un miembro de un movimiento de resistencia.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "resistant"
          },
          {
            word: "implosivo",
            definition: "Definition of Implosion: The inrush of air in forming a suction stop. - (La entrada de aire en la formación de un tope de succión.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "Implosion"
          },
          {
            word: "sucio",
            definition: "Definition of dirty: To make (something) dirty. - (Para ensuciar (algo).)",
            pronunciation: "/ˈdɜːti/",
            englishEquivalent: "dirty"
          },
          {
            word: "histriónico",
            definition: "Definition of Histrionic: Of or relating to actors or acting. - (Perteneciente o relativo a actores o actores.)",
            pronunciation: "/hɪstɹiːˈɒnɪk/",
            englishEquivalent: "Histrionic"
          },
          {
            word: "tranquilizado",
            definition: "Definition of relieved: To ease (a person, person's thoughts etc.) from mental distress; to stop (someone) feeling anxious or worried, to alleviate the distress of. - (Para aliviar (una persona, los pensamientos de la persona, etc.) de la angustia mental; para evitar que (alguien) se sienta ansioso o preocupado, para aliviar la angustia de.)",
            pronunciation: "/ɹɪˈliːvd/",
            englishEquivalent: "relieved"
          },
          {
            word: "Fecha-límite",
            definition: "Definition of Deadline: A time limit in the form of a date on or before which something must be completed. - (Un límite de tiempo en forma de una fecha en o antes de la cual se debe completar algo.)",
            pronunciation: "/ˈdɛdˌlaɪn/",
            englishEquivalent: "Deadline"
          },
          {
            word: "misericordia",
            definition: "Definition of mercy: Relenting; forbearance to cause or allow harm to another. - (Ceder; abstenerse de causar o permitir daño a otro.)",
            pronunciation: "/ˈmɜːsi/",
            englishEquivalent: "mercy"
          },
          {
            word: "inalterable",
            definition: "Definition of unalterable: Incapable of changing or being altered - (Incapaz de cambiar o ser alterado)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "unalterable"
          },
          {
            word: "destitución",
            definition: "Definition of dismissal: The act of sending someone away. - (El acto de enviar a alguien lejos.)",
            pronunciation: "/[dɪsˈmɪsəɫ]/",
            englishEquivalent: "dismissal"
          },
          {
            word: "entretejidos",
            definition: "Definition of interwoven: To combine through weaving. - (Para combinar a través del tejido.)",
            pronunciation: "/ˈɪntəɹwəʊvən/",
            englishEquivalent: "interwoven"
          },
          {
            word: "concursante",
            definition: "Definition of Contestant: A participant in a contest; specifically, a person who plays a game, as on a TV game show. - (Un participante en un concurso; específicamente, una persona que juega un juego, como en un programa de juegos de televisión.)",
            pronunciation: "/kənˈtɛstənt/",
            englishEquivalent: "Contestant"
          },
          {
            word: "saturnismo",
            definition: "Definition of lead poisoning: A chronic intoxication produced by the absorption of lead into the body, characterized by severe colicky pains, a dark line along the gums, and local muscular paralysis. - (Una intoxicación crónica producida por la absorción de plomo en el cuerpo, caracterizada por fuertes dolores cólicos, una línea oscura a lo largo de las encías y parálisis muscular local.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "lead poisoning"
          },
          {
            word: "druida",
            definition: "Definition of Druid: One of an order of priests among certain groups of Celts before the adoption of Abrahamic religions. - (Uno de una orden de sacerdotes entre ciertos grupos de celtas antes de la adopción de las religiones abrahámicas.)",
            pronunciation: "/ˈdɹuː.ɪd/",
            englishEquivalent: "Druid"
          },
          {
            word: "barbarie",
            definition: "Definition of Barbarian: A non-Greek or a non-Roman. - (Un no griego o un no romano.)",
            pronunciation: "/bɑː(ɹ).ˈbɛə.ɹi.ən/",
            englishEquivalent: "Barbarian"
          },
          {
            word: "velas",
            definition: "Definition of candles: A light source consisting of a wick embedded in a solid, flammable substance such as wax, tallow, or paraffin. - (Una fuente de luz que consiste en una mecha incrustada en una sustancia sólida inflamable como cera, sebo o parafina.)",
            pronunciation: "/ˈkændl̩z/",
            englishEquivalent: "candles"
          },
          {
            word: "monoplano",
            definition: "Definition of monoplane: An airplane that has a single pair of wings - (Un avión que tiene un solo par de alas)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "monoplane"
          },
          {
            word: "estivada",
            definition: "Definition of summery: Relating to the summer. - (En relación con el verano.)",
            pronunciation: "/ˈsʌməɹi/",
            englishEquivalent: "summery"
          },
          {
            word: "mielomas",
            definition: "Definition of myelomas: A malignant tumour arising from cells of the bone marrow, specifically plasma cells. - (Un tumor maligno que surge de las células de la médula ósea, específicamente de las células plasmáticas.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "myelomas"
          },
          {
            word: "Actualmente",
            definition: "Definition of Currently: At this moment, at present, now. - (En este momento, en el presente, ahora.)",
            pronunciation: "/ˈkʌɹəntli/",
            englishEquivalent: "Currently"
          },
          {
            word: "heterocíclica",
            definition: "Definition of heterocyclic: A heterocycle - (Un heterociclo)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "heterocyclic"
          },
          {
            word: "gramática",
            definition: "Definition of grammar: A system of rules and principles for speaking and writing a language. - (Un sistema de reglas y principios para hablar y escribir un idioma.)",
            pronunciation: "/ˈɡɹæm.ə(ɹ)/",
            englishEquivalent: "grammar"
          },
          {
            word: "Pates",
            definition: "Definition of PÂTÉS: A finely-ground paste of meat, fish or vegetables, sometimes with the addition of alcohol. - (Una pasta finamente molida de carne, pescado o verduras, a veces con la adición de alcohol.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "PÂTÉS"
          },
          {
            word: "impotencias",
            definition: "Definition of impotence: Powerlessness; incapacity. - (Impotencia; incapacidad.)",
            pronunciation: "/ˈɪmpətəns/",
            englishEquivalent: "impotence"
          },
          {
            word: "montañoso",
            definition: "Definition of mountainous: Having many mountains; characterized by mountains; of the nature of a mountain; rough (terrain); rocky. - (Tener muchas montañas; caracterizado por montañas; de la naturaleza de una montaña; áspero (terreno); rocoso.)",
            pronunciation: "/ˈmaʊntɪnəs/",
            englishEquivalent: "mountainous"
          },
          {
            word: "curvatura",
            definition: "Definition of crown: A royal, imperial or princely headdress; a diadem. - (Un tocado real, imperial o principesco; una diadema.)",
            pronunciation: "/kɹaʊn/",
            englishEquivalent: "crown"
          },
          {
            word: "sobornos",
            definition: "Definition of kickbacks: A backward kick, a retrograde movement of an extremity. - (Una patada hacia atrás, un movimiento retrógrado de una extremidad.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "kickbacks"
          },
          {
            word: "paratiroides",
            definition: "Definition of parathyroid: The parathyroid gland. - (La glándula paratiroides.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "parathyroid"
          },
          {
            word: "clandestino",
            definition: "Definition of clandestine: Done or kept in secret, sometimes to conceal an illicit or improper purpose. - (Hecho o mantenido en secreto, a veces para ocultar un propósito ilícito o inapropiado.)",
            pronunciation: "/klænˈdɛstɪn/",
            englishEquivalent: "clandestine"
          },
          {
            word: "cónyuge",
            definition: "Definition of spouse: A person in a marriage or marital relationship. - (Una persona en un matrimonio o relación matrimonial.)",
            pronunciation: "/spaʊs/",
            englishEquivalent: "spouse"
          },
          {
            word: "casados",
            definition: "Definition of Married: A married person. - (Casados)",
            pronunciation: "/ˈmæɹ.ɪd/",
            englishEquivalent: "Married"
          },
          {
            word: "preponderancias",
            definition: "Definition of preponderances: Excess or superiority of weight, influence, or power, etc.; an outweighing. - (Exceso o superioridad de peso, influencia o poder, etc.; un peso superior.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "preponderances"
          },
          {
            word: "fotogénica",
            definition: "Definition of photogenic: Generated or caused by light. - (Generado o causado por la luz.)",
            pronunciation: "/ˌfəʊ.təʊˈdʒɛn.ɪk/",
            englishEquivalent: "photogenic"
          },
          {
            word: "deformación",
            definition: "Definition of deflection: The act of deflecting or something deflected. - (El acto de desviar o algo desviado.)",
            pronunciation: "/dɪˈflɛkʃən/",
            englishEquivalent: "deflection"
          },
          {
            word: "Salvador",
            definition: "Definition of hosted: To perform the role of a host. - (Desempeñar el papel de anfitrión.)",
            pronunciation: "/ˈhəʊstɪd/",
            englishEquivalent: "hosted"
          },
          {
            word: "lácteos",
            definition: "Definition of products: A commodity offered for sale. - (Una mercancía ofrecida a la venta.)",
            pronunciation: "/ˈpɹɒd.əkts/",
            englishEquivalent: "products"
          },
          {
            word: "faraones",
            definition: "Definition of Pharaoh: The supreme ruler of Ancient Egypt; a formal address for the sovereign seat of power as personified by the 'king' in an institutional role of Horus son of Osiris; often used by metonymy for Ancient Egyptian sovereignty - (El gobernante supremo del Antiguo Egipto; un discurso formal para la sede soberana del poder personificado por el 'rey' en un papel institucional de Horus, hijo de Osiris; a menudo utilizado por la metonimia para la soberanía del Antiguo Egipto)",
            pronunciation: "/ˈfɛəɹəʊ/",
            englishEquivalent: "Pharaoh"
          },
          {
            word: "masacres",
            definition: "Definition of Massacres: The killing of a considerable number (usually limited to people) where little or no resistance can be made, with indiscriminate violence, without necessity, and contrary to civilized norms. - (El asesinato de un número considerable (generalmente limitado a personas) donde se puede hacer poca o ninguna resistencia, con violencia indiscriminada, sin necesidad y en contra de las normas civilizadas.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "Massacres"
          },
          {
            word: "venenoso",
            definition: "Definition of three-spined stickleback: Gasterosteus aculeatus, a small fish of coastal and inland waters of the Northern Hemisphere, that can make its spines erect when threatened, which makes it hard to swallow. - (Gasterosteus aculeatus, un pequeño pez de aguas costeras e interiores del hemisferio norte, que puede hacer que sus espinas se erijan cuando se ve amenazado, lo que dificulta su deglución.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "three-spined stickleback"
          },
          {
            word: "irritaciones",
            definition: "Definition of Irritations: The act of irritating or annoying - (El acto de irritar o molestar)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "Irritations"
          },
          {
            word: "acreditabilidad",
            definition: "Definition of credibility: Reputation impacting one's ability to be believed. - (Reputación que afecta la capacidad de creer.)",
            pronunciation: "/kɹɛd.ə.ˈbɪ.ɫɪ.ti/",
            englishEquivalent: "credibility"
          },
          {
            word: "ingenioso",
            definition: "Definition of Ingenious: Displaying genius or brilliance; tending to invent. - (Mostrar genio o brillantez; tender a inventar.)",
            pronunciation: "/ɪnˈdʒiːniəs/",
            englishEquivalent: "Ingenious"
          },
          {
            word: "inservible",
            definition: "Definition of Flooded: To overflow, as by water from excessive rainfall. - (Al desbordamiento, como por agua de precipitaciones excesivas.)",
            pronunciation: "/ˈflʌdɪd/",
            englishEquivalent: "Flooded"
          },
          {
            word: "hectáreas",
            definition: "Definition of hectares: A unit of surface area (symbol ha) equal to 100 ares (that is, 10,000 square metres, one hundredth of a square kilometre, or approximately 2.5 acres), used for measuring the areas of geographical features such as land and bodies of water. - (Una unidad de superficie (símbolo ha) igual a 100 áreas (es decir, 10.000 metros cuadrados, una centésima de kilómetro cuadrado, o aproximadamente 2,5 acres), utilizada para medir las áreas de características geográficas como tierras y cuerpos de agua.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "hectares"
          },
          {
            word: "intendentes",
            definition: "Definition of intendants: Administrator of an opera house or theater. - (Administrador de un teatro de ópera o teatro.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "intendants"
          },
          {
            word: "congeladores",
            definition: "Definition of freezers: An appliance or room used to store food or other perishable items at temperatures below 0° Celsius (32° Fahrenheit). - (Un electrodoméstico o habitación utilizada para almacenar alimentos u otros artículos perecederos a temperaturas inferiores a 0° Celsius (32° Fahrenheit).)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "freezers"
          },
          {
            word: "cucharadas",
            definition: "Definition of tablespoons: A large spoon, used for eating food from a bowl. - (Una cuchara grande, utilizada para comer alimentos de un tazón.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "tablespoons"
          },
          {
            word: "prorrateo",
            definition: "Definition of Apportionment: The act of apportioning or the state of being apportioned. - (El acto de prorratear o el estado de ser prorrateado.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "Apportionment"
          },
          {
            word: "terroríficamente",
            definition: "Definition of terrifyingly: In a terrifying manner. - (De una manera aterradora.)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "terrifyingly"
          },
          {
            word: "retroactivo",
            definition: "Definition of retroactive: Extending in scope, effect, application or influence to a prior time or to prior conditions - (Extensión en alcance, efecto, aplicación o influencia a un tiempo previo o a condiciones previas)",
            pronunciation: "/ˌɹɛt.ɹəʊˈæk.tɪv/",
            englishEquivalent: "retroactive"
          },
          {
            word: "anelástico",
            definition: "Definition of inelastic: Lacking elasticity; inflexible, unyielding - (Falta de elasticidad; inflexible, inflexible)",
            pronunciation: "/ˌɪnəˈlæstɪk/",
            englishEquivalent: "inelastic"
          },
          {
            word: "astuto",
            definition: "Definition of wily: Sly, cunning, full of tricks - (Astuto, astuto, lleno de trucos)",
            pronunciation: "/waɪ.li/",
            englishEquivalent: "wily"
          },
          {
            word: "cuantificable",
            definition: "Definition of Measurable: That which can be measured; a metric. - (Lo que se puede medir; una métrica.)",
            pronunciation: "/ˈmɛʒəɹəbəl/",
            englishEquivalent: "Measurable"
          },
          {
            word: "alcaloides",
            definition: "Definition of Alkaloid: Any of many organic heterocyclic bases that occur in nature and often have medicinal properties. - (Cualquiera de las muchas bases heterocíclicas orgánicas que se producen en la naturaleza y que a menudo tienen propiedades medicinales.)",
            pronunciation: "/ˈæl.kə.lɔɪd/",
            englishEquivalent: "Alkaloid"
          },
          {
            word: "evacuados",
            definition: "Definition of evacuees: A person who has been evacuated, especially a civilian evacuated from a dangerous place in time of war - (Una persona que ha sido evacuada, especialmente un civil evacuado de un lugar peligroso en tiempo de guerra)",
            pronunciation: "/No pronunciation available/",
            englishEquivalent: "evacuees"
          },
          {
            word: "rebaño",
            definition: "Definition of flock: A large number of birds, especially those gathered together for the purpose of migration. - (Un gran número de aves, especialmente las reunidas con fines de migración.)",
            pronunciation: "/flɒk/",
            englishEquivalent: "flock"
          },
          {
            word: "confesor",
            definition: "Definition of confessor: One who confesses faith in Christianity in the face of persecution, but who is not martyred. - (Uno que confiesa la fe en el cristianismo frente a la persecución, pero que no es martirizado.)",
            pronunciation: "/kənˈfɛsə/",
            englishEquivalent: "confessor"
          },
          
    ],
};

  let selectedWord = '';
  let guessedLetters = [];
  let wrongGuesses = 0;
  const maxWrongGuesses = 6;
  let animationFrameId;

  function createKeyboard() {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÁÉÍÓÚÑ'.split('');
      const letterContainer = document.getElementById('letter-container');
      letterContainer.innerHTML = ''; // Clear previous keyboard

      // Add hyphen button if the selected word contains a hyphen
      if (selectedWord.includes('-')) {
          const hyphenButton = document.createElement('button');
          hyphenButton.innerText = '-';
          hyphenButton.classList.add('letter-button', 'hyphen-button', 'flashing-slow');
          hyphenButton.onclick = () => {
              handleGuess('-');
              hyphenButton.classList.add('guessed');
              setTimeout(() => {
                  hyphenButton.classList.remove('guessed');
                  hyphenButton.style.display = 'none'; // Hide the hyphen button
              }, 500); // Light blue briefly
          };
          letterContainer.appendChild(hyphenButton);
      }

      letters.forEach(letter => {
          const button = document.createElement('button');
          button.innerText = letter;
          button.classList.add('letter-button');
          button.onclick = () => {
              handleGuess(letter);
              button.classList.add('guessed');
              setTimeout(() => {
                  button.classList.remove('guessed');
              }, 500); // Light blue briefly
          };
          letterContainer.appendChild(button);
      });

      // Create the log container for correct and incorrect words
      const logContainer = document.getElementById('log-container');
      if (!logContainer) {
          const newLogContainer = document.createElement('div');
          newLogContainer.id = 'log-container';
          newLogContainer.style.marginTop = '20px';
          letterContainer.parentNode.appendChild(newLogContainer);
      }
  }

  function handleGuess(letter) {
      if (!guessedLetters.includes(letter)) {
          if (selectedWord.includes(letter)) {
              guessedLetters.push(letter);
          } else {
              wrongGuesses++;
              if (wrongGuesses === maxWrongGuesses) {
                  animateHangman();
              }
          }
          updateWordDisplay();
          drawHangman();
          checkGameStatus();
      }
  }

  function logWordResult(word, definition, isCorrect) {
      const logContainer = document.getElementById('log-container');
      const logEntry = document.createElement('div');
      logEntry.innerHTML = `<strong>${word}</strong>: ${definition}`;
      logEntry.style.color = isCorrect ? 'green' : 'red';
      logContainer.appendChild(logEntry);
  }

  function showTemporaryPopup(message, isCorrect) {
      const popup = document.createElement('div');
      popup.innerText = message;
      popup.style.position = 'fixed';
      popup.style.top = '50%';
      popup.style.left = '50%';
      popup.style.transform = 'translate(-50%, -50%)';
      popup.style.padding = '20px';
      popup.style.backgroundColor = isCorrect ? 'green' : 'red';
      popup.style.color = 'white';
      popup.style.borderRadius = '5px';
      document.body.appendChild(popup);

      setTimeout(() => {
          document.body.removeChild(popup);
      }, 2000);
  }

  const winSounds = ['correct-6033.mp3', 'sound-effect-twinklesparkle-115095.mp3']; // Add paths to win sound files
  const loseSounds = ['fail-144746.mp3', 'no-luck-too-bad-disappointing-sound-effect-112943.mp3', '050612_wild-west-1-36194.mp3']; // Add paths to lose sound files

  function playRandomSound(sounds) {
      const randomIndex = Math.floor(Math.random() * sounds.length);
      const audio = new Audio(sounds[randomIndex]);
      audio.play();
  }

  
  function speakText(text, lang) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang; // Set the language for the utterance
    window.speechSynthesis.speak(utterance);
}

function checkGameStatus() {
    if (selectedWord && wrongGuesses >= maxWrongGuesses) {
        cancelAnimationFrame(animationFrameId);
        showTemporaryPopup('Game Over! The word was: ' + selectedWord, false);
        logWordResult(selectedWord, getWordDefinition(selectedWord), false);
        playRandomSound(loseSounds); // Play a random lose sound
        resetGame();
    } else if (selectedWord && selectedWord.split('').every(letter => guessedLetters.includes(letter))) {
        cancelAnimationFrame(animationFrameId);
        showTemporaryPopup('Congratulations! You guessed the word: ' + selectedWord, true);
        logWordResult(selectedWord, getWordDefinition(selectedWord), true);
        playRandomSound(winSounds); // Play a random win sound

        // Get the English equivalent of the word
        const englishEquivalent = getEnglishEquivalent(selectedWord);

        // Speak the word in Spanish and then in English
        const spanishWordText = `La palabra es: ${selectedWord}`;
        const englishWordText = `The word is: ${englishEquivalent}`;
        speakText(spanishWordText, 'es-ES');
        speakText(englishWordText, 'en-US');

        // Show the repeat button
        const repeatButton = document.getElementById('repeat-btn');
        repeatButton.classList.remove('hide');
        repeatButton.onclick = () => {
            speakText(spanishWordText, 'es-ES');
            speakText(englishWordText, 'en-US');
        };

        resetGame();
    }
}

function getEnglishEquivalent(word) {
    for (const mode in options) {
        for (const wordObj of options[mode]) {
            if (wordObj.word.toUpperCase() === word) {
                return wordObj.englishEquivalent;
            }
        }
    }
    return word;
}


  function getWordDefinition(word) {
      for (const mode in options) {
          for (const wordObj of options[mode]) {
              if (wordObj.word.toUpperCase() === word) {
                  return wordObj.definition;
              }
          }
      }
      return '';
  }

  function resetGame() {
      selectedWord = '';
      guessedLetters = [];
      wrongGuesses = 0;
      updateWordDisplay();
      drawHangman();
      displayOptions(); // Show options again for a new game
  }

  function displayOptions() {
      const optionsContainer = document.getElementById('options-container');
      optionsContainer.innerHTML = ''; // Clear previous options
      for (const mode in options) {
          const button = document.createElement('button');
          button.innerText = mode;
          button.classList.add('option-button');
          button.onclick = () => {
              const wordObj = options[mode][Math.floor(Math.random() * options[mode].length)];
              selectedWord = wordObj.word.toUpperCase();
              guessedLetters = [];
              wrongGuesses = 0;
              updateWordDisplay();
              drawHangman();
              createKeyboard();
              optionsContainer.innerHTML = ''; // Clear options after selection

              // Switch recognition language based on category
              if (mode === 'Verdugo') {
                  recognition.lang = 'es-ES';
              } else {
                  recognition.lang = 'en-US';
              }
          };
          optionsContainer.appendChild(button);
      }
  }

  function updateWordDisplay() {
      const wordDisplay = document.getElementById('word-display');
      wordDisplay.innerText = selectedWord.split('').map(letter => (guessedLetters.includes(letter) ? letter : '_')).join(' ');
  }

  function drawHangman() {
      const canvas = document.getElementById('hangman-canvas');
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the base, pole, and beam
      context.beginPath();
      context.moveTo(10, 140);
      context.lineTo(190, 140);
      context.moveTo(30, 140);
      context.lineTo(30, 10);
      context.lineTo(110, 10);
      context.lineTo(110, 20);
      context.stroke();

      // Draw the hanging man parts based on the number of wrong guesses
      if (wrongGuesses > 0) {
          // Draw head
          context.beginPath();
          context.arc(110, 30, 10, 0, Math.PI * 2);
          context.stroke();
      }
      if (wrongGuesses > 1) {
          // Draw body
          context.beginPath();
          context.moveTo(110, 40);
          context.lineTo(110, 90);
          context.stroke();
      }
      if (wrongGuesses > 2) {
          // Draw left arm
          context.beginPath();
          context.moveTo(110, 50);
          context.lineTo(90, 70);
          context.stroke();
      }
      if (wrongGuesses > 3) {
          // Draw right arm
          context.beginPath();
          context.moveTo(110, 50);
          context.lineTo(130, 70);
          context.stroke();
      }
      if (wrongGuesses > 4) {
          // Draw left leg
          context.beginPath();
          context.moveTo(110, 90);
          context.lineTo(90, 110);
          context.stroke();
      }
      if (wrongGuesses > 5) {
          // Draw right leg
          context.beginPath();
          context.moveTo(110, 90);
          context.lineTo(130, 110);
          context.stroke();
      }
  }

  function animateHangman() {
      const canvas = document.getElementById('hangman-canvas');
      const context = canvas.getContext('2d');
      let shakeCount = 0;
      const maxShakes = 10;
      const shake = () => {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.save();
          context.translate(Math.random() * 5, Math.random() * 5);
          drawHangman();
          context.restore();
          shakeCount++;
          if (shakeCount < maxShakes) {
              requestAnimationFrame(shake);
          } else {
              strugglingAnimation();
          }
      };
      shake();
  }

  function strugglingAnimation() {
      const canvas = document.getElementById('hangman-canvas');
      const context = canvas.getContext('2d');
      let frame = 0;
      const maxFrames = 20;
      const animate = () => {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.save();
          context.translate(Math.sin(frame / 10) * 5, 0); // Slow horizontal movement
          drawHangman();
          context.restore();
          frame++;
          if (frame < maxFrames) {
              requestAnimationFrame(animate);
          }
      };
      animate();
  }

  recognition.onstart = function() {
      console.log('Speech recognition started');
      document.getElementById('status').innerText = 'Listening...';
      document.getElementById('start-btn').disabled = true;
      document.getElementById('stop-btn').disabled = false;
  };

  recognition.onresult = function(event) {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
          let transcript = event.results[i][0].transcript.trim().toLowerCase();
          console.log(`Recognized: ${transcript}`); // Log the recognized speech

          // Check if the transcript is a single letter or a phonetic equivalent
          if (transcript.length === 1 || phoneticMap[transcript] || spanishPhoneticMap[transcript]) {
              transcript = phoneticMap[transcript] || spanishPhoneticMap[transcript] || transcript.toUpperCase();
          } else {
              continue; // Skip non-letter inputs
          }

          if (event.results[i].isFinal) {
              finalTranscript += transcript;
          } else {
              interimTranscript += transcript;
          }
      }

      // Display the results
      document.getElementById('result').innerHTML = finalTranscript + '<i style="color:#999;">' + interimTranscript + '</i>';

      // Process the final transcript for the Hangman game
      if (finalTranscript) {
          const guessedLetter = finalTranscript.toUpperCase();
          handleGuess(guessedLetter);
      }

      // Suggest the letter
      if (interimTranscript) {
          suggestLetter(interimTranscript);
      }
  };

  function suggestLetter(interimTranscript) {
      const suggestion = phoneticMap[interimTranscript] || spanishPhoneticMap[interimTranscript] || null;
      const letterButtons = document.querySelectorAll('.letter-button');
      const resultElement = document.getElementById('result');

      if (suggestion) {
          resultElement.innerHTML = `Did you mean: <span style="color: lightgreen;">${suggestion}</span>? <button id="yes-btn">Yes</button> <button id="no-btn">No</button>`;

          document.getElementById('yes-btn').onclick = () => {
              letterButtons.forEach(button => {
                  if (button.innerText === suggestion) {
                      button.style.backgroundColor = 'lightgreen';
                      setTimeout(() => {
                          button.style.backgroundColor = '';
                          button.click(); // Simulate a click on the suggested button
                      }, 500); // Highlight the suggestion for 500ms
                  }
              });
              handleGuess(suggestion); // Ensure the guessed letter is processed
              resultElement.innerHTML = ''; // Clear the suggestion after confirmation
          };

          document.getElementById('no-btn').onclick = () => {
              resultElement.innerHTML = '';
          };
      } else {
          // If no valid suggestion, show what was said and ask for confirmation
          resultElement.innerHTML = `Did you mean: <span style="color: lightgreen;">${interimTranscript.toUpperCase()}</span>?`;
      }
  }

  recognition.onerror = function(event) {
      if (event.error === 'no-speech') {
          console.error('No speech was detected. Please try again.');
          alert('No speech was detected. Please try again.');
      } else if (event.error === 'network') {
          console.error('Network error occurred. Please check your internet connection.');
          alert('Network error occurred. Please check your internet connection.');
      } else if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          console.error('Microphone access was denied. Please allow microphone access.');
          alert('Microphone access was denied. Please allow microphone access.');
      } else {
          console.error('Speech recognition error', event);
      }
  };

  recognition.onend = function() {
      console.log('Speech recognition ended');
      document.getElementById('status').innerText = '';
      document.getElementById('start-btn').disabled = false;
      document.getElementById('stop-btn').disabled = true;
  };

  // Add this global variable
let audioStream = null; // Store the audio stream globally

// Modify the start button click handler
document.getElementById('start-btn').onclick = function() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        audioStream = stream; // Store the audio stream globally
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaStreamSource(stream);
        const gainNode = audioContext.createGain();
        gainNode.gain.value = 2; // Increase volume
        source.connect(gainNode).connect(audioContext.destination);
        recognition.start();
    }).catch(error => {
        console.error('Error accessing microphone:', error);
        alert('Error accessing microphone. Please check your microphone settings.');
    });
};

// Modify the stop button click handler
document.getElementById('stop-btn').onclick = function() {
    recognition.stop();
    if (audioStream) {
        audioStream.getTracks().forEach(track => track.stop()); // Stop all tracks of the audio stream
        audioStream = null; // Clear the audio stream
    }
};

  // Initialize the game
  displayOptions(); // Show options at the start

  // Add event listener for Ctrl + Q to auto-finish the word
  document.addEventListener('keydown', function(event) {
      if (event.ctrlKey && event.key === 'q') {
          autoFinishWord();
      }
  });

  function autoFinishWord() {
      selectedWord.split('').forEach(letter => {
          if (!guessedLetters.includes(letter)) {
              guessedLetters.push(letter);
          }
      });
      updateWordDisplay();
      checkGameStatus();
  }
} else {
  console.error('Web Speech API is not supported in this browser.');
  alert('Web Speech API is not supported in this browser. Please use a supported browser.');
}

document.addEventListener('DOMContentLoaded', () => {
  const instructionsPopup = document.getElementById('instructions-popup');
  const closePopup = document.getElementById('close-popup');
  const instructionsButton = document.getElementById('instructions-button');

  // Open the instructions popup
  instructionsButton.addEventListener('click', () => {
      instructionsPopup.classList.remove('hide');
  });

  // Close the instructions popup
  closePopup.addEventListener('click', () => {
      instructionsPopup.classList.add('hide');
  });

  // Close the popup when clicking outside of it
  window.addEventListener('click', (event) => {
      if (event.target === instructionsPopup) {
          instructionsPopup.classList.add('hide');
      }
  });

  // Set the background GIF
  document.body.style.backgroundImage = "url('https://64.media.tumblr.com/43891cae5450425ccd1f06c610b731b3/27bd7103dd700c5a-8e/s500x750/5d2563ae1f3a14bf6864b088a06c17b46c205e86.gif')";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundPosition = "center 20%"; // Shift down by 20%
  document.body.style.backgroundAttachment = "fixed";
});

const style = document.createElement('style');
style.innerHTML = `
.flashing {
  animation: flash 1s infinite;
}

.flashing-slow {
  animation: flash-slow 2s infinite;
}

@keyframes flash {
  0%, 100% { background-color: lightblue; }
  50% { background-color: white; }
}

@keyframes flash-slow {
  0%, 100% { background-color: lightblue; }
  50% { background-color: white; }
}

/* Add styles to ensure content is readable over the background */
body {
  color: white;
  text-shadow: 1px 1px 2px black;
}
`;
document.head.appendChild(style);
