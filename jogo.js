let secretNumber;
let attempts = 0;
const minRange = 1;
const maxRange = 100;

function resetGame() {
  secretNumber =
    Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
  attempts = 0;

  document.getElementById("message").textContent = "Pronto para o desafio!";
  document.getElementById("attempts").textContent = "Tentativas: 0";
  document.getElementById("guessInput").value = "";
  document.getElementById("guessInput").disabled = false;
  document.querySelector("button:first-of-type").disabled = false;
}

function checkGuess() {
  const guessInput = document.getElementById("guessInput");
  const guess = parseInt(guessInput.value);
  const messageDisplay = document.getElementById("message");

  if (isNaN(guess) || guess < minRange || guess > maxRange) {
    messageDisplay.textContent =
      "❌ Por favor, digite um número válido entre 1 e 100.";
    guessInput.value = "";
    return;
  }

  attempts++;
  document.getElementById("attempts").textContent = `Tentativas: ${attempts}`;

  if (guess === secretNumber) {
    messageDisplay.innerHTML = `🎉 **PARABÉNS!** Você decifrou o enigma em ${attempts} tentativas! Confetes digitais!`;
    messageDisplay.style.color = "#ff0066";
    document.getElementById("guessInput").disabled = true;
    document.querySelector("button:first-of-type").disabled = true;
  } else {
    const difference = Math.abs(secretNumber - guess);

    if (difference <= 5) {
      messageDisplay.textContent =
        "🔥🔥 **Quente demais!** Você está a um passo!";
      messageDisplay.style.color = "#ff9900";
    } else if (difference <= 15) {
      messageDisplay.textContent = "🔥 Quase lá! Está esquentando!";
      messageDisplay.style.color = "#ffff00";
    } else {
      messageDisplay.textContent = "❄️ Está frio! Aleatório ri e provoca.";
      messageDisplay.style.color = "#00ccff";
    }
  }

  guessInput.value = "";
  guessInput.focus();
}

window.onload = resetGame;
