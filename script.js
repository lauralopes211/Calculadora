let currentInput = "0";
let currentOperator = null;
let firstOperand = null;
let waitingForSecondOperand = false;
let calculationHistory = [];

const display = document.getElementById("result-display");
const historyDisplay = document.getElementById("history-display");
const historyList = document.getElementById("history-list");
const historyModal = document.getElementById("history-modal");

function updateDisplay() {
  display.value = currentInput;
}

document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;

    if (isFinite(value) || value === ".") {
      inputDigit(value);
    } else if (
      value === "+" ||
      value === "-" ||
      value === "*" ||
      value === "/"
    ) {
      handleOperator(value);
    } else if (value === "=") {
      performCalculation();
    } else if (value === "C") {
      resetCalculator();
    } else if (value === "root") {
      calculateRoot();
    } else if (value === "%") {
      calculatePercentage();
    }
    updateDisplay();
  });
});

document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (isFinite(key) || key === ".") {
    inputDigit(key);
  } else if (key === "+" || key === "-" || key === "*" || key === "/") {
    handleOperator(key);
  } else if (key === "Enter" || key === "=") {
    event.preventDefault();
    performCalculation();
  } else if (key === "Escape" || key === "Delete") {
    resetCalculator();
  }

  updateDisplay();
});

function inputDigit(digit) {
  if (waitingForSecondOperand === true) {
    currentInput = digit;
    waitingForSecondOperand = false;
  } else {
    if (digit === ".") {
      if (!currentInput.includes(".")) {
        currentInput += digit;
      }
    } else {
      currentInput = currentInput === "0" ? digit : currentInput + digit;
    }
  }
}

function resetCalculator() {
  currentInput = "0";
  firstOperand = null;
  currentOperator = null;
  waitingForSecondOperand = false;
  historyDisplay.textContent = "";
}

function handleOperator(nextOperator) {
  const inputValue = parseFloat(currentInput);

  if (firstOperand === null && !isNaN(inputValue)) {
    firstOperand = inputValue;
  } else if (currentOperator) {
    const operation = `${firstOperand} ${mapOperator(
      currentOperator
    )} ${inputValue}`;
    const result = calculate(firstOperand, inputValue, currentOperator);

    historyDisplay.textContent = `${operation} =`;

    firstOperand = result;
    currentInput = String(result);

    addHistoryEntry(`${operation} = ${currentInput}`);
  }

  currentOperator = nextOperator;
  waitingForSecondOperand = true;

  if (historyDisplay.textContent.includes("=")) {
    historyDisplay.textContent = `${firstOperand} ${mapOperator(
      currentOperator
    )}`;
  } else {
    historyDisplay.textContent = `${inputValue} ${mapOperator(
      currentOperator
    )}`;
  }
}

function mapOperator(operator) {
  if (operator === "/") return "÷";
  if (operator === "*") return "×";
  return operator;
}

function calculate(first, second, operator) {
  if (operator === "+") return first + second;
  if (operator === "-") return first - second;
  if (operator === "*") return first * second;
  if (operator === "/") {
    if (second === 0) return "Erro (Divisão por 0)";
    return first / second;
  }
  return second;
}

function performCalculation() {
  if (currentOperator === null || waitingForSecondOperand) {
    return;
  }

  const secondOperand = parseFloat(currentInput);
  const operation = `${firstOperand} ${mapOperator(
    currentOperator
  )} ${secondOperand}`;

  const result = calculate(firstOperand, secondOperand, currentOperator);

  currentInput = String(result);
  firstOperand = result;
  currentOperator = null;
  waitingForSecondOperand = true;

  historyDisplay.textContent = `${operation} =`;

  const historyEntryWithResult = `${operation} = ${String(result)}`;
  addHistoryEntry(historyEntryWithResult);
}

function calculateRoot() {
  const value = parseFloat(currentInput);
  if (isNaN(value) || value < 0) {
    currentInput = "Erro";
    return;
  }
  const result = Math.sqrt(value);
  historyDisplay.textContent = `√(${value}) =`;
  currentInput = String(result);
  addHistoryEntry(`√(${value}) = ${currentInput}`);
}

function calculatePercentage() {
  const value = parseFloat(currentInput);
  if (isNaN(value)) return;

  if (firstOperand === null) {
    const result = String(value / 100);
    historyDisplay.textContent = `${value}% =`;
    currentInput = result;
    addHistoryEntry(`${value}% = ${currentInput}`);
    return;
  }

  const percentValue = firstOperand * (value / 100);

  currentInput = String(percentValue);

  waitingForSecondOperand = false;
}

function addHistoryEntry(entry) {
  calculationHistory.unshift(entry);
  if (calculationHistory.length > 50) {
    calculationHistory.pop();
  }
  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = "";
  calculationHistory.forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = entry;
    historyList.appendChild(li);
  });
}

function toggleHistory() {
  historyModal.classList.toggle("open");
}

updateDisplay();
