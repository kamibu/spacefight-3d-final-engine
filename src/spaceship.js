function Spaceship( modelfile, importer ) {
    SceneNode.call( this );

    this.bullets = [];
    this.velocity = 0.5;

    this.targetRoll = 0;
    this.yaw = 0;

    this.soundSource = new SoundSource();
    this.appendChild( this.soundSource );
}

Spaceship.prototype = {
    constructor: Spaceship,
    reset: function() {
        this.setPosition( new Vector3( [ 0, 0, 0 ] ) );
        this.setOrientation( new Quaternion( [ 0, 0, 0, 1 ] ) );

        this.targetRoll = 0;
        this.yaw = 0;
    },
    shoot: function() {
        var leftBullet = new Bullet( this.yaw );
        leftBullet.setPosition( new Vector3( [ -3, 0, 0 ] ) );
        leftBullet.combineWith( this ); // apply position and rotation of spaceship to bullet
        this.parent.appendChild( leftBullet );
        this.bullets.push( leftBullet );

        var rightBullet = new Bullet( this.yaw );
        rightBullet.setPosition( new Vector3( [ 3, 0, 0 ] ) );
        rightBullet.combineWith( this );
        this.parent.appendChild( rightBullet );
        this.bullets.push( rightBullet );

        this.soundSource.play();
    },
    rollTo: function( roll ) {
        this.targetRoll = roll;
    },
    update: function( dt ) {
        this.yaw += this.targetRoll / 4500;
        
        var targetOrientation = new Quaternion().setEuler( this.yaw, 0, this.targetRoll );
        this.setOrientation( this.getOrientation().slerp( targetOrientation, dt / 1000 ) );

        var velocity = new Vector3( [ -this.velocity * Math.sin( this.yaw ), 0, -this.velocity * Math.cos( this.yaw ) ] )
        this.move( velocity );
        this.soundSource.setVelocity( velocity );

        for ( var i = 0; i < this.bullets.length; ++i ) {
            this.bullets[ i ].update( dt );
        }
    }
};

Spaceship.extend( SceneNode );
