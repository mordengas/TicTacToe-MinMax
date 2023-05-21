
// Wykorzystany algorytm minmax znajduje się w poniższym linku
// https://github.com/CodingTrain/website/tree/main/CodingChallenges/CC_154_Tic_Tac_Toe_Minimax/P5


function bestMove() {
  // AI to make its turn
  let bestScore = Infinity;
  let move;
  for (let i = 0; i < 9; i++) {
      // Is the spot available?
      if (board[i] == 0) {
        board[i] = ai;
        let score = minimax(board, 0, true);
        board[i] = 0;
        if (score < bestScore) {
          bestScore = score;
          move = i;
        }
      }
  }

  makeMove(move);
  currentPlayer = human;
  currentSign = 'O';
  changeStatus("Twój Ruch!");
}

let scores = {
  '1': 10,
  '-1': -10,
  tie: 0
};

function minimax(board, depth, isMaximizing) {
  let result = checkLooser();
  if (result !== null) {
    return scores[result];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
        // Is the spot available?
        if (board[i] == 0) {
          board[i] = human;
          let score = minimax(board, depth + 1, false);
          board[i] = 0;
          bestScore = Math.max(score, bestScore);
        }
    }
    return bestScore;
	
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
        // Is the spot available?
        if (board[i] == 0) {
          board[i] = ai;
          let score = minimax(board, depth + 1, true);
          board[i] = 0;
          bestScore = Math.min(score, bestScore);
        }
    }
    return bestScore;
  }
}
