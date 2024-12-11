const stageDisplay = document.getElementById("stage-display");
const scoreDisplay = document.getElementById("score-display");
const timerBar = document.getElementById("time-bar");
const gameBoard = document.getElementById("game-board");
const timeLeftDisplay = document.getElementById("time-left");
const gameOverMessage = document.getElementById("game-over-message");
const nickName = document.getElementById("nickname");

let score = 0;
let time = 15;
let interval;
let stage = 1;
let boardSize = 2;
let colorDifference = 50;

function startGame() {
  const savedNickname = localStorage.getItem("nickname");

  if (savedNickname === "admin") {
    score = 100000000000000000000;
    stage = 100000000000000000000;
  } else {
    score = 0;
    stage = 0;
  }
  
  time = 15;
  boardSize = 2;
  colorDifference = 40;

  updateScore();
  updateStage();
  updateTime();
  createBoard();
  interval = setInterval(updateTime, 1000);
}

function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
}

function updateStage() {
  stageDisplay.textContent = `Stage: ${stage}`;
}

function updateTime() {
  if (time > 0) {
    time -= 1;
    timerBar.style.width = `${(time / 15) * 100}%`;
    timeLeftDisplay.textContent = `남은 시간: ${time}s`;
  } else {
    time = 0;
    timeLeftDisplay.textContent = `남은 시간: 0s`;
    endGame();
  }
}

function createBoard() {
  gameBoard.innerHTML = "";
  gameBoard.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
  gameBoard.style.gridTemplateRows = `repeat(${boardSize}, 1fr)`;

  const totalCells = boardSize * boardSize;
  const correctCell = Math.floor(Math.random() * totalCells);
  const baseColor = getRandomColor();
  const differentColor = getSlightlyDifferentColor(baseColor, colorDifference);

  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement("div");
    cell.classList.add("board-cell");
    cell.style.backgroundColor = i === correctCell ? differentColor : baseColor;
    cell.addEventListener("click", () => handleCellClick(i === correctCell));
    gameBoard.appendChild(cell);
  }
}

function getRandomColor() {
  const r = Math.floor(Math.random() * 200);
  const g = Math.floor(Math.random() * 200);
  const b = Math.floor(Math.random() * 200);
  return `rgb(${r}, ${g}, ${b})`;
}

function getSlightlyDifferentColor(color, difference) {
  const [r, g, b] = color.match(/\d+/g).map(Number);
  const adjust = (value) => Math.min(255, Math.max(20, value  + (Math.random() < 0.5 ? -difference : difference)));
  return `rgb(${adjust(r)}, ${adjust(g)}, ${adjust(b)})`;
}


function handleCellClick(isCorrect) {
  if (isCorrect) {
    const baseScore = 10 * stage;
    const exponentialBonus = Math.floor(stage ** 3);
    const targetScore = score + baseScore + exponentialBonus;
    animateScore(targetScore);
    nextWave();
  } else {
    time = Math.max(0, time - 3);
    timerBar.style.transition = "width 0.3s ease";
    timerBar.style.width = `${(time / 15) * 100}%`;
    timeLeftDisplay.textContent = `남은 시간: ${time}s`;
    if (time === 0) {
      endGame();
    }
  }
}

function nextWave() {
  stage++;
  if (stage % 4 === 1) {
    boardSize = Math.min(boardSize + 1, 7);
  }
  if (stage <= 45) {
    colorDifference = Math.max(50, colorDifference - 1);
  } else {
    colorDifference = Math.max(5, colorDifference - 5);
  }
  updateStage();
  createBoard();
  time = 15;
}

function animateScore(targetScore) {
  const increment = Math.ceil((targetScore - score) / 30);
  const interval = setInterval(() => {
    score += increment;
    if (score >= targetScore) {
      score = targetScore;
      clearInterval(interval);
    }
    scoreDisplay.textContent = `Score: ${score}`;
  }, 10);
}

function endGame() {
  clearInterval(interval);
  
  // 최종 점수와 스테이지를 로컬 스토리지에 저장
  localStorage.setItem("finalScore", score);
  localStorage.setItem("finalStage", stage);

  gameOverMessage.style.display = "flex";
  document.getElementById("final-stage").textContent = stage;
  document.getElementById("final-score").textContent = score;
}


function restartGame() {
  score = 0;
  time = 15;
  stage = 1;
  colorDifference = 35;
  gameOverMessage.style.display = "none";
  startGame();
}

function goHome() {
  window.location.href = "/Home/Home.html";
}

startGame();

document.addEventListener("DOMContentLoaded", () => {
  const nicknameElement = document.getElementById("nickname");
  const savedNickname = localStorage.getItem("nickname");

  if (savedNickname) {
    nicknameElement.textContent = savedNickname; // 닉네임 표시
  } else {
    nicknameElement.textContent = "사용자"; // 닉네임 없을 경우 기본값
  }
});

function ClickLogo(){
  location.href = '/Home/Home.html';
}