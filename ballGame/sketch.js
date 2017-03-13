var b;
var p;
var scl = 20;
var cnt = 0;
var xtar = 0;
var ytar = 0;
var tars = [];

function ball() {
   this.x = width / 2;
   this.y = width / 2;
   this.xspeed = floor(random(1, 3));
   this.yspeed = 2;

   this.show = function() {
      fill(200);
      rect(this.x, this.y, scl, scl);
   }

   this.update = function() {
      if ((this.x > width - scl - 1) || this.x < 1) {
         this.xspeed = -this.xspeed;
      } else if (this.y < 1) {
         this.yspeed = -this.yspeed;
      }
      this.x = this.x + this.xspeed;
      this.y = this.y + this.yspeed;
      this.x = constrain(this.x, 0, width - scl);
      this.y = constrain(this.y, 0, height - scl);
   }
}

function pad() {
   this.x = width / 2;
   this.y = height - scl;

   this.show = function() {
      fill(255);
      rect(this.x, this.y, 4 * scl, scl);
   }
}

function picked() {
   for (var i = 0; i < tars.length; i++) {
      if (dist(tars[i].x, tars[i].y, b.x, b.y) < scl) {
         tars.splice(i, 1);
      }
   }
}

function touch() {
   if (b.y > (height - 2 * scl - 1)) {
      print(b.x + " " + b.y);
      if ((b.x + scl >= p.x) && (b.x < (p.x + 4 * scl))) {
         b.yspeed = -b.yspeed;
      } else {
         restart();
      }
   }
}

function restart() {
   cnt = 0;
   tars.splice(0, tars.length);
   b.x = width / 2;
   b.y = width / 2;
   b.yspeed = 2;
   b.xspeed = floor(random(1, 3));

   for (var i = 0; i < (width / scl); i++) {
      tars[i] = new Tars();
   }
}

function Tars() {
   this.x = xtar + (cnt++ * scl);
   this.y = ytar;
}

function setup() {
  
   createCanvas(400, 400);
   for (var i = 0; i < (width / scl); i++) {
      tars[i] = new Tars();
   }
   p = new pad();
   b = new ball();
   frameRate(30);
}

function draw() {
   
   touch();
   background(50);
   fill(255);
   for (var i = 0; i < tars.length; i++) {
      rect(tars[i].x, tars[i].y, scl, scl);
   }
   if (keyIsDown(RIGHT_ARROW)) {
      p.x += 10;
   } else if (keyIsDown(LEFT_ARROW)) {
      p.x -= 10;
   }
   p.x = constrain(p.x, 0, width - 4 * scl);
   p.show();
   b.show();
   b.update();
   picked();
   if (tars.lenght === 0) {
      restart();
   }
}