let currentQuestionIndex = 0;
let questions = [];
let score = 0;

async function fetchQuestions() {
    try {
        const response = await fetch('pertanyaan.json'); // Ganti dengan nama file JSON Anda
        const data = await response.json();
        questions = data.results;
        loadQuestion();
    } catch (error) {
        console.error('Error fetching questions:', error);
    }
}

function loadQuestion() {
    const questionElement = document.getElementById('question');
    const answersElement = document.getElementById('answers');
    const nextBtn = document.getElementById('next-btn');

    if (currentQuestionIndex >= questions.length) {
        questionElement.textContent = 'Kuis Selesai!';
        answersElement.innerHTML = '';
        nextBtn.disabled = true;
        document.getElementById('result').textContent = `Skor Anda: ${score}/${questions.length}`;
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = currentQuestion.question;
    
    const correctAnswer = currentQuestion.correct_answer;
    const answers = [...currentQuestion.incorrect_answers, correctAnswer];
    answers.sort(() => Math.random() - 0.5);

    answersElement.innerHTML = '';
    answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.classList.add('answer-btn');
        button.addEventListener('click', () => selectAnswer(button, correctAnswer));
        answersElement.appendChild(button);
    });

    nextBtn.disabled = true;
}

function selectAnswer(selectedBtn, correctAnswer) {
    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach(button => {
        button.disabled = true;
        if (button.textContent === correctAnswer) {
            button.style.backgroundColor = 'green';
        } else {
            button.style.backgroundColor = 'red';
        }
    });

    if (selectedBtn.textContent === correctAnswer) {
        score++;
    }

    document.getElementById('next-btn').disabled = false;
}

function loadNextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

window.onload = fetchQuestions;
