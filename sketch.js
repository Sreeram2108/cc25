const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world;
var canvas, angle, tower, ground, cannon;
var balls = []

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  tower = new Tower(150, 350, 160, 310);
  //ground = new Ground(600, height - 100, width, 5);
  //PI = 180
  cannon=new Cannon(180,110,110,50,-PI/4)
  
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

  tower.display();
  cannon.display()

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
  }

  
}

function keyPressed(){
  if(keyCode===DOWN_ARROW){
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball, index) {
  ball.display();
  if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
    Matter.World.remove(world, ball.body);
    balls.splice(index, 1);
  }
}

function keyReleased(){
  if(keyCode===DOWN_ARROW){
    balls[balls.length - 1].shoot()
  }
}

