
let xPos = 30;
let yPos = 0;
let myBees = [];
let cloudx = 100;
let cloudy = 100;
let sunYpos = 500;
let bspeed1 = 8;
let bspeed2 = 5;

class Bee {
  constructor(x, y) {
    this.location = createVector(x, y);
    this.xmove = random (-bspeed2,bspeed1);
    this.ymove = random (-bspeed1,bspeed2);
  }

  update() {
    this.location.x = this.location.x + this.xmove;
    this.location.y = this.location.y + this.ymove;
    if (this.location.x >= width || this.location.x <= 0) {
      this.xmove = -this.xmove;
    } else if (this.location.y >= height || this.location.y <= 0) {
      this.ymove = -this.ymove;
    }
  }

  display() {
    push();
    let bw = 15;
    ellipseMode(RADIUS);
    noStroke();
    fill(171, 240, 255);
    ellipse(this.location.x + 10, this.location.y - 5, bw, 8);
    ellipse(this.location.x - 10, this.location.y + 5, bw, 8);
    ellipse(this.location.x + 10, this.location.y + 5, bw, 8);
    ellipse(this.location.x - 10, this.location.y - 5, bw, 8);

    //body
    fill(255, 244, 61);
    angleMode(DEGREES);
    ellipse(this.location.x, this.location.y, 15, 20);
    stroke(0);
    strokeWeight(5);
    line(
      this.location.x - 10,
      this.location.y - 5,
      this.location.x + 10,
      this.location.y - 5
    );
    line(
      this.location.x - 10,
      this.location.y + 5,
      this.location.x + 10,
      this.location.y + 5
    );
    pop();
  }

  run() {
    this.update();
    this.display();
  }
}


class Flower {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  display() {
    push();
    fill(204, 101, 192, 100);
    translate(this.x, this.y);
    for (let i = 0; i < 10; i++) {
      ellipse(0, 30, 20, 80);
      rotate(PI / 5);
    }
    pop();
  }
  run() {}
}


class Rain {
  constructor() {
    this.livespan = 255
  }
  

  display() {
    yPos++;
    noStroke();
    fill(204, 229, 255, random(50));

    triangle(xPos - 5, yPos, xPos + 5, yPos, xPos, yPos - 40);
    ellipse(xPos, yPos, 10, 10);

    yPos = yPos + 80;

    if (yPos > windowHeight) {
      yPos = random(windowHeight);
      xPos = random(windowWidth);
    }
  }
  update(){
    //this.display();
    this.livespan -= 10
    
  }
}


class Grass{
  constructor(){
    this.x = 0;
    this.y = 0;
  }
  display(){
    push();
    fill('darkgreen');
    beginShape();
    vertex(0, 1200);
    for (let x = 0; x < width+1; x++) {
      let nx = map(x, 0, width, 0, 4);
      let y = (height / 2) * noise(nx);
      vertex(x, y + 200);
    }
    vertex( windowWidth, windowHeight);
    endShape();
    pop();
  }
  run(){
    this.display();
  }
}

class Cloud{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }

  display(){
    fill(250)
    noStroke();
    ellipse(cloudx, cloudy, 70, 50);
    ellipse(cloudx + 10, cloudy + 10, 70, 50);
    ellipse(cloudx - 20, cloudy + 10, 70, 50);
  }
}

class Sunshine{
  
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  c1 = color(0, 51, 102);
  c2 = color(255, 209, 191);
  for (let i = 0 ; i < 10 ; i++){
    myBees[i] = new Bee(random(0,width),random(0,height));
  }
}


function draw() { 
  for (let y = 0; y < height; y++) {
    n = map(y, 0, height, 0, 1);
    let newc = lerpColor(c1, c2, n);
    stroke(newc);
    line(0, y, width, y);
    }
  grass = new Grass();
  grass.run();
  rain = new Rain();
  rain.display();
 
  flower = new Flower(800, 500);
  flower.display();
 
  for(let i = 0 ; i < 10 ; i++){
    myBees[i].run();
  }
  //ellipseMode(CENTER);
	//ellipse(400, sunYpos, 300);
	//if (sunYpos > 250)
	//	sunYpos--;
}

