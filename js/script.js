// Global variables

var time = 60;
var timer;
var currentQuestionIndex = 0;
var startBtn = document.querySelector('#start')
var questionWrap = document.querySelector('.question-wrap')
var timeOutput = document.querySelector('#clock')
// Select the choice div
var choicesDiv = document.querySelector('.choices')
var scoreWrap = document.querySelector('.score-wrap')
var saveScoreBtn = document.getElementById("save-score");
var inputUserScore = document.getElementById("initial-input")
var messageParagraph = document.querySelector('#gameover-text');
var clicked = false;

// Check if the current question index is equal to the total number of questions
// if (currentQuestionIndex === questions.length) {
//     // console.log('End the game');
// }




// Function that checks if the button pressed contains the correct answer
function checkAnswer(eventObj) {
    eventObj.stopPropagation();
    // After clicking do not allow another click until the next question has been displayed
    if (clicked) {
        return;
    }
    // Grab the targeted element that was clicked
    var el = eventObj.target;
    var currentQuestion = questions[currentQuestionIndex];

    // Determine conditionally if the el was a button
    if (el.tagName === 'BUTTON') {
        // Store the user's answer
        var userAnswer = el.textContent;
        var answer = document.querySelector('.answer')

        // console.log('userAnswer is', userAnswer);
        // console.log('asnwer is', answer);

        // Determine if the user's answer (button text) is equal to the current question's correct answer
        if (userAnswer === currentQuestion.correctAnswer) {
            answer.textContent = 'Correct'
            answer.classList.add('show')
        } else {
            answer.textContent = 'Wrong'
            // answer.classList.add('show')
            answer.classList.toggle("hide");
            // if (time -= 15 < 0) {
            //     time = 0
            // } else {
            //     time -= 15;
            // }
            time = (time - 15 < 0) ? 0 : time - 15;
        }

        clicked = true;

        setTimeout(function () {
            answer.classList.remove('show');


            currentQuestionIndex++


            if (currentQuestionIndex === questions.length) {
                console.log('end')
                endGame();
            } else {
                console.log('next')
                displayQuestion();

            }
            clicked = false;
        }, 700);
    }

}




// Function to end the game
function endGame() {
    // stop the timer
    clearInterval(timer);



    messageParagraph.textContent = 'Game Over';
    messageParagraph.classList.remove('hide')
    // messageParagraph.style.display = 'initial';
    // reset time back to 60 sec


    questionWrap.classList.add('hide')

    var scoreOutput = document.querySelector('#score-output');

    scoreOutput.textContent = 'Score: ' + (time >= 0 ? time : 0);

    scoreWrap.classList.remove('hide')


}

// Function to start the game
function startGame() {

    time = 60;

    currentQuestionIndex = 0;

    timeOutput.textContent = 'Time: ' + time;

    timer = setInterval(function () {
        time = (time - 1) < 0 ? 0 : time - 1;

        timeOutput.textContent = 'Time Left: ' + time;

        // Check if time is up and end the game

        timeOutput.innerText = 'Time: ' + (time >= 0 ? time : 0);
        if (time <= 0) {
            endGame();
        }
    }, 1000);


    messageParagraph.classList.add('hide')
    displayQuestion();
    startBtn.classList.add('hide')
    questionWrap.classList.remove('hide')
    timeOutput.classList.remove('hide')


}



// Function to display the current question
function displayQuestion() {
    var currentQuestion = questions[currentQuestionIndex];

    // Output the current question text to the h2 within our question-wrap HTML
    var textEl = document.querySelector('.question-text');
    textEl.textContent = currentQuestion.questionText;
    choicesDiv.innerHTML = ''
    for (i = 0; i < currentQuestion.choices.length; i++) {
        var choiceBtn = document.createElement('button');
        choiceBtn.textContent = currentQuestion.choices[i];

        // Output the button to the choices div within our question wrap


        // Append the button to the choices div
        choicesDiv.append(choiceBtn);
    }
}


function saveScore() {
    var initialUserName = inputUserScore.value



    var rawData = localStorage.getItem('scoreData');
    var scoreData = JSON.parse(rawData) || [];

    scoreData.push({
        userName: initialUserName,
        // use time variable as the score
        score: time
    });

    // Save the scoreData object to local storage
    localStorage.setItem('scoreData', JSON.stringify(scoreData));

    // Redirect to highscores.html
    window.location.replace("./highscores.html");

}


// Set a click listener on the parent div of all the choice buttons
choicesDiv.addEventListener('click', checkAnswer);

startBtn.addEventListener('click', startGame);

saveScoreBtn.addEventListener('click', saveScore);













