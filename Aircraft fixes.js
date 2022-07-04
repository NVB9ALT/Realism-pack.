function realismify() {
var notifiedTrue = new Boolean(0)
function fixAircraft() {
if (geofs.aircraft.instance.id == 18){
   geofs.aircraft.instance.definition.parts[46].animations[2] = {};
	geofs.aircraft.instance.definition.parts[46].animations[2].type = "rotate";
	geofs.aircraft.instance.definition.parts[46].animations[2].axis = "Z";
	geofs.aircraft.instance.definition.parts[46].animations[2].value = "roll";
	geofs.aircraft.instance.definition.parts[46].animations[2].ratio = -15;
	geofs.aircraft.instance.definition.parts[46].animations[2].currentValue = null;
	geofs.aircraft.instance.definition.parts[46].animations[2].rotationMethod = function(a) {
      this._rotation = M33.rotationZ(this._rotation, a)
   };
   geofs.aircraft.instance.definition.parts[51].animations[2] = {};
	geofs.aircraft.instance.definition.parts[51].animations[2].type = "rotate";
	geofs.aircraft.instance.definition.parts[51].animations[2].axis = "Z";
	geofs.aircraft.instance.definition.parts[51].animations[2].value = "roll";
	geofs.aircraft.instance.definition.parts[51].animations[2].ratio = -15;
	geofs.aircraft.instance.definition.parts[51].animations[2].currentValue = null;
	geofs.aircraft.instance.definition.parts[51].animations[2].rotationMethod = function(a) {
      this._rotation = M33.rotationZ(this._rotation, a)
   };
}
//F-14 swing wing physics fix
if (geofs.aircraft.instance.id == 2581) {
   if (geofs.animation.values.optionalAnimatedPartPosition == 0) {
   geofs.aircraft.instance.definition.parts[2].area = 50
   geofs.aircraft.instance.definition.parts[3].area = 50
      }
	if (geofs.animation.values.optionalAnimatedPartPosition == 1) {
   geofs.aircraft.instance.definition.parts[2].area = 20
	geofs.aircraft.instance.definition.parts[3].area = 20
      }
	//Wings swing out when high AoA
   }
//Huey power fix
if (geofs.aircraft.instance.id == 2840) {
   geofs.aircraft.instance.definition.parts[17].thrust = 25000
   geofs.aircraft.instance.definition.zeroRPMAltitude = 100000
}
//Redo Falcon-9 sounds and increase effectiveness of flight controls
if (geofs.aircraft.instance.id == 2844) {
   geofs.aircraft.instance.definition.sounds[0].effects.volume.value = "flapsPosition";
	geofs.aircraft.instance.definition.sounds[1].file = "https://geo-fs.com/sounds/f16/rpm1.ogg";
	geofs.aircraft.instance.definition.sounds[2].file = "https://geo-fs.com/sounds/f16/rpm2.ogg";
	geofs.aircraft.instance.definition.parts[25].animations[0].ratio = 2.5;
	geofs.aircraft.instance.definition.parts[25].animations[1].ratio = -2.5;
}
//HUD machmeter fix
if (geofs.aircraft.instance.id == 2310 || geofs.aircraft.instance.id == 2581 || geofs.aircraft.instance.id == 2857 || geofs.aircraft.instance.id == 3591 || geofs.aircraft.instance.id == 3617 || geofs.aircraft.instance.id == 2953) {
   var machTenth = geofs.animation.values.machTenth
   geofs.animation.values.machTenth = Math.floor(10 * (geofs.animation.values.mach % 1).toPrecision(2))
   //geofs.aircraft.instance.definition.instruments.hud.overlay.overlays[6].animations[0].ratio = 23
   geofs.aircraft.instance.definition.instruments.hud.overlay.overlays[6].animations[0].value = machTenth
}
//Inaccurate physics alert
if (geofs.aircraft.instance.id == 3591) {
   if (notifiedTrue == 0) {
ui.notification.show("Note: this aircraft does not have realistic simulation. Do not expect IRL-accurate performance.");
   notifiedTrue = 1
	   }
   }
}

let implementFixes = setInterval(function(){
fixAircraft()
}, 1000);

//Mach buffet
//subsonic aircraft only obviously
function checkAircraftTypeAndSpeedAndImplementMachFX() {
   if (geofs.aircraft.instance.id == 1 || geofs.aircraft.instance.id == 2 || geofs.aircraft.instance.id == 5 || geofs.aircraft.instance.id == 6 || geofs.aircraft.instance.id == 8 || geofs.aircraft.instance.id == 11 || geofs.aircraft.instance.id == 12 || geofs.aircraft.instance.id == 13 || geofs.aircraft.instance.id == 14 || geofs.aircraft.instance.id == 15 || geofs.aircraft.instance.id == 16 || geofs.aircraft.instance.id == 2310 || geofs.aircraft.instance.id == 2418 || geofs.aircraft.instance.id == 2420 || geofs.aircraft.instance.id == 2426 || geofs.aircraft.instance.id == 2461 || geofs.aircraft.instance.id == 2750 || geofs.aircraft.instance.id == 2752 || geofs.aircraft.instance.id == 2808 || geofs.aircraft.instance.id == 2864 || geofs.aircraft.instance.id == 2892 || geofs.aircraft.instance.id == 2943 || geofs.aircraft.instance.id == 2976 || geofs.aircraft.instance.id == 2989 || geofs.aircraft.instance.id == 3109 || geofs.aircraft.instance.id == 3289 || geofs.aircraft.instance.id == 3460 ){ //straight wing aircraft list
	   if (geofs.animation.values.mach > 0.675){
		   geofs.preferences.weather.advanced.turbulences = 7
		}
		if (geofs.animation.values.mach > 0.735){
		   geofs.preferences.weather.advanced.turbulences = 9 
		}
		else {
		   geofs.preferences.weather.advanced.turbulences = 0.2
		}
	}
	if (geofs.aircraft.instance.id == 3 || geofs.aircraft.instance.id == 4 || geofs.aircraft.instance.id == 10 || geofs.aircraft.instance.id == 236 || geofs.aircraft.instance.id == 237 || geofs.aircraft.instance.id == 238 || geofs.aircraft.instance.id == 239 || geofs.aircraft.instance.id == 2003 || geofs.aircraft.instance.id == 2395 || geofs.aircraft.instance.id == 2556 || geofs.aircraft.instance.id == 2700 || geofs.aircraft.instance.id == 2706 || geofs.aircraft.instance.id == 2769 || geofs.aircraft.instance.id == 2772 || geofs.aircraft.instance.id == 2788 || geofs.aircraft.instance.id == 2843 || geofs.aircraft.instance.id == 2865 || geofs.aircraft.instance.id == 2870 || geofs.aircraft.instance.id == 2871 || geofs.aircraft.instance.id == 2878 || geofs.aircraft.instance.id == 2879 || geofs.aircraft.instance.id == 2899 || geofs.aircraft.instance.id == 2951 || geofs.aircraft.instance.id == 2973 || geofs.aircraft.instance.id == 3011 || geofs.aircraft.instance.id == 3036 || geofs.aircraft.instance.id == 3054 || geofs.aircraft.instance.id == 3140 || geofs.aircraft.instance.id == 3179 || geofs.aircraft.instance.id == 3180 || geofs.aircraft.instance.id == 3292 || geofs.aircraft.instance.id == 3307 || geofs.aircraft.instance.id == 3341 || geofs.aircraft.instance.id == 3534 || geofs.aircraft.instance.id == 3575 || geofs.aircraft.instance.id == 4017 || geofs.aircraft.instance.id == 3575){ //swept wing aircraft list
		if (geofs.animation.values.mach > 0.8){
		   geofs.preferences.weather.advanced.turbulences = 7
		}
		if (geofs.animation.values.mach > 0.9){
		   geofs.preferences.weather.advanced.turbulences = 9
		}
		else {
		geofs.preferences.weather.advanced.turbulences = 0.2
	   }
   }
}
var repeatChecks = setInterval(checkAircraftTypeAndSpeedAndImplementMachFX, 500);

//Prop physics
var aircraftChecked = new Boolean(0)
function checkAircraft() {
if (aircraftChecked == 0){
if (geofs.aircraft.instance.id == 21 || geofs.aircraft.instance.id == 2 || geofs.aircraft.instance.id == 2808 || geofs.aircraft.instance.id == 1 || geofs.aircraft.instance.id == 8 || geofs.aircraft.instance.id == 12 || geofs.aircraft.instance.id == 13 || geofs.aircraft.instance.id == 40 || geofs.aircraft.instance.id == 1069 || geofs.aircraft.instance.id == 2750)  {
let lastTorque = 0;
let engtorquemp = 0;
let elevtorquemp = 0;
let ailtorquemp = 0;
let rudtorquemp = 0;

//basic maths to figure out what the engine torque is, then apply it.
function tqmaths() {
  engtorquemp = -(lastTorque - geofs.animation.values.rpm) * 6;
    geofs.aircraft.instance.rigidBody.applyTorqueImpulse([splitAxes(engtorquemp - ailtorquemp)[0] + splitAxesOffset(elevtorquemp)[0],splitAxes(engtorquemp - ailtorquemp)[1] + splitAxesOffset(elevtorquemp)[1],splitAxes(engtorquemp - ailtorquemp)[2] + splitAxesOffset(elevtorquemp)[2]])
};

function getEngineTorque() {
  lastTorque = geofs.animation.values.rpm
  setTimeout(tqmaths, 100)
};

//propwash stuff
function getControlWash() {
  elevtorquemp = (geofs.animation.values.rpm / 10) * geofs.animation.values.pitch;
  ailtorquemp = (geofs.animation.values.rpm / 10) * geofs.animation.values.roll;
  rudtorquemp = (geofs.animation.values.rpm / 10) * geofs.animation.values.yaw;
}

//more complicated maths to resolve torque axes
  //𝐹𝑠=|𝐹⃗ |cos(𝜃𝑠,𝐹)
function splitAxes(force) {
  var angle = geofs.animation.values.heading360 * (Math.PI/180)
  if (geofs.animation.values.atilt <= 0) {
  var anglez = geofs.animation.values.atilt - 45
  }
  else {
    var anglez = Math.abs(Math.abs(geofs.animation.values.atilt + 45) - 360)
  }
  
  fx = force * (Math.sin(angle))
  fy = force * (Math.cos(angle))
  fz = force * Math.cos(anglez)
  return [fx, fy, fz];
}
  
function splitAxesOffset(force) {
  var angle = (geofs.animation.values.heading360 - 90 % 360) * (Math.PI/180)
  if (geofs.animation.values.atilt <= 0) {
  var anglez = geofs.animation.values.atilt - 45
  }
  else {
    var anglez = Math.abs(Math.abs(geofs.animation.values.atilt + 45) - 360)
  }
  
  fx = force * (Math.sin(angle))
  fy = force * (Math.cos(angle))
  fz = force * Math.cos(anglez)
  return [fx, fy, fz];
}
  
function doForces() {
  getEngineTorque()
}

//stall and ground effect stuff

function groundEffect() {
  if (geofs.animation.values.haglFeet <= 10) {
    geofs.aircraft.instance.rigidBody.applyCentralImpulse([0,0,(-(geofs.animation.values.haglFeet) + 10) * geofs.animation.values.kias])
  }
}

interval = setInterval(function(){
  groundEffect();
  getControlWash();
  doForces();
}, 100)
      }
aircraftChecked = 1
   }
if (geofs.aircraft.instance.id != 21 || geofs.aircraft.instance.id != 2 || geofs.aircraft.instance.id != 2808 || geofs.aircraft.instance.id != 1 || geofs.aircraft.instance.id != 8 || geofs.aircraft.instance.id != 12 || geofs.aircraft.instance.id != 13 || geofs.aircraft.instance.id != 40 || geofs.aircraft.instance.id != 1069 || geofs.aircraft.instance.id != 2750) {
      aircraftChecked = 0
   }
}
checkPropInterval = setInterval(function(){
   checkAircraft()
}, 1000);
}
