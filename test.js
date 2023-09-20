class Example extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.image(
      "earth",
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1581715/bg.png"
    );
  }

  create() {
    //  First we need to add a 'main' function that calls mainImage,
    //  passing in the gl_FragColor and gl_FragCoord.

    //  Also add we can add in the uniforms required at the start.
    //  This shader needs 'time' and 'resolution'.
    //  Phaser creates these automatically, along with the varying
    //  uniform fragCoord.

    //  In order to get this shader finally working we need to do one of two things:

    //  1) Find and replace the uniforms 'iTime' and 'iResolution' and rename them to
    //  'time' and 'resolution'. ShaderToy uses these names but Phaser uses the non
    //  camel-case versions.
    //
    //  2) If you'd rather not change the code, you can add in the following defines:
    //
    //  #define iTime time
    //  #define iResolution resolution
    //
    //  This maps the Phaser uniforms with the ShaderToy ones. At this point,
    //  the shader will now work.

    //  The last change to make regards the fragment coordinates.

    //  If you want to use the shader full-screen, i.e. the full size of your
    //  canvas, then you don't need to do this step. However, if you'd like to
    //  scale or rotate the shader, or place it into a scaling Container,
    //  you need to modify the frag coordinate.
    //  gl_FragCoord effectively means 'use the full canvas' as the resolution.

    //  If you swap it for 'fragCoord', it will use the size of the Phaser Shader
    //  instead for reference. If you click in this demo it'll swap between the
    //  two methods and you will notice the difference between screen space and
    //  local space.

    //  A final note: Some ShaderToy examples use the piLib SDK, this is a
    //  bunch of functions that are pre-defined and injected into ShaderToy
    //  code. I've extracted them out and put them in assets/shaders/shadertoy-common.glsl.js
    //  If you find a shader that doesn't work because of a missing function, or
    //  function override error (especially with `texture()` or `textureLod`), then
    //  you'll find the relevant functions in this file. Copy them into the shader.

    let shaderToy3 = `
      precision mediump float;
      uniform float time;
      uniform vec2 resolution;
      varying vec2 fragCoord;
  
   float rand(float Seed){
      
      return fract(sin(Seed*4124213.)*37523.);
  }
  
  float rand(vec2 co)
  {
      float a = 12.9898;
      float b = 78.233;
      float c = 43758.5453;
      float dt= dot(co.xy ,vec2(a,b));
      float sn= mod(dt,3.14);
      return fract(sin(sn) * c);
  }
  
  float randInRange(float id, vec2 range){
      
      id = rand(id);
      return range.x + id * (range.y-range.x);
  }
  
  
  void AddPannedGrid( inout vec4 FragCol, vec2 uv, vec4 GridColor,
                     vec2 panningSpeedRange, float gridSize, float seedDiff){
      
  
      float verticalStretch = (8.0);
      vec2 st = uv;
      
      // This value tells you the index of the columns and rows. You might have 
      // to recalculate it if you pan something
      vec2 gridID = floor ( vec2(uv.x*rand(seedDiff) * gridSize, uv.y *verticalStretch));
      
      
      // Paning the texture
      
      uv.y+= rand(gridID.x+0. + seedDiff)+randInRange(gridID.x+seedDiff, panningSpeedRange)*time*rand(0.25);
      
      // divide the uv so that it creates the grid
      uv = fract ( vec2(uv.x*rand(cos(3.14)) * gridSize , uv.y *verticalStretch));
     
      
      // Shading the grids
      float diagonal = smoothstep(0., 0.05, uv.y - uv.x*.1*st.y);
  
      vec3 temp = vec3((1.-uv.x)*pow((1.0-uv.y)*1.1,4.))*diagonal;
      
      
      // Applying the alpha and the fin color addtiv on top
      FragCol.xyz += GridColor.a * GridColor.xyz*temp;
      
  }
  
  
  void mainImage( out vec4 color, vec2 coord )
  {
      // Normalized pixel coordinates (from 0 to 1)
      vec2 uv = coord.xy/resolution.xy;
  
      // Compensating for aspect ration
      uv.x *= resolution.x/resolution.y;
      
      vec4 finalColor = vec4(0.);
      
      // Adding the efect Additiv
      AddPannedGrid(finalColor, uv, vec4(0.25,0.5, .6, 0.2), vec2(.8,.8), 130., 4.5);
      
     AddPannedGrid(finalColor, uv, vec4(0.2,0.3,0.8,0.2), vec2(.5,0.9), 120.,1.50);
      
      // Output to screen
      color = vec3(0.0);
  }
  
          void main(void)
          {
              mainImage(gl_FragColor, fragCoord.xy);
          }
          `;

    this.add.image(512, 512, "earth");
    let worldBaseShader = new Phaser.Display.BaseShader("snow", shaderToy3);

    let worldShader = this.add.shader(worldBaseShader, 512, 512, 1024, 1024);
    // make this shader into a texture //
    worldShader.setRenderToTexture("bufferA");

    // pass the finalized shader-texture in an image
    this.add.image(512, 512, "bufferA");
  }
}

const config = {
  type: Phaser.WEBGL,
  width: 1024,
  height: 1024,
  parent: "phaser-example",
  scene: Example,
};

let game = new Phaser.Game(config);
