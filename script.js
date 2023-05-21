
const scenes = {
    start: document.querySelector('#start'),
    game: document.querySelector('#game'),
    end: document.querySelector('#end')
}

const gameStatusElement = document.querySelector('#status div');

var ai = 1;
var human = -1;

var winner;

var endState = 0;
var currentPlayer;
var currentSign;

var freeSpaces = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

var tileElements = [...document.querySelectorAll('#board div')];

function start() {

    if (Math.random() >= .5) {

        currentPlayer = ai;
        currentSign = 'X';
        switchScene('game');
        bestMove();

    } else {

        currentPlayer = human;
        currentSign = 'O';
        switchScene('game');
        changeStatus('Twój Ruch!');
    }
}

function changeStatus(text) {

    gameStatusElement.textContent = text;

}

function canMakeMove() {

    return freeSpaces.length > 0;

}

function isSpaceFree(tileId) {

    return freeSpaces.includes(tileId);

}

function changeSign() {

    if (currentSign == 'O')
        currentSign = 'X';
    else
        currentSign = 'O';

}

function makeMove(tileId) {

    if (!isSpaceFree(tileId))
        return 0;

    board[tileId] = currentPlayer;

    tileElements[tileId].textContent = currentSign;

    freeSpaces = freeSpaces.filter(v => v != tileId);

    if (checkLooser() != null) {
        endState = 1;
    }

    changeSign();

    if (endState == 1) {
        end(winner);
    }

    return 1;

}

function tileClick(tile) {

    if (!canMakeMove())
        return;

    if (!makeMove(Number.parseInt(tile.id)))
        return;

    if (checkLooser() != null) {
        endState = 1;
    }

    if (endState == 1) {
        end(winner);
    }
    changeStatus("Ruch CPU!");
    currentPlayer = ai;
	setTimeout(bestMove, 200);


}

function end(winner) {

    const endText = document.querySelector('#end .title');

    if (winner == -1)
        endText.textContent = 'Przegrałeś!';
    else if (winner == 1)
        endText.Content = 'Wygrałeś!';
    else
        endText.textContent = 'Remis!';
    switchScene('end');
}

function equals3(a, b, c) {
    return a == b && b == c && a != 0;
}

function checkLooser() {
    winner = null;

    for (let i = 0; i < 3; i++) {
        if (equals3(board[i], board[i + 3], board[i + 6])) {
            winner = board[i];
        }
    }

    if (equals3(board[0], board[1], board[2])) {
        winner = board[0];
    }

    if (equals3(board[3], board[4], board[5])) {
        winner = board[3];
    }

    if (equals3(board[6], board[7], board[8])) {
        winner = board[6];
    }

    if (equals3(board[0], board[4], board[8])) {
        winner = board[0];
    }
    if (equals3(board[2], board[4], board[6])) {
        winner = board[2];
    }

    if (winner == null && freeSpaces.length == 0) {
        return 'tie';
    } else {
        return winner;
    }

}

function switchScene(target) {

    for (const scene in scenes)
        scenes[scene].style.display = 'none';

    scenes[target].style.display = '';
}


