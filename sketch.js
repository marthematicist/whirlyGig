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
  constructor( center ) {
    this.center = createVector( center.x, center.y );
    this.radius = random( minRadius , maxRadius );
    this.angle = 0;
    this.angVel = random( minAngVel , maxAngVel );
    if( random(0,1) > pClockwise ) {
      this.angVel *= -1;
    }
    this.end = createVector( this.center.x + this.radius*cos( this.angle ) , this.center.y + this.radius*sin( this.angle ) );
  }
  
  rotate( dt ) {
    this.angle += this.angVel*dt;
    this.end = createVector( this.center.x + this.radius*cos( this.angle ) , this.center.y + this.radius*sin( this.angle ) );
  }
}

class Chain {
  contructor( center , nArms ) {
    this.n = nArms;
    console.log( 'Constructing new Chain' );
    this.color = color( random(0,100) , 100 , 100 , fillAlpha );
    this.center = createVector( center.x , center.y );
    var currentCenter = createVector( center.x , center.y );
    for( var i = 0 ; i < nArms ; i++ ) {
      this.arms[i] = new Arm( currentCenter );
      currentCenter = this.arms[i].end;
    }
    this.end = currentCenter;
    console.log(this.end.x);
  }
  
  evolve( dt ) {
    var currentCenter = this.center;
    for( var i = 0 ; i < this.n ; i++ ) {
      this.arms[i].center = currentCenter;
      this.arms[i].rotate( dt );
      currentCenter = this.arms[i].end;
    }
    this.end = currentCenter;
    
    console.log( this.center );
  }
  
  drawEnd() {
    //console.log( this.end );
    var x = this.end.x;
    var y = this.end.y;
    fill( this.color );
    ellipse( x , y , drawSize , drawSize );
  }
}

function setup() {
  console.log( 'hi' );
  setupGlobalVariables();
  createCanvas( xRes , yRes );
  background( bgColor );
  
  chainCenter = createVector( 0.5*xRes , 0.5*yRes );
  C1 = new Chain( chainCenter, numArms );
}

function draw() {
  console.log( C1 );
  C1.evolve( 0.1 );
  C1.drawEnd();
}
  

