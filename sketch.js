let xPos = 30;
let yPos = 0;
let beesNumber = 10;
let myBees = [];
let flowerNumber = 0;
let myFlowers = [];
let myClouds = [];
let bspeed1 = 8;
let bspeed2 = 5;
let cloudSpeed1 = 1;
let cloudSpeed2 = 2;
let isDayOrNight;

class Bee {
  constructor(x, y) {
    this.location = createVector(x, y);
    this.velocity = createVector(random(-bspeed2,bspeed1),random(-bspeed1,bspeed2));
      this.livespan = 1500;
  }

   get isAlive(){
    return this.livespan > 0;
  }

  update() {
    this.location.add(this.velocity);
    if (this.location.x > width || this.location.x < 0) {
      this.velocity.x = -this.velocity.x;
    } else if (this.location.y >= height || this.location.y <= 0) {
      this.velocity.y = -this.velocity.y;
    }

    this.livespan-=2;
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
    line(this.location.x,this.location.y-20, this.location.x+5 , this.location.y-30);
    line(this.location.x,this.location.y-20, this.location.x-5 , this.location.y-30);
    triangle(this.location.x+1,location.y+15,this.location.x-1,location.y+15,this.location.x-1,this.location.y+23)
    pop();
  }

  run() {
    this.update();
    this.display();
  }
}


class Flower {
  constructor(x, y) {
    for(let i = 0 ; i < flowerNumber ; i++){
      if(flowerNumber[i].getX() <= x+100  && flowerNumber[i].getY <= y+100){
          x = x - 50;
          y = y - 50;
      }
      else if(flowerNumber[i].getX() <= x+100  && flowerNumber[i].getY >= y-100){
        x = x - 50;
        y = y + 50;
      }
      else if(flowerNumber[i].getX() <= x-100  && flowerNumber[i].getY >= y+100){
        x = x + 50;
        y = y - 50;
      }
      else{
        x = x + 50;
        y = y + 50;
      }
    }
    this.location = createVector(x,y);
  }

  display() {
    ellipseMode(CENTER);
    push();
    fill(255, 0, 0, 90);
    ellipse(this.location.x + 20, this.location.y + 5, 80, 30);
    ellipse(this.location.x - 20, this.location.y + 5, 80, 30);
    ellipse(this.location.x, this.location.y - 20, 30, 80);
    ellipse(this.location.x, this.location.y + 20, 30, 80);

    fill(255,0,170);
    ellipse(this.location.x, this.location.y, 70, 50);
    ellipse(this.location.x, this.location.y, 50, 70);

    fill(255, 255, 0);
    ellipse(this.location.x, this.location.y, 20, 20);
    
    pop();
    
  }

  getX(){
    return this.location.x;
  }

  getY(){
    return this.location.y;
  }

  mousePressed(){
    if(mouseIsPressed && mouseX <= this.location.x + 50 && mouseX >= this.location.x - 50 
      && mouseY <= this.location.y + 50 && mouseY >= this.location.y - 50){
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


class MagicFlower extends Flower{
  constructor(x,y){
    super(x,y);
    this.x = x;
    this.y = y;
    this.angle = 0;
  }
  display(){
    super.display();
    push();
    translate(500,500)
    fill(250,0,0);
    rotate(this.angle);
    ellipse(this.x+14,this.y+5,70,50);
    ellipse(this.x-14,this.y+5,70,50);
    ellipse(this.x,this.y-14,50,70);
    ellipse(this.x,this.y+14,50,70);
    fill('yellow');
    
    ellipse(this.x,this.y,50,50);
    fill('skyblue');
    rect(this.x-10,this.y-10,20,20);
    pop();
    this.angle = this.angle + 1;
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

class Sun {
  constructor(x,y) {
    this.location = createVector(x,y);
    this.angle = 0;
    this.maxRaySize = 450;
    this.ray = 400;
  }
  display(){
    push()
    noStroke();
    translate(windowWidth/2,windowHeight/2);
    fill('yellow');
    rotate(this.angle);
    ellipse(this.location.x,this.location.y,400,400);
    fill(200, 130, 10, 40);
    ellipse(this.location.x,this.location.y,this.ray,this.ray);
    fill('orange');
    ellipse(this.location.x,this.location.y,350,350);
    pop();
    if(this.angle > 360 ){
      this.angle = 0;
    }
    if(this.angle>=150 && this.angle <= 320){
      isDayOrNight = true;
    }
    else
    {
      isDayOrNight = false;
    }
    this.angle = this.angle + 0.2;
  }



  update(){
    if(key == 's'){
      this.ray+=1.5;
      if(this.maxRaySize < this.ray){
        this.ray = 400;
      }
    }
    else if (key == 'f')
    {
      this.ray = 400;
    }
  }

  run(){
    this.update();
    this.display();
  }
}


class Grass{
  constructor(){
    this.x = 0;
    this.y = 0;
  }
  display(){
    push();
    noStroke();
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
    push();
    fill('green');
    beginShape();
    vertex(0, 1200);
    for (let x = 0; x < width+1; x++) {
      let nx = map(x, 0, width, 0, 4);
      let y = (height / 2) * noise(nx);
      vertex(x, y + 500);
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
    this.location = createVector(x,y);
    this.velocity = createVector(random(-cloudSpeed1,cloudSpeed2),0);
  }
  
  update(){
    this.location.add(this.velocity);
    if (this.location.x >= width || this.location.x <= 0) {
      this.velocity.x = -this.velocity.x;
    }
  }

  display(){
    push();
    fill(250);
    noStroke();
    ellipse(this.location.x, this.location.y, 140, 100);
    ellipse(this.location.x + 40, this.location.y + 20, 140, 110);
    ellipse(this.location.x- 70, this.location.y + 40, 140, 70);
    ellipse(this.location.x + 90, this.location.y + 40, 130, 80);
    pop();
  }

  run(){
    this.update();
    this.display();
  }
}



function setup() {
  createCanvas(windowWidth, windowHeight);
  c1 = color(0, 51, 102);
  c2 = color(255, 209, 191);

  for (let i = 0 ; i < 10 ; i++){
    myBees[i] = new Bee(random(0,width),random(0,height));
  }

  for (let i =0 ; i < 7 ; i++){
    myFlowers[i] = new Flower(random(0,width),random(500,height));
  }

  for(let i = 0 ; i< 3 ; i++){
    myClouds[i] = new Cloud(random(0,width),random(0,200));
  }

  MagicFlower1 = new MagicFlower(350,350);
  
  sun = new Sun(350,350);
}


function draw() { 

  for (let y = 0; y < height; y++) {
    n = map(y, 0, height, 0, 1);
    let newc;
    if(isDayOrNight){
      newc = lerpColor(c2, c1, n);
    }
    else{
      newc = lerpColor(c1, c2, n);
    }
    stroke(newc);
    line(0, y, width, y);
  }
  
  sun.run();
  grass = new Grass();
  grass.run();
  rain = new Rain();

  if(isDayOrNight == false){
    rain.display();
  }
  
  myClouds.forEach((cloud) => cloud.run());

  myBees = myBees.filter((bee) => bee.isAlive)
  myBees.forEach((bee) => bee.run());
  
  for(let i = 0 ; i<5 ; i++){
    myFlowers[i].run();
    let beeX = myFlowers[i].getX();
    let beeY = myFlowers[i].getY();
    if( myFlowers[i].mousePressed()){
      beesNumber+=1;
      myBees.push(new Bee( beeX, beeY));

    }
  }

  MagicFlower1.run();

}
