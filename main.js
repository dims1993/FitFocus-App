// 1. Nuestros data (Simulando una API de Fitness)
const exercises = [
  { id: 1, name: "Push ups", muscle: "chest" },
  { id: 2, name: "Squads", muscle: "leg" },
  { id: 3, name: "Back extension", muscle: "back" },
];

// FUNCION SOLO PARA PINTAR
function displayData(lista) {
  // Buscamos el "hueco" en el HTML
  const container = document.getElementById("exercise-container");
  // Transformamos y pegamos
  container.innerHTML = lista
    .map(
      (item) => `
    <div class="card">
      <h3>${item.name || item.title.toUpperCase()}</h3>
      <p>Target: ${item.muscle || "Exercise ID: " + item.id}</p>
    </div>
  `,
    )
    .join("");
}

// ESTA FUNCIÓN SOLO CONSIGUE DATOS
async function loadExternalExercises() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=5",
    );
    if (!response.ok) throw new Error("Network error");

    const data = await response.json();
    displayData(data); // <--- Aquí le pasamos el testigo a la "pintora"
  } catch (error) {
    document.getElementById("exercise-container").innerHTML =
      `<p style="color: red;">${error.message}</p>`;
  }
}

// FILTRO SELECTOR SEGUN EXERCISE

filterSelect.addEventListener("change", applyFilters);

// BUSCADOR SEGUN TEXTO ESCRITO

searchInput.addEventListener("input", applyFilters);

// FUNCION CENTRALIZADA PARA FILTRAR A TRAVES DEL BUSCADOR Y DEL SELECTOR
function applyFilters() {
  const text = document.getElementById("search").value.toLowerCase();
  const muscle = document.getElementById("muscle-filter").value.toLowerCase();

  // Aplicamos ambos filtros a la vez sobre el array original
  const filtered = exercises.filter((ex) => {
    // 1 regla, coincide el nombre?
    const matchesName = ex.name.toLowerCase().includes(text);
    // 2 regla, coincide el musculo?
    const matchesMuscle =
      muscle === "all" || ex.muscle.toLowerCase() === muscle;
    // solo si el ejercicio cumple ambas reglas (AND)
    return matchesName && matchesMuscle;
  });
  // pintamos resultado
  displayData(filtered);
}

displayData(exercises);
