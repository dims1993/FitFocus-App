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

// Llamada a nuestra API

async function cargarEjercicios() {
  console.log("Fetching data..."); // Aviso

  // Va a por los datos
  const respuesta = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5",
  );

  // Abrimos el paquete (convertimos a JSON)
  const datos = await respuesta.json();

  // Pintar en pantalla
  const contenedor = document.getElementById("exercise-container");

  contenedor.innerHTML = datos
    .map((item) => {
      return `
      <div class="card">
      <h3>${item.title.toUpperCase()}</h3>
      <p>Id del ejercicio: ${item.id}</p>
      </div>
      `;
    })
    .join("");
}

cargarEjercicios();
