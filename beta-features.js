//Interactive cockpits: click-and-drag flaps/gear/thrust/spoilers/engine levers/switches
//GLOBAL check if autopilot panel clickable
//Some aircraft not cockpit clickable with this method - try to fix?

//	setInterval(function(){console.log(controls.mouse.clickedNode)})
//controls.keydown
// Su-35 has..."knobs"? I guess click it 5 times to turn the engine on, then 2 times to turn the engine off?
controls.throttleStepUp = null
controls.throttleStepDown = null
geofs.animation.values.dc3Ignition = 1
geofs.animation.values.dc3Mixture = 1
geofs.animation.values.dhc2Mixture = 1
regularCockpitClickyStuffInt = setInterval(function(){
//C172 throttle
if (geofs.aircraft.instance.id == 2) {
   if (controls.mouse.clickedNode == "Cylinder001") {
if (controls.throttle == 1) {
setTimeout(() => {
   controls.throttleStepDown = 1
	controls.throttleStepUp = 0
}, 500)
}
if (controls.throttle == 0) {
setTimeout(() => {
   controls.throttleStepDown = 0
	controls.throttleStepUp = 1
},500)
}
if (controls.throttleStepDown == 1) {
   controls.throttle = controls.throttle - 0.0075
}
if (controls.throttleStepUp == 1) {
   controls.throttle = controls.throttle + 0.0075
}
   }
}
//Phenom 100 throttle
if (geofs.aircraft.instance.id == 5) {
	if (controls.mouse.clickedNode == "Cylinder002" || controls.mouse.clickedNode == "Cylinder004") {
if (controls.throttle == 1) {
setTimeout(() => {
   controls.throttleStepDown = 1
	controls.throttleStepUp = 0
}, 500)
}
if (controls.throttle == 0) {
setTimeout(() => {
   controls.throttleStepDown = 0
	controls.throttleStepUp = 1
},500)
}
if (controls.throttleStepDown == 1) {
   controls.throttle = controls.throttle - 0.0075
}
if (controls.throttleStepUp == 1) {
   controls.throttle = controls.throttle + 0.0075
}
   }
}
//DC-3 engine controls
if (geofs.aircraft.instance.id == 16) {
	if (geofs.animation.values.dc3Ignition == 1 && geofs.animation.values.dc3Mixture == 1) {
geofs.aircraft.instance.engine.on ? null : geofs.aircraft.instance.startEngine();
	} else {
geofs.aircraft.instance.engine.on ? geofs.aircraft.instance.stopEngine() : null;
	}
	if (controls.mouse.clickedNode == "throttle") {
if (controls.throttle == 1) {
setTimeout(() => {
   controls.throttleStepDown = 1
	controls.throttleStepUp = 0
}, 500)
}
if (controls.throttle == 0) {
setTimeout(() => {
   controls.throttleStepDown = 0
	controls.throttleStepUp = 1
},500)
}
if (controls.throttleStepDown == 1) {
   controls.throttle = controls.throttle - 0.0075
}
if (controls.throttleStepUp == 1) {
   controls.throttle = controls.throttle + 0.0075
}
	}
}
//DHC-2 engine management
if (geofs.aircraft.instance.id == 13) {
	if (geofs.animation.values.dhc2Mixture == 1) {
geofs.aircraft.instance.engine.on ? null : geofs.aircraft.instance.startEngine();
	} else {
geofs.aircraft.instance.engine.on ? geofs.aircraft.instance.stopEngine() : null;
	}
   if (controls.mouse.clickedNode == "throttleLever") {
if (controls.throttle == 1) {
setTimeout(() => {
   controls.throttleStepDown = 1
	controls.throttleStepUp = 0
}, 500)
}
if (controls.throttle == 0) {
setTimeout(() => {
   controls.throttleStepDown = 0
	controls.throttleStepUp = 1
},500)
}
if (controls.throttleStepDown == 1) {
   controls.throttle = controls.throttle - 0.0075
}
if (controls.throttleStepUp == 1) {
   controls.throttle = controls.throttle + 0.0075
}
   }
}
})
booleanCockpitClickyStuffInt = setInterval(function(){
//Cub mixture
if (geofs.aircraft.instance.id == 1) {
	if (controls.mouse.clickedNode == "fuel") {
geofs.aircraft.instance.engine.on ? geofs.aircraft.instance.stopEngine() : geofs.aircraft.instance.startEngine();
	}
}
//Cessna 172 mixture
if (geofs.aircraft.instance.id == 2) {
   if (controls.mouse.clickedNode == "Cylinder003") {
geofs.aircraft.instance.engine.on ? geofs.aircraft.instance.stopEngine() : geofs.aircraft.instance.startEngine();
   }
}
//Phenom 100 gear and parking brake
if (geofs.aircraft.instance.id == 5) {
	if (controls.mouse.clickedNode == "Cylinder007") {
controls.setters.setGear.set()
   }
	if (controls.mouse.clickedNode == "Cylinder057") {
controls.setters.toggleParkingBrake.set();
   }
}
//Silent 2 speedbrake and flaps
if (geofs.aircraft.instance.id == 11) {
   if (controls.mouse.clickedNode == "spoilersLever") {
controls.setters.setAirbrakes.set();
   }
   if (controls.mouse.clickedNode == "flapsLever") {
controls.setters.cycleFlaps.set();
   }
}
//A380 speedbrake
if (geofs.aircraft.instance.id == 10) {
   if (controls.mouse.clickedNode == "group_0") {
controls.setters.setAirbrakes.set();
   }
}
//DC-3 ignition switch and flaps
if (geofs.aircraft.instance.id == 16) {
geofs.aircraft.instance.cockpitSetup.parts[34].animations[0].value = "dc3Ignition"
geofs.aircraft.instance.cockpitSetup.parts[10].animations[1] = {};
geofs.aircraft.instance.cockpitSetup.parts[10].animations[1].type = "rotate";
geofs.aircraft.instance.cockpitSetup.parts[10].animations[1].value = "dc3Mixture"
geofs.aircraft.instance.cockpitSetup.parts[10].animations[1].ratio = 2
geofs.aircraft.instance.cockpitSetup.parts[10].animations[1].axis = "X"
geofs.aircraft.instance.cockpitSetup.parts[10].animations[1].currentValue = null
geofs.aircraft.instance.cockpitSetup.parts[10].animations[1].rotationMethod = function(a) {
      this._rotation = M33.rotationX(this._rotation, a)
   };
   if (controls.mouse.clickedNode == "switch_master_ignition") {
geofs.animation.values.dc3Ignition == 0 ? geofs.animation.values.dc3Ignition = 1 : geofs.animation.values.dc3Ignition = 0
	}
   if (controls.mouse.clickedNode == "flapsLever") {
controls.setters.cycleFlaps.set()
	}
	if (controls.mouse.clickedNode == "mixture") {
geofs.animation.values.dc3Mixture == 0 ? geofs.animation.values.dc3Mixture = 1 : geofs.animation.values.dc3Mixture = 0
	}
}
//DHC-6 flaps
if (geofs.aircraft.instance.id == 6) {
	if (controls.mouse.clickedNode == "AK_LOD_100") {
controls.setters.cycleFlaps.set()
	}
}
//DHC-2
if (geofs.aircraft.instance.id == 13) {
geofs.aircraft.instance.cockpitSetup.parts[29].animations[1] = {};
geofs.aircraft.instance.cockpitSetup.parts[29].animations[1].type = "rotate";
geofs.aircraft.instance.cockpitSetup.parts[29].animations[1].value = "dhc2Mixture"
geofs.aircraft.instance.cockpitSetup.parts[29].animations[1].ratio = 2
geofs.aircraft.instance.cockpitSetup.parts[29].animations[1].axis = "X"
geofs.aircraft.instance.cockpitSetup.parts[29].animations[1].currentValue = null
geofs.aircraft.instance.cockpitSetup.parts[29].animations[1].rotationMethod = function(a) {
      this._rotation = M33.rotationX(this._rotation, a)
   };
   if (controls.mouse.clickedNode == "mixtureLever") {
geofs.animation.values.dhc2Mixture == 0 ? geofs.animation.values.dhc2Mixture = 1 : geofs.animation.values.dhc2Mixture = 0
	}
   if (controls.mouse.clickedNode == "flapsIndicator") {
controls.setters.cycleFlaps.set()
	}
   if (controls.mouse.clickedNode == "ruddersHandle") {
controls.setters.setAccessories.set()
   }
}
},500)
