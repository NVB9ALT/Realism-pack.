//Consistency
function realismGo() {
   console.log("Realism Pack running")
   ui.notification.showOnce("This addon is in desparate need of a lot of major work, yet I haven't done any work on it for months. I'm sorry. I may try to find someone else to take over development.")
}

console.log("Original scripts for immersion SFX, stall buffet, carrier catapults, and lift-based wingflex copyright AriakimTaiyo");


function gBreath() {
   if (geofs.animation.values.loadFactor >= 3) {
audio.impl.html5.playFile("https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/cutgbreath.mp3")
	}
}
function flankerStall() {
   if (geofs.aircraft.instance.id == 18 && geofs.addonAircraft.isSu27 == 1 && geofs.animation.values.cobraMode == 1) {
audio.impl.html5.playFile("https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/flankerstall.m4a")
	}
}
gBreathInt = setInterval(function(){gBreath()},3500)
flankerStallInt = setInterval(function(){flankerStall()},3000)

/* The chat website used for this is broken at this time :(
    let addonChat = document.createElement("li");
    addonChat.innerHTML = '<li><iframe width="1000", height="1500", left=350,top=50, src="https://chat.hyperjs.ml/GeoFS", title="Addon chat"</iframe></li>';
    document.getElementsByClassName("geofs-list geofs-toggle-panel geofs-preference-list geofs-preferences")[0].appendChild(addonChat);
*/
    //this breaks things if its run before terrain has loaded
    //geofs.api.waterDetection.create();
    lagReductionInterval = setInterval(function () {
        geofs.savePreferencesPanel();
        geofs.api.renderingSettings.degradedCollisions = true;
        geofs.api.renderingSettings.lowResRunways = true;
    }, 100);
    geofs.animation.values.shake = null
    function getShake() {
        geofs.animation.values.shake = geofs.animation.values.aoa * Math.random();
    }
    function doShake() {
      getShake() 
      if (geofs.animation.values.aoa >= 10 && geofs.aircraft.instance.id != 4) {
      geofs.camera.translate(0.0001 * geofs.animation.values.shake,0.0001 * geofs.animation.values.shake,0.0001 * geofs.animation.values.shake)
      setTimeout(function(){
        geofs.camera.translate(-0.0001 * geofs.animation.values.shake,-0.0001 * geofs.animation.values.shake,-0.0001 * geofs.animation.values.shake)
      },1)
      }
    }
    shakeInterval = setInterval(function(){doShake()},10)
    gSoundInt = setInterval(function(){
       if (geofs.animation.values.accZ >= 50 && geofs.animation.values.view == "cockpit") {
    audio.impl.html5.playFile("https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/wind.mp3")
        }
       if (geofs.animation.values.accZ >= 70 && geofs.animation.values.view == "cockpit") {
    audio.impl.html5.playFile("https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/wind.mp3")
        }
    },1000)
    propwashInt = setInterval(function(){
        if (geofs.aircraft.instance.id == 21 || geofs.aircraft.instance.id == 2 || geofs.aircraft.instance.id == 2808 || geofs.aircraft.instance.id == 1 || geofs.aircraft.instance.id == 8 || geofs.aircraft.instance.id == 12 || geofs.aircraft.instance.id == 13 || geofs.aircraft.instance.id == 40 || geofs.aircraft.instance.id == 1069 || geofs.aircraft.instance.id == 2750 || geofs.aircraft.instance.id == 4251)  {
    if (geofs.addonAircraft.isTruck != 1) {
    geofs.aircraft.instance.airfoils.forEach(function(e){
    if (e.forceDirection == 2) {
       e.propwash = 0.005
    } else {
       e.propwash = 0.01
    }
    })
    geofs.aircraft.instance.setup.parts[0].centerOfMass = [geofs.animation.values.rpm/1000, 0, 0]
       }
        }
    })
