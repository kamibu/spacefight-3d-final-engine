function Bullet( yaw ) {
    Sphere.call( this );

    this.setScale( 0.5 );
    this.material.setParameter( 'Diffuse', new Vector3( [ 1, 1, 0 ] ) );
    this.yaw = yaw;

    this.velocity = 2;
}

Bullet.prototype = {
    constructor: Bullet,
    update: function( dt ) {
        this.move( new Vector3( [ -this.velocity * Math.sin( this.yaw ), 0, -this.velocity * Math.cos( this.yaw ) ] ) );
    }
};

Bullet.extend( Sphere );
