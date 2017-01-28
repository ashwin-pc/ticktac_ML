function Game(){

    this.results = [];
    this.turnsLeft;
    var xTurn = true;
    var resultEle = document.getElementById("result");

    this.init = function(){
        document.getElementById("ticktac").addEventListener("click", selectCell);
        for (var i = 0; i < 3; i++){
            this.results[i] = [];
            for (var j = 0; j < 3; j++){
                this.results[i][j] = 0;
            }
        }
        this.turnsLeft = 9;
        xTurn = true;
        resultEle.innerHTML = "Lets Begin!";
    }

    this.validMove = function (col,row, xTurn) {
        if (this.results[row-1][col-1] === 0 && this.turnsLeft != -1){
            this.results[row-1][col-1] = (xTurn) ? -1 : 1;
            return true;
        } else {
            return false;
        }
    }

    this.checkIfWon = function () {
        var sumRow = 0 ,sumCol = 0;

        for (var i = 0; i < 3; i++) {
            var sum = Math.abs(this.results[i][0] + this.results[i][1] + this.results[i][2]);
            sumRow = (sum > sumRow) ? sum : sumRow;
            sum = Math.abs(this.results[0][i] + this.results[1][i] + this.results[2][i]);
            sumCol = (sum > sumCol) ? sum : sumCol;
        }
        var sumD1 = this.results[0][0] + this.results[1][1] + this.results[2][2];
        var sumD2 = this.results[0][2] + this.results[1][1] + this.results[2][0];

        if (sumRow === 3 || sumRow === -3 || sumCol === 3 || sumCol === -3 || sumD1 === 3 || sumD1 === -3 || sumD2 === 3 || sumD2 === -3) {
            resultEle.innerHTML = (xTurn) ? "Player 1 Won the game" : "Player 2 Won the game";
            this.turnsLeft = -1;
            return;
        }

        if (this.turnsLeft === 0) {
            resultEle.innerHTML = "No More turns Left";
            return;
        }
    }

    function selectCell(e) {
        var m = draw.getMousePos(e);
        var row = draw.getRow(m),
            col = draw.getCol(m),
            cell= draw.toCell(col,row); // Cells are ordered 0-8... 0,1,2 in the first row

        if (game.validMove(col,row,xTurn)) {
            draw.drawSymbol(col,row,xTurn);
            game.turnsLeft = (game.turnsLeft != 0) ? --game.turnsLeft : 0;
            game.checkIfWon();
            xTurn = !xTurn;
        }
    }

    this.reset = function () {
        draw.clear();
        this.init();
    }
}