blackoutLoadInt = setInterval(function(){
   if (geofs.fx.atmosphere.atmospherePostProcessStage._ready == true) {
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
  var g = geofs.animation.values.loadFactor;
  if (g > 9) {
    initTime += 0.05; //0.01, speed of blackout effect
    //console.log(initTime);
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
    geofs.fx.overg.shader = new Cesium.PostProcessStage({
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
//geofs.fx.atmosphere.atmospherePostProcessStage._ready
geofs.fx.overg.create()
blackoutEffectInterval = setInterval(function(){geofs.fx.overg.update();}, 10)
clearInterval(blackoutLoadInt)
   }
}, 1000)
    function fixSpin() {
        if (geofs.aircraft.instance.id == 2948 || geofs.aircraft.instance.id == 2581) {
            var pitch = geofs.animation.values.atilt;
            setTimeout(() => {
                if (geofs.animation.values.atilt + 50 < pitch || geofs.animation.values.atilt - 50 > pitch) {
                    geofs.aircraft.instance.definition.minimumSpeed = 600;
                    console.log("Spin detected");
                    geofs.flyToCamera();
                    console.log("Spin fixed");
                    setTimeout(() => {
                        geofs.aircraft.instance.definition.minimumSpeed = 250;
                    }, 5000);
                }
            }, 500);
        }
        if (geofs.aircraft.instance.id == 2808 || geofs.aircraft.instance.id == 3460) {
            var pitch = geofs.animation.values.atilt;
            setTimeout(() => {
                if (geofs.animation.values.atilt + 50 < pitch || geofs.animation.values.atilt - 50 > pitch) {
                    geofs.aircraft.instance.definition.minimumSpeed = 200;
                    console.log("Spin detected");
                    geofs.flyToCamera();
                    console.log("Spin fixed");
                    setTimeout(() => {
                        geofs.aircraft.instance.definition.minimumSpeed = 200;
                    }, 5000);
                }
            }, 500);
        }
        if (geofs.aircraft.instance.id == 2988) {
            var pitch = geofs.animation.values.atilt;
            setTimeout(() => {
                if (geofs.animation.values.atilt + 50 < pitch || geofs.animation.values.atilt - 50 > pitch) {
                    geofs.aircraft.instance.definition.minimumSpeed = 1000;
                    console.log("Spin detected");
                    geofs.flyToCamera();
                    console.log("Spin fixed");
                    setTimeout(() => {
                        geofs.aircraft.instance.definition.minimumSpeed = 250;
                    }, 5000);
                }
            }, 500);
        }
    }
    fixyFixy = setInterval(function () {
        fixSpin();
    }, 1000);
    geofs.aircraftList["1000"].dir = "|models|aircraft|generics|c182|";
    var aircraftChecked = new Boolean(0);
    var script2 = document.createElement("script");
    script2.src = "https://raw.githack.com/NVB9ALT/GeoFS-Aircraft-Changes/main/Aircraft-fixes.js";
    document.body.appendChild(script2);
    script2.onload = function () {
        realismify();
    };
/* //Removed for now because it's buggy at certain times of day (flickering stars at dawn/dusk)
   //Besides, it didn't work anyway - probably overwritten by some other part of the GeoFS enviro engine
   //TODO: new implementation (possibly create new skybox?)
    function showTheStars() {
        if (geofs.aircraft.instance.altitude >= 80000 || geofs.isNight == 1) {
            geofs.api.viewer.scene.skyBox.show = 1;
        } else {
            geofs.api.viewer.scene.skyBox.show = 0;
        }
    }
    starsInterval = setInterval(function () {
        showTheStars();
    }, 1000);
*/
    function runBladeCollisions() {
        if (geofs.animation.values.aroll > 70 || geofs.animation.values.aroll < -70) {
            if (geofs.animation.values.haglFeet <= 5 && geofs.preferences.crashDetection == 1) {
                if (geofs.aircraft.instance.id == 9 || geofs.aircraft.instance.id == 52 || geofs.aircraft.instance.id == 2840 || geofs.aircraft.instance.id == 4090) {
                    geofs.aircraft.instance.crash();
                }
            }
        }
    }
    bladeCollisionInterval = setInterval(function () {
        runBladeCollisions();
    }, 1000);
    function runTurbAccel() {
        if (geofs.aircraft.instance.definition.maxRPM == 10000) {
            if (geofs.animation.values.rpm < 5999) {
                geofs.aircraft.instance.definition.engineInertia = 0.2;
            }
            if (geofs.animation.values.rpm >= 6000 && geofs.animation.values.rpm < 6999) {
                geofs.aircraft.instance.definition.engineInertia = 0.5;
            }
            if (geofs.animation.values.rpm >= 7000) {
                geofs.aircraft.instance.definition.engineInertia = 1;
            }
        }
    }
    turbAccelInt = setInterval(function () {
        runTurbAccel();
    }, 100);
    var scriptC = document.createElement("script");
    scriptC.src = "https://cdn.jsdelivr.net/gh/NVB9ALT/Weather-Mods@main/Advanced-2d-CloudsD.js";
    document.body.appendChild(scriptC);
    scriptC.onload = function () {
        fixCloudsDensity();
    };
    //kludge fix
    geofs.cons = true;
    var scriptCCP = document.createElement("script");
    scriptCCP.src = "https://raw.githack.com/NVB9ALT/GeoFS-Clickable-Cockpits/personal-proxy-config/main.js";
    document.body.appendChild(scriptCCP);
    scriptCCP.onload = function () {
        runClickableCockpits();
    };
    var scriptVC = document.createElement("script");
    scriptVC.src = "https://raw.githack.com/NVB9ALT/GeoFS-Effects-Rework/main/vortexCon.js";
    document.body.appendChild(scriptVC);
    scriptVC.onload = function () {
        runVortexCons();
    };
    var scriptFBW = document.createElement("script");
    scriptFBW.src = "https://raw.githack.com/NVB9ALT/Fighter-jet-FBW/main/main.js";
    document.body.appendChild(scriptFBW);
    scriptFBW.onload = function () {
        addFBW()
    }
    var scriptSB = document.createElement("script");
    scriptSB.src = "https://raw.githack.com/NVB9ALT/GeoFS-sound-changes/main/main.js";
    document.body.appendChild(scriptSB);
    scriptSB.onload = function () {
        addEffects();
    };
    var scriptCCI = document.createElement("script");
    scriptCCI.src = "https://raw.githack.com/NVB9ALT/Fixed-CC-PFDs-and-HUDs/main/fix.js";
    document.body.appendChild(scriptCCI);
    scriptCCI.onload = function () {
        redoPFDSHUDS();
    };
    var scriptEJ = document.createElement("script");
    scriptEJ.src = "https://cdn.jsdelivr.net/gh/NVB9ALT/Fighter-jet-ejections@main/mainG.js";
    document.body.appendChild(scriptEJ);
    scriptEJ.onload = function () {
        runEjections();
    };
    var scriptAS = document.createElement("script");
    scriptAS.src = "https://raw.githack.com/kolos26/GeoFS-spoilerArming/main/spoilerarming.js";
    document.body.appendChild(scriptAS);
    var scriptKCAS = document.createElement("script");
    scriptKCAS.src = "https://raw.githack.com/NVB9ALT/Bookmarklet_AP-Plus-Plus_and_FMC/main/Realistic%20KIAS.js";
    document.body.appendChild(scriptKCAS);
    scriptKCAS.onload = function () {
        runTrueKias();
    };
    function lookBack() {
        if (geofs.camera.currentModeName == "cockpit" && geofs.addonAircraft.isF117 != 1) {
            geofs.camera.currentDefinition.position[0] = geofs.aircraft.instance.definition.cameras.cockpit.position[0] + geofs.camera.definitions["cockpit"].orientations.current[0] / 1000;
        }
    }
    lookBackInterval = setInterval(function () {
        lookBack();
    }, 100);
    var script2 = document.createElement("script");
    script2.src = "https://cdn.jsdelivr.net/gh/NVB9ALT/GeoFs-Carrier-Catapults-from-AriakimTaiyo@main/catapultsF.js";
    document.body.appendChild(script2);
    script2.onload = function () {
        runCatapults();
    };
    function checkOverlays() {
    if (Object.values(geofs.runways.nearRunways)[0].icao == "VNLK") {
       void(0)
    } else {
    geofs.runways.setRunwayModelVisibility(0)
    }
    };checkOverlayInt = setInterval(function(){checkOverlays()},1000)
    
    console.log("Original immersion SFX scripts copyright Ariakim Taiyo");
    console.log("Modified by NVB9 and Kolos26");
    
    //variable to tell if the script has run or not
    var b737Sounds = 0
    soundInt = null;
    tcasIntervalAnnounce = null;
    effectInterval = null;
    accelInt = null;
    flexInterval = null;
    
    function checkForBoeing737() {
    if (geofs.aircraft.instance.id == 4 || geofs.aircraft.instance.id == 3054) { //if the aircraft currently being flown is a 737
    if (b737Sounds != geofs.aircraft.instance.id){ //if the script hasn't already run on this aircraft
    //preventing errors
            clearInterval(soundInt);
            clearInterval(tcasIntervalAnnounce);
            clearInterval(accelInt);
            clearInterval(flexInterval);
    //running the script
    var script737 = document.createElement('script'); 
    script737.src="https://raw.githack.com/kolos26/GeoFs-737-Immersion-SFX-for-Realism-Addon/main/index.js";
    document.body.appendChild(script737);
    script737.onload = function(){clearInterval(tcasIntervalAnnounce)};
    
    //script has run now, so we change scriptHasRun to avoid having the script execute multiple times per aircraft instance
    //this avoids massive lag
    b737Sounds = geofs.aircraft.instance.id
          }
       }
    //if the aircraft isn't a 737
    else {
    //clearing the script when the aircraft isn't a 737 to avoid filling up the console with errors
    if (typeof soundInt != undefined) {
       clearInterval(soundInt)
       clearInterval(tcasIntervalAnnounce)
       clearInterval(accelInt)
       clearInterval(flexInterval)
    } else {
    void(0)
    };
    //making sure the script can run again next time a 737 is selected
        b737Sounds = 0
       }
    }
    
    //running the above function once per second
    checkInterval = setInterval(function(){
    checkForBoeing737()
    }, 1000)
    
    var b777sounds = new Boolean(0)
    
    function checkForBoeing777() {
    
    if (geofs.aircraft.instance.id == 240 || geofs.aircraft.instance.id == 25 || geofs.aircraft.instance.id == 4402) {
    if (b777sounds == 0){
    
    var script777 = document.createElement('script'); 
    script777.src="https://cdn.jsdelivr.net/gh/NVB9ALT/777-Realism-Overhaul-for-Realism-Addon@main/indexA.js";
    document.body.appendChild(script777);
    script777.onload = function (){change777s()}
    
    b777sounds = 1
          }
       } else {
    if (typeof effectInterval != undefined) {
       clearInterval(effectInterval)
    } else {
       void(0)
    }
        b777sounds = 0
       }
    }
    
    checkInterval1 = setInterval(function(){
    checkForBoeing777()
    }, 1000)
    
    //variable to tell if the script has run or not
        var a320Sounds = 0
    
        function checkFora320() {
        if (geofs.aircraft.instance.id == 2865 || geofs.aircraft.instance.id == 2870 || geofs.aircraft.instance.id == 2871 || geofs.aircraft.instance.id == 242 || geofs.aircraft.instance.id == 2843 || geofs.aircraft.instance.id == 2899 || geofs.aircraft.instance.id == 24 || geofs.aircraft.instance.id == 2973) { //if the aircraft currently being flown is a320 or a220 or a350
        if (a320Sounds != geofs.aircraft.instance.id){ //if the script hasn't already run on this aircraft
        //preventing errors
                clearInterval(soundInt);
                clearInterval(tcasIntervalAnnounce);
                clearInterval(accelInt);
                clearInterval(flexInterval);
        //running the script
        var a320script = document.createElement('script'); 
        a320script.src="https://raw.githack.com/kolos26/geofs-a320neo-sounds-byAriakimTaiyo/main/sounds.js";
        document.body.appendChild(a320script);
    
        //script has run now, so we change scriptHasRun to avoid having the script execute multiple times per aircraft instance
        //this avoids massive lag
        a320Sounds = geofs.aircraft.instance.id
            }
        }
        //if the aircraft isn't a 320
        else {
            //making sure the script can run again next time a 320 is selected
            a320Sounds = 0
        }
        }
    
        //running the above function once per second
        checkInterval2 = setInterval(function(){
        checkFora320()
        }, 1000)
    
    
    
    //Add them in the places where the normal PFDs & HUDs are
    
    geofs.calculatedAOA = null;
    function normalizeAroll() {
       var normalized = null;
    if (geofs.animation.values.aroll < 0) {
       normalized = geofs.animation.values.aroll * -1
    } else {
       normalized = geofs.animation.values.aroll
    }
       return normalized
    }
    function verifyAoA() {
       var verticalComp = normalizeAroll() - geofs.animation.values.atilt
        var zeroedGLoad = geofs.animation.values.loadFactor - 1
        var climbrate = geofs.animation.values.verticalSpeed //in ft/min or something similar
        var pitchControl = geofs.animation.values.pitch
        var rollControl = geofs.animation.values.roll
        var originalAOA = geofs.animation.values.aoa
        geofs.calculatedAOA = pitchControl//for now
    }
    aoaInterval = setInterval(function(){verifyAoA()},10)
    
    //now includes machmeter!
    instruments.renderers.genericHUD = function (a) {
            var b = exponentialSmoothing("smoothKias", geofs.animation.getValue("kias"), 0.1),
                c = [256, 256],
                d = a.canvasAPI.context;
            a.canvasAPI.clear();
            d.fillStyle = "#00ff00";
            d.strokeStyle = "#00ff00";
            d.save();
            d.beginPath();
            d.arc(c[0], c[1], 200, 0, 6.28);
            d.clip();
            a.drawGrads(a.canvasAPI, {
                position: c,
                center: [100, 100],
                zero: [100, 100],
                size: [200, 200],
                orientation: "y",
                direction: -1,
                rotation: geofs.animation.getValue("aroll") * DEGREES_TO_RAD,
                value: -geofs.animation.getValue("atilt"),
                interval: 5,
                pixelRatio: 20,
                pattern: [
                    [
                        {
                            length: 40,
                            offset: { x: -50, y: 0 },
                            legend: !0,
                            legendOffset: { x: -80, y: 5 },
                            process: function (e) {
                                return Math.round(e);
                            },
                        },
                        {
                            length: 40,
                            offset: { x: 10, y: 0 },
                            legend: !0,
                            legendOffset: { x: 60, y: 5 },
                            process: function (e) {
                                return Math.round(e);
                            },
                        },
                    ],
                ],
            });
            d.restore();
            a.canvasAPI.drawRotatedSprite({ image: a.images.overlays, origin: [248, 0], size: [36, 28], center: [18, 210], destination: [256, 256], rotation: geofs.animation.getValue("aroll") * DEGREES_TO_RAD, translation: [0, 0] });
            d.drawImage(a.images.background, 0, 0);
            a.canvasAPI.drawSprite({
                image: a.images.overlays,
                origin: [230, 239],
                size: [51, 30],
                center: [26, 15],
                destination: c,
                    //, clamp(100 * geofs.calculatedAOA, -150, 150)
                translation: [clamp(6.5 * geofs.animation.getValue("NAV1CourseDeviation"), -75, 75), clamp(300 * geofs.calculatedAOA, -250, 250)],
            });
            d.lineWidth = 2;
            d.font = "20px sans-serif";
            d.textAlign = "right";
            d.save();
            d.beginPath();
            d.rect(84, 116, 70, 280);
            d.rect(68, 243, 75, 25);
            d.clip("evenodd");
            a.drawGrads(a.canvasAPI, {
                position: [104, 116],
                zero: [0, 140],
                size: [50, 280],
                orientation: "y",
                direction: -1,
                value: b,
                interval: 10,
                pixelRatio: 1.3,
                align: "right",
                pattern: [
                    [{ length: -10, legend: !0, legendOffset: { x: -14, y: 7 } }],
                    [{ length: -7 }],
                    [{ length: -7 }],
                    [{ length: -7 }],
                    [{ length: -7 }],
                    [{ length: -10 }],
                    [{ length: -7 }],
                    [{ length: -7 }],
                    [{ length: -7 }],
                    [{ length: -7 }],
                ],
                sprites: [{ image: a.images.overlays, origin: [143, 0], size: [25, 27], center: [-8, 13], value: geofs.autopilot.values.speed, clamp: !0 }],
            });
            d.restore();
            d.save();
            d.beginPath();
            d.rect(358, 116, 47, 280);
            d.rect(368, 243, 75, 25);
            d.clip("evenodd");
            a.drawGrads(a.canvasAPI, {
                position: [358, 116],
                zero: [0, 140],
                size: [47, 280],
                orientation: "y",
                direction: -1,
                value: geofs.animation.getValue("altitude"),
                interval: 100,
                pixelRatio: 0.13,
                pattern: [
                    [
                        {
                            length: 10,
                            legend: !0,
                            legendOffset: { x: 47, y: 7 },
                            process: function (e) {
                                return Math.round(e / 100);
                            },
                        },
                    ],
                    [{ length: 7 }],
                    [{ length: 7 }],
                    [{ length: 7 }],
                    [{ length: 7 }],
                ],
                sprites: [
                    { image: a.images.overlays, origin: [223, 0], size: [25, 62], center: [5, 31], value: geofs.autopilot.values.altitude, clamp: !0 },
                    { image: a.images.overlays, origin: [383, 0], size: [42, 255], center: [0, 0], value: geofs.animation.values.haglFeet },
                ],
            });
            d.restore();
            d.save();
            d.beginPath();
            d.rect(173, 440, 165, 30);
            d.clip("evenodd");
            d.textAlign = "center";
            a.drawGrads(a.canvasAPI, {
                position: [173, 440],
                zero: [82, 0],
                size: [165, 30],
                orientation: "x",
                direction: 1,
                value: geofs.animation.getValue("heading360"),
                interval: 5,
                pixelRatio: 7.25,
                pattern: [
                    [
                        {
                            length: 10,
                            legend: !0,
                            legendOffset: { x: 0, y: 30 },
                            process: function (e) {
                                return Math.round(fixAngle360(e) / 10);
                            },
                        },
                    ],
                    [{ length: 5 }],
                ],
            });
            d.restore();
            d.font = "20px sans-serif";
            d.textAlign = "right";
            d.fillText(Math.round(geofs.animation.getValue("kias")), 129, 264);
            d.fillText(Math.round(geofs.animation.getValue("altitude")), 441, 264);
            d.fillText(Math.round(geofs.calculatedAOA), 410, 426);
            d.fillText("M " + geofs.animation.getValue("mach").toFixed(2), 150, 425);
            c = b = a = "";
            geofs.autopilot.on && ((a = "SPD"), "NAV" == geofs.autopilot.mode ? ((b = "NAV"), geofs.autopilot.VNAV ? ((b = "LOC"), (c = "G/S")) : (c = "ALT")) : ((b = "HDG"), (c = "ALT")));
            d.fillText(a, 143, 446);
            d.fillText(c, 143, 466);
            d.fillText(b, 143, 486);
            d.textAlign = "left";
            d.fillText("G " + geofs.animation.getValue("loadFactor").toFixed(1), 143, 110);
        }
    
    //---------------------------------------------------------------------------------------------------------------------------------------------------------
    //Most of this is not related to the realism pack. This stuff loads 4 models directly related to the realism pack,
    //while the rest is for the addon aircraft (in a separate addon in my repository list).
    
    var droptankF16 = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/370_gal_drop_tank.glb"
    var condensationConesLarge = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/concones.glb"
    var condensationConesSmall = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/concones2.glb"
    var machCone = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/shockcone.glb"
    var parachute = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/parachute-proper.glb"
    var rainEffect = "https://geo-fs.com/models/precipitations/rain.gltf"
    var f18Afterburner = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/geofsf-a18cafterburner.glb"
    var f18GearUp = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/geofsf-a-18cgearup.glb"
    var f18GearDown = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/geofsf-a-18cgeardown.glb"
    var f18Cockpit = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/f-18-cockpit.glb"
    var f18Airbrake = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/f-18-airbrake.glb"
    var mig17GearUp = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/mig-17-gear-up.glb"
    var mig17GearDown = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/mig-17-gear-down.glb"
    var mig17speedbrake = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/mig-17-speedbrakes.glb"
    var mig17Afterburner = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/mig-17-afterburner.glb"
    var truckModel = "https://geo-fs.com/models/objects/vehicles/truck/multiplayer.glb"
    var su27airbrake = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/su-27_airbrake.glb"
    var f14airbrake = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/f-14a_speedbrake.glb"
    var f14gearup = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/f-14a_main_gear_up.glb"
    var f14geardown = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/f-14a_main_gear_down.glb"
    var f14wingstraight = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/f-14a_wings_straight.glb"
    var f14wingswept = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/f-14a_wings_swept.glb"
    var f14tailhookup = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/f14a_tailhook_up.glb"
    var f14tailhookdown = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/f14a_tailhook_down.glb"
    var f14cockpit = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/f-14a_cockpit.glb"
    var f14burner = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/f-14a-ab.glb"
    var e7antenna = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/e-7_wedgetail_antenna.glb"
    var mig21gearup = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/mig-21_gear_up.glb"
    var mig21geardown = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/mig-21_gear_down.glb"
    var mig21afterburner = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/mig-21_blowtorch.glb"
    var mig21droptank = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/mig-21_fuel_tank.glb"
    var mig21nozzle = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/mig-21_nozzle.glb"
    var mig21cockpit = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/mig-21_cockpit.glb"
    var MsG = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/morane-saulnier_g.glb"
    var MsGprop = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/morane-saulnier_g_prop.glb"
    var MsGcockpit = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/morane-saulnier_g_cockpit.glb"
    var f117GearUp = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/f117_gear_up.glb"
    var f117GearDown = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/f117_gear_down.glb"
    var f117cockpit = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/f117-cockpit.glb"
    var mig25geardown = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/mig-25_gear_down_2.glb"
    var mig25gearup = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/mig-25_gear_up_2.glb"
    var mig25ab = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/mig-25_afterburner_2.glb"
    var mig25flapsup = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/mig-25_flaps_up_2.glb"
    var mig25flapsdown = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/mig-25_flaps_down_2.glb"
    
    geofs.addonAircraft = {};
    geofs.addonAircraft.isFA18 = 0
    geofs.addonAircraft.isMig17 = 0
    geofs.addonAircraft.isTruck = 0
    geofs.addonAircraft.isF14A = 0
    geofs.addonAircraft.isE7 = 0
    geofs.addonAircraft.isMiG21 = 0
    geofs.addonAircraft.isMSG = 0
    geofs.addonAircraft.isF117 = 0
    geofs.addonAircraft.isMiG25 = 0

    geofs.debug.createMiG25GearDown = function() {
       geofs.debug.MiG25GearDown = {};
       geofs.debug.MiG25GearDown.model = new geofs.api.Model(mig25geardown)
    }
    geofs.debug.loadMiG25GearDown = function() {
       geofs.debug.MiG25GearDown || geofs.debug.createMiG25GearDown()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.MiG25GearDown.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("MiG-25 Gear Down loading error. " + e)
        }
    }

    geofs.debug.createMiG25GearUp = function() {
       geofs.debug.MiG25GearUp = {};
       geofs.debug.MiG25GearUp.model = new geofs.api.Model(mig25gearup)
    }
    geofs.debug.loadMiG25GearUp = function() {
       geofs.debug.MiG25GearUp || geofs.debug.createMiG25GearUp()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.MiG25GearUp.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("MiG-25 Gear Up loading error. " + e)
        }
    }

    geofs.debug.createMiG25FlapsUp = function() {
       geofs.debug.MiG25FlapsUp = {};
       geofs.debug.MiG25FlapsUp.model = new geofs.api.Model(mig25flapsup)
    }
    geofs.debug.loadMiG25FlapsUp = function() {
       geofs.debug.MiG25FlapsUp || geofs.debug.createMiG25FlapsUp()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.MiG25FlapsUp.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("MiG-25 Flaps Up loading error. " + e)
        }
    }

    geofs.debug.createMiG25FlapsDown = function() {
       geofs.debug.MiG25FlapsDown = {};
       geofs.debug.MiG25FlapsDown.model = new geofs.api.Model(mig25flapsdown)
    }
    geofs.debug.loadMiG25FlapsDown = function() {
       geofs.debug.MiG25FlapsDown || geofs.debug.createMiG25FlapsDown()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.MiG25FlapsDown.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("MiG-25 Flaps Down loading error. " + e)
        }
    }

    geofs.debug.createMiG25AB = function() {
       geofs.debug.MiG25AB = {};
       geofs.debug.MiG25AB.model = new geofs.api.Model(mig25ab)
    }
    geofs.debug.loadMiG25AB = function() {
       geofs.debug.MiG25AB || geofs.debug.createMiG25AB()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.MiG25AB.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("MiG-25 Afterburner loading error. " + e)
        }
    }

    geofs.debug.createF117GearUp = function() {
       geofs.debug.F117GearUp = {};
       geofs.debug.F117GearUp.model = new geofs.api.Model(f117GearUp)
    }
    geofs.debug.loadF117GearUp = function() {
       geofs.debug.F117GearUp || geofs.debug.createF117GearUp()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.F117GearUp.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("F-117 Nighthawk Gear Up loading error. " + e)
        }
    }
    geofs.debug.createF117Cockpit = function() {
       geofs.debug.F117Cockpit = {};
       geofs.debug.F117Cockpit.model = new geofs.api.Model(f117cockpit)
    }
    geofs.debug.loadF117Cockpit = function() {
       geofs.debug.F117Cockpit || geofs.debug.createF117Cockpit()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.F117Cockpit.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("F-117 Nighthawk Cockpit loading error. " + e)
        }
    }
    geofs.debug.createF117GearDown = function() {
       geofs.debug.F117GearDown = {};
       geofs.debug.F117GearDown.model = new geofs.api.Model(f117GearDown)
    }
    geofs.debug.loadF117GearDown = function() {
       geofs.debug.F117GearDown || geofs.debug.createF117GearDown()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.F117GearDown.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("F-117 Nighthawk Gear Down loading error. " + e)
        }
    }
    
    geofs.debug.createMsG = function() {
       geofs.debug.MsG = {};
        geofs.debug.MsG.model = new geofs.api.Model(MsG)
    }
    geofs.debug.loadMSG = function() {
       geofs.debug.MsG || geofs.debug.createMsG()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.MsG.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("Morane-Saulnier G loading error. " + e)
        }
    };
    geofs.debug.createMsGcockpit = function() {
       geofs.debug.MsGcockpit = {};
        geofs.debug.MsGcockpit.model = new geofs.api.Model(MsGcockpit)
    }
    geofs.debug.loadMSGcockpit = function() {
       geofs.debug.MsGcockpit || geofs.debug.createMsGcockpit()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.MsGcockpit.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("Morane-Saulnier G cockpit loading error. " + e)
        }
    };
    geofs.debug.createMsGprop = function() {
       geofs.debug.MsGprop = {};
        geofs.debug.MsGprop.model = new geofs.api.Model(MsGprop)
    }
    geofs.debug.loadMSGprop = function() {
       geofs.debug.MsGprop || geofs.debug.createMsGprop()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = [M33.getOrientation(geofs.aircraft.instance.object3d._rotation)[0], M33.getOrientation(geofs.aircraft.instance.object3d._rotation)[1], M33.getOrientation(geofs.aircraft.instance.object3d._rotation)[2]];
            geofs.debug.MsGprop.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("Morane-Saulnier G propeller loading error. " + e)
        }
    };

    geofs.debug.createMig21Nozzle = function() {
       geofs.debug.Mig21Nozzle = {};
        geofs.debug.Mig21Nozzle.model = new geofs.api.Model(mig21nozzle)
    }
    geofs.debug.loadMig21Nozzle = function() {
       geofs.debug.Mig21Nozzle || geofs.debug.createMig21Nozzle()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.Mig21Nozzle.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("Mig-21 Nozzle loading error. " + e)
        }
    };
    geofs.debug.createMig21Cockpit = function() {
       geofs.debug.Mig21Cockpit = {};
        geofs.debug.Mig21Cockpit.model = new geofs.api.Model(mig21cockpit)
    }
    geofs.debug.loadMig21Cockpit = function() {
       geofs.debug.Mig21Cockpit || geofs.debug.createMig21Cockpit()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.Mig21Cockpit.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("Mig-21 Cockpit loading error. " + e)
        }
    };
    geofs.debug.createMig21GearUp = function() {
       geofs.debug.Mig21GearUp = {};
        geofs.debug.Mig21GearUp.model = new geofs.api.Model(mig21gearup)
    }
    geofs.debug.loadMig21GearUp = function() {
       geofs.debug.Mig21GearUp || geofs.debug.createMig21GearUp()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.Mig21GearUp.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("Mig-21 Gear Up loading error. " + e)
        }
    };
    geofs.debug.createMig21GearDown = function() {
       geofs.debug.Mig21GearDown = {};
        geofs.debug.Mig21GearDown.model = new geofs.api.Model(mig21geardown)
    }
    geofs.debug.loadMig21GearDown = function() {
       geofs.debug.Mig21GearDown || geofs.debug.createMig21GearDown()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.Mig21GearDown.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("Mig-21 Gear Down loading error. " + e)
        }
    };
    geofs.debug.createMig21AB = function() {
       geofs.debug.Mig21AB = {};
        geofs.debug.Mig21AB.model = new geofs.api.Model(mig21afterburner)
    }
    geofs.debug.loadMig21AB = function() {
       geofs.debug.Mig21AB || geofs.debug.createMig21AB()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.Mig21AB.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("Mig-21 Afterburner loading error. " + e)
        }
    };
    geofs.debug.createMig21Tank = function() {
       geofs.debug.Mig21Tank = {};
        geofs.debug.Mig21Tank.model = new geofs.api.Model(mig21droptank)
    }
    geofs.debug.loadMig21Tank = function() {
       geofs.debug.Mig21Tank || geofs.debug.createMig21Tank()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.Mig21Tank.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("Mig-21 Drop Tank loading error. " + e)
        }
    };

    geofs.debug.createF14AGearUp = function() {
       geofs.debug.F14AGearUp = {};
        geofs.debug.F14AGearUp.model = new geofs.api.Model(f14gearup)
    }
    geofs.debug.loadF14AGearUp = function() {
       geofs.debug.F14AGearUp || geofs.debug.createF14AGearUp()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.F14AGearUp.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("F-14A Gear Up loading error. " + e)
        }
    };
    geofs.debug.createF14AGearDown = function() {
       geofs.debug.F14AGearDown = {};
        geofs.debug.F14AGearDown.model = new geofs.api.Model(f14geardown)
    }
    geofs.debug.loadF14AGearDown = function() {
       geofs.debug.F14AGearDown || geofs.debug.createF14AGearDown()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.F14AGearDown.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("F-14A Gear Down loading error. " + e)
        }
    };
    geofs.debug.createF14AWingStraight = function() {
       geofs.debug.F14AWingStraight = {};
        geofs.debug.F14AWingStraight.model = new geofs.api.Model(f14wingstraight)
    }
    geofs.debug.loadF14AWingStraight = function() {
       geofs.debug.F14AWingStraight || geofs.debug.createF14AWingStraight()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.F14AWingStraight.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("F-14A Straight Wings loading error. " + e)
        }
    };
    geofs.debug.createF14AWingSwept = function() {
       geofs.debug.F14AWingSwept = {};
        geofs.debug.F14AWingSwept.model = new geofs.api.Model(f14wingswept)
    }
    geofs.debug.loadF14AWingSwept = function() {
       geofs.debug.F14AWingSwept || geofs.debug.createF14AWingSwept()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.F14AWingSwept.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("F-14A Swept Wings loading error. " + e)
        }
    };
    geofs.debug.createF14ASpeedbrake = function() {
       geofs.debug.F14ASpeedbrake = {};
        geofs.debug.F14ASpeedbrake.model = new geofs.api.Model(f14airbrake)
    }
    geofs.debug.loadF14ASpeedbrake = function() {
       geofs.debug.F14ASpeedbrake || geofs.debug.createF14ASpeedbrake()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.F14ASpeedbrake.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("F-14A speedbrake loading error. " + e)
        }
    };
    geofs.debug.createF14ACockpit = function() {
       geofs.debug.F14ACockpit = {};
        geofs.debug.F14ACockpit.model = new geofs.api.Model(f14cockpit)
    }
    geofs.debug.loadF14ACockpit = function() {
       geofs.debug.F14ACockpit || geofs.debug.createF14ACockpit()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.F14ACockpit.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("F-14A cockpit loading error. " + e)
        }
    };
    geofs.debug.createF14ABurner = function() {
       geofs.debug.F14ABurner = {};
        geofs.debug.F14ABurner.model = new geofs.api.Model(f14burner)
    }
    geofs.debug.loadF14ABurner = function() {
       geofs.debug.F14ABurner || geofs.debug.createF14ABurner()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.F14ABurner.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("F-14A afterburner loading error. " + e)
        }
    };
    
    geofs.debug.createTruck = function() {
       geofs.debug.truck = {};
        geofs.debug.truck.model = new geofs.api.Model(truckModel)
    }
    geofs.debug.loadTruck = function() {
       geofs.debug.truck || geofs.debug.createTruck()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.truck.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("Truck model loading error. " + e)
        }
    };

    geofs.debug.createSu27Airbrake = function() {
       geofs.debug.su27airbrake = {};
        geofs.debug.su27airbrake.model = new geofs.api.Model(su27airbrake)
    }
    geofs.debug.loadSu27Airbrake = function() {
       geofs.debug.su27airbrake || geofs.debug.createSu27Airbrake()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.su27airbrake.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("Su-27 airbrake loading error. " + e)
        }
    };

    geofs.debug.createF18GearUp = function() {
       geofs.debug.F18GearUp = {};
        geofs.debug.F18GearUp.model = new geofs.api.Model(f18GearUp)
    }
    geofs.debug.loadF18GearUp = function() {
       geofs.debug.F18GearUp || geofs.debug.createF18GearUp()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.F18GearUp.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("F18 Gear Up loading error. " + e)
        }
    };
    geofs.debug.createF18GearDown = function() {
       geofs.debug.F18GearDown = {};
        geofs.debug.F18GearDown.model = new geofs.api.Model(f18GearDown)
    }
    geofs.debug.loadF18GearDown = function() {
       geofs.debug.F18GearDown || geofs.debug.createF18GearDown()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.F18GearDown.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("F18 Gear Down loading error. " + e)
        }
    };
    geofs.debug.createF18AB = function() {
       geofs.debug.F18AB = {};
        geofs.debug.F18AB.model = new geofs.api.Model(f18Afterburner)
    }
    geofs.debug.loadF18AB = function() {
       geofs.debug.F18AB || geofs.debug.createF18AB()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.F18AB.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("F18 AB loading error. " + e)
        }
    };
    geofs.debug.createF18Cockpit = function() {
       geofs.debug.F18Cockpit = {};
        geofs.debug.F18Cockpit.model = new geofs.api.Model(f18Cockpit)
    }
    geofs.debug.loadF18Cockpit = function() {
       geofs.debug.F18Cockpit || geofs.debug.createF18Cockpit()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.F18Cockpit.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("F18 cockpit loading error. " + e)
        }
    };
    geofs.debug.createF18Airbrake = function() {
       geofs.debug.F18Airbrake = {};
        geofs.debug.F18Airbrake.model = new geofs.api.Model(f18Airbrake)
    }
    geofs.debug.loadF18Airbrake = function() {
       geofs.debug.F18Airbrake || geofs.debug.createF18Airbrake()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.F18Airbrake.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("F18 airbrake loading error. " + e)
        }
    };
        
    geofs.debug.createMiG17GearUp = function() {
       geofs.debug.MiG17GearUp = {};
        geofs.debug.MiG17GearUp.model = new geofs.api.Model(mig17GearUp)
    }
    geofs.debug.loadMiG17GearUp = function() {
       geofs.debug.MiG17GearUp || geofs.debug.createMiG17GearUp()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.MiG17GearUp.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("MiG-17 Gear Up loading error. " + e)
        }
    };
    geofs.debug.createMiG17GearDown = function() {
       geofs.debug.MiG17GearDown = {};
        geofs.debug.MiG17GearDown.model = new geofs.api.Model(mig17GearDown)
    }
    geofs.debug.loadMiG17GearDown = function() {
       geofs.debug.MiG17GearDown || geofs.debug.createMiG17GearDown()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.MiG17GearDown.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("MiG-17 Gear Down loading error. " + e)
        }
    };
    geofs.debug.createMiG17AB = function() {
       geofs.debug.MiG17AB = {};
        geofs.debug.MiG17AB.model = new geofs.api.Model(mig17Afterburner)
    }
    geofs.debug.loadMiG17AB = function() {
       geofs.debug.MiG17AB || geofs.debug.createMiG17AB()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.MiG17AB.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("MiG-17 AB loading error. " + e)
        }
    };
    geofs.debug.createMiG17Speedbrake = function() {
       geofs.debug.MiG17Speedbrake = {};
        geofs.debug.MiG17Speedbrake.model = new geofs.api.Model(mig17speedbrake)
    }
    geofs.debug.loadMiG17Speedbrake = function() {
       geofs.debug.MiG17Speedbrake || geofs.debug.createMiG17Speedbrake()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.MiG17Speedbrake.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("MiG-17 speedbrake loading error. " + e)
        }
    };
        
    geofs.debug.loadF16Tank = function() {
       geofs.debug.F16Tank || geofs.debug.createF16Tank()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.F16Tank.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("F16 tank loading error. " + e)
        }
    };

    geofs.debug.createMachCone = function() {
       geofs.debug.machCone = {};
        geofs.debug.machCone.model = new geofs.api.Model(machCone)
    }
    geofs.debug.loadMachCone = function() {
       geofs.debug.machCone || geofs.debug.createMachCone()
        try {
             geofs.debug.machCone.model._model.color.alpha = 0.9
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.machCone.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("Mach cone loading error. " + e)
        }
    };

    geofs.debug.createParachute = function() {
       geofs.debug.parachute = {};
        geofs.debug.parachute.model = new geofs.api.Model(parachute)
    }
    geofs.debug.loadParachute = function() {
       geofs.debug.parachute || geofs.debug.createParachute()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.parachute.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("Parachute loading error. " + e)
        }
    };

    geofs.debug.createConConesLarge = function() {
       geofs.debug.conConeLarge = {};
        geofs.debug.conConeLarge.model = new geofs.api.Model(condensationConesLarge)
    }
    geofs.debug.loadConConesLarge = function() {
       geofs.debug.conConeLarge || geofs.debug.createConConesLarge()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([Math.floor(Math.random() * 2) * 0.05, Math.floor(Math.random() * 2) * 0.05, Math.floor(Math.random() * 2) * 0.05], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.conConeLarge.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("Condensation cone loading error. " + e)
        }
    };

    geofs.debug.createConConesSmall = function() {
       geofs.debug.conConeSmall = {};
        geofs.debug.conConeSmall.model = new geofs.api.Model(condensationConesSmall)
    }
    geofs.debug.loadConConesSmall = function() {
       geofs.debug.conConeSmall || geofs.debug.createConConesSmall()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([Math.floor(Math.random() * 2) * 0.05, Math.floor(Math.random() * 2) * 0.05, Math.floor(Math.random() * 2) * 0.05], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.conConeSmall.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("Condensation cone loading error. " + e)
        }
    };

    geofs.debug.createE7Antenna = function() {
       geofs.debug.E7Antenna = {};
        geofs.debug.E7Antenna.model = new geofs.api.Model(e7antenna)
    }
    geofs.debug.loadE7Antenna = function() {
       geofs.debug.E7Antenna || geofs.debug.createE7Antenna()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.E7Antenna.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("E-7 AEW&C antenna loading error. " + e)
        }
    };

    geofs.debug.update = function (a) {
        geofs.debug.fps = exponentialSmoothing("fps", 1e3 / a).toPrecision(2);
        if (geofs.debugOn) {
            if ((a = $(".debugPointName")[0])) {
                a = a.value;
                var b = geofs.aircraft.instance.parts[a],
                    c = instruments.list[a];
                if (b) {
                    var d = $(".debugCollisionPointIndex")[0].value;
                    d
                        ? ((d = b.collisionPoints[parseInt(d)] || b.points[d]), geofs.debug.placeAxis(b.object3d.getWorldFrame(), d.worldPosition))
                        : ($(".debugShowForceSource")[0].checked && geofs.debug.placeAxis(b.object3d.getWorldFrame(), b.points.forceSourcePoint.worldPosition),
                          $(".debugShowForceDirection")[0].checked && geofs.debug.placeAxis(b.object3d.getWorldFrame(), b.points.forceDirection.worldPosition),
                          $(".debugShowLocalPosition")[0].checked && geofs.debug.placeAxis(b.object3d.getWorldFrame(), b.object3d.worldPosition),
                          $(".debugShowsuspensionOrigin")[0].checked && geofs.debug.placeAxis(b.object3d.getWorldFrame(), b.points.suspensionOrigin.worldPosition));
                    $(".debugPartData").html("Node Origin: " + b.object3d._nodeOrigin);
                }
                c && c.definition.cockpit && ((b = c.definition.cockpit.position), geofs.debug.placeAxis(geofs.aircraft.instance.object3d.getWorldFrame(), b.worldPosition));
                "camera" == a && ((b = geofs.aircraft.instance.definition.camera.cockpit), geofs.aircraft.instance.object3d.setVectorWorldPosition(b), geofs.debug.placeAxis(geofs.aircraft.instance.object3d.getWorldFrame(), b.worldPosition));
            }
            geofs.debug.placingObjectId = $(".objectId").val();
            geofs.debug.placingObjectId &&
                $(".geofs-debugObjectLlaHtr").text(geofs.objects.getLla(geofs.debug.placingObjectId) + " " + geofs.objects.getHtr(geofs.debug.placingObjectId) + " " + geofs.objects.getScale(geofs.debug.placingObjectId));
        }
         // brake parachute
         if (geofs.aircraft.instance.id == 7) { //compile database
      if (geofs.animation.values.airbrakesTarget > 0 && geofs.animation.values.kias >= 10 && geofs.animation.values.kias <= 200) {
    geofs.debug.loadParachute()
    //increase drag a lot without having it increment (somehow)
    //separate function for each aircraft? would definitely be doable
    geofs.aircraft.instance.definition.dragFactor = 10
      } else {
    geofs.aircraft.instance.definition.dragFactor = 0.5
      }
         }
      if (geofs.addonAircraft.isSu27 == 1 && geofs.animation.values.airbrakesTarget > 0) {
        geofs.debug.loadSu27Airbrake()
      }
      if (geofs.animation.values.mach > 0.95 && geofs.animation.values.mach < 1.05 && geofs.aircraft.instance.id != 2364 && geofs.cons == true) {
         geofs.debug.loadMachCone()
      }
      if (geofs.aircraft.instance.id == 18 && geofs.animation.values.kias > 50 && geofs.animation.values.accZ > 60 && geofs.cons == true && geofs.addonAircraft.isFA18 != 1 ) {
        geofs.debug.loadConConesLarge()
      }
      if (geofs.aircraft.instance.id == 18 && geofs.animation.values.kias > 50 && geofs.animation.values.accZ > 60 && geofs.cons == true && geofs.addonAircraft.isFA18 == 1 ) {
        geofs.debug.loadConConesSmall()
      }
      if (geofs.aircraft.instance.id == 7 && geofs.animation.values.kias > 50 && geofs.animation.values.accZ > 60 && geofs.cons == true && geofs.addonAircraft.isMiG21 != 1) {
        geofs.debug.loadConConesSmall()
      }
      if (geofs.aircraft.instance.id == 2857 && geofs.animation.values.kias > 50 && geofs.animation.values.accZ > 60 && geofs.cons == true) {
        geofs.debug.loadConConesSmall()
      }
      //load cockpit for DHC-8 Q400
      //edit emb120 cockpit in vectary
      if (geofs.aircraft.instance.id == 247 && geofs.camera.currentModeName == "cockpit") {
        void(0) //placeholder
      }
    
      if (geofs.addonAircraft.isF14A == 1 && geofs.animation.values.view != "cockpit" && geofs.animation.values.gearTarget == 1) {
        geofs.debug.loadF14AGearUp()
      }
      if (geofs.addonAircraft.isF14A == 1 && geofs.animation.values.view != "cockpit" && geofs.animation.values.gearTarget == 0) {
        geofs.debug.loadF14AGearDown()
      }
      if (geofs.addonAircraft.isF14A == 1 && geofs.animation.values.view != "cockpit" && controls.optionalAnimatedPart.target == 0) {
        geofs.debug.loadF14AWingStraight()
      }
      if (geofs.addonAircraft.isF14A == 1 && geofs.animation.values.view != "cockpit" && controls.optionalAnimatedPart.target == 1) {
        geofs.debug.loadF14AWingSwept()
      }
      //if (geofs.addonAircraft.isF14A == 1 && geofs.animation.values.view != "cockpit" &&) {
      //}
      //if (geofs.addonAircraft.isF14A == 1 && geofs.animation.values.view != "cockpit" &&) {
      //}
      if (geofs.addonAircraft.isF14A == 1 && geofs.animation.values.view != "cockpit" && geofs.animation.values.airbrakesTarget == 1) {
        geofs.debug.loadF14ASpeedbrake()
      }
      if (geofs.addonAircraft.isF14A == 1 && geofs.animation.values.view == "cockpit") {
        geofs.debug.loadF14ACockpit()
      }
      if (geofs.addonAircraft.isF14A == 1 && geofs.animation.values.rpm > 9100) {
	 geofs.debug.loadF14ABurner()
      }
    
      if (geofs.addonAircraft.isFA18 == 1 && geofs.animation.values.airbrakesTarget == 1) {
        geofs.debug.loadF18Airbrake()  
      }
      if (geofs.addonAircraft.isFA18 == 1 && geofs.animation.values.gearTarget == 0) {
        geofs.debug.loadF18GearDown()
      }
      if (geofs.addonAircraft.isFA18 == 1 && geofs.animation.values.gearTarget == 1) {
        geofs.debug.loadF18GearUp()
      }
      if (geofs.addonAircraft.isFA18 == 1 && geofs.animation.values.rpm >= 9100) {
        geofs.debug.loadF18AB()
      }
      if (geofs.addonAircraft.isFA18 == 1 && geofs.animation.values.view == "cockpit") {
        geofs.debug.loadF18Cockpit()
      }
    
      if (geofs.addonAircraft.isMig17 == 1 && geofs.animation.values.airbrakesTarget == 1) {
        geofs.debug.loadMiG17Speedbrake()
      }
      if (geofs.addonAircraft.isMig17 == 1 && geofs.animation.values.gearTarget == 0 && geofs.animation.values.view != "cockpit") {
        geofs.debug.loadMiG17GearDown()
      }
      if (geofs.addonAircraft.isMig17 == 1 && geofs.animation.values.gearTarget == 1 && geofs.animation.values.view != "cockpit") {
        geofs.debug.loadMiG17GearUp()
      }
      if (geofs.addonAircraft.isMig17 == 1 && geofs.animation.values.rpm >= 9100) {
        geofs.debug.loadMiG17AB()
      }
      if (geofs.addonAircraft.isE7 == 1) {
        geofs.debug.loadE7Antenna()
      }
      if (geofs.addonAircraft.isMiG21 == 1 && geofs.animation.values.gearTarget == 0 && geofs.animation.values.view != "cockpit") {
          geofs.debug.loadMig21GearDown()
          geofs.debug.loadMig21Nozzle()
      }
      if (geofs.addonAircraft.isMiG21 == 1 && geofs.animation.values.gearTarget == 1 && geofs.animation.values.view != "cockpit") {
          geofs.debug.loadMig21GearUp()
          geofs.debug.loadMig21Nozzle()
      }
      if (geofs.addonAircraft.isMiG21 == 1 && geofs.animation.values.view == "cockpit") {
          geofs.debug.loadMig21Cockpit()
      }
      if (geofs.addonAircraft.isMiG21 == 1 && geofs.animation.values.rpm >= 9100) {
          geofs.debug.loadMig21AB()
      }
      if (geofs.addonAircraft.isMiG21 == 1 && controls.optionalAnimatedPart.target == 1) {
          geofs.debug.loadMig21Tank()
      }
      if (geofs.addonAircraft.isMSG == 1 && geofs.animation.values.view != "cockpit") {
          geofs.debug.loadMSG();
      }
      if (geofs.addonAircraft.isMSG == 1 && geofs.animation.values.view != "cockpit" && geofs.animation.values.enginesOn == 0) {
          geofs.debug.loadMSGprop();
      }
      if (geofs.addonAircraft.isMSG == 1 && geofs.animation.values.view == "cockpit") {
          geofs.debug.loadMSGcockpit();
      }
      if (geofs.addonAircraft.isF117 == 1 && geofs.animation.values.gearTarget == 1 && geofs.animation.values.view != "cockpit") {
         geofs.debug.loadF117GearUp();
      }
      if (geofs.addonAircraft.isF117 == 1 && geofs.animation.values.gearTarget == 0 && geofs.animation.values.view != "cockpit") {
         geofs.debug.loadF117GearDown();
      }
      if (geofs.addonAircraft.isF117 == 1 && geofs.animation.values.view == "cockpit") {
         geofs.debug.loadF117Cockpit();
      }
      if (geofs.addonAircraft.isMiG25 == 1 && geofs.animation.values.gearTarget == 1) {
	 geofs.debug.loadMiG25GearUp()
	 geofs.debug.loadMiG25FlapsUp()
      }
      if (geofs.addonAircraft.isMiG25 == 1 && geofs.animation.values.gearTarget == 0) {
	 geofs.debug.loadMiG25GearDown()
	 geofs.debug.loadMiG25FlapsDown()
      }
      if (geofs.addonAircraft.isMiG25 == 1 && geofs.animation.values.rpm > 9000) {
	 geofs.debug.loadMiG25AB()
      }
        
      if (geofs.addonAircraft.isTruck == 1) {
        geofs.debug.loadTruck()  
      }
    };
