//Realistic over-G blackout effects
clearInterval(blackoutInt)
geofs["overlayG.glsl"] = "" + `
uniform sampler2D colorTexture;
varying vec2 v_textureCoordinates;
uniform float strength;

vec4 vignette(float strength, vec2 coordinate, vec2 texCoord) {
	vec2 uv = coordinate.xy / czm_viewport.zw;  
       uv *=  1.0 - uv.yx;
    
    float vig = (uv.x*uv.y) * 15.0; 
    
    vig = pow(vig, strength);
    return mix(vec4(vig), texture2D(colorTexture, texCoord), vig); 
}

vec4 grayOut(float strength, vec2 coordinate, vec2 texCoord) {
  vec4 initialCol = vignette(strength * 20.0, coordinate, texCoord);
  vec4 grayCol = vec4(vec3(initialCol.r), 1.0);
  return mix(initialCol, grayCol, strength * 3.0);
}

vec4 blur(float strength, vec2 coordinate, vec2 texCoord) {
 float radius = strength / 10.0;
 vec4 initialCol  = grayOut(strength, coordinate, texCoord);
 vec4 blurCol1    = grayOut(strength, coordinate + vec2(radius, 0.0), texCoord + vec2(radius, 0.0));
 vec4 blurCol2    = grayOut(strength, coordinate + vec2(-radius, 0.0), texCoord + vec2(-radius, 0.0));
 vec4 blurCol3    = grayOut(strength, coordinate + vec2(0.0, radius), texCoord + vec2(0.0, radius));
 vec4 blurCol4    = grayOut(strength, coordinate + vec2(0.0, -radius), texCoord + vec2(0.0, -radius));
 vec4 blurColr1   = grayOut(strength, coordinate + vec2(radius, radius), texCoord + vec2(radius, radius));
 vec4 blurColr2   = grayOut(strength, coordinate + vec2(radius, -radius), texCoord + vec2(radius, -radius));
 vec4 blurColr3   = grayOut(strength, coordinate + vec2(-radius, -radius), texCoord + vec2(-radius, -radius));
 vec4 blurColr4   = grayOut(strength, coordinate + vec2(-radius, -radius), texCoord + vec2(-radius, -radius));
  return mix(initialCol, mix(vec4(blurCol1 + blurCol2 + blurCol3 + blurCol4) / 4.0, vec4(blurColr1 + blurColr2 + blurColr3 + blurColr4) / 4.0, 0.25), strength * 2.0);
 
}

void main() {
  gl_FragColor = blur(strength, gl_FragCoord.xy, v_textureCoordinates);
}
`
let timer = 0;
let initTime = 0;
let holdT = 0;
let timerCheck = null;
let boInit = false;

function getStrength() {
  if (timer >= 0.6) {
    if (!timerCheck) timerCheck = setInterval(function(){
      if (timer < 0.6) {
      clearInterval(timerCheck);
      timerCheck = null;
      }
    }, 100)
  }
  var g = geofs.animation.values.accZ / 9.8;
  if (g > 8.5) {
    initTime += 0.05; //0.01, speed of blackout effect
    console.log(initTime);
    if (initTime > 0.1) boInit = true; //1, time delay before blackout
    if (boInit) {
      if (timer < 1) timer += 0.001 * ((g - 5) / 10) * (1 + timer / 10);
      if (timer == 1 && holdT < 10) holdT = timer += 0.001 * ((g - 5) / 10) * (1 + timer / 10);
      return timer;
    } else {
      return 0;
    }
  } else {
      initTime = 0;
      if (holdT > 0) holdT -= 0.0005;
      if (timer > 0 && holdT == 0) timer -= 0.0005;
      if (timer <= 0) boInit = false;
      return timer;
  }
}

geofs.fx.overg = {
  create: function() {
    geofs.fx.overg.shader =  new Cesium.PostProcessStage({
      fragmentShader : geofs["overlayG.glsl"],
      uniforms: {
        strength: 0.0,
      }
    })
    geofs.api.viewer.scene.postProcessStages.add(geofs.fx.overg.shader);
  },
  update: function() {
    geofs.fx.overg.shader.uniforms.strength = getStrength();
  }
};

//make this only execute if the advanced atmosphere is done loading
geofs.fx.overg.create()
blackoutEffectInterval = setInterval(function(){geofs.fx.overg.update();}, 10)
