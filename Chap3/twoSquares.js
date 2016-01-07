"use strict";

var canvas;
var gl;

var theta1 = 0.0;
var theta2 = 0.0;
var thetaLoc;
var offsetLoc;

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    var vertices = [
        vec2(  0,  0.5 ),
        vec2(  -0.5,  0 ),
        vec2( 0.5,  0 ),
        vec2(  0, -0.5 )
    ];


    // Load the data into the GPU
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    thetaLoc = gl.getUniformLocation( program, "theta" );
    offsetLoc = gl.getUniformLocation( program, "offset" );

    render();
};


function render() {

    gl.clear( gl.COLOR_BUFFER_BIT );

    theta1 += 0.1;
    theta2 += 0.2;

    gl.uniform1f( thetaLoc, theta1 );
    gl.uniform1f( offsetLoc, -0.5 );
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

    gl.uniform1f( thetaLoc, theta2 );
    gl.uniform1f( offsetLoc, 0.5 );
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4 );

    window.requestAnimFrame(render);
}
