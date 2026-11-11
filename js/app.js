
const catalogo = {
  infantil: {          
    Drama:   { titulo: "Wonder",     clasificacion: "PG", edadMin: 8, nota: "Se sugiere ir con un adulto" },
    Comedia: { titulo: "Shrek",      clasificacion: "PG", edadMin: 8, nota: "Se sugiere ir con un adulto" },
    Musical: { titulo: "Encanto",    clasificacion: "PG", edadMin: 6, nota: "Se sugiere ir con un adulto" },
    Crimen:  { titulo: "Zootopia",   clasificacion: "PG", edadMin: 6, nota: "Se sugiere ir con un adulto" },
    Terror:  { titulo: "Coraline",   clasificacion: "PG", edadMin: 8, nota: "Terror ligero, se sugiere ir con un adulto" }
  },
  adolescente: {        
    Drama:   { titulo: "Las ventajas de ser invisible", clasificacion: "PG-13", edadMin: 13, nota: "Mayores de 13 años" },
    Comedia: { titulo: "Mean Girls",                    clasificacion: "PG-13", edadMin: 13, nota: "Mayores de 13 años" },
    Musical: { titulo: "High School Musical",           clasificacion: "TV-G",  edadMin: 0,  nota: "Para todo público" },
    Crimen:  { titulo: "Now You See Me",                clasificacion: "PG-13", edadMin: 13, nota: "Mayores de 13 años" },
    Terror:  { titulo: "A Quiet Place",                 clasificacion: "PG-13", edadMin: 13, nota: "Mayores de 13 años" }
  },
  adulto1: {           
    Drama:   { titulo: "Whiplash",     clasificacion: "R",     edadMin: 17, nota: "Mayores de 17 años" },
    Comedia: { titulo: "Superbad",     clasificacion: "R",     edadMin: 17, nota: "Mayores de 17 años" },
    Musical: { titulo: "La La Land",   clasificacion: "PG-13", edadMin: 13, nota: "Mayores de 13 años" },
    Crimen:  { titulo: "Pulp Fiction", clasificacion: "R",     edadMin: 17, nota: "Mayores de 17 años" },
    Terror:  { titulo: "Get Out",      clasificacion: "R",     edadMin: 17, nota: "Mayores de 17 años" }
  },
  adulto2: {            
    Drama:   { titulo: "The Shawshank Redemption", clasificacion: "R",     edadMin: 17, nota: "Mayores de 17 años" },
    Comedia: { titulo: "The Hangover",             clasificacion: "R",     edadMin: 17, nota: "Mayores de 17 años" },
    Musical: { titulo: "Bohemian Rhapsody",        clasificacion: "PG-13", edadMin: 13, nota: "Mayores de 13 años" },
    Crimen:  { titulo: "The Godfather",            clasificacion: "R",     edadMin: 17, nota: "Mayores de 17 años" },
    Terror:  { titulo: "The Conjuring",            clasificacion: "R",     edadMin: 17, nota: "Mayores de 17 años" }
  },
  adulto3: {            
    Drama:   { titulo: "Forrest Gump",       clasificacion: "PG-13", edadMin: 13, nota: "Mayores de 13 años" },
    Comedia: { titulo: "Mrs. Doubtfire",     clasificacion: "PG-13", edadMin: 13, nota: "Mayores de 13 años" },
    Musical: { titulo: "The Sound of Music", clasificacion: "G",     edadMin: 0,  nota: "Para todo público" },
    Crimen:  { titulo: "Goodfellas",         clasificacion: "R",     edadMin: 17, nota: "Mayores de 17 años" },
    Terror:  { titulo: "The Others",         clasificacion: "PG-13", edadMin: 13, nota: "Mayores de 13 años" }
  }
};


const articulos = {
  "Wonder": "Wonder_(2017_film)",
  "Shrek": "Shrek",
  "Encanto": "Encanto_(film)",
  "Zootopia": "Zootopia",
  "Coraline": "Coraline_(film)",
  "Las ventajas de ser invisible": "The_Perks_of_Being_a_Wallflower_(film)",
  "Mean Girls": "Mean_Girls",
  "High School Musical": "High_School_Musical",
  "Now You See Me": "Now_You_See_Me_(film)",
  "A Quiet Place": "A_Quiet_Place_(film)",
  "Whiplash": "Whiplash_(2014_film)",
  "Superbad": "Superbad_(film)",
  "La La Land": "La_La_Land_(film)",
  "Pulp Fiction": "Pulp_Fiction",
  "Get Out": "Get_Out",
  "The Shawshank Redemption": "The_Shawshank_Redemption",
  "The Hangover": "The_Hangover_(film)",
  "Bohemian Rhapsody": "Bohemian_Rhapsody_(film)",
  "The Godfather": "The_Godfather",
  "The Conjuring": "The_Conjuring",
  "Forrest Gump": "Forrest_Gump",
  "Mrs. Doubtfire": "Mrs._Doubtfire",
  "The Sound of Music": "The_Sound_of_Music_(film)",
  "Goodfellas": "Goodfellas",
  "The Others": "The_Others_(2001_film)"
};


const busquedasItunes = {
  "Las ventajas de ser invisible": "The Perks of Being a Wallflower"
};

