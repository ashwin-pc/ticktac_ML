function Game(){

    this.results = [];
    this.turnsLeft;
    this.xTurn = true;
    var resultEle = document.getElementById("result");

    this.init = function(clickFunction){
        document.getElementById("ticktac").addEventListener("click", clickFunction);
        for (var i = 0; i < 3; i++){
            this.results[i] = [];
            for (var j = 0; j < 3; j++){
                this.results[i][j] = 0;
            }
        }
        this.turnsLeft = 9;
        this.xTurn = true;
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
            resultEle.innerHTML = (this.xTurn) ? "Player 1 Won the game" : "Player 2 Won the game";
            this.turnsLeft = -1;
            return;
        }

        if (this.turnsLeft === 0) {
            resultEle.innerHTML = "No More turns Left";
            return;
        }
    }

    this.reset = function () {
        draw.clear();
        this.init();
    }

}