let currentQuestionIndex = 0;
let currentPlayerIndex = 0;
let players = ['Jugador 1', 'Jugador 2', 'Jugador 3'];
let scores = [
    { name: 'Jugador 1', score: 0 },
    { name: 'Jugador 2', score: 0 },
    { name: 'Jugador 3', score: 0 }
];
const maxQuestions = 10; // Máximo de preguntas mostradas por juego

// Generación aleatoria de preguntas y respuestas
const questions = generateQuestions(30);

function generateQuestions(numQuestions) {
    const operations = ['+', '-', '/'];
    const generatedQuestions = [];

    for (let i = 0; i < numQuestions; i++) {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const operation = operations[Math.floor(Math.random() * operations.length)];

        let question, answer;
        switch (operation) {
            case '+':
                question = `${num1} + ${num2}`;
                answer = num1 + num2;
                break;
            case '-':
                question = `${num1} - ${num2}`;
                answer = num1 - num2;
                break;
            case '/':
                question = `${num1 * num2} / ${num2}`;
                answer = num1;
                break;
        }

        generatedQuestions.push({ question, answer });
    }

    return generatedQuestions;
}

function displayQuestion() {
    const { question } = questions[currentQuestionIndex];
    document.getElementById('question').textContent = `¿Cuánto es ${question}?`;
    document.getElementById('answer').value = '';
    document.getElementById('feedback').textContent = '';
    document.getElementById('submitBtn').style.display = 'inline-block';
    document.getElementById('nextBtn').style.display = 'none';
}

function checkAnswer() {
    const userAnswer = Number(document.getElementById('answer').value);
    const { answer } = questions[currentQuestionIndex];

    if (userAnswer === answer) {
        document.getElementById('feedback').textContent = '¡Correcto!';
        document.getElementById('feedback').style.color = 'green';
        scores[currentPlayerIndex].score++;
    } else {
        document.getElementById('feedback').textContent = 'Incorrecto, intenta de nuevo.';
        document.getElementById('feedback').style.color = 'red';
        switchPlayer();
    }

    document.getElementById('submitBtn').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'inline-block';
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < maxQuestions) {
        displayQuestion();
    } else {
        endGame();
    }
}

function switchPlayer() {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    document.getElementById('feedback').textContent = `${players[currentPlayerIndex]}, es tu turno.`;
}

function endGame() {
    document.getElementById('game').style.display = 'none';
    showScores();
}

function showScores() {
    const scoreList = document.getElementById('scoreList');
    scoreList.innerHTML = '';

    // Ordenar jugadores por puntaje
    scores.sort((a, b) => b.score - a.score);

    // Crear lista de puntajes
    scores.forEach(player => {
        const li = document.createElement('li');
        li.textContent = `${player.name}: ${player.score} puntos`;
        scoreList.appendChild(li);
    });

    document.getElementById('scorePopup').style.display = 'flex';
}

function hideScores() {
    document.getElementById('scorePopup').style.display = 'none';
}

function restartGame() {
    currentQuestionIndex = 0;
    currentPlayerIndex = 0;
    scores.forEach(player => {
        player.score = 0;
    });
    document.getElementById('game').style.display = 'block';
    displayQuestion();
    hideScores();
}

// Inicializar el juego con la primera pregunta
displayQuestion();
