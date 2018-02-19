let score = document.getElementById('score');
function Snake() {
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];

  this.eat = function(pos) {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      this.total++;
      score.innerHTML = this.total+1;
      return true;
    } else {
      return false;
    }
  }

  this.dir = function(x, y) {
     /*Either moving vertically or asked to move vertically or both */
    // this.xspeed is 0
    // this.yspeed is 1
    // x is 0
    // y is -1
    if (this.yspeed == 0 && y == 0) {
      return;
    }
    if (this.xspeed == 0 && x == 0) {
      return;
    }

    this.xspeed = x;
    this.yspeed = y;
  }

  this.death = function() {

      /* go through the length of the array. tail being the end. */
      // if all pos is x that means it touched itself and the total length is now 0
      // tail is empty because it hasn't eaten anything yet.
    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        alert('starting over');
        this.total = 0;
        score.innerHTML = this.total+1;
        this.tail = [];
        this.x = 0;
        this.y = 0;
        pickLocation();
      }
    }
  }

  this.update = function() {
    /*goes through the length of the tail array and adds onto it */
    for (var i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }
    if (this.total >= 1) {
      this.tail[this.total - 1] = createVector(this.x, this.y);
        /* don't know what this does? I think this tells
           where to add the next block */
    }

    this.x = this.x + this.xspeed * scl;
    this.y = this.y + this.yspeed * scl;

    this.x = constrain(this.x, 0, width - scl);
    this.y = constrain(this.y, 0, height - scl);
  }

  this.show = function() {
    fill(255);
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    rect(this.x, this.y, scl, scl);

  }
}
