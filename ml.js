function Machine() {
    
    this.weights = [];

    this.init = function init(weights) {
        // Initialize Machine
        this.weights = weights;
    }
    
    // TODO getFeatures
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
        
    }
}