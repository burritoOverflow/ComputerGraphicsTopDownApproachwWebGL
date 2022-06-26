/**
 * Compile and link the vertex and fragment shaders
 *
 * @param {*} gl
 * @param {*} vertexShaderId - id for the vertex shader element
 * @param {*} fragmentShaderId - id for the vertex shader element
 * @returns
 */
function initShaders(gl, vertexShaderId, fragmentShaderId) {
  const vertElem = document.getElementById(vertexShaderId);
  if (!vertElem) {
    const errMsg = `Unable to load vertex shader ${vertexShaderId}; no element found`;
    alert(errMsg);
    throw errMsg;
  } else {
    var vertShdr = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertShdr, vertElem.text);
    gl.compileShader(vertShdr);
    if (!gl.getShaderParameter(vertShdr, gl.COMPILE_STATUS)) {
      const msg = `Vertex shader failed to compile with error: ${gl.getShaderInfoLog(
        vertShdr
      )}`;
      alert(msg);
      throw msg;
    }
    console.info("Vertex shader initialized");
  }

  const fragElem = document.getElementById(fragmentShaderId);
  if (!fragElem) {
    alert(`Unable to load fragment shader ${vertexShaderId}; no element found`);
  } else {
    var fragShdr = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragShdr, fragElem.text);
    gl.compileShader(fragShdr);
    if (!gl.getShaderParameter(fragShdr, gl.COMPILE_STATUS)) {
      const msg = `Fragment shader failed to compile with error: ${gl.getShaderInfoLog(
        fragShdr
      )}`;
      alert(msg);
      throw msg;
    }
    console.info("Fragment shader initialized");
  }

  const program = gl.createProgram();
  gl.attachShader(program, vertShdr);
  gl.attachShader(program, fragShdr);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const msg = `Shader program failed to link with error ${gl.getProgramInfoLog(
      program
    )}`;
    alert(msg);
    throw msg;
  }

  return program;
}
