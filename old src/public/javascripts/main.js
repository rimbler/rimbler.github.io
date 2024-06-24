// Ensure shader program can be loaded
while ( typeof(vsSource) == undefined ) {
  
}

// Global effectives
var cubeRotation = 0.0;

//
// start here
//
main();
function main() {
  const canvas = document.querySelector("#glCanvas");
  const gl = canvas.getContext("webgl");
  // Set up the texture specifications
  // Load texture
  const texture = loadTexture(gl, './images/paper_tex.jpg'); 
  // gl.NEAREST is also allowed, instead of gl.LINEAR, as neither mipmap.
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  // Prevents s-coordinate wrapping (repeating).
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  // Prevents t-coordinate wrapping (repeating).
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  
  // Only continue if WebGL is available and working
  if (gl === null) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    return;
  }

  // Get shader program set up
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      // vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor')
      textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord')
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      uSampler: gl.getUniformLocation(shaderProgram, 'uSampler')
    },
  };
  // Initialize Buffers
  const buffers = initBuffers(gl);

  // Render Scene! (eventually on a loop)
  var then = 0;
  var currentTime = 0.0;
  var lastTime = 0.0;
  var nbFrames = 0;
  
  // Draw the scene repeatedly
  function render(now) {
    now *= 0.001;  // convert to seconds
    const deltaTime = now - then;
    then = now;
    cubeRotation += deltaTime;

    drawScene(gl, programInfo, buffers, texture, deltaTime);

    requestAnimationFrame(render);
    document.getElementById('rotationID').innerText = "Rotation Factor: " 
      + cubeRotation.toFixed(3);
    

    // Measure speed, low rent version
    nbFrames++;
    // document.getElementById('infoID').innerText = "Time: " 
    //     + now.toFixed(3) + " " + lastTime.toFixed(3) + " " + nbFrames;
		if ( now - lastTime >= 1 ){ 
      lastTime = now;
      document.getElementById('fpsID').innerText = "FPS: " 
        + nbFrames;
      nbFrames = 0;
    }
  }
  requestAnimationFrame(render);
}

function draw() {
    alert("Drawn!");
    var canvas = document.getElementById('glCanvas');
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
      ctx.fillStyle = 'green';
      ctx.fillRect(10, 10, 100, 100);
    }
  }