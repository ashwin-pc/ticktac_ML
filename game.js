function Game(){

    this.results = [];
    this.history = [];
    this.turnsLeft;
    this.xTurn = true;
    var resultEle;
    this.trainingMode = false;
    this.games = {
        x: 0,
        o: 0
    };

    function pushByValue(arr1,arr2) {
        arr1.push(JSON.parse(JSON.stringify(arr2)));
    }

    this.init = function(options, clickFunction){
        for (var i = 0; i < 3; i++){
            this.results[i] = [];
            for (var j = 0; j < 3; j++){
                this.results[i][j] = 0;
            }
        }

        if (options && options.trainingMode) {
            this.trainingMode = true;
        }

        if (options && options.id && clickFunction) {
            resultEle = document.getElementById(options.id);
            document.getElementById("ticktac").addEventListener("click", clickFunction);
        }

        this.history = [];
        this.turnsLeft = 9;
        this.xTurn = true;
        this.updateScore();

        if (!this.trainingMode) {
            resultEle.innerHTML = "Lets Begin!";
        }


    }

    this.validMove = function (col,row) {
        if (this.results[row-1][col-1] === 0 && this.turnsLeft != -1){
            return true;
        } else {
            return false;
        }
    }

    this.updateScore = function(xTurn) {
        if (xTurn == null && !this.trainingMode) {
            document.getElementById("player1Score").innerHTML = this.games.x;
            document.getElementById("player2Score").innerHTML = this.games.o;
            return;
        }

        if (xTurn) {
            ++this.games.x;
        } else {
            ++this.games.o;
        }
        if (!this.trainingMode) {
            document.getElementById("player1Score").innerHTML = this.games.x;
            document.getElementById("player2Score").innerHTML = this.games.o;
            return;
        }
    }

    this.hasWinner = function () {
        var data = this.getBoardData();

        if (data.sumRow === 3 || data.sumRow === -3 || data.sumCol === 3 || data.sumCol === -3 || data.sumD1 === 3 || data.sumD1 === -3 || data.sumD2 === 3 || data.sumD2 === -3) {
            this.turnsLeft = -1;
            return true;
        }  else {
            return false;
        }      
    }

    this.getBoardData = function () {
        var sumRow = 0 ,sumCol = 0, row = 0, col = 0, dia = 0, data = {};

        for (var i = 0; i < 3; i++) {
            var sum = Math.abs(this.results[i][0] + this.results[i][1] + this.results[i][2]);
            row = (sum > sumRow) ? i+1 : row;
            sumRow = (sum > sumRow) ? sum : sumRow;
            sum = Math.abs(this.results[0][i] + this.results[1][i] + this.results[2][i]);
            col = (sum > sumCol) ? i+1 : col;
            sumCol = (sum > sumCol) ? sum : sumCol;
        }
        var sumD1 = this.results[0][0] + this.results[1][1] + this.results[2][2];
        var sumD2 = this.results[0][2] + this.results[1][1] + this.results[2][0];

        row = (sumRow === 3 || sumRow === -3) ? row : null;
        col = (sumCol === 3 || sumCol === -3) ? col : null;
        if (sumD1 === 3 || sumD1 === -3) { dia = 1; } else if (sumD2 === 3 || sumD2 === -3) { dia = 2; } else { dia = null; };

        return data = {
            sumRow  : sumRow,
            sumCol  : sumCol,
            sumD1   : sumD1,
            sumD2   : sumD2,
            row     : row,
            col     : col,
            dia     : dia
        };
    }

    this.done = function () {
        if (this.turnsLeft < 1) {
            return true;
        }

        return false;
    }

    this.update = function (col,row, xTurn) {
        // Update Turns
        this.turnsLeft = (this.turnsLeft != 0) ? --this.turnsLeft : 0;

        // Update board
        this.results[row-1][col-1] = (xTurn) ? -1 : 1;
        pushByValue(this.history,this.results);
    }

    this.reset = function () {
        modalActivate("Reset the game?","Are you sure you want to RESET the scores?", function () {
            game.games.x = 0;
            game.games.o = 0;
            draw.clear();
            game.init();
        }); 
    }

    this.clear = function () {
        modalActivate("Clear the board?","Are you sure you want to clear the board?",function () {
            draw.clear();
            game.init();
        });
    }

}