document.getElementsByClassName("geofs-ui-top")[0].innerHTML = '<button class="geofs-radio-ident" onclick=geofs.switchAS() >KTAS------------</button><div class="geofs-autopilot-bar"><div class="control-pad geofs-autopilot-pad" title="Toggle autopilot on/off"><div class="control-pad-label transp-pad">AUTOPILOT</div></div><div class="geofs-autopilot-controls"><div class="geofs-autopilot-control"><a class="numberDown">-</a><input class="numberValue geofs-autopilot-speed" min="0" step="10" data-method="setSpeed" maxlength="3" value="0"><a class="numberUp">+</a><span>KTAS</span></div><div class="geofs-autopilot-control"><a class="numberDown">-</a><input class="numberValue geofs-autopilot-course" min="0" max="359" data-loop="true" step="1" data-method="setCourse" maxlength="3" value="000"><a class="numberUp">+</a><span class="geofs-autopilot-switch geofs-autopilot-mode"><a class="switchLeft geofs-autopilot-HDG green-pad" data-method="setMode" value="HDG">HDG</a><a class="switchRight geofs-autopilot-NAV" data-method="setMode" value="NAV">NAV</a></span></div><div class="geofs-autopilot-control"><a class="numberDown">-</a><input class="numberValue geofs-autopilot-altitude" min="0" max="100000" step="500" data-method="setAltitude" maxlength="5" value="00000"><a class="numberUp">+</a><span>ALTITUDE</span></div><div class="geofs-autopilot-control"><a class="numberDown">-</a><input class="numberValue geofs-autopilot-verticalSpeed" min="-6000" max="6000" step="100" data-method="setVerticalSpeed" maxlength="5" value="00000"><a class="numberUp">+</a><span>VERT SPEED</span></div></div></div>'
geofs.kiasOn = 0;
geofs.switchAS = function() {
   if (geofs.kiasOn == 0) {
    flight.setAnimationValues = function (a, b) {
//a = e from flight.tick
    var c = geofs.aircraft.instance,
        d = geofs.animation.values,
        e = c.llaLocation[2] * METERS_TO_FEET,
        g = (60 * (e - c.oldAltitude * METERS_TO_FEET)) / a;
    c.oldAltitude = c.llaLocation[2];
    var f = fixAngle(weather.currentWindDirection - c.htr[0]),
        k = c.engine.rpm * c.definition.RPM2PropAS * a;
    d.acceleration = M33.transform(M33.transpose(c.object3d._rotation), c.rigidBody.v_acceleration);
    d.accX = d.acceleration[0];
    d.accY = d.acceleration[1];
    d.accZ = d.acceleration[2];
    d.loadFactor = d.acceleration[2] / GRAVITY;
    d.slipball = exponentialSmoothing("slipball", d.acceleration[0], 0.02);
    d.ktas = c.trueAirSpeed * MS_TO_KNOTS;
    d.kiasChangeRate = (d.kias - d.ktas) * a;
    d.kias = d.kcas;
    d.kiasUnits = d.ktas % 10;
    d.kiasTens = d.ktas % 100;
    d.kiasHundreds = d.ktas % 1e3;
    d.kiasThousands = d.ktas % 1e4;
    d.groundSpeed = c.groundSpeed;
    d.groundSpeedKnt = c.groundSpeed * MS_TO_KNOTS;
    d.altitudeMeters = c.llaLocation[2];
    d.altitude = e;
    d.haglMeters = geofs.relativeAltitude;
    d.haglFeet = geofs.relativeAltitude * METERS_TO_FEET;
    d.groundElevationFeet = geofs.groundElevation * METERS_TO_FEET;
    d.verticalSpeed = g;
    d.climbrate = g;
    d.aoa = c.angleOfAttackDeg;
    d.turnrate = (60 * fixAngle(c.htr[0] - d.heading)) / a;
    d.pitchrate = (60 * fixAngle(c.htr[1] - d.atilt)) / a;
    d.heading = c.htr[0];
    d.heading360 = fixAngle360(c.htr[0]);
    d.atilt = c.htr[1];
    d.aroll = c.htr[2];
    d.enginesOn = c.engine.on;
    d.engineVibration = 100 < c.engine.rpm ? Math.random() * clamp(1e3 / c.engine.rpm, 0, 1) : 0;
    d.prop = fixAngle360(d.prop + k);
    d.thrust = c.totalThrust;
    d.rpm = c.engine.rpm;
    d.throttle = controls.throttle;
    d.mixture = controls.mixture;
    d.carbHeat = controls.carbHeat;
    d.smoothThrottle = exponentialSmoothing("throttle", d.throttle, 0.02);
    d.pitch = controls.pitch;
    d.rawPitch = controls.rawPitch;
    d.roll = controls.roll;
    d.yaw = controls.yaw;
    d.rawYaw = controls.rawYaw;
    d.trim = controls.elevatorTrim;
    d.brakes = controls.brakes;
    d.gearPosition = controls.gear.position;
    d.invGearPosition = 1 - controls.gear.position;
    d.gearTarget = controls.gear.target;
    d.flapsValue = controls.flaps.position / controls.flaps.maxPosition;
    d.accessoriesPosition = controls.accessories.position;
    d.flapsPosition = controls.flaps.position;
    d.flapsTarget = controls.flaps.target;
    d.flapsPositionTarget = controls.flaps.positionTarget;
    d.flapsMaxPosition = controls.flaps.maxPosition;
    d.airbrakesPosition = controls.airbrakes.position;
    d.optionalAnimatedPartPosition = controls.optionalAnimatedPart.position;
    d.airbrakesTarget = controls.airbrakes.target;
    d.parkingBrake = c.brakesOn;
    d.groundContact = c.groundContact ? 1 : 0;
    d.arrestingHookTension = c.arrestingCableContact ? V3.length(c.arrestingCableContact.force) : 0;
    d.airTemp = weather.atmosphere.airTempAtAltitude;
    d.mach = c.trueAirSpeed / (331.3 + 0.606 * weather.atmosphere.airTempAtAltitude);
    d.machUnits = Math.floor(d.mach);
    d.machTenth = Math.floor(10 * (d.mach % 1).toPrecision(2));
    d.machHundredth = Math.floor(100 * (d.mach % 0.1).toPrecision(2));
    d.altTenThousands = e % 1e5;
    d.altThousands = e % 1e4;
    d.altHundreds = e % 1e3;
    d.altTens = e % 100;
    d.altTensShift = Math.floor((e % 1e5) / 1e4);
    d.altUnits = e % 10;
    d.relativeWind = f;
    d.windSpeed = weather.currentWindSpeed;
    d.windSpeedLabel = parseInt(weather.currentWindSpeed) + " kts";
    d.view = geofs.camera.currentView;
    d.envelopeTemp = c.envelopeTemp;
    d["aircraft.maxAngularVRatio"] = c.maxAngularVRatio;
    d.rollingSpeed = c.groundContact ? c.velocityScalar : 0;
    "free" == geofs.camera.currentModeName || "chase" == geofs.camera.currentModeName
        ? ((c = geofs.utils.llaDistanceInMeters(geofs.camera.lla, c.llaLocation)), (d.cameraAircraftSpeed = (d.cameraAircraftDistance - c) / a), (d.cameraAircraftDistance = c))
        : ((d.cameraAircraftSpeed = 0), (d.cameraAircraftDistance = 0));
    d.geofsTime = b;
    geofs.api.postMessage({ animationValues: d });
};
document.getElementsByClassName("geofs-ui-top")[0].innerHTML = '<button class="geofs-radio-ident" onclick=geofs.switchAS() >KIAS------------</button><div class="geofs-autopilot-bar"><div class="control-pad geofs-autopilot-pad" title="Toggle autopilot on/off"><div class="control-pad-label transp-pad">AUTOPILOT</div></div><div class="geofs-autopilot-controls"><div class="geofs-autopilot-control"><a class="numberDown">-</a><input class="numberValue geofs-autopilot-speed" min="0" step="10" data-method="setSpeed" maxlength="3" value="0"><a class="numberUp">+</a><span>KIAS</span></div><div class="geofs-autopilot-control"><a class="numberDown">-</a><input class="numberValue geofs-autopilot-course" min="0" max="359" data-loop="true" step="1" data-method="setCourse" maxlength="3" value="000"><a class="numberUp">+</a><span class="geofs-autopilot-switch geofs-autopilot-mode"><a class="switchLeft geofs-autopilot-HDG green-pad" data-method="setMode" value="HDG">HDG</a><a class="switchRight geofs-autopilot-NAV" data-method="setMode" value="NAV">NAV</a></span></div><div class="geofs-autopilot-control"><a class="numberDown">-</a><input class="numberValue geofs-autopilot-altitude" min="0" max="100000" step="500" data-method="setAltitude" maxlength="5" value="00000"><a class="numberUp">+</a><span>ALTITUDE</span></div><div class="geofs-autopilot-control"><a class="numberDown">-</a><input class="numberValue geofs-autopilot-verticalSpeed" min="-6000" max="6000" step="100" data-method="setVerticalSpeed" maxlength="5" value="00000"><a class="numberUp">+</a><span>VERT SPEED</span></div></div></div>'
geofs.kiasOn = 1
	} else {
    flight.setAnimationValues = function (a, b) {
//a = e from flight.tick
    var c = geofs.aircraft.instance,
        d = geofs.animation.values,
        e = c.llaLocation[2] * METERS_TO_FEET,
        g = (60 * (e - c.oldAltitude * METERS_TO_FEET)) / a;
    c.oldAltitude = c.llaLocation[2];
    var f = fixAngle(weather.currentWindDirection - c.htr[0]),
        k = c.engine.rpm * c.definition.RPM2PropAS * a;
    d.acceleration = M33.transform(M33.transpose(c.object3d._rotation), c.rigidBody.v_acceleration);
    d.accX = d.acceleration[0];
    d.accY = d.acceleration[1];
    d.accZ = d.acceleration[2];
    d.loadFactor = d.acceleration[2] / GRAVITY;
    d.slipball = exponentialSmoothing("slipball", d.acceleration[0], 0.02);
    d.ktas = c.trueAirSpeed * MS_TO_KNOTS;
    d.kiasChangeRate = (d.kias - d.ktas) * a;
    d.kias = d.ktas;
    d.kiasUnits = d.ktas % 10;
    d.kiasTens = d.ktas % 100;
    d.kiasHundreds = d.ktas % 1e3;
    d.kiasThousands = d.ktas % 1e4;
    d.groundSpeed = c.groundSpeed;
    d.groundSpeedKnt = c.groundSpeed * MS_TO_KNOTS;
    d.altitudeMeters = c.llaLocation[2];
    d.altitude = e;
    d.haglMeters = geofs.relativeAltitude;
    d.haglFeet = geofs.relativeAltitude * METERS_TO_FEET;
    d.groundElevationFeet = geofs.groundElevation * METERS_TO_FEET;
    d.verticalSpeed = g;
    d.climbrate = g;
    d.aoa = c.angleOfAttackDeg;
    d.turnrate = (60 * fixAngle(c.htr[0] - d.heading)) / a;
    d.pitchrate = (60 * fixAngle(c.htr[1] - d.atilt)) / a;
    d.heading = c.htr[0];
    d.heading360 = fixAngle360(c.htr[0]);
    d.atilt = c.htr[1];
    d.aroll = c.htr[2];
    d.enginesOn = c.engine.on;
    d.engineVibration = 100 < c.engine.rpm ? Math.random() * clamp(1e3 / c.engine.rpm, 0, 1) : 0;
    d.prop = fixAngle360(d.prop + k);
    d.thrust = c.totalThrust;
    d.rpm = c.engine.rpm;
    d.throttle = controls.throttle;
    d.mixture = controls.mixture;
    d.carbHeat = controls.carbHeat;
    d.smoothThrottle = exponentialSmoothing("throttle", d.throttle, 0.02);
    d.pitch = controls.pitch;
    d.rawPitch = controls.rawPitch;
    d.roll = controls.roll;
    d.yaw = controls.yaw;
    d.rawYaw = controls.rawYaw;
    d.trim = controls.elevatorTrim;
    d.brakes = controls.brakes;
    d.gearPosition = controls.gear.position;
    d.invGearPosition = 1 - controls.gear.position;
    d.gearTarget = controls.gear.target;
    d.flapsValue = controls.flaps.position / controls.flaps.maxPosition;
    d.accessoriesPosition = controls.accessories.position;
    d.flapsPosition = controls.flaps.position;
    d.flapsTarget = controls.flaps.target;
    d.flapsPositionTarget = controls.flaps.positionTarget;
    d.flapsMaxPosition = controls.flaps.maxPosition;
    d.airbrakesPosition = controls.airbrakes.position;
    d.optionalAnimatedPartPosition = controls.optionalAnimatedPart.position;
    d.airbrakesTarget = controls.airbrakes.target;
    d.parkingBrake = c.brakesOn;
    d.groundContact = c.groundContact ? 1 : 0;
    d.arrestingHookTension = c.arrestingCableContact ? V3.length(c.arrestingCableContact.force) : 0;
    d.airTemp = weather.atmosphere.airTempAtAltitude;
    d.mach = c.trueAirSpeed / (331.3 + 0.606 * weather.atmosphere.airTempAtAltitude);
    d.machUnits = Math.floor(d.mach);
    d.machTenth = Math.floor(10 * (d.mach % 1).toPrecision(2));
    d.machHundredth = Math.floor(100 * (d.mach % 0.1).toPrecision(2));
    d.altTenThousands = e % 1e5;
    d.altThousands = e % 1e4;
    d.altHundreds = e % 1e3;
    d.altTens = e % 100;
    d.altTensShift = Math.floor((e % 1e5) / 1e4);
    d.altUnits = e % 10;
    d.relativeWind = f;
    d.windSpeed = weather.currentWindSpeed;
    d.windSpeedLabel = parseInt(weather.currentWindSpeed) + " kts";
    d.view = geofs.camera.currentView;
    d.envelopeTemp = c.envelopeTemp;
    d["aircraft.maxAngularVRatio"] = c.maxAngularVRatio;
    d.rollingSpeed = c.groundContact ? c.velocityScalar : 0;
    "free" == geofs.camera.currentModeName || "chase" == geofs.camera.currentModeName
        ? ((c = geofs.utils.llaDistanceInMeters(geofs.camera.lla, c.llaLocation)), (d.cameraAircraftSpeed = (d.cameraAircraftDistance - c) / a), (d.cameraAircraftDistance = c))
        : ((d.cameraAircraftSpeed = 0), (d.cameraAircraftDistance = 0));
    d.geofsTime = b;
    geofs.api.postMessage({ animationValues: d });
};
document.getElementsByClassName("geofs-ui-top")[0].innerHTML = '<button class="geofs-radio-ident" onclick=geofs.switchAS() >KTAS------------</button><div class="geofs-autopilot-bar"><div class="control-pad geofs-autopilot-pad" title="Toggle autopilot on/off"><div class="control-pad-label transp-pad">AUTOPILOT</div></div><div class="geofs-autopilot-controls"><div class="geofs-autopilot-control"><a class="numberDown">-</a><input class="numberValue geofs-autopilot-speed" min="0" step="10" data-method="setSpeed" maxlength="3" value="0"><a class="numberUp">+</a><span>KTAS</span></div><div class="geofs-autopilot-control"><a class="numberDown">-</a><input class="numberValue geofs-autopilot-course" min="0" max="359" data-loop="true" step="1" data-method="setCourse" maxlength="3" value="000"><a class="numberUp">+</a><span class="geofs-autopilot-switch geofs-autopilot-mode"><a class="switchLeft geofs-autopilot-HDG green-pad" data-method="setMode" value="HDG">HDG</a><a class="switchRight geofs-autopilot-NAV" data-method="setMode" value="NAV">NAV</a></span></div><div class="geofs-autopilot-control"><a class="numberDown">-</a><input class="numberValue geofs-autopilot-altitude" min="0" max="100000" step="500" data-method="setAltitude" maxlength="5" value="00000"><a class="numberUp">+</a><span>ALTITUDE</span></div><div class="geofs-autopilot-control"><a class="numberDown">-</a><input class="numberValue geofs-autopilot-verticalSpeed" min="-6000" max="6000" step="100" data-method="setVerticalSpeed" maxlength="5" value="00000"><a class="numberUp">+</a><span>VERT SPEED</span></div></div></div>'
geofs.kiasOn = 0
	}
}
