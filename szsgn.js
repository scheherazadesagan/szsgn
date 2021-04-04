let SZ=[];
let Particles=[];
let ini=['Kim','Hyeon','Joon'];
let x = 1;
let y = 1;
let easing = 0.05;

class initial {
  constructor(xpos) {
    this.size=random(10,30);
    this.xpos=xpos;
    this.ypos=height;
    this.gforce=0.98;
    this.dy=random(25,39);
    this.Xgf=random(-2,2);
    this.num=int(random(5));
  }
  move() {
    this.xpos=this.xpos+this.Xgf;
    this.ypos=this.ypos-this.dy;
    this.dy=this.dy-this.gforce;
  }
  draw() {
    textSize(this.size);
    textFont('Serif');
    fill(0);
    text(ini[this.num],this.xpos, this.ypos);
    this.move();
  }
  IsGround() {
    if(this.ypos>height) {
      return 1;
    }
    else{
      return 0;
    }
  }
  ShowX() {
    return this.xpos;
  }
}

class particle {
  constructor(xpos) {
    this.temp=random(1,4);
    this.xpos=[];
    this.ypos=[];
    this.size=[];
    this.dy=[];
    this.Xgf=[];
    for(let i=0; i<this.temp; i++) {
      this.xpos[i]=xpos;
      this.ypos[i]=height;
      this.size[i]=random(10,30);
      this.dy[i]=random(5,22);
      this.Xgf[i]=random(-20,20);
    }
    this.gforce=0.98;
    this.num=int(random(5));
  }
  move(){
    for(let i=0; i<this.temp; i++) {
      this.xpos[i]+=this.Xgf[i];
      this.ypos[i]-=this.dy[i];
      this.dy[i]-=this.gforce;
    }
  }
  draw(){
    textFont('Serif');
    fill(0);
    for (let i=0; i<this.temp; i++) {
      textSize(this.size[i]);
      text(ini[this.num],this.xpos[i],this.ypos[i]);
    }    
    this.move();
  }
}




function setup() {
  createCanvas(windowWidth, windowHeight);
}

function dequeue() {
  for (let i=0; i<Particles.length-1; i++) {
    Particles[i]=Particles[i+1];
  }
  Particles.pop();
}
function remov(c) {
  for (let i=c; i<SZ.length; i++) {
    SZ[i]=SZ[i+1];
  }
  SZ.pop();
}




function draw() {
  background(0);
  textFont("serif", 100);
  textAlign(CENTER);
  
  let targetX = mouseX;
  let dx = targetX - x;
  x += dx * easing;
  
  let targetY = mouseY;
  let dy = targetY - y;
  y += dy * easing;
  
  fill(255);
  noStroke();
  
  for (let s=-width; s<width; s+=120) {
    ellipse(s+x, 160, 120);
  }
  
  for (let s=-width; s<width; s+=200) {
    ellipse(width+s-x, 320, 200);
  }

  for (let s=-width; s<width; s+=300) {
    textFont("Arial", 40);
    textStyle(BOLD);
    fill(0);
    text("KIM", x+600, 335);
    text("HYEON", x+800, 335);
    text("JOON", x+1000, 335);
    
    textFont("serif", 30);
    textStyle(NORMAL);
    text("Scheherazade Sagan", x-800, 332);
    fill(255);
    rect(width+s-x, 28, 60, 60);
//    ellipse(s+x, 160, 120);
//    ellipse(width+s-x, 320, 200);
    ellipse(s+x, 570, 300);
    rect(width+s-x, 740, 60, 60);
  }
  if (mouseX<=width/2) {
    ini=['S','Z','S','G','N'];
  } else {
    ini=['K','H','J'];
  }

  if (mouseIsPressed) {
    background(255);
    SZ.push(new initial(mouseX));
  }
  for (let i=0; i<SZ.length; i++) {
    SZ[i].draw();
    if(SZ[i].IsGround()==1) {
      Particles.push(new particle(SZ[i].ShowX()));
      remov(i);
      if(Particles.length>50) {
        dequeue();
      }
    }
  }
  for (let i=0; i<Particles.length; i++) {
    Particles[i].draw();
  }
}
