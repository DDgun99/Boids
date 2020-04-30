var ctx;

var width;
var height;

var birds = [];

var birdLength = 20;
var birdWidth  = 10;

class Bird {
    constructor() {
      let x = math.randomInt(-(width / 2), width / 2);
      let y = math.randomInt(-(height / 2), height / 2);
  
      // Generate random velocities, either positive or negative
      let velX = math.random() * math.pickRandom([-1, 1]);
      let velY = math.random() * math.pickRandom([-1, 1]);
      
      this.init(x, y, velX, velY);
    }

    init(x, y, velX, velY) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;

        if (this.velX != 0)
            this.dirAngle = math.atan(this.velY / this.velX);
        else if (this.velY > 0)
            this.dirAngle = math.asin(1);
        else
            this.dirAngle = math.asin(-1);
    }
    
    draw(ctx, debug=false) {
      // Figure out triangle points
      let frontX = this.x + math.sin(this.dirAngle) * birdLength;
      let frontY = this.y + math.cos(this.dirAngle) * birdLength;
      
      let rightX = this.x + math.sin(this.dirAngle + (math.pi / 2)) * birdWidth / 2;
      let rightY = this.y + math.cos(this.dirAngle + (math.pi / 2)) * birdWidth / 2;
      
      let leftX = this.x + math.sin(this.dirAngle - (math.pi / 2)) * birdWidth / 2;
      let leftY = this.y + math.cos(this.dirAngle - (math.pi / 2)) * birdWidth / 2;
      
      ctx.fillStyle = '#FFFFFF';

      ctx.beginPath();
      ctx.moveTo(frontX, frontY);
      ctx.lineTo(rightX, rightY);
      ctx.lineTo(leftX, leftY);
      ctx.fill();
    }
  }

function main() {
    canvas = document.getElementById('boids-canvas');

    width = canvas.width;
    height = canvas.height;

    if (canvas.getContext) {
        ctx = canvas.getContext('2d');

        // Draw a bounding box
        ctx.strokeStyle = '#000000'
        ctx.lineWidth = '3.0';
        ctx.strokeRect(0, 0, width, height);

        ctx.translate(width / 2, height / 2);

        // Create the birds
        for (let i = 0; i < 10; i++) {
            birds.push(new Bird());
        }

        birds.forEach((bird) => {
            bird.draw(ctx);
        })
    } else {
        alert("Canvas not available in this browser!");
    }

}

$(document).ready(() => {
    main();
});
