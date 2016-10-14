setupGlobalVariables = function() {
  colorMode( HSB );
  
  xRes = windowWidth;
  yRes = windowHeight;
  maxRes = max( xRes , yRes );
  minRes = min( xRes , yRes );
  
  chainCenter = createVector( 0.5*xRes , 0.5*yRes );
  
  numArms = 3;
  minRadius = 0.1*minRes;
  maxRadius = maxRes / numArms * 1.2;
  
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
    this.centerP = createVector( centerIn.x, centerIn.y );
    this.radius = random( minRadius , maxRadius );
    this.angle = 0;
    this.angVel = random( minAngVel , maxAngVel );
    if( random(0,1) > pClockwise ) {
      this.angVel *= -1;
    }
    this.end = createVector( this.centerP.x + this.radius*cos( this.angle ) , this.centerP.y + this.radius*sin( this.angle ) );
  }
}
  
Arm.prototype.rotate = function( dt ) {
  this.angle += this.angVel*dt;
  this.end = createVector( this.centerP.x + this.radius*cos( this.angle ) , this.centerP.y + this.radius*sin( this.angle ) );
}


class Chain {
  contructor( centerIn , nArms ) {
    this.n = nArms;
    console.log( 'Constructing new Chain' );
    this.color = color( random(0,100) , 100 , 100 , fillAlpha );
    this.center = createVector( centerIn.x , centerIn.y );
    var currentCenter = createVector( centerP.x , centerP.y );
    for( var i = 0 ; i < nArms ; i++ ) {
      this.arms[i] = new Arm( currentCenter );
      currentCenter = this.arms[i].end;
    }
    this.endP = currentCenter;
    console.log(this.end.x);
  }
}
  
Chain.prototype.evolve = function( dt ) {
  var currentCenter = this.centerP;
  this.arms = new Array(this.n);
  for( var i = 0 ; i < this.n ; i++ ) {
    this.arms[i].centerP = currentCenter;
    this.arms[i].rotate( dt );
    currentCenter = this.arms[i].endP;
  }
  this.end = currentCenter;

  console.log( this.centerP );
}

Chain.prototype.drawEnd = function() {
  //console.log( this.end );
  var x = this.endP.x;
  var y = this.endP.y;
  fill( this.color );
  ellipse( x , y , drawSize , drawSize );
}


function setup() {
  console.log( 'hi there' );
  setupGlobalVariables();
  createCanvas( xRes , yRes );
  background( bgColor );
  
  chainCenter = createVector( 0.5*xRes , 0.5*yRes );
  C = new Chain( chainCenter, numArms );
}

function draw() {
  console.log( C );
  C.evolve( 0.1 );
  C.drawEnd();
}
  