const inputEdad = document.getElementById("edad");
const error = document.getElementById("error");
const tarjeta = document.getElementById("tarjeta");
const poster = document.getElementById("poster");
const sinPoster = document.getElementById("sinPoster");
const resultado = document.getElementById("resultado");
const clasificacion = document.getElementById("clasificacion");
const edadRec = document.getElementById("edadRec");
const nota = document.getElementById("nota");

let busquedaActual = 0;

function rangoDeEdad(edad) {
  if (edad >= 2 && edad <= 12) return "infantil";
  if (edad >= 13 && edad <= 17) return "adolescente";
  if (edad >= 18 && edad <= 29) return "adulto1";
  if (edad >= 30 && edad <= 49) return "adulto2";
  if (edad >= 50) return "adulto3";
  return null;
}



async function pedirJSON(url, ms = 7000) {
  const control = new AbortController();
  const timer = setTimeout(() => control.abort(), ms);
  try {
    const r = await fetch(url, { signal: control.signal });
    if (!r.ok) throw new Error("HTTP " + r.status);
    return await r.json();
  } finally {
    clearTimeout(timer);
  }
}


function pedirJSONP(url, ms = 7000) {
  return new Promise((resolve, reject) => {
    const nombre = "cb_" + Date.now() + "_" + Math.floor(Math.random() * 1000);
    const script = document.createElement("script");
    const limpiar = () => {
      clearTimeout(timer);
      delete window[nombre];
      script.remove();
    };
    const timer = setTimeout(() => { limpiar(); reject(new Error("tiempo agotado")); }, ms);
    window[nombre] = (datos) => { limpiar(); resolve(datos); };
    script.onerror = () => { limpiar(); reject(new Error("bloqueado")); };
    script.src = url + "&callback=" + nombre;
    document.head.appendChild(script);
  });
}


function probarImagen(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.referrerPolicy = "no-referrer";
    img.onload = () => resolve(url);
    img.onerror = () => reject(new Error("imagen no carga"));
    img.src = url;
  });
}




async function urlWikipedia(titulo) {
  const url = "https://en.wikipedia.org/w/api.php?action=query&format=json&redirects=1" +
    "&prop=pageimages&pithumbsize=600&origin=*&titles=" + encodeURIComponent(articulos[titulo]);
  const datos = await pedirJSON(url);
  const paginas = Object.values(datos.query.pages);
  if (paginas[0] && paginas[0].thumbnail) return paginas[0].thumbnail.source;
  throw new Error("sin imagen");
}


async function urlItunes(titulo) {
  const termino = busquedasItunes[titulo] || titulo;
  const url = "https://itunes.apple.com/search?media=movie&entity=movie&limit=10&term=" +
    encodeURIComponent(termino);
  const datos = await pedirJSONP(url);
  const lista = datos.results || [];
  const exacta = lista.find((r) => r.trackName && r.trackName.toLowerCase() === termino.toLowerCase());
  const peli = exacta || lista[0];
  if (peli && peli.artworkUrl100) return peli.artworkUrl100.replace("100x100bb", "600x600bb");
  throw new Error("sin resultados");
}


async function urlWikipediaResumen(titulo) {
  const url = "https://en.wikipedia.org/api/rest_v1/page/summary/" + encodeURIComponent(articulos[titulo]);
  const datos = await pedirJSON(url);
  if (datos.thumbnail) return datos.thumbnail.source;
  throw new Error("sin imagen");
}



async function mostrarPoster(titulo) {
  const id = ++busquedaActual;

  poster.hidden = true;
  sinPoster.hidden = false;
  sinPoster.innerHTML = titulo + "<br><small>Buscando póster...</small>";
  poster.alt = "Póster de " + titulo;
  poster.referrerPolicy = "no-referrer";

  const fuentes = [
    ["Wikipedia", urlWikipedia],
    ["iTunes", urlItunes],
    ["Wikipedia 2", urlWikipediaResumen]
  ];
  const motivos = [];

  for (const [nombre, obtenerUrl] of fuentes) {
    try {
      const url = await obtenerUrl(titulo);
      await probarImagen(url);

      
      if (id !== busquedaActual) return;

      poster.src = url;
      poster.hidden = false;
      sinPoster.hidden = true;
      return;
    } catch (e) {
      motivos.push(nombre + ": " + e.message);
    }
  }

  if (id !== busquedaActual) return;
  sinPoster.innerHTML = titulo + "<br><small>Sin póster (" + motivos.join(" | ") + ")</small>";
}



function recomendar(genero, boton) {
  const edad = parseInt(inputEdad.value, 10);
  const rango = rangoDeEdad(edad);

  if (isNaN(edad) || rango === null) {
    error.textContent = "Por favor ingresa una edad válida (2 años o más).";
    tarjeta.hidden = true;
    return;
  }

  error.textContent = "";
  const peli = catalogo[rango][genero];

  const edadTexto = peli.edadMin === 0 ? "todas las edades" : "desde los " + peli.edadMin + " años";

  resultado.textContent = peli.titulo;
  clasificacion.textContent = "Clasificación: " + peli.clasificacion;
  edadRec.textContent = "Recomendada " + edadTexto;
  nota.textContent = peli.nota;
  mostrarPoster(peli.titulo);
  tarjeta.hidden = false;

  
  document.querySelectorAll("button[data-genero]").forEach((b) => b.classList.remove("activo"));
  boton.classList.add("activo");
}

document.querySelectorAll("button[data-genero]").forEach((boton) => {
  boton.addEventListener("click", () => recomendar(boton.dataset.genero, boton));
});