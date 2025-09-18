document.addEventListener("DOMContentLoaded", function() {
  const board = document.getElementById("bingo-board");
  const resetButton = document.getElementById("reset");
  const statusText = document.getElementById("status");
  const rulesPopup = document.getElementById("rules-popup");
  const rulesBtn = document.getElementById("rules-btn");
  const closeRules = document.getElementById("close-rules");
  const resetPopup = document.getElementById("reset-popup");
  const confirmReset = document.getElementById("confirm-reset");
  const cancelReset = document.getElementById("cancel-reset");
  let gameWon = false;

  const prompts = [
    "Discuss an AI tool you've used in class",
    "Share a favorite coding challenge",
    "Talk about a time students surprised you",
    "What's your go-to debugging tip?",
    "Describe a fun group project",
    "How do you encourage collaboration?",
    "Share an experience with a tech fail",
    "Best way to teach loops?",
    "How do you make debugging fun?",
    "What’s the most creative student project?",
    "Share a cool CS resource",
    "What's your favorite algorithm to teach?",
    "Talk about a student who inspired you",
    "Where is your favorite place to go eat on island?",
    "What's your biggest teaching challenge?",
    "Favorite classroom icebreaker?",
    "How do you keep students engaged?",
    "What’s the best way to teach recursion?",
    "Describe an ideal CS classroom",
    "Most common student question?",
    "What's an underrated CS topic?",
    "How do you teach debugging strategies?",
    "What’s a fun way to teach binary?",
    "Favorite tech tool for teaching?",
    "How do you integrate CS with other subjects?"
  ];

  function generateBingoCard() {
    board.innerHTML = "";
    statusText.style.display = "none";
    gameWon = false;
    let shuffledPrompts = prompts.sort(() => 0.5 - Math.random()).slice(0, 25);

    shuffledPrompts[12] = "FREE SPACE";

    shuffledPrompts.forEach((prompt, index) => {
      const cell = document.createElement("div");
      cell.classList.add("bingo-cell");
      cell.textContent = prompt;
      if (index === 12) {
        cell.classList.add("free", "marked");
      } else {
        cell.addEventListener("click", markCell);
      }
      board.appendChild(cell);
    });
  }

  function markCell() {
    if (gameWon) return;
    this.classList.toggle("marked");
    checkWin();
  }

  function checkWin() {
    const cells = document.querySelectorAll(".bingo-cell");
    let grid = [];
    for (let i = 0; i < 5; i++) {
      grid.push(Array.from(cells).slice(i * 5, i * 5 + 5));
    }

    for (let i = 0; i < 5; i++) {
      if (grid[i].every(cell => cell.classList.contains("marked")) ||
        grid.map(row => row[i]).every(cell => cell.classList.contains("marked"))) {
        declareWin();
        return;
      }
    }

    if (grid.map((row, i) => row[i]).every(cell => cell.classList.contains("marked")) ||
      grid.map((row, i) => row[4 - i]).every(cell => cell.classList.contains("marked"))) {
      declareWin();
      return;
    }
  }

  function declareWin() {
    statusText.style.display = "block";
    gameWon = true;
  }

  resetButton.addEventListener("click", () => resetPopup.style.display = "block");
  confirmReset.addEventListener("click", () => {
    resetPopup.style.display = "none";
    generateBingoCard();
  });
  cancelReset.addEventListener("click", () => resetPopup.style.display = "none");
  rulesBtn.addEventListener("click", () => rulesPopup.style.display = "block");
  closeRules.addEventListener("click", () => rulesPopup.style.display = "none");

  generateBingoCard();
});