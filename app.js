var game = new Game();
var draw = new Draw();
var ml = new Machine();
var resultEle = document.getElementById("result");

draw.init();
game.init(selectCell);
ml.init([0.5,0.5,0.5,0.5,0.5,0.5,0.5]);

function selectCell(e) {
    var m = draw.getMousePos(e);
    var row = draw.getRow(m),
        col = draw.getCol(m),
        cell= draw.toCell(col,row); // Cells are ordered 0-8... 0,1,2 in the first row

    if (!game.done() && game.validMove(col, row)) {
        draw.drawSymbol(col, row, game.xTurn);
        game.update(col, row, game.xTurn);
        if (game.hasWinner()) {
            winningTasks(game.xTurn);
            return;
        } else if (game.done()) {
            resultEle.innerHTML = "No More turns Left";
            return;
        } else {
            // Machine Plays
            var coords = ml.chooseMove(game.results, !game.xTurn);
            setTimeout (function(){draw.drawSymbol(coords.col,coords.row,coords.xTurn)}, 500);
            game.update(coords.col,coords.row,coords.xTurn);
            if (game.hasWinner()) {
                winningTasks(!game.xTurn);
            }
        }
    }

    // if (game.validMove(col,row,game.xTurn)) {
    //     draw.drawSymbol(col,row,game.xTurn);
    //     game.turnsLeft = (game.turnsLeft != 0) ? --game.turnsLeft : 0;
    //     game.checkIfWon();
    //     var coords = ml.chooseMove(game.results, !game.xTurn);
    //     game.results = coords.board;
    //     setTimeout (function(){draw.drawSymbol(coords.col,coords.row,coords.xTurn)}, 500);
    //     // game.xTurn = !game.xTurn;
    // }
}

function winningTasks(winner) {
    resultEle.innerHTML = (winner) ? "Player 1 Won the game" : "Player 2 Won the game";
    game.updateScore(winner);
    setTimeout (function(){draw.winningLine(game.getBoardData());},200);
    ml.updateWeights(game.history, !winner)
}

// Modal functions
function modalActivate(title, msg, callback) {
    // reset addEventListeners for modal
    removeElementEventListeners("alert");

    var modal = document.getElementById("alert");
    var container = document.getElementById("container");
    var modalTitle = document.getElementById("modal-title");
    var modalMsg = document.getElementById("modal-msg");
    var modalYes = document.getElementById("modal-yes");
    var modalNo = document.getElementById("modal-no");

    modalTitle.innerHTML = title;
    modalMsg.innerHTML = msg;
    modal.classList.add("show");
    container.classList.add("blur");

    
    modalYes.addEventListener("click",function (e) {
        callback();
        container.classList.remove("blur");
        modal.classList.add("out");
        setTimeout(function() {
            modal.classList.remove("show");
            modal.classList.remove("out");
        }, 500);
    });
    modalNo.addEventListener("click",function () {
        container.classList.remove("blur");
        modal.classList.add("out");
        setTimeout(function() {
            modal.classList.remove("show");
            modal.classList.remove("out");
        }, 500);
    })
}

function removeElementEventListeners(element) {
    var el = document.getElementById(element),
    elClone = el.cloneNode(true);
    el.parentNode.replaceChild(elClone, el);
}
