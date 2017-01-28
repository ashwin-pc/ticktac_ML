function Draw() {
    // Private variables
    var c,ctx,line;


    // Private Functions
    function drawBoard(ctx) {
        drawLine(c.width/3, 0, c.width/3, c.height);
        drawLine(c.width*2/3, 0, c.width*2/3, c.height);
        drawLine(0, c.height/3, c.width, c.height/3);
        drawLine(0, c.height*2/3, c.width, c.height*2/3);
    }

    function drawLine(x1, y1, x2, y2,color) {
        ctx.beginPath();
        ctx.lineWidth = line.width;
        ctx.strokeStyle = color || line.color;
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        ctx.stroke();
    }

    function drawCircle(x,y,r,color) {
        ctx.beginPath();
        ctx.lineWidth = line.width;
        ctx.strokeStyle = color || line.color;
        ctx.arc(x, y, r, 0, 2*Math.PI);
        ctx.stroke();
    }

    // Public Functions
    this.init = function () {
        c = document.getElementById("ticktac");
        ctx = c.getContext("2d");

        c.height = 400;
        c.width = 400;
        line = {
            width: 7,
            color: "white"
        };
        setInterval(drawBoard,1000/60);
    }

    this.getMousePos = function (evt) {
        var rect = c.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    this.getCol = function (m) {
        var col = -1;
        if (m.x > 0 && m.x < c.width/3) {
            col = 1;
        } else if (m.x > c.width/3 && m.x < c.width*2/3) {
            col = 2;
        } else if (m.x > c.width*2/3 && m.x < c.width) {
            col = 3;
        } else {
            console.log("outside bounds");
        }
        return col;
    }

    this.getRow = function (m) {
        var row = -1;
        if (m.y > 0 && m.y < c.height/3) {
            row = 1;
        } else if (m.y > c.height/3 && m.y < c.height*2/3) {
            row = 2;
        } else if (m.y > c.height*2/3 && m.y < c.height) {
            row = 3;
        } else {
            console.log("outside bounds");
        }
        return row;
    }

    this.drawSymbol = function (col,row,xTurn) {
        var x = col * c.width/3 - c.width/6;
        var y = row * c.height/3 - c.height/6;

        if (xTurn) {
            drawLine(x-20,y-20,x+20,y+20);
            drawLine(x+20,y-20,x-20,y+20);
        } else {
            drawCircle(x,y,30);
        }
    }

    this.toCell = function (col,row) {
        return (row * 3) + col - 4;
    }

    this.clear = function () {
        ctx.clearRect(0, 0, c.width, c.height);
        drawBoard(ctx);
    }
}