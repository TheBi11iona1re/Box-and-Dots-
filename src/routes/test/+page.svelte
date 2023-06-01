
<body>
    
    <table id="gameBoard"></table>
    
    <script lang="ts">

var gridSize = 10;
var gameBoard = document.getElementById("gameBoard");
var playerSymbol = 'P';
var computerSymbol = 'Ai';
for (var i = 0; i < gridSize; i++) {
    var row = document.createElement("tr");
    for (var j = 0; j < gridSize; j++) {
        var cell = document.createElement("td");
        cell.id = "cell-".concat(i, "-").concat(j);
        cell.addEventListener('click', playerMove);
        row.appendChild(cell);
    }
    gameBoard.appendChild(row);
}
function playerMove(event) {
    var cell = event.target;
    if (cell.textContent === '') {
        cell.textContent = playerSymbol;
        cell.classList.add("player"); // Add player class
        cell.removeEventListener('click', playerMove);
        if (!checkForLine(playerSymbol)) {
            computerMove();
        }
    }
}
function computerMove() {
    var emptyCells = [];
    var bestMove = null;
    var highestScore = -Infinity;
    for (var i = 0; i < gridSize; i++) {
        for (var j = 0; j < gridSize; j++) {
            var cell = document.getElementById("cell-".concat(i, "-").concat(j));
            if (cell.textContent === '') {
                emptyCells.push(cell);
                // Calculate the score for this move
                var score = evaluateMove(i, j, computerSymbol) + evaluateMove(i, j, playerSymbol);
                // Update the best move if the score is higher than the current highest score
                if (score > highestScore) {
                    highestScore = score;
                    bestMove = cell;
                }
            }
        }
    }
    if (bestMove) {
        bestMove.textContent = computerSymbol;
        bestMove.classList.add("computer"); // Add computer class
        bestMove.removeEventListener('click', playerMove);
        checkForLine(computerSymbol);
    }
}
function evaluateMove(row, col, symbol) {
    var directions = [
        { dr: 1, dc: 0 },
        { dr: 0, dc: 1 },
        { dr: 1, dc: 1 },
        { dr: 1, dc: -1 } // Diagonal up-right
    ];
    var score = 0;
    for (var _i = 0, directions_1 = directions; _i < directions_1.length; _i++) {
        var direction = directions_1[_i];
        var count = 0;
        var blocked = 0;
        for (var i = -4; i <= 4; i++) {
            var newRow = row + i * direction.dr;
            var newCol = col + i * direction.dc;
            if (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize) {
                var cell = document.getElementById("cell-".concat(newRow, "-").concat(newCol));
                if (cell.textContent === symbol) {
                    count++;
                }
                else if (cell.textContent !== '') {
                    blocked++;
                }
            }
            else {
                blocked++;
            }
        }
        if (count >= 4 && blocked < 2) {
            score += count;
        }
    }
    return score;
}
function checkForLine(symbol) {
    // Check rows
    for (var i = 0; i < gridSize; i++) {
        var count = 0;
        for (var j = 0; j < gridSize; j++) {
            var cell = document.getElementById("cell-".concat(i, "-").concat(j));
            if (cell.textContent === symbol) {
                count++;
            }
            else {
                count = 0;
            }
            if (count === 5) {
                gameOver(symbol);
                return true;
            }
        }
    }
    // Check columns
    for (var j = 0; j < gridSize; j++) {
        var count = 0;
        for (var i = 0; i < gridSize; i++) {
            var cell = document.getElementById("cell-".concat(i, "-").concat(j));
            if (cell.textContent === symbol) {
                count++;
            }
            else {
                count = 0;
            }
            if (count === 5) {
                gameOver(symbol);
                return true;
            }
        }
    }
    // Check diagonals
    for (var i = 0; i < gridSize - 4; i++) {
        for (var j = 0; j < gridSize - 4; j++) {
            var count = 0;
            for (var k = 0; k < 5; k++) {
                var cell = document.getElementById("cell-".concat(i + k, "-").concat(j + k));
                if (cell.textContent === symbol) {
                    count++;
                }
                else {
                    break;
                }
            }
            if (count === 5) {
                gameOver(symbol);
                return true;
            }
        }
    }
    for (var i = 0; i < gridSize - 4; i++) {
        for (var j = 4; j < gridSize; j++) {
            var count = 0;
            for (var k = 0; k < 5; k++) {
                var cell = document.getElementById("cell-".concat(i + k, "-").concat(j - k));
                if (cell.textContent === symbol) {
                    count++;
                }
                else {
                    break;
                }
            }
            if (count === 5) {
                gameOver(symbol);
                return true;
            }
        }
    }
    return false;
}
function gameOver(symbol) {
    for (var i = 0; i < gridSize; i++) {
        for (var j = 0; j < gridSize; j++) {
            var cell = document.getElementById("cell-".concat(i, "-").concat(j));
            cell.removeEventListener('click', playerMove);
            
        }
    }
    var reloaded = localStorage.getItem("reloaded");
    alert("".concat(symbol === playerSymbol ? 'Player' : 'Computer', " wins!"));
    // If not, set the reloaded flag to true and reload the page
    if (!reloaded) {
        localStorage.setItem("reloaded", true);
        location.reload(true);
        localStorage.removeItem("reloaded");
    }
    // If yes, clear the reloaded flag and proceed normally
    else {
        localStorage.removeItem("reloaded");
        // Your normal code here
    }
}

       
    </script>
</body>
    
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Longest Line Game</title>
    <p>hi</p>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f0f0f0;
        }
        table {
            border-collapse: collapse;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        td {
            border: 1px solid #ccc;
            width: 30px;
            height: 30px;
            text-align: center;
            background-color: #fff;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        td.player, td.computer {
            cursor: default;
        }
        td.player {
            background-color: #4040ed;
        }
        td.computer {
            background-color: #ed4040;
        }
        
        .square {
      background: rgba(98, 98, 98, 0.15);
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
      backdrop-filter: blur(13px);
      -webkit-backdrop-filter: blur(13px);
      border: 1.25px solid rgba(255, 255, 255, 0.18);
      transition: width 0.4s, height 0.4s;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
  }
    </style>
    </head>






