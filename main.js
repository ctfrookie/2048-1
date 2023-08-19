let board = new Array();
$(function() {
    newgame();
});

function newgame() {
    //初始化棋盘和数字格
    init();
    //生成两个随机位置的随机数字
    $("#score").text(0)
    generateOneNumber();
    generateOneNumber();
}

function init() {
    //定义了一个二维数组
    for (let i = 0; i < 4; i++) {
        board[i] = new Array();
        for (let j = 0; j < 4; j++) {
            //初始化小格子的值为0
            board[i][j] = 0;
            let gridCell = $("#grid-cell-" + i + "-" + j);
            //通过getPosTop()设置每个格子距顶端的距离
            gridCell.css("top", getPosTop(i, j));
            //通过getPosleft()设置每个格子距左端的距离
            gridCell.css("left", getPosLeft(i, j));
        }

    }
    updateBoardView();
}

function updateBoardView() {
    $(".number-cell").remove();
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            $("#grid-container").append("<div class='number-cell' id='number-cell-" + i + "-" + j + "'></div>");
            let numberCell = $("#number-cell-" + i + "-" + j);
            //如果棋盘的值为0的话，设置数字格为高宽 0
            if (board[i][j] == 0) {
                numberCell.css("width", "0px");
                numberCell.css("height", "0px");
                numberCell.css("top", getPosTop(i, j) + 50);
                numberCell.css("left", getPosLeft(i, j) + 50);
            }
            //如果棋盘格的值不为零，设置数字格宽高为75设置背景色和前景色数字值
            else {
                numberCell.css("width", "100px");
                numberCell.css("height", "100px");
                numberCell.css("top", getPosTop(i, j));
                numberCell.css("left", getPosLeft(i, j));
                numberCell.css("background-color", getNumberBackgroundColor(board[i][j]));
                numberCell.css("color", getNumberColor(board[i][j]));

                numberCell.text(board[i][j]);

            }
        }
    }
}

function generateOneNumber() {
    //生成一个随机位置的随机数字
    //1，生成一个随机x坐标和y坐标的位置
    var randx = Math.floor(Math.random() * 4);
    var randy = Math.floor(Math.random() * 4);
    //定义一个死循环，生成随机空盒子
    while (true) {
        if (board[randx][randy] == 0) {
            break;
        }
        var randx = Math.floor(Math.random() * 4);
        var randy = Math.floor(Math.random() * 4);

    }
    //2，生成一个随机数字（2048规则新生成的数字只可以是2或4）
    let randNumber = Math.random() < 0.5 ? 2 : 4;
    //3，在随机位置上显示随机数数字
    //在随机的位置显示随机数字
    board[randx][randy] = randNumber;
    //实现随机数字显示的动画
    ShowNumberWithAnimation(randx, randy, randNumber);
}