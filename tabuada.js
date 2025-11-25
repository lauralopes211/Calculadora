document.addEventListener("DOMContentLoaded", () => {
  generateAllTabuadas();

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
  resultsDiv.innerHTML = "";

  if (filterValue === "") {
    generateAllTabuadas();
    return;
  }

  const match = filterValue.match(/^(\d+)\s*[xX*]\s*(\d+)$/);

  if (match) {
    const num1 = parseInt(match[1]);
    const num2 = parseInt(match[2]);
    generateSingleResult(num1, num2);
  } else if (!isNaN(parseInt(filterValue))) {
    const num = parseInt(filterValue);
    generateTabuadaGroup(num);
  } else {
    resultsDiv.innerHTML =
      '<p style="text-align:center; color:red;">Filtro inválido. Use um número (ex: 7) ou uma operação (ex: 7x8).</p>';
  }
}

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

function generateAllTabuadas() {
  for (let i = 1; i <= 10; i++) {
    generateTabuadaGroup(i);
  }
}
