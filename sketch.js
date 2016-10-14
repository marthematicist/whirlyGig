class Arm {
  constructor( x , y ) {
    this.center = createVector( x, y );
    this.radius = random( minRadius , maxRadius );
    this.angle = 0;
    this.angVel = random( minAngVel , maxAngVel );
    this.end = createVector( this.center.x + this.radius*sin( this.angle ) , this.center.x + this.radius*sin( this.angle ) );
  }
}
