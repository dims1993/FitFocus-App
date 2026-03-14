// 1. Nuestros datos (Simulando una API de Fitness)
const misEjercicios = [
  { nombre: "Flexiones", musculo: "Pecho" },
  { nombre: "Sentadillas", musculo: "Pierna" },
  { nombre: "Dominadas", musculo: "Espalda" },
];

// 2. Buscamos el "hueco" en el HTML
const contenedor = document.getElementById("exercise-container");

// 3. Transformamos y pegamos (Todo en una línea, nivel Pro)
contenedor.innerHTML = misEjercicios
  .map(
    (ex) => `<div class="card"><h3>${ex.nombre}</h3><p>${ex.musculo}</p></div>`,
  )
  .join("");
