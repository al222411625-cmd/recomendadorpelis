
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
    Drama:   { titulo: "Forrest Gump",         clasificacion: "PG-13", edadMin: 13, nota: "Mayores de 13 años" },
    Comedia: { titulo: "Mrs. Doubtfire",       clasificacion: "PG-13", edadMin: 13, nota: "Mayores de 13 años" },
    Musical: { titulo: "The Sound of Music",   clasificacion: "G",     edadMin: 0,  nota: "Para todo público" },
    Crimen:  { titulo: "Goodfellas",           clasificacion: "R",     edadMin: 17, nota: "Mayores de 17 años" },
    Terror:  { titulo: "The Others",           clasificacion: "PG-13", edadMin: 13, nota: "Mayores de 13 años" }
  }
};

const inputEdad = document.getElementById("edad");
const error = document.getElementById("error");
const resultado = document.getElementById("resultado");
const detalle = document.getElementById("detalle");

function rangoDeEdad(edad) {
  if (edad >= 2 && edad <= 12) return "infantil";
  if (edad >= 13 && edad <= 17) return "adolescente";
  if (edad >= 18 && edad <= 29) return "adulto1";
  if (edad >= 30 && edad <= 49) return "adulto2";
  if (edad >= 50) return "adulto3";
  return null;
}

function recomendar(genero) {
  const edad = parseInt(inputEdad.value, 10);
  const rango = rangoDeEdad(edad);

  if (isNaN(edad) || rango === null) {
    error.textContent = "Por favor ingresa una edad válida (2 años o más).";
    resultado.textContent = "";
    detalle.textContent = "";
    return;
  }

  error.textContent = "";
  const peli = catalogo[rango][genero];

  const edadTexto = peli.edadMin === 0 ? "todas las edades" : "desde los " + peli.edadMin + " años";

  resultado.textContent = peli.titulo;
  detalle.textContent =
    "Clasificación: " + peli.clasificacion +
    " | Recomendada " + edadTexto +
    " | " + peli.nota;
}

document.querySelectorAll("button[data-genero]").forEach((boton) => {
  boton.addEventListener("click", () => recomendar(boton.dataset.genero));
});