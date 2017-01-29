function Draw() {
    // Private variables
    var c,ctx,line;


    // Private Functions
    function drawBoard() {
        animateLine(c.width/3, 0, c.width/3, c.height);
        setTimeout(function(){animateLine(c.width*2/3, 0, c.width*2/3, c.height);},200);
        setTimeout(function(){animateLine(0, c.height/3, c.width, c.height/3);},500);
        setTimeout(function(){animateLine(0, c.height*2/3, c.width, c.height*2/3);},700);
    }

    function drawLine(x1,y1,x2,y2,ratio) {
        ctx.beginPath();
        ctx.moveTo(x1,y1);
        ctx.lineWidth = line.width;
        ctx.strokeStyle = line.color;
        x2 = (ratio != null) ? x1 + ratio * (x2-x1) : x2;
        y2 = (ratio != null) ? y1 + ratio * (y2-y1) : y2;
        ctx.lineTo(x2,y2);
        ctx.stroke();
        ctx.closePath();
    }

    function animateLine(x1,y1,x2,y2,ratio, speed) {
        var ratio = ratio || 0;
        var speed = speed || 0.1;
        drawLine(x1,y1,x2,y2,ratio);
        if(ratio<1) {
            requestAnimationFrame(function() {
                animateLine(x1,y1,x2,y2,ratio + speed, speed);
            });
        }
    }

    function drawCircle(x,y,r,ratio) {
        ctx.beginPath();
        ctx.lineWidth = line.width;
        ctx.strokeStyle = line.color;
        var angle = (ratio != null) ? 2*Math.PI*ratio : 2*Math.PI;
        ctx.arc(x, y, r, 0, angle);
        ctx.stroke();
        ctx.closePath();
    }

    function animateCircle(x,y,r,ratio, speed) {
        var ratio = ratio || 0;
        var speed = speed || 0.1;
        drawCircle(x,y,r,ratio);
        if(ratio<1) {
            requestAnimationFrame(function() {
                animateCircle(x,y,r,ratio+speed,speed);
            });
        }
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
        drawBoard();
    }

    this.getMousePos = function (evt) {
        var rect = c.getBoundingClientRect();
        return {
          x: Math.floor((evt.clientX-rect.left)/(rect.right-rect.left)*c.width),
          y: Math.floor((evt.clientY-rect.top)/(rect.bottom-rect.top)*c.height)
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
            animateLine(x-20,y-20,x+20,y+20);
            setTimeout(function() {
                animateLine(x+20,y-20,x-20,y+20);
            }, 100);
        } else {
            animateCircle(x,y,25);
        }
    }

    this.toCell = function (col,row) {
        return (row * 3) + col - 4;
    }

    this.clear = function () {
        ctx.clearRect(0, 0, c.width, c.height);
        drawBoard();
    }
}