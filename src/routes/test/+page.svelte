
<body>
    
    <table id="gameBoard"></table>
    
    <script>
        const gridSize = 10;
        const gameBoard = document.getElementById("gameBoard");
        const playerSymbol = 'P';
        const computerSymbol = 'C';

        for (let i = 0; i < gridSize; i++) {
            const row = document.createElement("tr");
            for (let j = 0; j < gridSize; j++) {
                const cell = document.createElement("td");
                cell.id = `cell-${i}-${j}`;
                cell.addEventListener('click', playerMove);
                row.appendChild(cell);
            }
            gameBoard.appendChild(row);
        }

        function playerMove(event) {
            const cell = event.target;
            if (cell.textContent === '') {
                cell.textContent = playerSymbol;
                cell.removeEventListener('click', playerMove);
                if (!checkForLine(playerSymbol)) {
                    computerMove();
                }
            }
        }

        function computerMove() {
    let emptyCells = [];
    let bestMove = null;
    let highestScore = -Infinity;

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cell = document.getElementById(`cell-${i}-${j}`);
            if (cell.textContent === '') {
                emptyCells.push(cell);

                // Calculate the score for this move
                let score = evaluateMove(i, j, computerSymbol) + evaluateMove(i, j, playerSymbol);

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
        bestMove.removeEventListener('click', playerMove);
        checkForLine(computerSymbol);
    }
}

function evaluateMove(row, col, symbol) {
    const directions = [
        { dr: 1, dc: 0 }, // Vertical
        { dr: 0, dc: 1 }, // Horizontal
        { dr: 1, dc: 1 }, // Diagonal down-right
        { dr: 1, dc: -1 } // Diagonal up-right
    ];

    let score = 0;

    for (const direction of directions) {
        let count = 0;
        let blocked = 0;

        for (let i = -4; i <= 4; i++) {
            const newRow = row + i * direction.dr;
            const newCol = col + i * direction.dc;

            if (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize) {
                const cell = document.getElementById(`cell-${newRow}-${newCol}`);

                if (cell.textContent === symbol) {
                    count++;
                } else if (cell.textContent !== '') {
                    blocked++;
                }
            } else {
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
            for (let i = 0; i < gridSize; i++) {
                let count = 0;
                for (let j = 0; j < gridSize; j++) {
                    const cell = document.getElementById(`cell-${i}-${j}`);
                    if (cell.textContent === symbol) {
                        count++;
                    } else {
                        count = 0;
                    }
                    if (count === 5) {
                        gameOver(symbol);
                        return true;
                    }
                }
            }

            // Check columns
            for (let j = 0; j < gridSize; j++) {
                let count = 0;
                for (let i = 0; i < gridSize; i++) {
                    const cell = document.getElementById(`cell-${i}-${j}`);
                    if (cell.textContent === symbol) {
                        count++;
                    } else {
                        count = 0;
                    }
                    if (count === 5) {
                        gameOver(symbol);
                        return true;
                    }
                }
            }

            // Check diagonals
            for (let i = 0; i < gridSize - 4; i++) {
                for (let j = 0; j < gridSize - 4; j++) {
                    let count = 0;
                    for (let k = 0; k < 5; k++) {
                        const cell = document.getElementById(`cell-${i + k}-${j + k}`);
                        if (cell.textContent === symbol) {
                            count++;
                        } else {
                            break;
                        }
                    }
                    if (count === 5) {
                        gameOver(symbol);
                        return true;
                    }
                }
            }

            for (let i = 0; i < gridSize - 4; i++) {
                for (let j = 4; j < gridSize; j++) {
                    let count = 0;
                    for (let k = 0; k < 5; k++) {
                        const cell = document.getElementById(`cell-${i + k}-${j - k}`);
                        if (cell.textContent === symbol) {
                            count++;
                        } else {
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
            for (let i = 0; i < gridSize; i++) {
                for (let j = 0; j < gridSize; j++) {
                    const cell = document.getElementById(`cell-${i}-${j}`);
                    cell.removeEventListener('click', playerMove);
                }
            }
            var reloaded = localStorage.getItem("reloaded");
            alert(`${symbol === playerSymbol ? 'Player' : 'Computer'} wins!`);
           
  
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
            background-color: #2196f3;
        }
        td.computer {
            background-color: #f44336;
        }
    </style>

</head>


