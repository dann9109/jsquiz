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
// var userScore = null;


// Check if the current question index is equal to the total number of questions
if (currentQuestionIndex === questions.length) {
    console.log('End the game');
}




// Function that checks if the button pressed contains the correct answer
function checkAnswer(eventObj) {
    eventObj.stopPropagation();

    // Grab the targeted element that was clicked
    var el = eventObj.target;
    var currentQuestion = questions[currentQuestionIndex];

    // Determine conditionally if the el was a button
    if (el.tagName === 'BUTTON') {
        // Store the user's answer
        var userAnswer = el.textContent;
        var answer = document.querySelector('.answer')

        console.log('userAnswer is', userAnswer);
        console.log('asnwer is', answer);

        // Determine if the user's answer (button text) is equal to the current question's correct answer
        if (userAnswer === currentQuestion.correctAnswer) {
            answer.textContent = 'Correct'
            answer.classList.add('show')
        } else {
            answer.textContent = 'Wrong'
            // answer.classList.add('show')
            answer.classList.toggle("hide");
            time -= 15;
        }
        setTimeout(function () {
            answer.classList.remove('show');


            currentQuestionIndex++


            if (currentQuestionIndex === questions.length) {
                endGame();
            } else {
                displayQuestion();
            }
        }, 300)
    }
    // increase currentQuestionIndex by 1 to move to the next question
    currentQuestionIndex++;
    // if the currentQuestionIndex is equal to the amount of questions in the questions array then call end game

    if (currentQuestionIndex === questions.length) {
        endGame();
    }
}




// Function to end the game
function endGame() {
    // stop the timer
    clearInterval(timer);


    var messageParagraph = document.querySelector('#endgame');
    messageParagraph.textContent = 'Game Over';
    messageParagraph.style.display = 'initial';
    // reset time back to 60 sec


    questionWrap.classList.add('hide')

    var scoreOutput = document.querySelector('#score-output');

    scoreOutput.textContent = 'Score: ' + (time >= 0 ? time : 0);

    scoreWrap.classList.remove('hide')

    time = 60;

    currentQuestionIndex = 0;
}

// Function to start the game
function startGame() {

    timeOutput.textContent = 'Time: ' + time;

    timer = setInterval(function () {
        time--;
        timeOutput.textContent = 'Time Left: ' + time;

        // Check if time is up and end the game

        timeOutput.innerText = 'Time: ' + (time >= 0 ? time : 0);
        if (time <= 0) {
            endGame();
        }
    }, 1000);



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





// Set a click listener on the parent div of all the choice buttons
choicesDiv.addEventListener('click', checkAnswer);

startBtn.addEventListener('click', startGame);
saveScoreBtn.addEventListener('click', function () {
    var userName = inputUserScore.value

    // you alrday have the score value
    console.log(userName)
    // create an object, i.e. think curly braces
    // save the object to local storage using localstorage.setItem();
    // then just do a document.location.replace("/highscore.html");


    // when you click on the save score button, you want to grab the score( i.e. time variable) and input field value 
    // and save them to local storage. https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

    var scoreData = {
        username: userName,
        score: score
    };

    // Save the scoreData object to local storage
    localStorage.setItem('scoreData', JSON.stringify(scoreData));

    // Redirect to highscores.html
    window.location.replace("./highscores.html");


})



