
var backBtn = document.querySelector('#backbtn');
backBtn.textContent = 'Back'


function outputHighscores() {
    var highScoreOutput = document.querySelector('.highscores-output');

    var rawData = localStorage.getItem('scoreData');


    var scoreData = JSON.parse(rawData);


    for (var i = 0; i < scoreData.length; i++) {
        var div = document.createElement('div');

        var h3 = document.createElement('h3');

        var p = document.createElement('p');


        var scoreObj = scoreData[i];


        h3.textContent = 'User Name: ' + scoreObj.userName;
        p.textContent = 'Score: ' + scoreObj.score;

        div.append(h3, p);

        highScoreOutput.append(div);
    }
};


function goBack() {


    window.location.replace('./index.html')
}


backBtn.addEventListener('click', goBack)



outputHighscores();