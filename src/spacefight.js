var app = new Application();
app.setTitle( 'SpaceFight 3D' );
app.camera.setPosition( new Vector3( [ 0, 5, 20 ] ) );

var spaceship = new Spaceship();
app.scene.appendChild( spaceship );

app.input.onKey( 'RIGHT_ARROW', function() {
    spaceship.rollTo( -45 );
} );

app.input.onKey( 'LEFT_ARROW', function() {
    spaceship.rollTo( 45 );
} );

app.input.onKeyUp( [ 'RIGHT_ARROW', 'LEFT_ARROW' ], function() {
    spaceship.rollTo( 0 );
} );

app.input.onKey( 'SPACE', function() {
    spaceship.shoot();
} );

app.input.onKey( 'ENTER', function() {
    spaceship.reset();
} );

app.importer.load( 'spaceship.obj', function( model ) {
    model.rotate( new Vector3( [ 1, 0, 0 ] ), -Math.PI / 2 ); // fix orientation
    // Spaceship has the logic (transformations, shooting etc).
    // We can attach a 3D model to it as a child in the scene
    // and the transformations of the spaceship "logic" will be applied to the 3D model.
    spaceship.appendChild( model );
} );

app.ui.attachCSS( "src/hud/hud.css" );
app.ui.loadHTML( "src/hud/hud.html", function( hudElement ) {
    document.body.appendChild( hudElement );
} );

app.update = function( dt ) {
    spaceship.update( dt );
};
