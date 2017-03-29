var newGameBtn = document.getElementById('js-newGameButton');

newGameBtn.addEventListener('click', newGame);

var pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function () { playerPick('rock'); });
pickPaper.addEventListener('click', function () { playerPick('paper'); });
pickScissors.addEventListener('click', function () { playerPick('scissors'); });

// Wartości początkowe
var gameState = 'notStarted', //'started', 'ended'
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    },
    numberOfWins = 1;

var newGameElem = document.getElementById('js-newGameElement'),
    endGameElem = document.getElementById('js-endGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultElem = document.getElementById('js-resultsTableElement');

// Wyświetlanie elementów gry
function setGameElements() {
    switch (gameState) {
        case 'started':
            newGameElem.style.display = 'none';
            endGameElem.style.display = 'none';
            pickElem.style.display = 'block';
            resultElem.style.display = 'block';
            break;
        case 'ended':
            newGameBtn.innerText = 'Zagraj jeszcze raz';
        case 'notStarted':
        default:
            newGameElem.style.display = 'block';
            endGameElem.style.display = 'block';
            pickElem.style.display = 'none';
            resultElem.style.display = 'none';
    }
}

// Wyświetlanie elementów po załadowaniu strony
window.onload = function() {
    endGameElem.style.display = 'none';
    pickElem.style.display = 'none';
    resultElem.style.display = 'none';
}

var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');

// Rozpoczęcie nowej gra
function newGame() {
    player.name = prompt('Graczu, wpisz swoje imię', 'imię gracza');
    
    do {
        numberOfWins = prompt('Do ilu gramy zwycięstw?', 3);
    } while (isNaN(numberOfWins));
    
    if (player.name) {
        player.score = computer.score = 0;
        gameState = 'started';
        setGameElements();
        playerNameElem.innerHTML = player.name;
        playerPointsElem.innerHTML = 0;
        playerPickElem.innerHTML = 'Wybór gracza';
        playerResultElem.innerHTML = 'Wynik gracza';
        computerPointsElem.innerHTML = 0;
        computerPickElem.innerHTML = 'Wybór komputera';
        computerResultElem.innerHTML = 'Wynik komputera';
        //setGamePoints();
    }
}

// Wybór gracza
function playerPick(playerPick) {
    var computerPick = getComputerPick();
    
    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;
    
    checkRoundWinner(playerPick, computerPick);
    setGamePoints();
    whoWin(numberOfWins);
}

//Wybór komputera
function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random() * 3)];
}

var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

//Przyznawanie punktów
function checkRoundWinner(playerPick, computerPick) {
    playerResultElem.innerHTML = computerResultElem.innerHTML = '';
    
    var winnerIs = 'player';
    
    if (playerPick == computerPick) {
        winnerIs = 'none'; //remis
    } else if (
        (computerPick == 'rock' && playerPick == 'scissors') ||
        (computerPick == 'scissors' && playerPick == 'paper') ||
        (computerPick == 'paper' && playerPick == 'rock')) {
        
        winnerIs = 'computer';
    }
    
    if (winnerIs == 'player') {
        playerResultElem.innerHTML = 'Wygrana!';
        player.score++;
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = 'Wygrana!';
        computer.score++;
    }
}

//Aktualizacja wyniku
function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}

//Zakończenie rozgrywki
var endGameResultElem = document.getElementById('js-endGameResult');

function whoWin(numberOfWins) {
    if (player.score == numberOfWins) {
        gameState = 'ended';
        endGameResultElem.innerHTML = 'Wygrał gracz: ' + player.name;
    } else if (computer.score == numberOfWins) {
        gameState = 'ended';
        endGameResultElem.innerHTML = 'Wygrał gracz: Komputer';
    }
    
    setGameElements();
}