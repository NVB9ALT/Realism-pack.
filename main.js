function realismGo() {
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
}
