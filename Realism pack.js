javascript: (() => {

lagReductionInterval = setInterval(function(){geofs.api.renderingSettings.degradedCollisions = true;geofs.api.renderingSettings.lowResRunways = true;if (geofs.preferences.graphics.advanced.fxaa = false) {flight.recorder.clear()};}, 100);

var script1 = document.createElement('script'); script1.src="https://cdn.jsdelivr.net/gh/NVB9ALT/Bookmarklet_AP-Plus-Plus@main/ap++.js"; document.body.appendChild(script1);script1.onload = function(){runAPplusplus()};

function runBladeCollisions() {if (geofs.aircraft.instance.id == 9 || geofs.aircraft.instance.id == 52 || geofs.aircraft.instance.id == 4090) {
/*code here*/
}};bladeCollisionInterval = setInterval(function(){runBladeCollisions()}, 1000);

function runCarrierCatapults() {
ui.notification.show("Use q to lock the launch bar.");let catLlas=[[37.778307623586805,-122.6090264835742,22.753097613256113]],carrierPlaneIds=["7","2581","3460"],barDown=!0,barLocked=!1,launchKey="`",lockKey="q";function gearBarPosLock(){barLocked&&geofs.aircraft.instance.rigidBody.setLinearVelocity([0,0,0])}function resolveForceVector(e,a){return fx=e*Math.cos(a*(Math.PI/180)),fy=e*Math.sin(a*(Math.PI/180)),[fx,fy,0]}function distance(e,a){var t=a[0]-e[0],n=a[1]-e[1],o=a[2]-e[2];return Math.sqrt(t*t+n*n+o*o)}carrierPlaneIds.includes(geofs.aircraft.instance.id)&&document.addEventListener("keypress",function(e){if(e.key===lockKey&&(barLocked?(barLocked=!1,clearInterval(lockInt),ui.notification.show("Launch Bar Unlocked")):catLlas.forEach(function(e){distance(geofs.aircraft.instance.llaLocation,e)<10&&(barLocked=!0,ui.notification.show("Launch bar locked, apply max power and press ~ to launch."),lockInt=setInterval(function(){gearBarPosLock()}))})),e.key===launchKey&&barLocked&&1==geofs.animation.values.throttle){clearInterval(lockInt),barLocked=!1,barDown=!1,geofs.aircraft.instance.rigidBody.reset();var a=10*geofs.aircraft.instance.rigidBody.mass;let e=new geofs.fx.ParticleEmitter({anchor:{worldPosition:[0,0,-1]},duration:1e5,rate:.05,life:4e4,easing:"easeOutQuart",startScale:5e-4,endScale:5e-4,randomizeStartScale:.05,randomizeEndScale:.15,startOpacity:.9,endOpacity:1e-5,startRotation:"random",texture:"whitesmoke"});launchInterval=setInterval(function(){1==geofs.animation.values.groundContact?geofs.aircraft.instance.rigidBody.applyCentralImpulse([resolveForceVector(a,geofs.animation.values.heading360)[1],resolveForceVector(a,geofs.animation.values.heading360)[0],resolveForceVector(a,geofs.animation.values.heading360)[2]]):(clearInterval(launchInterval),e.destroy())},200)}});
};

function runSpoilersArming() {
/*this is mildly urgent*/
};

function gBlackout() {if (geofs.animation.values.accZ >= 90) {ui.showCrashNotification();geofs.camera.animations.orbitHorizontal.active = !1}else{ui.hideCrashNotification()}};blackoutInt = setInterval(function(){gBlackout();},10);

function fixSpin() {
if (geofs.aircraft.instance.id == 2948|| geofs.aircraft.instance.id == 2581) {var pitch = geofs.animation.values.atilt;setTimeout(() => {if ((geofs.animation.values.atilt + 50 < pitch) || (geofs.animation.values.atilt - 50 > pitch)) {geofs.aircraft.instance.definition.minimumSpeed = 600;console.log("Spin detected");geofs.flyToCamera();console.log("Spin fixed");setTimeout(() => {geofs.aircraft.instance.definition.minimumSpeed = 250}, 5000)}}, 500)};
if (geofs.aircraft.instance.id == 2808 || geofs.aircraft.instance.id == 3460) {var pitch = geofs.animation.values.atilt;setTimeout(() => {if ((geofs.animation.values.atilt + 50 < pitch) || (geofs.animation.values.atilt - 50 > pitch)) {geofs.aircraft.instance.definition.minimumSpeed = 200;console.log("Spin detected");geofs.flyToCamera();console.log("Spin fixed");setTimeout(() => {geofs.aircraft.instance.definition.minimumSpeed = 200}, 5000)}}, 500)};
if (geofs.aircraft.instance.id == 2988) {var pitch = geofs.animation.values.atilt;setTimeout(() => {if ((geofs.animation.values.atilt + 50 < pitch) || (geofs.animation.values.atilt - 50 > pitch)) {geofs.aircraft.instance.definition.minimumSpeed = 1000;console.log("Spin detected");geofs.flyToCamera();console.log("Spin fixed");setTimeout(() => {geofs.aircraft.instance.definition.minimumSpeed = 250}, 5000)}}, 500)};
}
let fixyFixy = setInterval(function(){fixSpin()}, 1000);

/*audio.init(geofs.aircraft.instance.definition.sounds)*/
var script2 = document.createElement('script'); script2.src="https://cdn.jsdelivr.net/gh/NVB9ALT/GeoFS-Aircraft-Changes@main/Aircraft-fixes.js";document.body.appendChild(script2);script2.onload = function(){realismify()};

function showTheStars() {if (geofs.aircraft.instance.altitude >= 80000 || geofs.isNight == 1) {geofs.api.viewer.scene.skyBox.show = 1}else {geofs.api.viewer.scene.skyBox.show = 0}};starsInterval = setInterval(function(){showTheStars()}, 1000);

})();
