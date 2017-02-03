var game = new Game();
var draw = new Draw();

draw.init();
game.init(selectCell);

function selectCell(e) {
    var m = draw.getMousePos(e);
    var row = draw.getRow(m),
        col = draw.getCol(m),
        cell= draw.toCell(col,row); // Cells are ordered 0-8... 0,1,2 in the first row

    if (game.validMove(col,row,game.xTurn)) {
        draw.drawSymbol(col,row,game.xTurn);
        game.turnsLeft = (game.turnsLeft != 0) ? --game.turnsLeft : 0;
        game.checkIfWon();
        game.xTurn = !game.xTurn;
    }
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
        modal.classList.remove("show");
    });
    modalNo.addEventListener("click",function () {
        container.classList.remove("blur");
        modal.classList.remove("show");
    })
}

function removeElementEventListeners(element) {
    var el = document.getElementById(element),
    elClone = el.cloneNode(true);
    el.parentNode.replaceChild(elClone, el);
}
