

let xPos = 30;
let yPos = 0;
let bnum = 10;
let myBees = [];
let myFlowers = [];
let myClouds = [];
let bspeed1 = 8;
let bspeed2 = 5;
let cloudSpeed1 = 1;
let cloudSpeed2 = 2;
let mouseOffSet = 50;

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
    bw = bw + random(-5,5);
    if (bw > 20 || bw < 0) {
      bw = 15;
    }
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
    ellipseMode(CENTER);
    push();
    
    fill(255, 0, 0);
    ellipse(this.x + 20, this.y + 5, 80, 20);
    ellipse(this.x - 20, this.y + 5, 80, 20);
    ellipse(this.x, this.y - 20, 20, 80);
    ellipse(this.x, this.y + 20, 20, 80);
    fill(255, 255, 0);
    ellipse(this.x, this.y, 20, 20);
    
    pop();
  }

  getX(){
    return this.x;
  }

  getY(){
    return this.y;
  }

  mousePressed(){
    if(mouseIsPressed && mouseX <= this.x + 50 && mouseX >= this.x - 50 && mouseY <= this.y + 50 && mouseY >= this.y - 50){
      console.log(mouseX,mouseY);
      return true;
    }
    else{
      return false;
    }
  }
  update() {
  }

  run() {
    this.mousePressed();
    this.update();
    this.display();
  }
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
    this.xmove = random(-cloudSpeed1,cloudSpeed2);
    
  }
  
  update(){
    this.x = this.x + this.xmove;
    if (this.x >= width || this.x <= 0) {
      this.xmove = -this.xmove;
    }
  }

  display(){
    push();
    fill(250);
    noStroke();
    ellipse(this.x, this.y, 70, 50);
    ellipse(this.x + 10, this.y + 10, 70, 50);
    ellipse(this.x- 20, this.y + 10, 70, 50);
    pop();
  }

  run(){
    this.update();
    this.display();
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
  for (let i =0 ; i < 5 ; i++){
    myFlowers[i] = new Flower(random(0,width),random(400,height));
  }

  for(let i = 0 ; i< 3 ; i++){
    myClouds[i] = new Cloud(random(0,width),random(0,200));
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
 
  for(let i=0 ; i<3 ; i++){
    myClouds[i].run();
  }

  for(let i=0 ; i < bnum; i++){
    myBees[i].run();
  }
  
  for(let i = 0 ; i<5 ; i++){
    myFlowers[i].run();
    let beeX = myFlowers[i].getX();
    let beeY = myFlowers[i].getY();
    if( myFlowers[i].mousePressed()){
      for (let j = 0 ; j < 10 ; j++){
        myBees.push(new Bee( beeX, beeY));
      }
      bnum+=10;
    }
  }

}
