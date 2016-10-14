setupGlobalVariables = function() {
  colorMode( HSB );
  
  xRes = windowWidth;
  yRes = windowHeight;
  maxRes = max( xRes , yRes );
  minRes = min( xRes , yRes );
  
  chainCenter = createVector( 0.5*xRes , 0.5*yRes );
  
  numArms = 3;
  minRadius = 0.1*minRes;
  maxRadius = maxRes / numArms * 0.8;
  
  minAngVel = PI*0.01;
  maxAngVel = PI*0.2;
  pClockwise = 0.5;
  
  bgColor = color( 0 , 0 , 100 , 1 );
  fillAlpha = 0.2;
  chainColor1 = color( random(0,100) , 100 , 100 , fillAlpha );
  drawSize = minRes*0.01;
  
}

class Arm {
  constructor( centerIn ) {
    this.center = createVector( centerIn.x, centerIn.y );
    this.radius = random( minRadius , maxRadius );
    this.angle = random( 0 , 2*PI);
    this.angVel = random( minAngVel , maxAngVel );
    if( random(0,1) > pClockwise ) {
      this.angVel *= -1;
    }
    this.end = createVector( this.center.x + this.radius*cos( this.angle ) , this.center.y + this.radius*sin( this.angle ) );
  }
}
  
Arm.prototype.rotate = function( dt ) {
  this.angle += this.angVel*dt;
  this.end = createVector( this.centerP.x + this.radius*cos( this.angle ) , this.centerP.y + this.radius*sin( this.angle ) );
}


class Chain {
  constructor( centerIn , nArms ) {
    this.n = nArms;
    console.log( 'Constructing new Chain' );
    this.color = color( random(0,100) , 100 , 100 , fillAlpha );
    this.center = createVector( centerIn.x , centerIn.y );
    var currentCenter = createVector( this.center.x , this.center.y );
    this.arms = new Array(this.n);
    for( var i = 0 ; i < nArms ; i++ ) {
      this.arms[i] = new Arm( currentCenter );
      currentCenter = this.arms[i].end;
      console.log(currentCenter);
    }
    this.end = currentCenter;
    
  }
}
  
Chain.prototype.evolve = function( dt ) {
  var currentCenter = this.center;
  for( var i = 0 ; i < this.n ; i++ ) {
    this.arms[i].center = currentCenter;
    this.arms[i].rotate( dt );
    currentCenter = this.arms[i].end;
  }
  this.end = currentCenter;
}

Chain.prototype.drawEnd = function() {
  var x = this.end.x;
  var y = this.end.y;
  fill( this.color );
  ellipse( x , y , drawSize , drawSize );
}

Chain.prototype.drawChain = function() {
  for( var i = 0 ; i < this.n ; i++ ) {
    line( this.arms[i].center.x , this.arms[i].center.y , this.arms[i].end.x , this.arms[i].end.y );
  }
}


function setup() {
  console.log( 'hi there you' );
  setupGlobalVariables();
  createCanvas( xRes , yRes );
  background( bgColor );
  
  chainCenter = createVector( 0.5*xRes , 0.5*yRes );
  C = new Chain( chainCenter, numArms );
  
  noStroke();
}

function draw() {
  C.evolve( 0.1 );
  C.drawEnd();
  C.drawChain();
}
  

