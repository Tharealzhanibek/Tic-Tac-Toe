const Gameboard = (() => {
    const upperBlock = document.getElementById("upper-block");
    const getUpperBlock = () => upperBlock;
    const board = [];

    const rows = document.querySelectorAll('table tr');
    
    rows.forEach(row => {
        const rowArray = [];
        const cells = row.querySelectorAll('td div');
        cells.forEach(cell => {
            rowArray.push(cell);  
        });
        board.push(rowArray);
    });

    const getBoard = () => board;

    const updateboard = (event, marker, oppositeMarker) => {
        event.target.innerText = marker;
        upperBlock.innerText = `${oppositeMarker} turn`;
    }

    const restart = () => {
        board.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                board[rowIndex][cellIndex].innerText = "";
            });
        });
        upperBlock.innerText = "Tic Tac Toe";
    };

    const winResult = (marker) => {
        document.getElementById("upper-block").innerText = `${marker} wins! Click to restart.`;
        document.getElementById("upper-block").style.cursor = "pointer";
        upperBlock.addEventListener('click', restart);
    }

    const tieResult = () => {
        upperBlock.innerText = "It's a tie!  Click to restart.";
        upperBlock.style.cursor = "pointer";
        upperBlock.addEventListener('click', restart);
    }

    return {getBoard, updateboard, winResult, tieResult, getUpperBlock};
})();

const player = ((event, marker, oppositeMarker) => {
    if (event.target.innerText == "") {
        Gameboard.updateboard(event, marker, oppositeMarker);
        if (flow.checkWin(marker)) {
            Gameboard.winResult(marker);
        } else if (flow.getTurn() == 9) {
            Gameboard.tieResult();
        };
    }
})

const flow = (() => {
    let turn = 1;

    const getTurn = () => turn;

    const whatPlayer = ((event) => {
        if (turn % 2 == 1) {
            player(event, 'X', 'O');
        } else {
            player(event, 'O', 'X');
        }
        turn++;
    })

    Gameboard.getBoard().forEach(function(row) {
        row.forEach(function(cell) {
            cell.addEventListener("click", whatPlayer);
        })
    })

    const checkWin = (marker) => {
        const board = Gameboard.getBoard(); 
        const size = board.length; 
    
        for (let row = 0; row < size; row++) {
            if (board[row][0].innerText === marker &&
                board[row][0].innerText === board[row][1].innerText &&
                board[row][1].innerText === board[row][2].innerText) {
                    return true;
            }
        }

        for (let col = 0; col < size; col++) {
            if (board[0][col].innerText === marker &&
                board[0][col].innerText === board[1][col].innerText &&
                board[1][col].innerText === board[2][col].innerText) {
                return true;
            }
        }

        if (board[0][0].innerText === marker &&
            board[0][0].innerText === board[1][1].innerText &&
            board[1][1].innerText === board[2][2].innerText) {
            return true;
        }
    
        if (board[0][2].innerText === marker &&
            board[0][2].innerText === board[1][1].innerText &&
            board[1][1].innerText === board[2][0].innerText) {
            return true;
        }
    
        return false;  
    };

    return {getTurn, checkWin};
})();