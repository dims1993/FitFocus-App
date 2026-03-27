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

const filterSelect = document.getElementById("muscle-filter");

filterSelect.addEventListener("change", (e) => {
  const selectedMuscle = e.target.value;

  if (selectedMuscle === "all") {
    displayData(exercises);
  } else {
    const filteredList = exercises.filter(
      (ex) => ex.muscle.toLowerCase() === selectedMuscle,
    );

    displayData(filteredList);
  }
});

// BUSCADOR SEGUN TEXTO ESCRITO

const searchInput = document.getElementById("search");

searchInput.addEventListener("input", (e) => {
  const text = e.target.value.toLowerCase(); // lo que escribe el usuario
  const filtered = exercises.filter((ex) =>
    ex.name.toLowerCase().includes(text),
  );
  displayData(filtered);
});

displayData(exercises);
