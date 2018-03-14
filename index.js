var canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

var gl = canvas.getContext('webgl');

gl.clearColor(1, 0, 1, 1);
gl.clear(gl.COLOR_BUFFER_BIT);


var vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, [
  'attribute vec2 position;', // first thing is to create an attribute is a way for us to pass in data to the shader
  'void main() {', // every shader needs to have a main function defined.  this will be the main point of our application that starts up
    'gl_Position = vec4(position, 0.0, 1.0);', // access the gl_position variable and set it to a vector 4 (4 floating point values) - passing in the position variable that we defined above.  We're not going to worry about the other 2 positions for now
  '}'
].join('\n'));
gl.compileShader(vertexShader);


var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, [
  'precision highp float;', //
  'uniform vec4 color;', //
  'void main() {', //
    'gl_FragColor = color;', //
  '}', //
].join('\n'));
gl.compileShader(fragmentShader);
/*

WE cant use attributes in the fragment shadoer we have to instead use a uniform
it's just like an attribute it allows us to take add data from outside and pass it into the shader
a uniform will be availbale to both the vertex shader and the fragment color

*/ 


var program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);


var vertices = new Float32Array([
  -0.5,-0.5,
  0.5,-0.5,
  0.0,0.5
]);


var buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);


gl.useProgram(program);
program.color = gl.getUniformLocation(program, 'color');
gl.uniform4fv(program.color, [0, 1, 0, 1.0]);


program.position = gl.getAttribLocation(program, 'position');
gl.enableVertexAttribArray(program.position);
gl.vertexAttribPointer(program.position, 2, gl.FLOAT, false, 0, 0);


gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 2);







