const quadrants = document.querySelectorAll(".quadrant");
const startButton = document.getElementById("start-button");
const levelDisplay = document.getElementById("level-display");
const gamePattern = [];
let userPattern = [];
let level = 0;
let isGameStarted = false;

const sounds = {
  red: document.getElementById("sound-red"),
  green: document.getElementById("sound-green"),
  blue: document.getElementById("sound-blue"),
  yellow: document.getElementById("sound-yellow"),
};

// Función para generar un patron de juego aleatorio.
function generateGamePattern() {
  const colors = ["red", "green", "blue", "yellow"];
  const randomNum = Math.floor(Math.random() * 4);
  const randomColor = colors[randomNum];
  gamePattern.push(randomColor);
}

// Función para animar el patron de juego
function animateGamePattern() {
  let i = 0;
  const interval = setInterval(() => {
    const quadrant = document.getElementById(gamePattern[i]);
    quadrant.style.filter = "brightness(125%)";
    sounds[gamePattern[i]].currentTime = 0;
    sounds[gamePattern[i]].play();
    setTimeout(() => {
      quadrant.style.filter = "brightness(100%)";
    }, 500);
    i++;
    if (i >= gamePattern.length) {
      clearInterval(interval);
    }
  }, 1000);
}

// Función para comparar el patron del usuario y el del juego
function checkPattern() {
  for (let i = 0; i < userPattern.length; i++) {
    if (userPattern[i] !== gamePattern[i]) {
      return false;
    }
  }
  return true;
}

// Función para resetear el juego
function resetGame() {
  gamePattern.length = 0;
  userPattern.length = 0;
  level = 0;
  isGameStarted = false;
  levelDisplay.innerHTML = "";
}

// Función para mostrar la secuencia del juego
function showGameSequence() {
  animateGamePattern();
  userPattern = [];
}

// Event listener del boton Start
startButton.addEventListener("click", () => {
  if (!isGameStarted) {
    isGameStarted = true;
    generateGamePattern();
    showGameSequence();
    level++;
    levelDisplay.innerHTML = `Number of steps: ${level}`;
  }
});

//Función para animar los botones de colores
function animateQuadrant(quadrant) {
  quadrant.style.filter = "brightness(125%)";
  sounds[quadrant.id].currentTime = 0;
  sounds[quadrant.id].play();
  setTimeout(() => {
    quadrant.style.filter = "brightness(100%)";
  }, 500);
}

// Event listener para los botones de colores
quadrants.forEach((quadrant) => {
  quadrant.addEventListener("click", () => {
    if (isGameStarted) {
      userPattern.push(quadrant.id);
      animateQuadrant(quadrant);
      if (userPattern.length === gamePattern.length) {
        if (checkPattern()) {
          generateGamePattern();
          showGameSequence();
          level++;
          levelDisplay.innerHTML = `Number of steps: ${level}`;
        } else {
          alert(`Wrong sequence!`);
          showGameSequence();
        }
      }
    }
  });
});
