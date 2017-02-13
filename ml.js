function Machine() {
    
    this.weights = [];

    // Private functions
    function pushByValue(arr1,arr2) {
        arr1.push(JSON.parse(JSON.stringify(arr2)));
    }

    function deepCopy(arr) {
        return JSON.parse(JSON.stringify(arr));
    }

    function getRows(board) {
        return board;
    }

    function getColumns(board) {
        columns = []
        for (var i = 0; i < 3; i++) {
            column = [];
            column.push(board[0][i]);
            column.push(board[1][i]);
            column.push(board[2][i]);
            columns.push(column);
        }
        return columns;
    }

    function getDiagonals (board) {
        diagonals = []

        diagonal1 = []
        diagonal1.push(board[2][0])
        diagonal1.push(board[1][1])
        diagonal1.push(board[0][2])
        diagonals.push(diagonal1)

        diagonal2 = []
        diagonal2.push(board[0][0])
        diagonal2.push(board[1][1])
        diagonal2.push(board[2][2])
        diagonals.push(diagonal2)

        return diagonals;
    }

    function getCoords(newMove, oldMove, xTurn) {
        var coord = {};
        for (var i = 0; i < newMove.length; i++) {
            for (var j = 0; j < newMove[i].length; j++) {
                if (newMove[i][j] !== oldMove[i][j]) {
                    coord.row = i+1;
                    coord.col = j+1;
                    coord.xTurn = xTurn;
                    coord.board = newMove;
                }
            }
        }

        return coord;
    }

    // Class functions
    this.init = function init(weights) {
        // Initialize Machine
        this.weights = weights || [];
    }
    
    this.evaluateBoard = function evaluateBoard(board) {
        var self = this;
        var value = 0;
        var features = self.getFeatures(board);
        var weights = self.getWeights();

        if ((weights.length - features.length) !== 1) {
            return false;
        }

        for (var i = 1; i < weights.length; i++) {
            value += weights[i]*features[i];
        }
        return value += weights[0];
    }

    this.getWeights = function getWeights() {
        return this.weights;
    }

    this.setWeights = function setWeights(weights) {
        this.weights = weights;
    }

    this.getFeatures = function getFeatures(board) {
        // x1 = number of instances of 2 x's in a row with an open subsequent square
        // x2 = number of instances of 2 o's in a row with an open subsequent square
        // x3 = number of instances of an x in an open row or column
        // x4 = number of instances of an o in an open row or column
        // x5 = number of instances of 3 xs in a row
        // x6 = number of instances of 3 os in a row

        var possibilities = [];
        var features = {
            x1 : 0,      
            x2 : 0,
            x3 : 0,
            x4 : 0,
            x5 : 0,
            x6 : 0,
            length : 6
        }

        possibilities = possibilities.concat(getRows(board));
        possibilities = possibilities.concat(getColumns(board));
        possibilities = possibilities.concat(getDiagonals(board));

        possibilities.forEach(function(possibility) {
            var zeros = 0
            var Xs = 0
            var Os = 0
            possibility.forEach(function(entry) {
                if      (entry == 0)    { zeros += 1 }
                else if (entry == -1)    { Xs += 1 }
                else if (entry == 1)   { Os += 1 }

                if      (Xs == 2 && zeros == 1) {   features.x1 += 1;   }
                else if (Os == 2 && zeros == 1) {   features.x2 += 1;   }
                else if (Xs == 1 && zeros == 2) {   features.x3 += 1;   }
                else if (Os == 1 && zeros == 2) {   features.x4 += 1;   }
                else if (Xs == 3)               {   features.x5 += 1;   }
                else if (Os == 3)               {   features.x6 += 1;   }
            });
        }, this);

        return features;
    }

    this.getSuccesors = function (board, xTurn) {
        var successors = [];
        for (var i = 0; i < board.length; i++) {
            for (var j = 0; j < board[i].length; j++) {
                if (board[i][j] == 0) {
                    var successor = [];
                    successor = deepCopy(board);
                    successor[i][j] = (xTurn) ? -1 : 1;
                    successors.push(successor);
                }
            }
        }

        return successors;
    }

    this.chooseMove = function (board, xTurn) {
        var successors = this.getSuccesors(board, xTurn);
        var bestSuccessor = successors[0];
        var bestValue = this.evaluateBoard(successors[0]);
        
        successors.forEach(function(successor) {
            var value = this.evaluateBoard(board);
            if (value > bestValue) {
                bestValue = value;
                bestSuccessor = successor;
            }
        }, this);

        console.log(bestSuccessor);
        return getCoords(bestSuccessor, board);
    }

}