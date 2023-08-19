$(document).keydown(function(event) {
    switch (event.keyCode) {
        case 37:
            if (move("left")) {
                generateOneNumber();
                isGameOver();
            }
            break;
        case 38:
            if (move("up")) {
                generateOneNumber();
                isGameOver();
            }
            break;
        case 39:
            if (move("right")) {
                generateOneNumber();
                isGameOver();
            }
            break;
        case 40:
            if (move("down")) {
                generateOneNumber();
                isGameOver();
            }
            break;
        default:
            break;
    }
});

function move(direction) {
    if (!canMove(board, direction)) {
        return false;
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] !== 0) {
                switch (direction) {
                    case "left":
                        if (moveLeft(i, j)) {
                            continue;
                        }
                        break;
                    case "up":
                        if (moveUp(i, j)) {
                            continue;
                        }
                        break;
                    case "right":
                        if (moveRight(i, j)) {
                            continue;
                        }
                        break;
                    case "down":
                        if (moveDown(i, j)) {
                            continue;
                        }
                        break;
                    default:
                        break;
                }
            }
        }
    }
    updateBoardView();
    return true;
}

function moveLeft(row, col) {
    for (var k = 0; k < col; k++) {
        if (board[row][k] === 0 && noBlokHorizontalCol(row, k, col, board)) {
            showMoveAnimate(row, col, row, k);
            board[row][k] = board[row][col];
            board[row][col] = 0;
            return true;
        } else if (board[row][k] === board[row][col] && noBlokHorizontalCol(row, k, col, board)) {
            showMoveAnimate(row, col, row, k);
            board[row][k] += board[row][col];
            board[row][col] = 0;
            updateScore(board[row][k]);
            return true;
        }
    }
    return false;
}

function moveUp(row, col) {
    for (var k = 0; k < row; k++) {
        if (board[k][col] === 0 && noBlokHorizontalCol(col, k, row, board)) {
            showMoveAnimate(row, col, k, col);
            board[k][col] = board[row][col];
            board[row][col] = 0;
            return true;
        } else if (board[k][col] === board[row][col] && noBlokHorizontalCol(col, k, row, board)) {
            showMoveAnimate(row, col, k, col);
            board[k][col] += board[row][col];
            board[row][col] = 0;
            updateScore(board[k][col]);
            return true;
        }
    }
    return false;
}

function moveRight(row, col) {
    for (var k = col + 1; k < 4; k++) {
        if (board[row][k] === 0 && noBlokHorizontalCol(row, col, k, board)) {
            showMoveAnimate(row, col, row, k);
            board[row][k] = board[row][col];
            board[row][col] = 0;
            return true;
        } else if (board[row][k] === board[row][col] && noBlokHorizontalCol(row, col, k, board)) {
            showMoveAnimate(row, col, row, k);
            board[row][k] += board[row][col];
            board[row][col] = 0;
            updateScore(board[row][k]);
            return true;
        }
    }
    return false;
}

function moveDown(row, col) {
    for (var k = row + 1; k < 4; k++) {
        if (board[k][col] === 0 && noBlokHorizontalCol(col, row, k, board)) {
            showMoveAnimate(row, col, k, col);
            board[k][col] = board[row][col];
            board[row][col] = 0;
            return true;
        } else if (board[k][col] === board[row][col] && noBlokHorizontalCol(col, row, k, board)) {
            showMoveAnimate(row, col, k, col);
            board[k][col] += board[row][col];
            board[row][col] = 0;
            updateScore(board[k][col]);
            return true;
        }
    }
    return false;
}


function updateScore(score) {
    $("#score").text(function(index, oldValue) {
        return parseInt(oldValue) + score;
    });
}

function isGameOver() {
    // 检查是否有空格子
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] === 0) {
                return false; // 还有空格子，游戏没有结束
            }
        }
    }

    // 检查相邻格子是否有相同数字
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i][j] === board[i][j + 1] || board[j][i] === board[j + 1][i]) {
                return false; // 有相邻的格子有相同数字，游戏没有结束
            }
        }
    }

    // 无法在任何方向上移动
    if (!canMove(board, "left") && !canMove(board, "right") && !canMove(board, "up") && !canMove(board, "down")) {
        // 此时游戏结束
        alert("Game Over");
    }

    return true; // 游戏结束
}