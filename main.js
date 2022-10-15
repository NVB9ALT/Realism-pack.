function realismGo() {
let addonChat = document.createElement("li");
addonChat.innerHTML = '<li><iframe width="1000", height="1500", left=350,top=50, src="https://chat.hyperjs.ml/GeoFS", title="Addon chat"</iframe></li>';
document.getElementsByClassName("geofs-list geofs-toggle-panel geofs-preference-list geofs-preferences")[0].appendChild(addonChat);
//this breaks things if its run before terrain has loaded
//geofs.api.waterDetection.create();
lagReductionInterval = setInterval(function () {
    geofs.savePreferencesPanel();
    geofs.api.renderingSettings.degradedCollisions = true;
    geofs.api.renderingSettings.lowResRunways = true;
    if (geofs.preferences.graphics.advanced.fxaa = false) {
        flight.recorder.clear();
    }
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

setInterval(function(){
    if (geofs.aircraft.instance.id == 21 || geofs.aircraft.instance.id == 2 || geofs.aircraft.instance.id == 2808 || geofs.aircraft.instance.id == 1 || geofs.aircraft.instance.id == 8 || geofs.aircraft.instance.id == 12 || geofs.aircraft.instance.id == 13 || geofs.aircraft.instance.id == 40 || geofs.aircraft.instance.id == 1069 || geofs.aircraft.instance.id == 2750 || geofs.aircraft.instance.id == 4251)  {
geofs.aircraft.instance.airfoils.forEach(function(e){
if (e.forceDirection == 2) {
   e.propwash = 0.005
} else {
   e.propwash = 0.01
}
})
geofs.aircraft.instance.setup.parts[0].centerOfMass = [geofs.animation.values.rpm/1000, 0, 0]
   }
})
function gBlackout() {
    if (geofs.animation.values.accZ >= 90) {
        ui.showCrashNotification();
        geofs.camera.animations.orbitHorizontal.active = !1;
    } else {
        ui.hideCrashNotification();
    }
}
blackoutInt = setInterval(function () {
    gBlackout();
}, 10);
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
var scriptATM = document.createElement("script");
scriptATM.src = "https://raw.githack.com/NVB9ALT/GeoFS-Effects-Rework/main/BetterGeoFSAtmosphere.js";
document.body.appendChild(scriptATM);
scriptATM.onload = function () {
    redoAtmosphere();
};
var scriptCCI = document.createElement("script");
scriptCCI.src = "https://raw.githack.com/NVB9ALT/Fixed-CC-PFDs-and-HUDs/main/fix.js";
document.body.appendChild(scriptCCI);
scriptCCI.onload = function () {
    redoPFDSHUDS();
};
var scriptLM = document.createElement("script");
scriptLM.src = "https://raw.githack.com/NVB9ALT/GeoFS-3d-landmarks-by-JAaMDG/main/Current-compatible.js";
document.body.appendChild(scriptLM);
scriptLM.onload = function () {
    addLandmarks();
};
var scriptAS = document.createElement("script");
scriptAS.src = "https://cdn.jsdelivr.net/gh/NVB9ALT/GeoFS-Autospoilers@main/autospoilersA.js";
document.body.appendChild(scriptAS);
scriptAS.onload = function () {
    autospoilers();
};
var scriptEJ = document.createElement("script");
scriptEJ.src = "https://cdn.jsdelivr.net/gh/NVB9ALT/Fighter-jet-ejections@main/mainE.js";
document.body.appendChild(scriptEJ);
scriptEJ.onload = function () {
    runEjections();
};
var scriptAl = document.createElement("script");
scriptAl.src = "https://cdn.jsdelivr.net/gh/NVB9ALT/Autoland@main/autoland.js";
document.body.appendChild(scriptAl);
scriptAl.onload = function () {
    justDoTheThing();
};
document.getElementsByClassName("geofs-crashOverlay")[0].innerHTML = "You blacked out<br><span>from pulling too many Gs</span>";
var scriptRKIAS = document.createElement("script");
scriptRKIAS.src = "https://cdn.jsdelivr.net/gh/NVB9ALT/Bookmarklet_AP-Plus-Plus_and_FMC@main/Realistic%20KIAS.js";
document.body.appendChild(scriptRKIAS);
scriptRKIAS.onload = function () {
    runTrueKias();
};
function lookBack() {
    if (geofs.camera.currentModeName == "cockpit") {
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

console.log("Original scripts copyright Ariakim Taiyo");
console.log("Modified by NVB9");

//variable to tell if the script has run or not
var b737Sounds = new Boolean(0)
soundInt = null;
tcasIntervalAnnounce = null;
effectInterval = null;
accelInt = null;
flexInterval = null;

function checkForBoeing737() {
if (geofs.aircraft.instance.id == 4) { //if the aircraft currently being flown is a 737
if (b737Sounds == 0){ //if the script hasn't already run on this aircraft

//running the script
var script737 = document.createElement('script'); 
script737.src="https://raw.githack.com/Ariakim-Taiyo/GeoFs-737-Immersion-SFX/main/index.js";
document.body.appendChild(script737);
script737.onload = function(){clearInterval(tcasIntervalAnnounce)};

//script has run now, so we change scriptHasRun to avoid having the script execute multiple times per aircraft instance
//this avoids massive lag
b737Sounds = 1
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

if (geofs.aircraft.instance.id == 240) {
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
function checkNightStuff() {
   if (geofs.isNight == 1 && geofs.api.renderingSettings.advancedAtmosphere == 0 && geofs.camera.currentModeName !== "cockpit") {
geofs.api.setImageryBrightness(150);
   };
   if (geofs.isNight == 1 && geofs.api.renderingSettings.advancedAtmosphere == 0 && geofs.camera.currentModeName == "cockpit") {
geofs.api.setImageryBrightness(50);
   };
   if (geofs.camera.currentModeName == "cockpit" && geofs.isNight == 1 && geofs.api.renderingSettings.advancedAtmosphere == 0) {
geofs.api.viewer.scene.light.intensity = 0.5;
geofs.api.viewer.scene.light.color = {red: 0.8, green: 0.63, blue: 0.52, alpha: 1};
	} else if (geofs.isNight == 1 && geofs.api.renderingSettings.advancedAtmosphere == 0) {
geofs.api.viewer.scene.light.intensity = 0.5
	}
};checkMarbleInterval = setInterval(function(){checkNightStuff()},10)

geofs.condensation = {};
let cons = true;
geofs.condensation.update = function() {
  if (cons == true) {
    cons = false;
    toggleC.setAttribute("class", "mdl-switch mdl-js-switch mdl-js-ripple-effect mdl-js-ripple-effect--ignore-events is-upgraded");
  } else {
    cons = true;
    toggleC.setAttribute("class", "mdl-switch mdl-js-switch mdl-js-ripple-effect mdl-js-ripple-effect--ignore-events is-upgraded is-checked")
  }
};
let elementSel = document.getElementsByClassName('geofs-preference-list')[0].getElementsByClassName('geofs-advanced')[0].getElementsByClassName('geofs-stopMousePropagation')[0];
let toggleC = document.createElement("label");
    toggleC.setAttribute("class", "mdl-switch mdl-js-switch mdl-js-ripple-effect mdl-js-ripple-effect--ignore-events is-upgraded");
    toggleC.setAttribute("for", "condensation");
    toggleC.setAttribute("id", "condensation");
    toggleC.setAttribute("tabindex", "0");
    toggleC.setAttribute("dataUpgraded", ",MaterialSwitch,MaterialRipple");
    toggleC.innerHTML = '<input type="checkbox" id="condensation" class="mdl-switch__input" data-gespref="geofs.condensation.preference"><span class="mdl-switch__label">Condensation effects</span>';
elementSel.appendChild(toggleC);
toggleC.addEventListener("click", geofs.condensation.update);

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
geofs.addonAircraft = {};
geofs.addonAircraft.isFA18 = 0
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
  if (geofs.animation.values.mach > 0.95 && geofs.animation.values.mach < 1.05 && geofs.aircraft.instance.id != 2364 && cons == true) {
	 geofs.debug.loadMachCone()
  }
  if (geofs.aircraft.instance.id == 18 && geofs.animation.values.kias > 100 && geofs.animation.values.accZ > 60 && cons == true && geofs.addonAircraft.isFA18 != 1 ) {
    geofs.debug.loadConConesLarge()
  }
  if (geofs.aircraft.instance.id == 18 && geofs.animation.values.kias > 100 && geofs.animation.values.accZ > 60 && cons == true && geofs.addonAircraft.isFA18 == 1 ) {
    geofs.debug.loadConConesSmall()
  }
  if (geofs.aircraft.instance.id == 7 && geofs.animation.values.kias > 100 && geofs.animation.values.accZ > 60 && cons == true) {
    geofs.debug.loadConConesSmall()
  }
  if (geofs.aircraft.instance.id == 2857 && geofs.animation.values.kias > 100 && geofs.animation.values.accZ > 60 && cons == true) {
    geofs.debug.loadConConesSmall()
  }
  //load cockpit for DHC-8 Q400
  //edit emb120 cockpit in vectary
  if (geofs.aircraft.instance.id == 247 && geofs.camera.currentModeName == "cockpit") {
    void(0) //placeholder
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
};
}
