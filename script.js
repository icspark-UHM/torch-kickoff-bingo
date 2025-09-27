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
    "Lives in the dorms",
    "What's your go-to debugging tip?",
    "Describe a fun group project",
    "Has visisted 3+ islands in Hawaiʻi",
    "Share an experience with a tech fail",
    "Can recommend a hole-in-the-wall plate lunch spot",
    "How do you make debugging fun?",
    "What’s the most creative student project?",
    "Share a cool CS resource",
    "Has eaten loco moco or spam musubi this week",
    "Talk about a student who inspired you",
    "Where is your favorite place to go eat on island?",
    "What's your biggest teaching challenge?",
    "Has changed their major at least once",
    "How do you keep students engaged?",
    "What’s the best way to teach recursion?",
    "Describe an ideal CS classroom",
    "Most common student question?",
    "Can brag about their custom-built keyboard",
    "Commutes to school",
    "Plays an instrument or sings",
    "Favorite tech tool for teaching?",
    "How do you integrate CS with other subjects?",
    "Shows their favorite music playlist"
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
  // Blackout win: ALL cells must be marked
  const cells = document.querySelectorAll(".bingo-cell");
  const allMarked = Array.from(cells).every(cell => cell.classList.contains("marked"));
  if (allMarked) {
    declareWin();
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
