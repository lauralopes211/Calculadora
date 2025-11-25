document.addEventListener("DOMContentLoaded", () => {
  // Gera todas as tabuadas de 1 a 10 ao carregar a página
  generateAllTabuadas();

  // Adiciona o listener para o Enter no campo de filtro
  document
    .getElementById("filter-input")
    .addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        filterTabuadas();
      }
    });
});

const resultsDiv = document.getElementById("tabuada-results");
const inputElement = document.getElementById("filter-input");

function filterTabuadas() {
  const filterValue = inputElement.value.trim();
  resultsDiv.innerHTML = ""; // Limpa os resultados anteriores

  if (filterValue === "") {
    generateAllTabuadas();
    return;
  }

  // Verifica se o filtro é do tipo "N x M"
  const match = filterValue.match(/^(\d+)\s*[xX*]\s*(\d+)$/);

  if (match) {
    // Filtro "N x M"
    const num1 = parseInt(match[1]);
    const num2 = parseInt(match[2]);
    generateSingleResult(num1, num2);
  } else if (!isNaN(parseInt(filterValue))) {
    // Filtro "N" (apenas um número)
    const num = parseInt(filterValue);
    generateTabuadaGroup(num);
  } else {
    // Entrada inválida
    resultsDiv.innerHTML =
      '<p style="text-align:center; color:red;">Filtro inválido. Use um número (ex: 7) ou uma operação (ex: 7x8).</p>';
  }
}

// ---------------- FUNÇÕES DE GERAÇÃO ----------------

function generateTabuadaGroup(num) {
  const groupDiv = document.createElement("div");
  groupDiv.className = "tabuada-group";

  const title = document.createElement("h3");
  title.textContent = `Tabuada do ${num}`;
  groupDiv.appendChild(title);

  for (let i = 1; i <= 10; i++) {
    const p = document.createElement("p");
    p.textContent = `${num} × ${i} = ${num * i}`;
    groupDiv.appendChild(p);
  }

  resultsDiv.appendChild(groupDiv);
}

function generateSingleResult(num1, num2) {
  const resultDiv = document.createElement("div");
  resultDiv.className = "single-result";

  const p = document.createElement("p");
  p.textContent = `${num1} × ${num2} = ${num1 * num2}`;
  resultDiv.appendChild(p);

  resultsDiv.appendChild(resultDiv);
}

/**
 * Gera todas as tabuadas de 1 a 10 por padrão.
 */
function generateAllTabuadas() {
  for (let i = 1; i <= 10; i++) {
    generateTabuadaGroup(i);
  }
}
