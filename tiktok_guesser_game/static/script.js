let questions = [];
let currentQuestionIndex = 0;
let currentPlayer = 1;
let scores = { 1: 0, 2: 0 };
let timer;
let countdown = 10;

async function startGame() {
    document.getElementById("start-btn").style.display = "none";
    const response = await fetch('/get_questions');
    questions = await response.json();
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endGame();
        return;
    }

    const question = questions[currentQuestionIndex];
    document.getElementById("quote").textContent = question.quote;
    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = '';
    
    question.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => checkAnswer(option));
        optionsContainer.appendChild(button);
    });

    startTimer();
    updateTurnInfo();
}

function startTimer() {
    countdown = 10;
    document.getElementById("timer").textContent = `Time left: ${countdown}s`;
    timer = setInterval(() => {
        countdown--;
        document.getElementById("timer").textContent = `Time left: ${countdown}s`;
        if (countdown <= 0) {
            clearInterval(timer);
            switchTurn();
        }
    }, 1000);
}

function checkAnswer(selectedOption) {
    clearInterval(timer);
    const question = questions[currentQuestionIndex];
    if (selectedOption === question.answer) {
        scores[currentPlayer]++;
        document.getElementById(`player${currentPlayer}-score`).textContent = scores[currentPlayer];
    }
    switchTurn();
}

function switchTurn() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    currentQuestionIndex++;
    loadQuestion();
}

function updateTurnInfo() {
    document.getElementById("turn-info").textContent = `Player ${currentPlayer}'s Turn`;
}

function endGame() {
    let message = `Game Over! `;
    if (scores[1] > scores[2]) {
        message += "Player 1 Wins!";
    } else if (scores[2] > scores[1]) {
        message += "Player 2 Wins!";
    } else {
        message += "It's a Tie!";
    }
    document.getElementById("end-game-message").textContent = message;
}

document.getElementById("start-btn").addEventListener("click", startGame);
