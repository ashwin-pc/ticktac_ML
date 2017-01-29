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
