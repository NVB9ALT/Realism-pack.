function runRealismPack() {
geofs.api.waterDetection.create();
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
script2.src = "https://cdn.jsdelivr.net/gh/NVB9ALT/GeoFS-Aircraft-Changes@main/Aircraft-fixesS.js";
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

function addCockpitLighting() {
   if (geofs.camera.currentModeName == "cockpit" && geofs.isNight == 1) {
geofs.api.viewer.scene.light.intensity = 4;
geofs.api.viewer.scene.light.color = {red: 0.8, green: 0.63, blue: 0.52, alpha: 1};
	} else if (geofs.isNight == 1) {
geofs.api.viewer.scene.light.intensity = 0.2
	}
}
cockpitLightingInt = setInterval(function(){addCockpitLighting()},100)
}
