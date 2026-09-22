// Compatibility layer for running the UVic CSC 305 assignments outside the course environment.
// They were written against the course's copy of Angel & Shreiner's Common/ library, which
// differs from the published edition (github.com/esangel/WebGL) in a few ways:
//   1. setupWebGL returned a WebGL 2 context (the shaders use #version 300 es).
//   2. scale(x, y, z) returned a scaling matrix (the published library calls that scalem).
//   3. scalev(s, v) scaled a vector (the published library's two-argument scale).
//   4. inverseTranspose(m) returned the 4x4 normal matrix.

WebGLUtils.setupWebGL = function (canvas, opt_attribs) {
  return canvas.getContext('webgl2', opt_attribs);
};

var vectorScale = scale;
scale = function () {
  return arguments.length === 3
    ? scalem(arguments[0], arguments[1], arguments[2])
    : vectorScale.apply(null, arguments);
};

function scalev(s, v) {
  return vectorScale(s, v);
}

function inverseTranspose(m) {
  return transpose(inverse4(m));
}
