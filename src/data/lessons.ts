// Senda curriculum — neutral Latin American Spanish (tú / ustedes, no vosotros).
// Frequency-first: earliest lessons teach the highest-leverage words & structures.
// 40 lessons total: A1 (1–8), A2 (9–20), B1 (21–40).

export interface Vocab {
  es: string;
  en: string;
  ex: string;
  exEn: string;
}

export interface Lesson {
  id: string;
  week: number;
  level: string;
  title: string;
  focus: string;
  explainer: string[];
  grammar?: { title: string; rows: string[][] };
  vocab: Vocab[];
}

export const LESSONS: Lesson[] = [
  /* ============================ A1 ============================ */
  {
    id: "l1", week: 1, level: "A1", title: "Sonidos y saludos", focus: "The 5 vowels · greetings",
    explainer: [
      "Spanish has just five vowel sounds, and they never change: a (ah), e (eh), i (ee), o (oh), u (oo). Say them short and pure — no gliding like in English.",
      "Stress is predictable: words ending in a vowel, n, or s stress the second-to-last syllable (ca-SA). An accent mark (café) overrides this and tells you exactly where to push.",
      "‘h’ is always silent. ‘j’ and the soft ‘g’ (ge/gi) are a throaty h. ‘ñ’ is the ny in ‘canyon’.",
    ],
    vocab: [
      { es: "hola", en: "hi / hello", ex: "Hola, ¿cómo estás?", exEn: "Hi, how are you?" },
      { es: "buenos días", en: "good morning", ex: "Buenos días, señora.", exEn: "Good morning, ma'am." },
      { es: "buenas tardes", en: "good afternoon", ex: "Buenas tardes a todos.", exEn: "Good afternoon, everyone." },
      { es: "buenas noches", en: "good evening / night", ex: "Buenas noches, hasta mañana.", exEn: "Good night, see you tomorrow." },
      { es: "gracias", en: "thank you", ex: "Muchas gracias.", exEn: "Thank you very much." },
      { es: "por favor", en: "please", ex: "Un café, por favor.", exEn: "A coffee, please." },
      { es: "adiós", en: "goodbye", ex: "Adiós, hasta luego.", exEn: "Bye, see you later." },
      { es: "sí / no", en: "yes / no", ex: "Sí, gracias. No, gracias.", exEn: "Yes, thanks. No, thanks." },
    ],
  },
  {
    id: "l2", week: 1, level: "A1", title: "Yo soy", focus: "ser (to be) · subject pronouns",
    explainer: [
      "Subject pronouns: yo (I), tú (you), él/ella (he/she), nosotros (we), ellos/ellas (they). You usually drop them because the verb ending already shows who — soy means ‘I am’ on its own.",
      "ser = the permanent ‘to be’: identity, origin, profession, traits. Present tense: yo soy, tú eres, él/ella es, nosotros somos, ellos son.",
      "‘I am Victor’ → Soy Victor. ‘Are you a teacher?’ → ¿Eres profesor?",
    ],
    grammar: { title: "ser — presente", rows: [["yo", "soy"], ["tú", "eres"], ["él / ella", "es"], ["nosotros", "somos"], ["ellos / ellas", "son"]] },
    vocab: [
      { es: "soy", en: "I am", ex: "Soy de Nigeria.", exEn: "I'm from Nigeria." },
      { es: "eres", en: "you are", ex: "¿Eres estudiante?", exEn: "Are you a student?" },
      { es: "es", en: "he/she/it is", ex: "Ella es mi amiga.", exEn: "She is my friend." },
      { es: "mi nombre es", en: "my name is", ex: "Mi nombre es Ana.", exEn: "My name is Ana." },
      { es: "encantado / encantada", en: "nice to meet you", ex: "Encantado. — Encantada.", exEn: "Nice to meet you. (m / f)" },
      { es: "¿y tú?", en: "and you?", ex: "Bien, ¿y tú?", exEn: "Good, and you?" },
    ],
  },
  {
    id: "l3", week: 1, level: "A1", title: "¿Cómo estás?", focus: "estar · states & location",
    explainer: [
      "estar = the temporary ‘to be’: how you feel and where you are right now. Present: yo estoy, tú estás, él/ella está, nosotros estamos, ellos están.",
      "Quick rule of thumb: ser for what something IS, estar for HOW or WHERE it is. Soy alto (I am tall — trait). Estoy cansado (I'm tired — state).",
    ],
    grammar: { title: "estar — presente", rows: [["yo", "estoy"], ["tú", "estás"], ["él / ella", "está"], ["nosotros", "estamos"], ["ellos / ellas", "están"]] },
    vocab: [
      { es: "¿cómo estás?", en: "how are you?", ex: "Hola, ¿cómo estás?", exEn: "Hi, how are you?" },
      { es: "estoy bien", en: "I'm well", ex: "Estoy muy bien, gracias.", exEn: "I'm very well, thanks." },
      { es: "más o menos", en: "so-so", ex: "Hoy, más o menos.", exEn: "Today, so-so." },
      { es: "cansado / cansada", en: "tired", ex: "Estoy un poco cansado.", exEn: "I'm a little tired." },
      { es: "aquí", en: "here", ex: "Estoy aquí.", exEn: "I'm here." },
      { es: "muy / un poco", en: "very / a little", ex: "Muy contento. Un poco triste.", exEn: "Very happy. A little sad." },
    ],
  },
  {
    id: "l4", week: 2, level: "A1", title: "Números 0–20", focus: "counting · quantity",
    explainer: [
      "0 cero, 1 uno, 2 dos, 3 tres, 4 cuatro, 5 cinco, 6 seis, 7 siete, 8 ocho, 9 nueve, 10 diez.",
      "11 once, 12 doce, 13 trece, 14 catorce, 15 quince — these are their own words. Then 16–19 are ‘ten-and’: dieciséis, diecisiete, dieciocho, diecinueve. 20 veinte.",
      "‘uno’ becomes ‘un’ before a masculine noun and ‘una’ before feminine: un libro, una mesa.",
    ],
    vocab: [
      { es: "uno, dos, tres", en: "one, two, three", ex: "Uno, dos, tres… ¡ya!", exEn: "One, two, three… go!" },
      { es: "cinco", en: "five", ex: "Tengo cinco minutos.", exEn: "I have five minutes." },
      { es: "diez", en: "ten", ex: "Diez pesos, por favor.", exEn: "Ten pesos, please." },
      { es: "¿cuántos?", en: "how many?", ex: "¿Cuántos años tienes?", exEn: "How old are you?" },
      { es: "mucho / poco", en: "a lot / a little", ex: "Mucho trabajo, poco tiempo.", exEn: "A lot of work, little time." },
      { es: "número", en: "number", ex: "¿Cuál es tu número?", exEn: "What's your number?" },
    ],
  },
  {
    id: "l5", week: 2, level: "A1", title: "Tener", focus: "tener (to have) · age & needs",
    explainer: [
      "tener = to have. Present: yo tengo, tú tienes, él/ella tiene, nosotros tenemos, ellos tienen.",
      "Spanish uses tener where English uses ‘to be’ for age and bodily states: Tengo 22 años (I'm 22 — lit. I have 22 years), tengo hambre (I'm hungry), tengo sed (I'm thirsty), tengo frío (I'm cold).",
    ],
    grammar: { title: "tener — presente", rows: [["yo", "tengo"], ["tú", "tienes"], ["él / ella", "tiene"], ["nosotros", "tenemos"], ["ellos / ellas", "tienen"]] },
    vocab: [
      { es: "tengo", en: "I have", ex: "Tengo una pregunta.", exEn: "I have a question." },
      { es: "tienes", en: "you have", ex: "¿Tienes tiempo?", exEn: "Do you have time?" },
      { es: "tener ... años", en: "to be ... years old", ex: "Tengo veintidós años.", exEn: "I'm 22 years old." },
      { es: "tener hambre", en: "to be hungry", ex: "Tengo mucha hambre.", exEn: "I'm very hungry." },
      { es: "tener sed", en: "to be thirsty", ex: "¿Tienes sed?", exEn: "Are you thirsty?" },
      { es: "una pregunta", en: "a question", ex: "Tengo una pregunta rápida.", exEn: "I have a quick question." },
    ],
  },
  {
    id: "l6", week: 2, level: "A1", title: "El, la, un, una", focus: "gender & articles",
    explainer: [
      "Every noun is masculine or feminine. ‘the’ = el (m), la (f), los/las (plural). ‘a/an’ = un (m), una (f).",
      "Rough rule: nouns ending in -o are usually masculine (el libro), -a usually feminine (la casa). Lots of exceptions (el día, la mano), so learn the article WITH the word.",
      "Plurals: add -s after a vowel (libros), -es after a consonant (papeles).",
    ],
    vocab: [
      { es: "el libro", en: "the book", ex: "El libro es interesante.", exEn: "The book is interesting." },
      { es: "la casa", en: "the house", ex: "La casa es grande.", exEn: "The house is big." },
      { es: "el agua", en: "the water", ex: "El agua está fría.", exEn: "The water is cold." },
      { es: "la comida", en: "the food / meal", ex: "La comida está lista.", exEn: "The food is ready." },
      { es: "el hombre / la mujer", en: "the man / the woman", ex: "El hombre y la mujer.", exEn: "The man and the woman." },
      { es: "los amigos", en: "the friends", ex: "Mis amigos son buenos.", exEn: "My friends are good." },
    ],
  },
  {
    id: "l7", week: 3, level: "A1", title: "Verbos -AR", focus: "regular present (-ar)",
    explainer: [
      "Most Spanish verbs are regular. For -ar verbs, drop -ar and add: -o, -as, -a, -amos, -an.",
      "hablar (to speak): hablo, hablas, habla, hablamos, hablan. Same pattern for trabajar (work), estudiar (study), escuchar (listen), necesitar (need).",
      "So ‘I study Spanish’ → Estudio español. ‘Do you work here?’ → ¿Trabajas aquí?",
    ],
    grammar: { title: "hablar — presente", rows: [["yo", "hablo"], ["tú", "hablas"], ["él / ella", "habla"], ["nosotros", "hablamos"], ["ellos / ellas", "hablan"]] },
    vocab: [
      { es: "hablar", en: "to speak", ex: "Hablo un poco de español.", exEn: "I speak a little Spanish." },
      { es: "trabajar", en: "to work", ex: "Trabajo desde casa.", exEn: "I work from home." },
      { es: "estudiar", en: "to study", ex: "Estudio por la noche.", exEn: "I study at night." },
      { es: "necesitar", en: "to need", ex: "Necesito ayuda.", exEn: "I need help." },
      { es: "escuchar", en: "to listen", ex: "Escucho música.", exEn: "I listen to music." },
      { es: "español", en: "Spanish", ex: "Me gusta el español.", exEn: "I like Spanish." },
    ],
  },
  {
    id: "l8", week: 3, level: "A1", title: "Verbos -ER / -IR", focus: "regular present (-er, -ir)",
    explainer: [
      "-er endings: -o, -es, -e, -emos, -en. comer → como, comes, come, comemos, comen.",
      "-ir endings: -o, -es, -e, -imos, -en. vivir → vivo, vives, vive, vivimos, viven. (Only ‘nosotros’ differs between -er and -ir.)",
    ],
    grammar: { title: "comer / vivir", rows: [["yo", "como / vivo"], ["tú", "comes / vives"], ["él/ella", "come / vive"], ["nosotros", "comemos / vivimos"], ["ellos", "comen / viven"]] },
    vocab: [
      { es: "comer", en: "to eat", ex: "Como a la una.", exEn: "I eat at one." },
      { es: "beber", en: "to drink", ex: "Bebo café por la mañana.", exEn: "I drink coffee in the morning." },
      { es: "vivir", en: "to live", ex: "Vivo en Uyo.", exEn: "I live in Uyo." },
      { es: "escribir", en: "to write", ex: "Escribo código todos los días.", exEn: "I write code every day." },
      { es: "leer", en: "to read", ex: "Leo antes de dormir.", exEn: "I read before sleeping." },
      { es: "aprender", en: "to learn", ex: "Aprendo español rápido.", exEn: "I'm learning Spanish fast." },
    ],
  },
  /* ============================ A2 ============================ */
  {
    id: "l9", week: 4, level: "A2", title: "Hacer e ir", focus: "two key irregulars",
    explainer: [
      "hacer (to do/make): hago, haces, hace, hacemos, hacen. Used in ‘¿Qué haces?’ (What do you do / are you doing?).",
      "ir (to go): voy, vas, va, vamos, van. ‘to the’ = a + el → al, and a + la = a la. Voy al trabajo. Vamos a la casa.",
    ],
    grammar: { title: "hacer / ir", rows: [["yo", "hago / voy"], ["tú", "haces / vas"], ["él/ella", "hace / va"], ["nosotros", "hacemos / vamos"], ["ellos", "hacen / van"]] },
    vocab: [
      { es: "hacer", en: "to do / make", ex: "¿Qué haces hoy?", exEn: "What are you doing today?" },
      { es: "ir", en: "to go", ex: "Voy al trabajo.", exEn: "I'm going to work." },
      { es: "al / a la", en: "to the", ex: "Voy al banco y a la tienda.", exEn: "I go to the bank and the store." },
      { es: "el trabajo", en: "work / job", ex: "Mi trabajo es interesante.", exEn: "My job is interesting." },
      { es: "la tienda", en: "the store", ex: "La tienda está cerca.", exEn: "The store is nearby." },
    ],
  },
  {
    id: "l10", week: 4, level: "A2", title: "Voy a + verbo", focus: "the near future",
    explainer: [
      "The easiest future: ir a + infinitive = ‘going to do something’. Voy a estudiar (I'm going to study). Vamos a comer (We're going to eat).",
      "This single pattern lets you talk about plans without learning a new tense. Add a time word to anchor it: mañana, hoy, luego, esta noche.",
    ],
    vocab: [
      { es: "voy a", en: "I'm going to", ex: "Voy a trabajar mañana.", exEn: "I'm going to work tomorrow." },
      { es: "mañana", en: "tomorrow / morning", ex: "Mañana voy a descansar.", exEn: "Tomorrow I'm going to rest." },
      { es: "hoy", en: "today", ex: "Hoy voy a estudiar.", exEn: "Today I'm going to study." },
      { es: "luego", en: "later", ex: "Te llamo luego.", exEn: "I'll call you later." },
      { es: "esta noche", en: "tonight", ex: "Esta noche voy a escribir.", exEn: "Tonight I'm going to write." },
    ],
  },
  {
    id: "l11", week: 5, level: "A2", title: "Las preguntas", focus: "question words",
    explainer: [
      "Question words carry an accent: qué (what), quién (who), dónde (where), cuándo (when), por qué (why), cómo (how), cuánto (how much).",
      "Spanish opens questions with ¿ and closes with ?. Word order is flexible: ¿Dónde vives? = ¿Vives dónde? Both work.",
      "Note: por qué (why) vs porque (because) — same sounds, different jobs.",
    ],
    vocab: [
      { es: "¿qué?", en: "what?", ex: "¿Qué quieres?", exEn: "What do you want?" },
      { es: "¿dónde?", en: "where?", ex: "¿Dónde vives?", exEn: "Where do you live?" },
      { es: "¿cuándo?", en: "when?", ex: "¿Cuándo trabajas?", exEn: "When do you work?" },
      { es: "¿por qué?", en: "why?", ex: "¿Por qué estudias español?", exEn: "Why do you study Spanish?" },
      { es: "¿quién?", en: "who?", ex: "¿Quién es él?", exEn: "Who is he?" },
      { es: "¿cuánto cuesta?", en: "how much is it?", ex: "¿Cuánto cuesta el café?", exEn: "How much is the coffee?" },
    ],
  },
  {
    id: "l12", week: 5, level: "A2", title: "Quiero un café", focus: "querer · ordering",
    explainer: [
      "querer (to want) bends in the middle (e→ie): quiero, quieres, quiere, queremos, quieren. The nosotros form keeps the e.",
      "Use it to order and to express wishes: Quiero un café. ¿Quieres algo? Quiero aprender (I want to learn — querer + infinitive).",
    ],
    grammar: { title: "querer — presente", rows: [["yo", "quiero"], ["tú", "quieres"], ["él / ella", "quiere"], ["nosotros", "queremos"], ["ellos / ellas", "quieren"]] },
    vocab: [
      { es: "quiero", en: "I want", ex: "Quiero un café, por favor.", exEn: "I want a coffee, please." },
      { es: "¿quieres?", en: "do you want?", ex: "¿Quieres agua?", exEn: "Do you want water?" },
      { es: "el café / el té", en: "coffee / tea", ex: "Un café con leche.", exEn: "A coffee with milk." },
      { es: "el pan", en: "bread", ex: "Pan con mantequilla.", exEn: "Bread with butter." },
      { es: "la cuenta", en: "the bill / check", ex: "La cuenta, por favor.", exEn: "The check, please." },
      { es: "algo / nada", en: "something / nothing", ex: "¿Quieres algo más? Nada, gracias.", exEn: "Want anything else? Nothing, thanks." },
    ],
  },
  {
    id: "l13", week: 6, level: "A2", title: "Me gusta", focus: "expressing likes",
    explainer: [
      "gustar works ‘backwards’: literally ‘it pleases me’. Me gusta el café = I like coffee. The verb agrees with the thing liked: Me gustan los libros (plural).",
      "Me gusta / te gusta / le gusta (I / you / he-she like). For activities, use the infinitive: Me gusta cocinar (I like to cook).",
      "Stronger: me encanta (I love it).",
    ],
    vocab: [
      { es: "me gusta", en: "I like (it)", ex: "Me gusta la música.", exEn: "I like music." },
      { es: "me gustan", en: "I like (them)", ex: "Me gustan los gatos.", exEn: "I like cats." },
      { es: "¿te gusta?", en: "do you like (it)?", ex: "¿Te gusta el café?", exEn: "Do you like coffee?" },
      { es: "me encanta", en: "I love (it)", ex: "Me encanta cocinar.", exEn: "I love to cook." },
      { es: "no me gusta", en: "I don't like (it)", ex: "No me gusta el frío.", exEn: "I don't like the cold." },
      { es: "también / tampoco", en: "also / neither", ex: "A mí también. A mí tampoco.", exEn: "Me too. Me neither." },
    ],
  },
  {
    id: "l14", week: 6, level: "A2", title: "La familia", focus: "family · possessives",
    explainer: [
      "Possessives: mi (my), tu (your), su (his/her/their), nuestro (our). They agree in number: mis hermanos, tus amigos.",
      "Family core: madre/mamá, padre/papá, hermano/hermana, hijo/hija, esposo/esposa. ‘padres’ = parents.",
    ],
    vocab: [
      { es: "la familia", en: "the family", ex: "Mi familia es grande.", exEn: "My family is big." },
      { es: "la madre / el padre", en: "mother / father", ex: "Mi madre cocina bien.", exEn: "My mother cooks well." },
      { es: "el hermano / la hermana", en: "brother / sister", ex: "Tengo un hermano.", exEn: "I have a brother." },
      { es: "el hijo / la hija", en: "son / daughter", ex: "Su hija es médica.", exEn: "Her daughter is a doctor." },
      { es: "mi / tu / su", en: "my / your / his-her", ex: "Tu casa, mi casa.", exEn: "Your house, my house." },
      { es: "los padres", en: "parents", ex: "Mis padres viven aquí.", exEn: "My parents live here." },
    ],
  },
  {
    id: "l15", week: 7, level: "A2", title: "La hora y los días", focus: "time & days",
    explainer: [
      "Days (no capitals): lunes, martes, miércoles, jueves, viernes, sábado, domingo. ‘on Monday’ = el lunes; ‘on Mondays’ = los lunes.",
      "Time uses ser: Es la una (1:00), Son las dos (2:00), Son las tres y media (3:30), Son las cuatro y cuarto (4:15).",
    ],
    vocab: [
      { es: "¿qué hora es?", en: "what time is it?", ex: "¿Qué hora es? — Son las dos.", exEn: "What time is it? — It's two." },
      { es: "son las...", en: "it's ... o'clock", ex: "Son las ocho.", exEn: "It's eight." },
      { es: "y media / y cuarto", en: "half past / quarter past", ex: "Son las nueve y media.", exEn: "It's 9:30." },
      { es: "el lunes", en: "Monday / on Monday", ex: "El lunes trabajo.", exEn: "On Monday I work." },
      { es: "el fin de semana", en: "the weekend", ex: "El fin de semana descanso.", exEn: "On the weekend I rest." },
      { es: "ahora / siempre", en: "now / always", ex: "Ahora no, siempre mañana.", exEn: "Not now, always tomorrow." },
    ],
  },
  {
    id: "l16", week: 8, level: "A2", title: "Mi rutina", focus: "reflexive verbs",
    explainer: [
      "Reflexive verbs describe actions you do to yourself, marked by me/te/se: levantarse (to get up) → me levanto, te levantas, se levanta.",
      "Daily routine relies on these: despertarse (wake up), ducharse (shower), vestirse (get dressed), acostarse (go to bed).",
    ],
    vocab: [
      { es: "levantarse", en: "to get up", ex: "Me levanto a las seis.", exEn: "I get up at six." },
      { es: "ducharse", en: "to shower", ex: "Me ducho por la mañana.", exEn: "I shower in the morning." },
      { es: "vestirse", en: "to get dressed", ex: "Me visto rápido.", exEn: "I get dressed fast." },
      { es: "acostarse", en: "to go to bed", ex: "Me acuesto tarde.", exEn: "I go to bed late." },
      { es: "por la mañana", en: "in the morning", ex: "Estudio por la mañana.", exEn: "I study in the morning." },
      { es: "temprano / tarde", en: "early / late", ex: "Hoy temprano, ayer tarde.", exEn: "Today early, yesterday late." },
    ],
  },
  {
    id: "l17", week: 9, level: "A2", title: "El pretérito", focus: "the simple past",
    explainer: [
      "The preterite tells what happened (a finished action). Regular -ar: -é, -aste, -ó, -amos, -aron → hablé, hablaste, habló. Regular -er/-ir: -í, -iste, -ió, -imos, -ieron → comí, comió.",
      "Two essential irregulars: ir/ser share fui, fuiste, fue (I went / I was). hacer → hice, hiciste, hizo.",
      "Time markers that trigger it: ayer (yesterday), anoche (last night), la semana pasada (last week).",
    ],
    grammar: { title: "pretérito regular", rows: [["hablar", "hablé, hablaste, habló"], ["comer", "comí, comiste, comió"], ["ir / ser", "fui, fuiste, fue"], ["hacer", "hice, hiciste, hizo"]] },
    vocab: [
      { es: "ayer", en: "yesterday", ex: "Ayer trabajé mucho.", exEn: "Yesterday I worked a lot." },
      { es: "fui", en: "I went / I was", ex: "Fui al mercado.", exEn: "I went to the market." },
      { es: "comí", en: "I ate", ex: "Comí con mi familia.", exEn: "I ate with my family." },
      { es: "hice", en: "I did / made", ex: "Hice mi trabajo.", exEn: "I did my work." },
      { es: "anoche", en: "last night", ex: "Anoche dormí bien.", exEn: "Last night I slept well." },
      { es: "la semana pasada", en: "last week", ex: "La semana pasada viajé.", exEn: "Last week I traveled." },
    ],
  },
  {
    id: "l18", week: 10, level: "A2", title: "El imperfecto", focus: "the 'used to' past",
    explainer: [
      "The imperfect paints the background: what used to happen, ongoing states, descriptions. -ar: -aba, -abas, -aba… -er/-ir: -ía, -ías, -ía…",
      "Key forms to memorize: era (I/he was — ser), estaba (was — estar), tenía (had), había (there was/were).",
      "Preterite = a snapshot (Comí — I ate). Imperfect = a movie playing (Comía — I was eating / used to eat).",
    ],
    vocab: [
      { es: "era", en: "I/he/she was (trait)", ex: "Cuando era niño…", exEn: "When I was a kid…" },
      { es: "estaba", en: "I/he was (state)", ex: "Estaba cansado.", exEn: "I was tired." },
      { es: "tenía", en: "I/he had", ex: "Tenía un perro.", exEn: "I had a dog." },
      { es: "había", en: "there was / were", ex: "Había mucha gente.", exEn: "There were a lot of people." },
      { es: "antes", en: "before / used to", ex: "Antes vivía en Lagos.", exEn: "I used to live in Lagos." },
      { es: "a veces", en: "sometimes", ex: "A veces íbamos al cine.", exEn: "Sometimes we went to the movies." },
    ],
  },
  {
    id: "l19", week: 10, level: "A2", title: "Conectores", focus: "linking your sentences",
    explainer: [
      "Connectors turn words into conversation. The workhorses: y (and), pero (but), porque (because), también (also), entonces (so/then), aunque (although).",
      "Fillers buy you thinking time and sound natural: bueno… (well…), o sea (I mean), es que… (the thing is…), pues (well/so).",
    ],
    vocab: [
      { es: "porque", en: "because", ex: "Estudio porque me gusta.", exEn: "I study because I like it." },
      { es: "pero", en: "but", ex: "Quiero ir, pero no tengo tiempo.", exEn: "I want to go, but I don't have time." },
      { es: "entonces", en: "so / then", ex: "Entonces, ¿vamos?", exEn: "So, shall we go?" },
      { es: "también", en: "also / too", ex: "Yo también hablo inglés.", exEn: "I also speak English." },
      { es: "o sea", en: "I mean / that is", ex: "Es difícil, o sea, no fácil.", exEn: "It's hard, I mean, not easy." },
      { es: "es que...", en: "the thing is...", ex: "Es que estoy ocupado.", exEn: "The thing is, I'm busy." },
    ],
  },
  {
    id: "l20", week: 10, level: "A2", title: "Cortesía", focus: "polite requests · soft conditional",
    explainer: [
      "To sound polite, swap ‘I want’ for ‘I would like’: Quiero → Me gustaría. And ask with ¿podrías…? (could you…?) or ¿me puede…? (can you… formal).",
      "These soft forms are how adults actually speak. Me gustaría un café. ¿Podrías ayudarme? ¿Me puede dar la cuenta?",
    ],
    vocab: [
      { es: "me gustaría", en: "I would like", ex: "Me gustaría practicar más.", exEn: "I'd like to practice more." },
      { es: "¿podrías...?", en: "could you...?", ex: "¿Podrías repetir, por favor?", exEn: "Could you repeat, please?" },
      { es: "¿me puede...?", en: "can you... (formal)?", ex: "¿Me puede ayudar?", exEn: "Can you help me?" },
      { es: "perdón / disculpe", en: "sorry / excuse me", ex: "Perdón, ¿dónde está el baño?", exEn: "Excuse me, where's the restroom?" },
      { es: "claro / por supuesto", en: "sure / of course", ex: "Claro, con gusto.", exEn: "Sure, with pleasure." },
      { es: "no entiendo", en: "I don't understand", ex: "Perdón, no entiendo.", exEn: "Sorry, I don't understand." },
    ],
  },
  /* ============================ B1 ============================ */
  {
    id: "l21", week: 11, level: "B1", title: "Lo, la, los, las", focus: "direct object pronouns",
    explainer: [
      "Direct object pronouns replace the ‘what / whom’ of a verb so you stop repeating the noun. me, te, lo/la, nos, los/las.",
      "They go BEFORE the conjugated verb: ¿Tienes el libro? — Sí, lo tengo. With an infinitive you can attach it to the end OR move it before: Voy a comprarlo = Lo voy a comprar.",
    ],
    grammar: { title: "direct object", rows: [["me / te", "me / you"], ["lo / la", "him,it / her,it"], ["nos", "us"], ["los / las", "them"], ["attached", "verlo, hacerla"]] },
    vocab: [
      { es: "lo", en: "it / him (m)", ex: "¿El café? Lo quiero.", exEn: "The coffee? I want it." },
      { es: "la", en: "it / her (f)", ex: "¿La cuenta? La pago yo.", exEn: "The bill? I'll pay it." },
      { es: "los / las", en: "them", ex: "Los compro mañana.", exEn: "I'll buy them tomorrow." },
      { es: "verlo / hacerlo", en: "to see it / do it", ex: "Quiero verlo hoy.", exEn: "I want to see it today." },
      { es: "te llamo", en: "I'll call you", ex: "Te llamo más tarde.", exEn: "I'll call you later." },
      { es: "nos invitan", en: "they invite us", ex: "Nos invitan a cenar.", exEn: "They're inviting us to dinner." },
    ],
  },
  {
    id: "l22", week: 11, level: "B1", title: "Le, les, se lo", focus: "indirect object pronouns",
    explainer: [
      "The indirect object is the ‘to / for whom’: me, te, le, nos, les. Le di el libro a María (I gave the book to María).",
      "When both objects appear, indirect comes first — and le/les turns into ‘se’ before lo/la: Se lo di (I gave it to her). This ‘se lo / se la’ is everywhere in real speech.",
    ],
    grammar: { title: "indirect object", rows: [["me / te", "to me / you"], ["le", "to him/her/you-formal"], ["nos / les", "to us / them"], ["le + lo →", "se lo"], ["order", "indirect + direct"]] },
    vocab: [
      { es: "le", en: "to him / her", ex: "Le escribo un correo.", exEn: "I'm writing him an email." },
      { es: "les", en: "to them", ex: "Les mando el archivo.", exEn: "I'll send them the file." },
      { es: "se lo", en: "it to him / her", ex: "Se lo doy mañana.", exEn: "I'll give it to her tomorrow." },
      { es: "dar (doy, das)", en: "to give", ex: "Te doy mi número.", exEn: "I'll give you my number." },
      { es: "decir (digo)", en: "to say / tell", ex: "Le digo la verdad.", exEn: "I tell him the truth." },
      { es: "mandar / enviar", en: "to send", ex: "Te lo mando hoy.", exEn: "I'll send it to you today." },
    ],
  },
  {
    id: "l23", week: 12, level: "B1", title: "Estoy haciendo", focus: "present progressive",
    explainer: [
      "For actions happening right this moment, use estar + gerund. Gerund: -ar → -ando (hablando); -er/-ir → -iendo (comiendo, viviendo).",
      "Watch out: Spanish uses the simple present far more than English uses ‘-ing’. Reserve estar + gerund for what's literally in progress now. A couple of irregular gerunds: leyendo, durmiendo.",
    ],
    grammar: { title: "el gerundio", rows: [["hablar", "hablando"], ["comer", "comiendo"], ["vivir", "viviendo"], ["leer", "leyendo"], ["dormir", "durmiendo"]] },
    vocab: [
      { es: "estoy haciendo", en: "I'm doing", ex: "Estoy haciendo la cena.", exEn: "I'm making dinner." },
      { es: "estás trabajando", en: "you're working", ex: "¿Estás trabajando ahora?", exEn: "Are you working now?" },
      { es: "estamos aprendiendo", en: "we're learning", ex: "Estamos aprendiendo español.", exEn: "We're learning Spanish." },
      { es: "ahora mismo", en: "right now", ex: "Ahora mismo no puedo.", exEn: "Right now I can't." },
      { es: "todavía / aún", en: "still", ex: "Todavía estoy comiendo.", exEn: "I'm still eating." },
      { es: "mientras", en: "while", ex: "Escucho música mientras trabajo.", exEn: "I listen to music while I work." },
    ],
  },
  {
    id: "l24", week: 12, level: "B1", title: "Pretérito vs imperfecto", focus: "the two pasts together",
    explainer: [
      "This is the trickiest jump for English speakers. Preterite = a completed event, a snapshot: Ayer comí pizza. Imperfect = background, description, habit: Cuando era niño, comía pizza los viernes.",
      "They team up: the imperfect sets the scene, the preterite drops the event in. Estaba en casa (scene) cuando sonó el teléfono (event).",
    ],
    grammar: { title: "which one?", rows: [["preterite", "completed / snapshot"], ["imperfect", "background / habit / description"], ["together", "Veía la tele cuando llegó"]] },
    vocab: [
      { es: "cuando", en: "when", ex: "Cuando llegué, ya no estaba.", exEn: "When I arrived, he was gone." },
      { es: "de repente", en: "suddenly", ex: "De repente, empezó a llover.", exEn: "Suddenly, it started to rain." },
      { es: "todos los días", en: "every day", ex: "Todos los días caminaba al trabajo.", exEn: "Every day I used to walk to work." },
      { es: "una vez", en: "once / one time", ex: "Una vez fui a México.", exEn: "Once I went to Mexico." },
      { es: "empezar a", en: "to start to", ex: "Empecé a estudiar a las ocho.", exEn: "I started studying at eight." },
      { es: "ya", en: "already", ex: "Ya terminé.", exEn: "I already finished." },
    ],
  },
  {
    id: "l25", week: 13, level: "B1", title: "Irregulares en pretérito", focus: "the strong preterites",
    explainer: [
      "A core group of common verbs takes a new stem plus a shared set of unaccented endings (-e, -iste, -o, -imos, -ieron): tener→tuv-, estar→estuv-, poder→pud-, poner→pus-, saber→sup-, venir→vin-, querer→quis-.",
      "hacer→hic- (but hizo with z), decir→dij-, traer→traj- (these last two use -eron, not -ieron: dijeron, trajeron).",
    ],
    grammar: { title: "pretérito irregular", rows: [["tener", "tuve, tuviste, tuvo"], ["estar", "estuve, estuviste, estuvo"], ["poder", "pude, pudiste, pudo"], ["venir", "vine, viniste, vino"], ["decir", "dije, dijiste, dijo"]] },
    vocab: [
      { es: "tuve", en: "I had", ex: "Tuve un problema.", exEn: "I had a problem." },
      { es: "estuve", en: "I was", ex: "Estuve en casa todo el día.", exEn: "I was home all day." },
      { es: "pude", en: "I could / managed to", ex: "No pude dormir.", exEn: "I couldn't sleep." },
      { es: "vine", en: "I came", ex: "Vine en taxi.", exEn: "I came by taxi." },
      { es: "dije", en: "I said", ex: "Te dije la verdad.", exEn: "I told you the truth." },
      { es: "puse / hice", en: "I put / did", ex: "Puse la mesa y lo hice.", exEn: "I set the table and did it." },
    ],
  },
  {
    id: "l26", week: 13, level: "B1", title: "El futuro simple", focus: "will + future",
    explainer: [
      "Attach endings to the WHOLE infinitive (same for -ar/-er/-ir): -é, -ás, -á, -emos, -án → hablaré, comeré, viviré.",
      "A handful use irregular stems: tener→tendr-, hacer→har-, poder→podr-, salir→saldr-, venir→vendr-, decir→dir-, poner→pondr-, saber→sabr-, querer→querr-.",
      "Bonus: the future also expresses probability — Serán las tres (It's probably three).",
    ],
    grammar: { title: "futuro", rows: [["hablar", "hablaré, hablarás, hablará"], ["tener", "tendré"], ["hacer", "haré"], ["poder", "podré"], ["salir", "saldré"]] },
    vocab: [
      { es: "haré", en: "I will do", ex: "Lo haré mañana.", exEn: "I'll do it tomorrow." },
      { es: "tendré", en: "I will have", ex: "Tendré tiempo el lunes.", exEn: "I'll have time on Monday." },
      { es: "iré", en: "I will go", ex: "Iré contigo.", exEn: "I'll go with you." },
      { es: "será", en: "it will be", ex: "Todo será mejor.", exEn: "Everything will be better." },
      { es: "el año que viene", en: "next year", ex: "El año que viene viajaré.", exEn: "Next year I'll travel." },
      { es: "algún día", en: "someday", ex: "Algún día hablaré bien.", exEn: "Someday I'll speak well." },
    ],
  },
  {
    id: "l27", week: 14, level: "B1", title: "El condicional", focus: "would · hypotheticals",
    explainer: [
      "Same stems as the future, but with imperfect endings: -ía, -ías, -ía, -íamos, -ían → hablaría (I would speak), tendría (I would have).",
      "Three big uses: politeness (Me gustaría, ¿Podrías?), hypotheticals (Yo iría, pero no puedo), and giving advice (Deberías descansar).",
    ],
    grammar: { title: "condicional", rows: [["hablar", "hablaría"], ["tener", "tendría"], ["hacer", "haría"], ["poder", "podría"], ["deber", "debería"]] },
    vocab: [
      { es: "haría", en: "I would do", ex: "Yo lo haría diferente.", exEn: "I would do it differently." },
      { es: "podría", en: "I/you could", ex: "¿Podrías ayudarme?", exEn: "Could you help me?" },
      { es: "debería", en: "I/you should", ex: "Deberías descansar.", exEn: "You should rest." },
      { es: "tendría que", en: "I would have to", ex: "Tendría que pensarlo.", exEn: "I'd have to think about it." },
      { es: "en tu lugar", en: "in your place", ex: "Yo, en tu lugar, esperaría.", exEn: "If I were you, I'd wait." },
      { es: "sería mejor", en: "it would be better", ex: "Sería mejor empezar ya.", exEn: "It'd be better to start now." },
    ],
  },
  {
    id: "l28", week: 14, level: "B1", title: "Por vs Para", focus: "the classic pair",
    explainer: [
      "para = goal, destination, deadline, recipient, purpose (‘in order to’): Es para ti. Salgo para Lima. Estudio para aprender. Es para el lunes.",
      "por = cause/reason, exchange, duration, ‘through/by’, ‘on behalf of’: Gracias por todo. Pagué diez por el libro. Caminé por el parque. Lo hice por ti.",
    ],
    grammar: { title: "por / para", rows: [["para", "goal · destination · deadline · recipient"], ["por", "cause · exchange · duration · through"]] },
    vocab: [
      { es: "para", en: "for / in order to", ex: "Esto es para ti.", exEn: "This is for you." },
      { es: "por", en: "for / because of / through", ex: "Gracias por venir.", exEn: "Thanks for coming." },
      { es: "para qué", en: "what for", ex: "¿Para qué es esto?", exEn: "What's this for?" },
      { es: "por eso", en: "that's why", ex: "Por eso no vine.", exEn: "That's why I didn't come." },
      { es: "por ejemplo", en: "for example", ex: "Por ejemplo, el café.", exEn: "For example, coffee." },
      { es: "por fin", en: "finally / at last", ex: "¡Por fin terminé!", exEn: "I finally finished!" },
    ],
  },
  {
    id: "l29", week: 15, level: "B1", title: "Comparar", focus: "comparatives & superlatives",
    explainer: [
      "More / less: más / menos + adjective + que → Soy más alto que tú. Equal: tan + adjective + como → tan rápido como.",
      "The most / least: el / la / los / las + más + adjective → el más caro. Irregulars sidestep ‘más’: mejor (better), peor (worse), mayor (older), menor (younger).",
    ],
    grammar: { title: "comparar", rows: [["más ... que", "more than"], ["menos ... que", "less than"], ["tan ... como", "as ... as"], ["el / la más", "the most"], ["mejor / peor", "better / worse"]] },
    vocab: [
      { es: "más ... que", en: "more than", ex: "Hoy es más fácil que ayer.", exEn: "Today is easier than yesterday." },
      { es: "menos ... que", en: "less than", ex: "Tengo menos tiempo que antes.", exEn: "I have less time than before." },
      { es: "tan ... como", en: "as ... as", ex: "Es tan bueno como el otro.", exEn: "It's as good as the other one." },
      { es: "mejor / peor", en: "better / worse", ex: "Hoy estoy mejor.", exEn: "Today I'm better." },
      { es: "el mejor", en: "the best", ex: "Es el mejor café de la ciudad.", exEn: "It's the best coffee in the city." },
      { es: "tanto como", en: "as much as", ex: "Trabajo tanto como tú.", exEn: "I work as much as you." },
    ],
  },
  {
    id: "l30", week: 15, level: "B1", title: "Los mandatos", focus: "the imperative (commands)",
    explainer: [
      "Affirmative tú command = the él/ella form: ¡Habla! ¡Come! ¡Escribe! Common irregulars: di, haz, ven, pon, sal, sé, ten, ve.",
      "Negative tú command borrows the subjunctive: No hables, no comas, no vengas. Object pronouns attach to the affirmative (dímelo) but sit before the negative (no me lo digas).",
    ],
    grammar: { title: "imperativo (tú)", rows: [["habla / no hables", "speak / don't speak"], ["come / no comas", "eat / don't eat"], ["ven", "come (irreg.)"], ["haz", "do/make (irreg.)"], ["dime", "tell me (attached)"]] },
    vocab: [
      { es: "espera", en: "wait", ex: "Espera un momento.", exEn: "Wait a moment." },
      { es: "ven / vamos", en: "come / let's go", ex: "¡Ven aquí! ¡Vamos!", exEn: "Come here! Let's go!" },
      { es: "dime", en: "tell me", ex: "Dime la verdad.", exEn: "Tell me the truth." },
      { es: "no te preocupes", en: "don't worry", ex: "Tranquilo, no te preocupes.", exEn: "Relax, don't worry." },
      { es: "mira / oye", en: "look / hey, listen", ex: "Oye, ¿tienes un minuto?", exEn: "Hey, do you have a minute?" },
      { es: "hazlo", en: "do it", ex: "Hazlo ahora, por favor.", exEn: "Do it now, please." },
    ],
  },
  {
    id: "l31", week: 16, level: "B1", title: "El subjuntivo", focus: "present subjunctive — formation",
    explainer: [
      "The subjunctive lives in the second half of sentences (after que) and expresses wishes, doubt, emotion, and the not-yet-real. Form it from the yo present: drop the -o, then -ar verbs take -e endings and -er/-ir verbs take -a endings.",
      "hablar→hable; comer→coma; tener (tengo)→tenga; salir (salgo)→salga. Key irregulars: ser→sea, ir→vaya, haber→haya, saber→sepa, dar→dé, estar→esté.",
    ],
    grammar: { title: "subjuntivo presente", rows: [["hablar", "hable, hables, hable"], ["comer", "coma, comas, coma"], ["tener", "tenga"], ["ser / ir", "sea / vaya"], ["estar", "esté"]] },
    vocab: [
      { es: "que hable", en: "that I/he speak", ex: "Quiere que hable más.", exEn: "She wants me to speak more." },
      { es: "que sea", en: "that it be", ex: "Espero que sea fácil.", exEn: "I hope it's easy." },
      { es: "que vaya", en: "that I/he go", ex: "Es mejor que vaya ahora.", exEn: "It's better that I go now." },
      { es: "que tengas", en: "that you have", ex: "Que tengas un buen día.", exEn: "Have a good day." },
      { es: "ojalá", en: "hopefully / I wish", ex: "Ojalá llueva.", exEn: "Hopefully it rains." },
      { es: "es importante que", en: "it's important that", ex: "Es importante que practiques.", exEn: "It's important that you practice." },
    ],
  },
  {
    id: "l32", week: 16, level: "B1", title: "Subjuntivo: deseos", focus: "wishes & emotions",
    explainer: [
      "Use the subjunctive after wanting, hoping, and feeling — but only when the subject changes. Quiero que vengas (I want you to come). Note English uses an infinitive here; Spanish uses que + subjunctive.",
      "If the subject does NOT change, just use the infinitive: Quiero venir (I want to come).",
    ],
    grammar: { title: "deseos y emociones", rows: [["Quiero que vengas", "I want you to come"], ["Espero que estés bien", "I hope you're well"], ["Me alegra que vengas", "I'm glad you're coming"], ["(same subject)", "Quiero ir — infinitive"]] },
    vocab: [
      { es: "quiero que", en: "I want (someone) to", ex: "Quiero que me ayudes.", exEn: "I want you to help me." },
      { es: "espero que", en: "I hope that", ex: "Espero que te guste.", exEn: "I hope you like it." },
      { es: "me alegra que", en: "I'm glad that", ex: "Me alegra que estés aquí.", exEn: "I'm glad you're here." },
      { es: "ojalá que", en: "I hope / wish that", ex: "Ojalá que todo salga bien.", exEn: "I hope everything goes well." },
      { es: "antes de que", en: "before", ex: "Llámame antes de que salgas.", exEn: "Call me before you leave." },
      { es: "para que", en: "so that", ex: "Te lo explico para que entiendas.", exEn: "I'll explain so you understand." },
    ],
  },
  {
    id: "l33", week: 17, level: "B1", title: "Subjuntivo: duda", focus: "doubt & opinion",
    explainer: [
      "Doubt and denial trigger the subjunctive: no creo que, dudo que, es posible que, no es verdad que → No creo que sea difícil.",
      "But certainty keeps the indicative: Creo que es difícil. Estoy seguro de que viene. Flipping a statement to the negative usually flips the mood with it.",
    ],
    grammar: { title: "duda vs certeza", rows: [["No creo que sea...", "subjunctive (doubt)"], ["Creo que es...", "indicative (certainty)"], ["Es posible que venga", "subjunctive"], ["Es verdad que viene", "indicative"]] },
    vocab: [
      { es: "no creo que", en: "I don't think that", ex: "No creo que llueva.", exEn: "I don't think it'll rain." },
      { es: "es posible que", en: "it's possible that", ex: "Es posible que llegue tarde.", exEn: "I might arrive late." },
      { es: "dudo que", en: "I doubt that", ex: "Dudo que esté abierto.", exEn: "I doubt it's open." },
      { es: "quizás / tal vez", en: "maybe / perhaps", ex: "Quizás venga, quizás no.", exEn: "Maybe he'll come, maybe not." },
      { es: "puede que", en: "it may be that", ex: "Puede que tengas razón.", exEn: "You may be right." },
      { es: "estoy seguro de que", en: "I'm sure that", ex: "Estoy seguro de que viene.", exEn: "I'm sure he's coming." },
    ],
  },
  {
    id: "l34", week: 17, level: "B1", title: "El pretérito perfecto", focus: "present perfect (he hablado)",
    explainer: [
      "haber (he, has, ha, hemos, han) + past participle (-ado / -ido): he hablado, he comido. Used for actions in a still-current period or the recent past: Hoy he trabajado mucho. ¿Has comido?",
      "Irregular participles to memorize: hecho (hacer), dicho (decir), visto (ver), escrito (escribir), puesto (poner), vuelto (volver), abierto (abrir).",
    ],
    grammar: { title: "pretérito perfecto", rows: [["he hablado", "I have spoken"], ["has comido", "you have eaten"], ["ha hecho", "he has done (irreg.)"], ["hemos visto", "we have seen (irreg.)"], ["han dicho", "they have said (irreg.)"]] },
    vocab: [
      { es: "he hecho", en: "I have done", ex: "Ya he hecho mi parte.", exEn: "I've already done my part." },
      { es: "has visto", en: "you have seen", ex: "¿Has visto la película?", exEn: "Have you seen the movie?" },
      { es: "nunca he", en: "I have never", ex: "Nunca he estado allí.", exEn: "I've never been there." },
      { es: "todavía no he", en: "I haven't yet", ex: "Todavía no he comido.", exEn: "I haven't eaten yet." },
      { es: "alguna vez", en: "ever", ex: "¿Has viajado alguna vez?", exEn: "Have you ever traveled?" },
      { es: "últimamente", en: "lately", ex: "Últimamente he dormido mal.", exEn: "Lately I've slept badly." },
    ],
  },
  {
    id: "l35", week: 18, level: "B1", title: "El pluscuamperfecto", focus: "past perfect & sequence",
    explainer: [
      "había + participle = ‘had done’ — an action finished BEFORE another past moment. Cuando llegué, ya habían comido (When I arrived, they had already eaten).",
      "Pair it with the preterite to make the order of past events crystal clear. Use antes de + infinitive and después de + infinitive to chain actions cleanly.",
    ],
    grammar: { title: "pluscuamperfecto", rows: [["había hablado", "I had spoken"], ["habías comido", "you had eaten"], ["había hecho", "he had done"], ["ya habían salido", "they had already left"]] },
    vocab: [
      { es: "había", en: "had (auxiliary)", ex: "No había visto eso antes.", exEn: "I hadn't seen that before." },
      { es: "ya había", en: "had already", ex: "Cuando llamaste, ya había salido.", exEn: "When you called, I had already left." },
      { es: "nunca había", en: "had never", ex: "Nunca había probado esto.", exEn: "I had never tried this." },
      { es: "antes de", en: "before (doing)", ex: "Antes de salir, comí algo.", exEn: "Before leaving, I ate something." },
      { es: "después de", en: "after (doing)", ex: "Después de comer, descansé.", exEn: "After eating, I rested." },
      { es: "al final", en: "in the end", ex: "Al final, todo salió bien.", exEn: "In the end, it all worked out." },
    ],
  },
  {
    id: "l36", week: 18, level: "B1", title: "El 'se' impersonal", focus: "passive & impersonal se",
    explainer: [
      "‘se’ makes a statement general, with no specific doer — the workhorse of signs, recipes, and rules. Se habla español (Spanish is spoken). Se vende (For sale). ¿Cómo se dice…? (How do you say…?).",
      "It also softens unplanned events: Se me olvidó (I forgot — literally ‘it forgot itself to me’). Se me cayó (I dropped it).",
    ],
    grammar: { title: "el se", rows: [["Se habla español", "Spanish is spoken"], ["Se vende", "For sale"], ["¿Cómo se dice?", "How do you say?"], ["Se me olvidó", "I forgot (accidental)"]] },
    vocab: [
      { es: "se dice", en: "one says / it's said", ex: "¿Cómo se dice 'table'?", exEn: "How do you say 'table'?" },
      { es: "se puede", en: "one can / it's allowed", ex: "¿Se puede pagar con tarjeta?", exEn: "Can one pay by card?" },
      { es: "se vende / se renta", en: "for sale / for rent", ex: "Se vende casa.", exEn: "House for sale." },
      { es: "se me olvidó", en: "I forgot", ex: "Perdón, se me olvidó.", exEn: "Sorry, I forgot." },
      { es: "se necesita", en: "needed / wanted", ex: "Se necesita ayuda.", exEn: "Help wanted." },
      { es: "no se permite", en: "not allowed", ex: "No se permite el paso.", exEn: "No entry allowed." },
    ],
  },
  {
    id: "l37", week: 19, level: "B1", title: "Conectores avanzados", focus: "paragraph-level linking",
    explainer: [
      "These lift you from single sentences to flowing speech. sin embargo (however), por lo tanto (therefore), aunque (although / even if), a pesar de (despite), en cambio (on the other hand), además (besides), ya que (since/because).",
    ],
    grammar: { title: "conectores", rows: [["sin embargo", "however"], ["por lo tanto", "therefore"], ["aunque", "although / even if"], ["a pesar de", "despite"], ["además", "besides / moreover"]] },
    vocab: [
      { es: "sin embargo", en: "however", ex: "Es caro; sin embargo, vale la pena.", exEn: "It's expensive; however, it's worth it." },
      { es: "por lo tanto", en: "therefore", ex: "Llueve, por lo tanto no salgo.", exEn: "It's raining, therefore I'm not going out." },
      { es: "aunque", en: "although / even if", ex: "Aunque es difícil, sigo.", exEn: "Although it's hard, I keep going." },
      { es: "además", en: "besides / also", ex: "Además, no tengo tiempo.", exEn: "Besides, I don't have time." },
      { es: "ya que", en: "since / because", ex: "Ya que estás aquí, ayúdame.", exEn: "Since you're here, help me." },
      { es: "en cambio", en: "on the other hand", ex: "Él estudia; ella, en cambio, trabaja.", exEn: "He studies; she, on the other hand, works." },
    ],
  },
  {
    id: "l38", week: 19, level: "B1", title: "Dar opiniones", focus: "opinions & agreeing",
    explainer: [
      "Tools for talking about ideas. Open with: creo que, me parece que, en mi opinión, la verdad es que. Agree: estoy de acuerdo, tienes razón, exacto. Disagree softly: no estoy de acuerdo, depende, no sé…",
      "Remember the mood rule from before: creo que + indicative, but no creo que + subjunctive.",
    ],
    grammar: { title: "opinar", rows: [["creo que / me parece que", "I think (+ indicative)"], ["estoy de acuerdo", "I agree"], ["no estoy de acuerdo", "I disagree"], ["depende", "it depends"]] },
    vocab: [
      { es: "me parece que", en: "it seems to me / I think", ex: "Me parece que sí.", exEn: "I think so." },
      { es: "en mi opinión", en: "in my opinion", ex: "En mi opinión, es mejor esperar.", exEn: "In my opinion, it's better to wait." },
      { es: "estoy de acuerdo", en: "I agree", ex: "Estoy de acuerdo contigo.", exEn: "I agree with you." },
      { es: "tienes razón", en: "you're right", ex: "Sí, tienes razón.", exEn: "Yes, you're right." },
      { es: "depende de", en: "it depends on", ex: "Depende del precio.", exEn: "It depends on the price." },
      { es: "la verdad es que", en: "the truth is", ex: "La verdad es que no sé.", exEn: "The truth is, I don't know." },
    ],
  },
  {
    id: "l39", week: 20, level: "B1", title: "Lenguaje coloquial", focus: "how people really talk",
    explainer: [
      "Casual glue that makes you sound natural: dale / vale (okay), o sea (I mean), pues (well), da igual (whatever / doesn't matter), ¿en serio? (really?), ¡qué va! (no way!).",
      "Some are regional — qué chévere (Andes/Caribbean), qué padre (Mexico), genial (general) all mean ‘cool’. Sprinkle, don't overload.",
    ],
    grammar: { title: "muletillas", rows: [["dale / vale", "okay, sure"], ["o sea", "I mean"], ["da igual", "doesn't matter"], ["¡qué va!", "no way!"], ["¿en serio?", "really?"]] },
    vocab: [
      { es: "dale / vale", en: "okay / sure", ex: "Dale, nos vemos.", exEn: "Okay, see you." },
      { es: "o sea", en: "I mean / so", ex: "Es tarde, o sea, mejor mañana.", exEn: "It's late, I mean, better tomorrow." },
      { es: "da igual", en: "whatever / either way", ex: "Da igual, tú decides.", exEn: "Whatever, you decide." },
      { es: "qué chévere / padre", en: "how cool", ex: "¡Qué chévere!", exEn: "How cool!" },
      { es: "¿en serio?", en: "really? / seriously?", ex: "¿En serio? No lo creo.", exEn: "Really? I don't believe it." },
      { es: "más o menos", en: "sort of / so-so", ex: "Lo entendí más o menos.", exEn: "I sort of understood it." },
    ],
  },
  {
    id: "l40", week: 20, level: "B1", title: "Narrar: juntar los tiempos", focus: "storytelling — the capstone",
    explainer: [
      "The payoff lesson. To tell a story, weave the tenses: set the scene with the imperfect (Era de noche y llovía), drop events with the preterite (de repente, oí un ruido), connect with conectores, and add reflection with the perfect or subjunctive.",
      "Best practice from here: retell your day or a memory out loud to Lucía every session. That spoken weaving of tenses is the real bridge to fluency — keep going past lesson 40.",
    ],
    grammar: { title: "narrar", rows: [["Era / había / estaba", "scene (imperfect)"], ["llegó / dijo / hice", "events (preterite)"], ["he aprendido", "reflection (perfect)"], ["espero que / ojalá", "wishes (subjunctive)"]] },
    vocab: [
      { es: "érase una vez", en: "once upon a time", ex: "Érase una vez un rey.", exEn: "Once upon a time there was a king." },
      { es: "resulta que", en: "it turns out that", ex: "Resulta que tenía razón.", exEn: "It turns out he was right." },
      { es: "entonces / luego", en: "then / next", ex: "Entonces, salimos juntos.", exEn: "Then we went out together." },
      { es: "al principio", en: "at first", ex: "Al principio fue difícil.", exEn: "At first it was hard." },
      { es: "en resumen", en: "in short", ex: "En resumen, fue un buen día.", exEn: "In short, it was a good day." },
      { es: "por cierto", en: "by the way", ex: "Por cierto, ¿cómo estás?", exEn: "By the way, how are you?" },
    ],
  },
];

