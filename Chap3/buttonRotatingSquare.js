"use strict";

let canvas, gl, thetaLoc;
let theta = 0.0;
let increment = 0.1;
let shouldRotate = true;

window.onload = function () {
  document.getElementById("toggle").onclick = () => {
    shouldRotate = !shouldRotate;
  };

  document.getElementById("change-direction").onclick = () => {
    increment = -increment;
  };

  canvas = document.getElementById("gl-canvas");
  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("WebGL isn't available");
  }

  //  Configure WebGL
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  //  Load shaders and initialize attribute buffers
  let program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);

  // Load the data into the GPU
  const vertices = [vec2(0, 1), vec2(-1, 0), vec2(1, 0), vec2(0, -1)];
  const bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

  // Associate out shader letiables with our data buffer
  let vPosition = gl.getAttribLocation(program, "vPosition");
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  thetaLoc = gl.getUniformLocation(program, "theta");

  render();
};

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.uniform1f(thetaLoc, theta);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  if (shouldRotate) {
    theta += increment;
  }
  window.requestAnimFrame(render);
}
