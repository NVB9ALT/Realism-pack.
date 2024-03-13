//Consistency
function realismGo() {
   console.log("Realism Pack running")
   ui.notification.show("This addon is not longer being updated. At some point I'll have an addon manager that allows you to *select* which of the Realism Pack's </br> features you would like to use.")
}

console.log("Original scripts for immersion SFX, stall buffet, carrier catapults, shaders, and lift-based wingflex from AriakimTaiyo, Livery Selector and 3.5+ spoilers arming from Kolos26");


function gBreath() {
   if (geofs.animation.values.loadFactor >= 3) {
audio.impl.html5.playFile("https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/cutgbreath.mp3")
	}
}
function flankerStall() {
   if (geofs.aircraft.instance.id == 18 && geofsAddonAircraft.isSu27 == 1 && geofs.animation.values.cobraMode == 1) {
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
    if (geofsAddonAircraft.isTruck != 1) {
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
  if (g > 9 && geofs.animation.values.view == "cockpit") {
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

shaLoaded = 0
loadInterval = setInterval(function(){
	if (shaLoaded == 0 && geofs.fx.overg.shader) {
    var scriptSHA = document.createElement("script");
    scriptSHA.src = "https://raw.githack.com/Ariakim-Taiyo/GeoFS-Shaders-Repository/main/SSR/SSR.js";
    document.body.appendChild(scriptSHA);
    shaLoaded = 1
	}
}, 1000)
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

geofs.aircraft.instance.animationValue.spoilerArming = 0

controls.setters.setSpoilerArming = {
    label: "Spoiler Arming",
    set: function () {
        if (!geofs.aircraft.instance.groundContact && controls.airbrakes.position === 0){
        geofs.aircraft.instance.animationValue.spoilerArming = 1
        }
    },
};

controls.setters.setAirbrakes= {
    label: "Air Brakes",
    set: function () {
        controls.airbrakes.target = 0 == controls.airbrakes.target ? 1 : 0;
        controls.setPartAnimationDelta(controls.airbrakes);
        geofs.aircraft.instance.animationValue.spoilerArming = 0
    },
}

instruments.definitions.spoilers.overlay.overlays[3] = {
    anchor: { x: 0, y: 0 },
    size: { x: 50, y: 50 },
    position: { x: 0, y: 0 },
    animations: [{ type: "show", value: "spoilerArming", when: [1] }],
    class: "control-pad-dyn-label green-pad",
    text: "SPLR<br/>ARM",
    drawOrder: 1
};

instruments.init(geofs.aircraft.instance.setup.instruments)

$(document).keydown(
    function (e) {
        if (e.which == 16){ //spoiler arming key is shift
            controls.setters.setSpoilerArming.set()
        }
    }
)

setInterval(
    function(){
        if(geofs.aircraft.instance.animationValue.spoilerArming === 1 && geofs.aircraft.instance.groundContact && controls.airbrakes.position === 0){
            controls.setters.setAirbrakes.set();
            geofs.aircraft.instance.animationValue.spoilerArming = 0;
        }
    },
100)

//add spoiler indicator for those planes that do not have it by themselves
setInterval(
    function(){
        if(["3292", "3054"].includes(geofs.aircraft.instance.id) && geofs.aircraft.instance.setup.instruments["spoilers"] === undefined){
            geofs.aircraft.instance.setup.instruments["spoilers"] = "";
            instruments.init(geofs.aircraft.instance.setup.instruments);
        }
    },
500)

    var scriptKCAS = document.createElement("script");
    scriptKCAS.src = "https://raw.githack.com/NVB9ALT/Bookmarklet_AP-Plus-Plus_and_FMC/main/Realistic%20KIAS.js";
    document.body.appendChild(scriptKCAS);
    scriptKCAS.onload = function () {
        runTrueKias();
    };
    var scriptML = document.createElement("script");
    scriptML.src = "https://raw.githack.com/kolos26/GEOFS-LiverySelector/main/main.js";
    document.body.appendChild(scriptML);
    localStorage.favorites = "";
    ui.notification.show("Favorite livery selections are possibly not saved at this time.")

    function lookBack() {
        if (geofs.camera.currentModeName == "cockpit" && geofsAddonAircraft.isF117 != 1) {
            geofs.camera.currentDefinition.position[0] = geofs.aircraft.instance.definition.cameras.cockpit.position[0] + geofs.camera.definitions["cockpit"].orientations.current[0] / 1000;
        }
    }
    lookBackInterval = setInterval(function () {
        lookBack();
    }, 100);
    var script2 = document.createElement("script");
    script2.src = "https://cdn.jsdelivr.net/gh/NVB9ALT/GeoFs-Carrier-Catapults-from-AriakimTaiyo@main/catapultsY.js";
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
    script737.src="https://raw.githack.com/AbnormalHuman/GeoFS-737-Immersion-SFX/main/index.js";
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
    
    let geofsAddonAircraft = {};
    geofsAddonAircraft.isFA18 = 0
    geofsAddonAircraft.isMig17 = 0
    geofsAddonAircraft.isTruck = 0
    geofsAddonAircraft.isF14A = 0
    geofsAddonAircraft.isE7 = 0
    geofsAddonAircraft.isMiG21 = 0
    geofsAddonAircraft.isMSG = 0
    geofsAddonAircraft.isF117 = 0
    geofsAddonAircraft.isMiG25 = 0

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
      if (geofsAddonAircraft.isSu27 == 1 && geofs.animation.values.airbrakesTarget > 0) {
        geofs.debug.loadSu27Airbrake()
      }
      if (geofs.animation.values.mach > 0.95 && geofs.animation.values.mach < 1.05 && geofs.aircraft.instance.id != 2364 && geofs.cons == true) {
         geofs.debug.loadMachCone()
      }
      if (geofs.aircraft.instance.id == 18 && geofs.animation.values.kias > 50 && geofs.animation.values.accZ > 60 && geofs.cons == true && geofsAddonAircraft.isFA18 != 1 ) {
        geofs.debug.loadConConesLarge()
      }
      if (geofs.aircraft.instance.id == 18 && geofs.animation.values.kias > 50 && geofs.animation.values.accZ > 60 && geofs.cons == true && geofsAddonAircraft.isFA18 == 1 ) {
        geofs.debug.loadConConesSmall()
      }
      if (geofs.aircraft.instance.id == 7 && geofs.animation.values.kias > 50 && geofs.animation.values.accZ > 60 && geofs.cons == true && geofsAddonAircraft.isMiG21 != 1) {
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
    
      if (geofsAddonAircraft.isF14A == 1 && geofs.animation.values.view != "cockpit" && geofs.animation.values.gearTarget == 1) {
        geofs.debug.loadF14AGearUp()
      }
      if (geofsAddonAircraft.isF14A == 1 && geofs.animation.values.view != "cockpit" && geofs.animation.values.gearTarget == 0) {
        geofs.debug.loadF14AGearDown()
      }
      if (geofsAddonAircraft.isF14A == 1 && geofs.animation.values.view != "cockpit" && controls.optionalAnimatedPart.target == 0) {
        geofs.debug.loadF14AWingStraight()
      }
      if (geofsAddonAircraft.isF14A == 1 && geofs.animation.values.view != "cockpit" && controls.optionalAnimatedPart.target == 1) {
        geofs.debug.loadF14AWingSwept()
      }
      //if (geofsAddonAircraft.isF14A == 1 && geofs.animation.values.view != "cockpit" &&) {
      //}
      //if (geofsAddonAircraft.isF14A == 1 && geofs.animation.values.view != "cockpit" &&) {
      //}
      if (geofsAddonAircraft.isF14A == 1 && geofs.animation.values.view != "cockpit" && geofs.animation.values.airbrakesTarget == 1) {
        geofs.debug.loadF14ASpeedbrake()
      }
      if (geofsAddonAircraft.isF14A == 1 && geofs.animation.values.view == "cockpit") {
        geofs.debug.loadF14ACockpit()
      }
      if (geofsAddonAircraft.isF14A == 1 && geofs.animation.values.rpm > 9100) {
	 geofs.debug.loadF14ABurner()
      }
    
      if (geofsAddonAircraft.isFA18 == 1 && geofs.animation.values.airbrakesTarget == 1) {
        geofs.debug.loadF18Airbrake()  
      }
      if (geofsAddonAircraft.isFA18 == 1 && geofs.animation.values.gearTarget == 0) {
        geofs.debug.loadF18GearDown()
      }
      if (geofsAddonAircraft.isFA18 == 1 && geofs.animation.values.gearTarget == 1) {
        geofs.debug.loadF18GearUp()
      }
      if (geofsAddonAircraft.isFA18 == 1 && geofs.animation.values.rpm >= 9100) {
        geofs.debug.loadF18AB()
      }
      if (geofsAddonAircraft.isFA18 == 1 && geofs.animation.values.view == "cockpit") {
        geofs.debug.loadF18Cockpit()
      }
    
      if (geofsAddonAircraft.isMig17 == 1 && geofs.animation.values.airbrakesTarget == 1) {
        geofs.debug.loadMiG17Speedbrake()
      }
      if (geofsAddonAircraft.isMig17 == 1 && geofs.animation.values.gearTarget == 0 && geofs.animation.values.view != "cockpit") {
        geofs.debug.loadMiG17GearDown()
      }
      if (geofsAddonAircraft.isMig17 == 1 && geofs.animation.values.gearTarget == 1 && geofs.animation.values.view != "cockpit") {
        geofs.debug.loadMiG17GearUp()
      }
      if (geofsAddonAircraft.isMig17 == 1 && geofs.animation.values.rpm >= 9100) {
        geofs.debug.loadMiG17AB()
      }
      if (geofsAddonAircraft.isE7 == 1) {
        geofs.debug.loadE7Antenna()
      }
      if (geofsAddonAircraft.isMiG21 == 1 && geofs.animation.values.gearTarget == 0 && geofs.animation.values.view != "cockpit") {
          geofs.debug.loadMig21GearDown()
          geofs.debug.loadMig21Nozzle()
      }
      if (geofsAddonAircraft.isMiG21 == 1 && geofs.animation.values.gearTarget == 1 && geofs.animation.values.view != "cockpit") {
          geofs.debug.loadMig21GearUp()
          geofs.debug.loadMig21Nozzle()
      }
      if (geofsAddonAircraft.isMiG21 == 1 && geofs.animation.values.view == "cockpit") {
          geofs.debug.loadMig21Cockpit()
      }
      if (geofsAddonAircraft.isMiG21 == 1 && geofs.animation.values.rpm >= 9100) {
          geofs.debug.loadMig21AB()
      }
      if (geofsAddonAircraft.isMiG21 == 1 && controls.optionalAnimatedPart.target == 1) {
          geofs.debug.loadMig21Tank()
      }
      if (geofsAddonAircraft.isMSG == 1 && geofs.animation.values.view != "cockpit") {
          geofs.debug.loadMSG();
      }
      if (geofsAddonAircraft.isMSG == 1 && geofs.animation.values.view != "cockpit" && geofs.animation.values.enginesOn == 0) {
          geofs.debug.loadMSGprop();
      }
      if (geofsAddonAircraft.isMSG == 1 && geofs.animation.values.view == "cockpit") {
          geofs.debug.loadMSGcockpit();
      }
      if (geofsAddonAircraft.isF117 == 1 && geofs.animation.values.gearTarget == 1 && geofs.animation.values.view != "cockpit") {
         geofs.debug.loadF117GearUp();
      }
      if (geofsAddonAircraft.isF117 == 1 && geofs.animation.values.gearTarget == 0 && geofs.animation.values.view != "cockpit") {
         geofs.debug.loadF117GearDown();
      }
      if (geofsAddonAircraft.isF117 == 1 && geofs.animation.values.view == "cockpit") {
         geofs.debug.loadF117Cockpit();
      }
      if (geofsAddonAircraft.isMiG25 == 1 && geofs.animation.values.gearTarget == 1) {
	 geofs.debug.loadMiG25GearUp()
	 geofs.debug.loadMiG25FlapsUp()
      }
      if (geofsAddonAircraft.isMiG25 == 1 && geofs.animation.values.gearTarget == 0) {
	 geofs.debug.loadMiG25GearDown()
	 geofs.debug.loadMiG25FlapsDown()
      }
      if (geofsAddonAircraft.isMiG25 == 1 && geofs.animation.values.rpm > 9000) {
	 geofs.debug.loadMiG25AB()
      }
        
      if (geofsAddonAircraft.isTruck == 1) {
        geofs.debug.loadTruck()  
      }
    };

/*
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
    d.kiasChangeRate = (d.ktas - d.ktas) * a;
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
geofs.kiasOn = 1
*/

geofsAddonAircraft = {};
//Generic addon aircraft tailhook:
//Any aircraft running this tailhook MUST run the function on an interval of 10ms or the hook only has 10% the strength
//All these functions made by AriakimTaiyo
geofsAddonAircraft.wireLLAs = [[37.779434570552304, -122.60905835885147, 25]]; //geofs.aircraft.instance.llaLocation
geofsAddonAircraft.stopForce = -(geofs.aircraft.instance.rigidBody.mass * 1.1);
geofsAddonAircraft.landed = 0;
geofsAddonAircraft.resolveForceVector = function(force, angle) {
  var fx = force * (Math.cos(angle * (Math.PI/180)));
  var fy = force * (Math.sin(angle * (Math.PI/180)));
  return [fx, fy, 0];
}
geofsAddonAircraft.distance = function (pos1, pos2) {
  var a = pos2[0] - pos1[0];
  var b = pos2[1] - pos1[1];
  var c = pos2[2] - pos1[2];
  return Math.sqrt(a * a + b * b + c * c); 
}
//Master function
//This has a bug where at low FPS, it misses that window where groundSpeedKnt < qty and kachows you off the back of the carrier
//but I'm not gonna bother fixing it because approaching the carrier with CC multiplayer models turned on literally crashes my computer
//The inconsiderate CCs think people playing GeoFS on school Chromebooks have 1000 dollars to drop on a PC that can run MSFS
//which we obviously don't
geofsAddonAircraft.runAddonTailhook = function(){
   geofsAddonAircraft.wireLLAs.forEach(function(e){
if (geofs.animation.values.gearPosition == 0 && geofsAddonAircraft.landed == 0 && geofs.animation.values.groundContact == 1 && geofsAddonAircraft.distance(geofs.aircraft.instance.llaLocation, e) < 10) {
   console.log("Hooking detected")
   geofs.aircraft.instance.rigidBody.applyCentralImpulse([geofsAddonAircraft.resolveForceVector(geofsAddonAircraft.stopForce, geofs.animation.values.heading360)[1], geofsAddonAircraft.resolveForceVector(geofsAddonAircraft.stopForce, geofs.animation.values.heading360)[0], geofsAddonAircraft.resolveForceVector(geofsAddonAircraft.stopForce, geofs.animation.values.heading360)[2]])
}
   })
	if (geofs.animation.values.groundSpeedKnt < 10 && geofs.animation.values.groundContact == 1) {
geofsAddonAircraft.landed = 1
console.log("Landed")
	}
	if (geofs.animation.values.groundContact == 0) {
geofsAddonAircraft.landed = 0
console.log("Airborne")
	}
}
//-----F/A-18C Hornet-----------------------------------------------------------------------------------------------------
//adding the button
geofsAddonAircraft.runFA18 = function(){
   console.log("Loading F/A-18C. Model credit cs09736. Model loaded under CC Attribution Share-Alike Liscense.")
   geofs.aircraft.instance.change(18, 4)
}
f18Li = document.createElement("li");
f18Li.innerHTML = '<div><img src="https://w7.pngwing.com/pngs/871/313/png-transparent-boeing-f-a-18e-f-super-hornet-mcdonnell-douglas-f-a-18-hornet-battlefield-3-rogerson-aircraft-corporation-airplane-boeing-767-video-game-fighter-aircraft-airplane.png">F/A-18C Hornet</div>';
f18Li.addEventListener("click", geofsAddonAircraft.runFA18);
document.getElementsByClassName("geofs-list geofs-toggle-panel geofs-aircraft-list")[0].appendChild(f18Li)

geofs.f18instruments = new Boolean(0)
//the actual implementation lol:
function runHornet() {
   if (geofs.aircraft.instance.id == 18 && geofs.aircraft.instance.liveryId == 4) {
//removing the thrust vectoring
geofs.aircraft.instance.definition.parts[46].animations[0].ratio = 0.069;
geofs.aircraft.instance.definition.parts[46].animations[1].ratio = 0.069;
geofs.aircraft.instance.definition.parts[51].animations[0].ratio = 0.069;
geofs.aircraft.instance.definition.parts[51].animations[1].ratio = 0.069;
//fcs (alpha and G limiter) and paddle switch
//Push controls forwards 0.02
//aoa > 0.09? or check if "stall" is lit
   if (geofs.animation.values.cobraMode == 1) {
geofs.aircraft.instance.definition.parts[2].area = 25
geofs.aircraft.instance.definition.parts[12].stalls = true
geofs.aircraft.instance.definition.parts[13].stalls = true
if (geofs.animation.values.airbrakesTarget > 0) {
   geofs.aircraft.instance.definition.dragFactor = 6
} else if (geofs.animation.values.accZ >= 30) {
   geofs.aircraft.instance.definition.dragFactor = 5
} else {
   geofs.aircraft.instance.definition.dragFactor = 0.9
}
   } else {
geofs.aircraft.instance.definition.parts[2].area = 17
geofs.aircraft.instance.definition.parts[12].stalls = false
geofs.aircraft.instance.definition.parts[13].stalls = false
if (geofs.animation.values.airbrakesTarget > 0) {
   geofs.aircraft.instance.definition.dragFactor = 6
} else if (geofs.animation.values.accZ >= 50) {
   geofs.aircraft.instance.definition.dragFactor = 5
} else {
   geofs.aircraft.instance.definition.dragFactor = 0.9
}
   }
//making the LERX stall like a delta wing (bc it kinda is)
geofs.aircraft.instance.definition.parts[2].stallIncidence = 25
geofs.aircraft.instance.definition.parts[2].zeroLiftIncidence = 70
//The actual wings have delayed lift loss, because the leading edge vortex streaming off the LERX
//sticks to the wing and maintains the pressure differential
geofs.aircraft.instance.definition.parts[3].stallIncidence = 25
geofs.aircraft.instance.definition.parts[3].zeroLiftIncidence = 50
geofs.aircraft.instance.definition.parts[3].area = 15
geofs.aircraft.instance.definition.parts[4].stallIncidence = 25
geofs.aircraft.instance.definition.parts[4].zeroLiftIncidence = 50
geofs.aircraft.instance.definition.parts[4].area = 15
//Tuning the stabilizer area
geofs.aircraft.instance.definition.parts[11].area = 3
//Adjusting engine power
geofs.aircraft.instance.engines[0].thrust = 50000
geofs.aircraft.instance.engines[0].afterBurnerThrust = 87000
geofs.aircraft.instance.engines[1].thrust = 50000
geofs.aircraft.instance.engines[1].afterBurnerThrust = 87000
//Maintaining 1:1 TWR
geofs.aircraft.instance.definition.mass = 17000
audio.soundplayer.setRate(geofs.aircraft.instance.definition.sounds[3].id, 0.5) //Sound pitch modification
//Tailhook
geofsAddonAircraft.runAddonTailhook()
//Replacing the tires lol
geofs.aircraft.instance.definition.contactProperties = {
        "wheel": {
        	"frictionCoef": 2,
        	"dynamicFriction": 0.01,
        	"rollingFriction": 0.00001,
            "damping": 1
        },
        "frame": {
        	"frictionCoef": 2,
        	"dynamicFriction": 0.01,
            "damping": 1
        },
	    "airfoil": {
        	"frictionCoef": 2,
        	"dynamicFriction": 0.01,
            "damping": 1
        },
        "hook": {
            "frictionCoef": 2,
            "dynamicFriction": 0.01,
            "damping": 1
        }
    };
//Adding the airbrake
geofs.aircraft.instance.definition.airbrakesTravelTime = 1;
geofs.aircraft.instance.definition.instruments.spoilers = "";
geofs.aircraft.instance.definition.instruments.correctHUD = {
            "cockpit": {
                "position": [-0.01, 8.3, 1.23],
                "scale": 0.4
            },
            "animations": [
                {"value": "view", "type": "show", "eq": "cockpit"}
            ]
	}
if (geofs.f18instruments == 0) {
   instruments.init(geofs.aircraft.instance.setup.instruments)
   geofs.f18instruments = 1
}
setTimeout(() => {
   geofsAddonAircraft.isFA18 = 1
},5000)
setTimeout(() => {
   	 geofs.aircraft.instance.definition.parts[0].animations[0].value = "rpm"
	 geofs.aircraft.instance.definition.parts[0].animations[0].gt = -1
   	 geofs.aircraft.instance.cockpitSetup.parts[0].animations[0].value = "rpm"
	 geofs.aircraft.instance.cockpitSetup.parts[0].animations[0].gt = -1
	 geofs.aircraft.instance.definition.parts[50].animations[0].gt = 100000
	 geofs.aircraft.instance.definition.parts[55].animations[0].gt = 100000
},10000)
   } else {
geofsAddonAircraft.isFA18 = 0
geofs.f18instruments = 0
   }
}
checkRunHornetInterval = setInterval(function(){runHornet()},10)

//-----Mig-17 Fresco-----------------------------------------------------------------------------------------------------
geofsAddonAircraft.isMig17 = 0
geofsAddonAircraft.runMiG17 = function(){
   console.log("Loading MiG-17. Model credit manilov.ap")
}
mig17Li = document.createElement("li");
mig17Li.innerHTML = '<div><img src="https://finescale.com/~/media/images/workbench-reviews/2020/february-2020/fsmwb1219_zvezda_mig17_01.jpg">Mikoyan-Gurevich MiG-17 "Fresco"</div>';
mig17Li.addEventListener("click", geofsAddonAircraft.runMiG17);
//this works actually
mig17Li.setAttribute("data-aircraft", 3)
mig17Li.setAttribute("data-livery", 1)
document.getElementsByClassName("geofs-list geofs-toggle-panel geofs-aircraft-list")[0].appendChild(mig17Li)
function runMiG17() {
   if (geofs.aircraft.instance.id == 3 && geofs.aircraft.instance.liveryId == 1) {
geofs.aircraft.instance.definition.parts[3].area = 3
geofs.aircraft.instance.definition.parts[4].area = 3
geofs.aircraft.instance.definition.parts[8].liftFactor = 7
geofs.aircraft.instance.definition.parts[9].liftFactor = 7
geofs.aircraft.instance.definition.parts[8].dragFactor = 1
geofs.aircraft.instance.definition.parts[9].dragFactor = 1
geofs.aircraft.instance.definition.parts[16].liftFactor = 8
geofs.aircraft.instance.engines[0].thrust = 15000
geofs.aircraft.instance.engines[1].thrust = 15000
geofs.aircraft.instance.engines[0].afterBurnerThrust = 20000
geofs.aircraft.instance.engines[1].afterBurnerThrust = 20000
   if (geofs.animation.values.view == "cockpit") {
geofs.aircraft.instance.cockpitSetup.parts[1].object3d.model._model.color.alpha = 0
   }
setTimeout(() => {
   geofsAddonAircraft.isMig17 = 1
},5000)
setTimeout(() => {
   geofs.aircraft.instance.definition.parts[0].animations[0].value = "rpm"
	geofs.aircraft.instance.definition.parts[0].animations[0].gt = -1
},10000)
   } else {
geofsAddonAircraft.isMig17 = 0
   }
}
mig17Int = setInterval(function(){runMiG17()},100)

//-----Su-27 Flanker (the OG one)---------------------------------------------------------------------------------------
geofsAddonAircraft.isSu27 = new Boolean(0)
geofs.debug.su27Instruments = new Boolean(0)
geofsAddonAircraft.runSu27 = function(){
   geofs.aircraft.instance.change(18, 1)
}
flankerLi = document.createElement("li");
flankerLi.innerHTML = '<div><img src="images/planes/su35_1.png">Sukhoi Su-27 Flanker</div>';
flankerLi.addEventListener("click", geofsAddonAircraft.runSu27);
document.getElementsByClassName("geofs-list geofs-toggle-panel geofs-aircraft-list")[0].appendChild(flankerLi)
function runSu27() {
if (geofs.aircraft.instance.id == 18 && geofs.aircraft.instance.liveryId == 1) {
geofsAddonAircraft.isSu27 = 1
geofs.aircraft.instance.definition.airbrakesTravelTime = 1
geofs.aircraft.instance.definition.accessoriesTravelTime = 0.1
geofs.aircraft.instance.definition.parts[46].animations[0].ratio = 0.069;
geofs.aircraft.instance.definition.parts[46].animations[1].ratio = 0.069;
geofs.aircraft.instance.definition.parts[51].animations[0].ratio = 0.069;
geofs.aircraft.instance.definition.parts[51].animations[1].ratio = 0.069;
geofs.aircraft.instance.engines[0].thrust = 60000
geofs.aircraft.instance.engines[0].afterBurnerThrust = 80000
geofs.aircraft.instance.engines[1].thrust = 60000
geofs.aircraft.instance.engines[1].afterBurnerThrust = 80000
   geofs.aircraft.instance.definition.parts[46].animations[2] = {};
	geofs.aircraft.instance.definition.parts[46].animations[2].type = "rotate";
	geofs.aircraft.instance.definition.parts[46].animations[2].axis = "Z";
	geofs.aircraft.instance.definition.parts[46].animations[2].value = "roll";
	geofs.aircraft.instance.definition.parts[46].animations[2].ratio = -10;
	geofs.aircraft.instance.definition.parts[46].animations[2].currentValue = null;
	geofs.aircraft.instance.definition.parts[46].animations[2].rotationMethod = function(a) {
      this._rotation = M33.rotationZ(this._rotation, a)
   };
   geofs.aircraft.instance.definition.parts[51].animations[2] = {};
	geofs.aircraft.instance.definition.parts[51].animations[2].type = "rotate";
	geofs.aircraft.instance.definition.parts[51].animations[2].axis = "Z";
	geofs.aircraft.instance.definition.parts[51].animations[2].value = "roll";
	geofs.aircraft.instance.definition.parts[51].animations[2].ratio = -10;
	geofs.aircraft.instance.definition.parts[51].animations[2].currentValue = null;
	geofs.aircraft.instance.definition.parts[51].animations[2].rotationMethod = function(a) {
      this._rotation = M33.rotationZ(this._rotation, a)
   };
	geofs.aircraft.instance.definition.parts[48].animations[0].gt = 9100
	geofs.aircraft.instance.definition.parts[53].animations[0].gt = 9100
if (geofs.debug.su27Instruments == 0) {
geofs.aircraft.instance.setup.instruments = {
        "cdi": "",
        "compass": "",
        "airspeedSupersonic": "",
        "attitudeJet": "",
        "altitude": "",
        "varioJet": "",
        "rpmJet": "",
		"brakes": "",		
		"gear": "",
		"flaps": "",
		"spoilers": ""
}
instruments.init(geofs.aircraft.instance.setup.instruments)
geofs.debug.su27Instruments = 1
}
if (geofs.animation.values.airbrakesTarget > 0) {
   geofs.aircraft.instance.definition.dragFactor = 7.5
} else if (geofs.animation.values.accZ >= 60) {
   geofs.aircraft.instance.definition.dragFactor = 5
} else {
   geofs.aircraft.instance.definition.dragFactor = 0.5
}
if (geofs.animation.values.cobraMode == 1) {
   geofs.aircraft.instance.definition.parts[2].area = 40
} else {
   geofs.aircraft.instance.definition.parts[2].area = 10
}
   } else {
geofs.debug.su27Instruments = 0
geofsAddonAircraft.isSu27 = 0
	}
};
Su27Int = setInterval(function(){runSu27()},100)
//clearInterval(Su27Int)
//-----E-7 Wedgetail AEW&C------------------------------------------------------------------------------------------------
geofsAddonAircraft.isE7 = 0
geofsAddonAircraft.runE7 = function(){
   console.log("Loading E-7 Wedgetail AEW&C.")
}
e7Li = document.createElement("li");
e7Li.innerHTML = '<div><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/B737_AEW%26C_Wedgetail_cut_model.PNG/220px-B737_AEW%26C_Wedgetail_cut_model.PNG">E-7 Wedgetail AEW&C</div>';
e7Li.addEventListener("click", geofsAddonAircraft.runE7);
//this works actually
e7Li.setAttribute("data-aircraft", 3292)
e7Li.setAttribute("data-livery", 1)
document.getElementsByClassName("geofs-list geofs-toggle-panel geofs-aircraft-list")[0].appendChild(e7Li)
function runE7Wedgetail() {
   if (geofs.aircraft.instance.id == 3292 && geofs.aircraft.instance.liveryId == 1) {
geofsAddonAircraft.isE7 = 1
geofs.aircraft.instance.definition.mass = 75000
   } else {
geofsAddonAircraft.isE7 = 0
	}
}
e7int = setInterval(function(){runE7Wedgetail()},100)
//-----MiG-21 Fishbed-----------------------------------------------------------------------------------------------------
geofsAddonAircraft.runMig21 = function(){
	console.log("Loading MiG-21 Fishbed. Model credit manilov.ap.")
	controls.optionalAnimatedPart.target = 1
}
mig21Li = document.createElement("li");
mig21Li.innerHTML = '<div><img src="http://atlas-content-cdn.pixelsquid.com/stock-images/russian-fighter-mig-21-fishbed-jet-q1ylV3E-600.jpg">Mikoyan-Gurevich MiG-21 "Fishbed"</div>';
mig21Li.addEventListener("click", geofsAddonAircraft.runMig21);
document.getElementsByClassName("geofs-list geofs-toggle-panel geofs-aircraft-list")[0].appendChild(mig21Li)
mig21Li.setAttribute("data-aircraft", 7)
mig21Li.setAttribute("data-livery", 1)

geofs.mig21instruments = new Boolean(0)
//clearInterval(mig21Interval)
function runMiG21() {
if (geofs.aircraft.instance.id == 7 && geofs.aircraft.instance.liveryId == 1) {
	geofs.aircraft.instance.definition.parts[2].zeroLiftIncidence = 90
	geofs.aircraft.instance.definition.parts[3].zeroLiftIncidence = 90
	geofs.aircraft.instance.definition.parts[6].area = 1
if (geofs.animation.values.kias >= 150 && geofs.animation.values.kias <= 225) {
	geofs.aircraft.instance.definition.parts[7].area = 0.5
	geofs.aircraft.instance.definition.parts[8].area = 0.5
	geofs.aircraft.instance.definition.parts[2].area = 10
	geofs.aircraft.instance.definition.parts[3].area = 10
} else {
	geofs.aircraft.instance.definition.parts[7].area = 2
	geofs.aircraft.instance.definition.parts[8].area = 2
	geofs.aircraft.instance.definition.parts[2].area = 7
	geofs.aircraft.instance.definition.parts[3].area = 7
}
if (geofs.animation.values.aoa > 14) {
   geofs.aircraft.instance.definition.dragFactor = 6
} else if (geofs.animation.values.aoa > 5) {
   geofs.aircraft.instance.definition.dragFactor = 3
} else {
   geofs.aircraft.instance.definition.dragFactor = 0.4
}
	geofs.aircraft.instance.definition.mass = 21000
	geofs.aircraft.instance.engine.thrust = 40000
if (controls.optionalAnimatedPart.target == 0) {
	geofs.aircraft.instance.engine.afterBurnerThrust = 90000
} else {
   geofs.aircraft.instance.engine.afterBurnerThrust = 60000
}
	geofs.aircraft.instance.definition.parts[12].liftFactor = 5
geofs.aircraft.instance.setup.instruments = {
        "cdi": "",
        "compass": "",
        "airspeedSupersonic": "",
        "attitudeJet": "",
        "altitude": "",
        "varioJet": "",
        "rpmJet": "",
		"brakes": "",		
		"gear": "",
		"flaps": "",
		"spoilers": ""
}
if (geofs.mig21instruments == 0) {
   instruments.init(geofs.aircraft.instance.setup.instruments)
   geofs.mig21instruments = 1
}
setTimeout(() => {
   geofsAddonAircraft.isMiG21 = 1
 },5000)
setTimeout(() => {
   geofs.aircraft.instance.definition.parts[0].animations[0] = {"type": "hide", "value": "rpm", "gt": -1}
	geofs.aircraft.instance.definition.parts[41].animations[0].gt = 100000
 },10000)
if (geofs.animation.values.view == "cockpit") {
	geofs.aircraft.instance.cockpitSetup.parts[0].animations[0].value = "rpm"
	geofs.aircraft.instance.cockpitSetup.parts[0].animations[0].gt = -1
	geofs.camera.currentDefinition.position[2] = geofs.aircraft.instance.definition.cameras.cockpit.position[2] - 0.15
   }
} else {
   geofsAddonAircraft.isMiG21 = 0
	geofs.mig21instruments = 0
}
}
mig21Interval = setInterval(function(){runMiG21()},100)
//-----Morane-Saulneir "G"-----------------------------------------------------------------------------------------------------
geofsAddonAircraft.isMsG = 0
geofsAddonAircraft.runMsG = function(){
   console.log("Loading Morane-Saulnier G. Model credit manilov.ap")
}
MsGLi = document.createElement("li");
MsGLi.innerHTML = '<div>Morane-Saulnier Type G</div>';
MsGLi.addEventListener("click", geofsAddonAircraft.runMsG);
MsGLi.setAttribute("data-aircraft", 8)
MsGLi.setAttribute("data-livery", 3)
document.getElementsByClassName("geofs-list geofs-toggle-panel geofs-aircraft-list")[0].appendChild(MsGLi)
function runMsG() {
if (geofs.aircraft.instance.id == 8 && geofs.aircraft.instance.liveryId == 3) {
	geofs.aircraft.instance.definition.parts[4].area = 3
	geofs.aircraft.instance.definition.parts[5].area = 3
	geofs.aircraft.instance.definition.parts[6].area = 3
	geofs.aircraft.instance.definition.parts[7].area = 3
	geofs.aircraft.instance.definition.mass = 300
	geofs.aircraft.instance.definition.parts[30].thrust = 1500
	geofs.aircraft.instance.definition.parts[8].area = 0.069
	geofs.aircraft.instance.definition.parts[9].area = 0.069
	geofs.aircraft.instance.definition.parts[10].area = 0.2
	geofs.aircraft.instance.definition.parts[11].area = 0.2
	geofs.aircraft.instance.definition.dragFactor = 0.7
	geofs.aircraft.instance.definition.autopilot = false
   geofsAddonAircraft.isMSG = 1
	geofs.aircraft.instance.definition.parts[0].animations[0].value = "rpm"
	geofs.aircraft.instance.definition.parts[0].animations[0].gt = -1
	if (geofs.animation.values.view == "cockpit") {
	geofs.aircraft.instance.cockpitSetup.parts[0].animations[0].value = "rpm"
	geofs.aircraft.instance.cockpitSetup.parts[0].animations[0].gt = -1
	}
} else {
geofsAddonAircraft.isMSG = 0	
}
}
msgInterval = setInterval(function(){runMsG()},100)
//----- F-117 -------------------------------------------------------------------------------------------------------------
geofsAddonAircraft.isF117 = 0;
geofs.debug.F117Instruments = 0;
geofsAddonAircraft.runF117 = function(){
   console.log("Loading F-117. Model credit manilov.ap")
}
f117Li = document.createElement("li");
f117Li.innerHTML = '<div><img src="https://cdn.shopify.com/s/files/1/0277/5197/2966/products/HA5807-3_1200x789.jpg">Lockheed F-117 "Nighthawk"</div>';
f117Li.addEventListener("click", geofsAddonAircraft.runF117);
//this works actually
f117Li.setAttribute("data-aircraft", 5)
f117Li.setAttribute("data-livery", 1)
document.getElementsByClassName("geofs-list geofs-toggle-panel geofs-aircraft-list")[0].appendChild(f117Li)
function runF117() {
   if (geofs.aircraft.instance.id == 5 && geofs.aircraft.instance.liveryId == 1) {
	//Remove lights
	geofs.aircraft.instance.definition.parts[46].animations[0].value = "rpm"
	geofs.aircraft.instance.definition.parts[46].animations[0].lt = -1
   geofs.aircraft.instance.definition.parts[45].animations[0].value = "rpm"
	geofs.aircraft.instance.definition.parts[45].animations[0].lt = -1
	geofs.aircraft.instance.definition.parts[47].animations[0].value = "rpm"
	geofs.aircraft.instance.definition.parts[47].animations[0].lt = -1
   geofs.aircraft.instance.definition.parts[48].animations[0].value = "rpm"
	geofs.aircraft.instance.definition.parts[48].animations[0].lt = -1
   geofs.aircraft.instance.definition.parts[8].area = 5
setTimeout(() => {
	geofsAddonAircraft.isF117 = 1
},5000)
setTimeout(() => {
	geofs.aircraft.instance.definition.parts[0].animations[0].value = "rpm"
	geofs.aircraft.instance.definition.parts[0].animations[0].gt = -1
}, 10000)
   //Wing area adjustment
	geofs.aircraft.instance.definition.parts[2].area = 4
	geofs.aircraft.instance.definition.parts[5].area = 4
	//Drag increase (flat panels = draggy airplane)
	geofs.aircraft.instance.definition.dragFactor = 0.5
	//Boost thrust to compensate for rise in dragFactor
	geofs.aircraft.instance.engines[0].thrust = 20000
	geofs.aircraft.instance.engines[1].thrust = 20000
	//remove flaps
	geofs.aircraft.instance.definition.flapsPositions = [0.01, 0.02, 0.03, 0.04, 0.05]
if (geofs.debug.F117Instruments == 0) {
	geofs.aircraft.instance.definition.instruments = {
        "hsi": "",
        "compass": "",
        "airspeedJet": "",
        "attitudeJet": "",
        "altitude": "",
        "varioJet": "",
        "rpmJet": "",
        "brakes": "",
        "gear": ""
}
	instruments.init(geofs.aircraft.instance.definition.instruments)
	geofs.debug.F117Instruments = 1
}
if (geofs.animation.values.view == "cockpit") {
	geofs.aircraft.instance.cockpitSetup.parts[0].animations[0].value = "rpm"
	geofs.aircraft.instance.cockpitSetup.parts[0].animations[0].gt = -1
	geofs.camera.currentDefinition.position[0] = geofs.aircraft.instance.definition.cameras.cockpit.position[0] + 0.35
	geofs.camera.currentDefinition.position[1] = geofs.aircraft.instance.definition.cameras.cockpit.position[1] - 0.2
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//Stealth technology goes here (haven't been able to develop it)
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
   } else {
geofs.debug.F117Instruments = 0
geofsAddonAircraft.isF117 = 0
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//Stealth technology goes here (haven't been able to develop it)
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	}
}
f117Int = setInterval(function(){runF117()},100)
//-----Grumman F-14A-----------------------------------------------------------------------------------------------------
geofsAddonAircraft.isF14A = 0
geofsAddonAircraft.F14AInstruments = 0
geofsAddonAircraft.runF14A = function(){
   console.log("Loading F-14A Tomcat. Model credit manilov.ap")
}
F14ALi = document.createElement("li");
F14ALi.innerHTML = '<div><img src="http://atlas-content-cdn.pixelsquid.com/stock-images/f-14-airplane-tomcat-fighter-jet-ENB74k2-600.jpg">Grumman F-14A Tomcat</div>';
F14ALi.addEventListener("click", geofsAddonAircraft.runF14A);
//this works actually
F14ALi.setAttribute("data-aircraft", 18)
F14ALi.setAttribute("data-livery", 6)
document.getElementsByClassName("geofs-list geofs-toggle-panel geofs-aircraft-list")[0].appendChild(F14ALi)
function runF14A() {
if (geofs.aircraft.instance.id == 18 && geofs.aircraft.instance.liveryId == 6) {
//Wing sweep physics
   if (geofs.animation.values.optionalAnimatedPartPosition < 1) {
geofs.aircraft.instance.definition.parts[3].area = 17
geofs.aircraft.instance.definition.parts[4].area = 17
geofs.aircraft.instance.definition.parts[2].area = 17
   } else {
geofs.aircraft.instance.definition.parts[3].area = 10
geofs.aircraft.instance.definition.parts[4].area = 10
geofs.aircraft.instance.definition.parts[2].area = 5
	}
//area refinements
geofs.aircraft.instance.definition.parts[11].area = 0.5
geofs.aircraft.instance.definition.parts[14].area = 5
geofs.aircraft.instance.definition.parts[15].area = 5
geofs.aircraft.instance.definition.parts[6].area = 5
geofs.aircraft.instance.definition.parts[5].area = 5
//removing the thrust vectoring
geofs.aircraft.instance.definition.parts[46].animations[0].ratio = 0.069;
geofs.aircraft.instance.definition.parts[46].animations[1].ratio = 0.069;
geofs.aircraft.instance.definition.parts[51].animations[0].ratio = 0.069;
geofs.aircraft.instance.definition.parts[51].animations[1].ratio = 0.069;
//TF30s having no thrust unless you go really fast
//mass is 25300 by default, try increasing it so thrust can increase as well
geofs.aircraft.instance.definition.mass = 35000
   if (geofs.animation.values.mach >= 1.75) {
geofs.aircraft.instance.engines[0].thrust = 85000
geofs.aircraft.instance.engines[0].afterBurnerThrust = 190000
geofs.aircraft.instance.engines[1].thrust = 85000
geofs.aircraft.instance.engines[1].afterBurnerThrust = 190000
	} else {
geofs.aircraft.instance.engines[0].thrust = 85000
geofs.aircraft.instance.engines[0].afterBurnerThrust = 145000
geofs.aircraft.instance.engines[1].thrust = 85000
geofs.aircraft.instance.engines[1].afterBurnerThrust = 145000
   }

//attempt at landing gear adjustment
geofs.aircraft.instance.definition.parts[17].collisionPoints[0][2] = -0.8
geofs.aircraft.instance.definition.parts[27].collisionPoints[0][2] = -0.8
//Sound adjustment
audio.soundplayer.setRate(geofs.aircraft.instance.definition.sounds[3].id, 0.5)
if (geofs.animation.values.view == "cockpit") {
	geofs.aircraft.instance.cockpitSetup.parts[0].animations[0].value = "rpm"
	geofs.aircraft.instance.cockpitSetup.parts[0].animations[0].gt = -1
geofs.camera.currentDefinition.position[1] = 6.4
geofs.camera.currentDefinition.position[2] = 1.08
}
//HUD
	geofs.aircraft.instance.setup.instruments.correctHUD = {
            "cockpit": {
                "position": [0, 7.109, 1.06],
                "scale": 0.65
            },
            "animations": [
                {"value": "view", "type": "show", "eq": "cockpit"}
            ]
	}
if (geofsAddonAircraft.F14AInstruments == 0) {
	instruments.init(geofs.aircraft.instance.setup.instruments)
   geofsAddonAircraft.F14AInstruments = 1
}
//Tailhook
geofsAddonAircraft.runAddonTailhook()
//Replacing the tires lol
geofs.aircraft.instance.definition.contactProperties = {
        "wheel": {
        	"frictionCoef": 2,
        	"dynamicFriction": 0.01,
        	"rollingFriction": 0.00001,
            "damping": 1
        },
        "frame": {
        	"frictionCoef": 2,
        	"dynamicFriction": 0.01,
            "damping": 1
        },
	    "airfoil": {
        	"frictionCoef": 2,
        	"dynamicFriction": 0.01,
            "damping": 1
        },
        "hook": {
            "frictionCoef": 2,
            "dynamicFriction": 0.01,
            "damping": 1
        }
    };
//Adding the airbrake
geofs.aircraft.instance.definition.airbrakesTravelTime = 1;
geofs.aircraft.instance.definition.instruments.spoilers = "";
if (geofs.animation.values.airbrakesTarget > 0) {
   geofs.aircraft.instance.definition.dragFactor = 7
} else {
   geofs.aircraft.instance.definition.dragFactor = 1.5
}
setTimeout(() => {
   geofsAddonAircraft.isF14A = 1
},5000)
setTimeout(() => {
	geofs.aircraft.instance.definition.parts[0].animations[0].value = "rpm"
	geofs.aircraft.instance.definition.parts[0].animations[0].gt = -1
	 geofs.aircraft.instance.definition.parts[50].animations[0].gt = 100000
	 geofs.aircraft.instance.definition.parts[55].animations[0].gt = 100000
},10000)} else {
   geofsAddonAircraft.isF14A = 0
   geofsAddonAircraft.F14AInstruments = 0
}
}
f14aInterval = setInterval(function(){runF14A()},10)
