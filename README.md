# Realism-pack
*Notice: the Tampermoney version may not work properly. If this is the case, please try the bookmarklet version if you are able to.*

**Slowly working on updates, but if you'd like to take over the project, do let me know. Updates will include the addon aircraft being combined with this, bug fixes, and toggleable features at some point.**</br>

This massive addon adds over 30 new features, realism fixes, and a few bug fixes. The goal of this project is to modify GeoFS to make it as realistic as possible and expand its capabilities.</br>
You can review the full list of additional features and changes below.


**HOW TO INSTALL:**</br>
*If you want to run the bookmarklet version:*
- Watch this YouTube video: https://www.youtube.com/watch?v=TNDEesTbKc4.
- Follow that tutorial, but set the contents of bookmarklet.js as the URL.

*If you want to run the Tampermonkey version:*
- Make sure you have Tampermonkey installed
- Add tampermonkey-code.js as a new userscript

You'll never have to worry about updating your copy of the addon.

**HOW TO USE:**</br>
If you run the bookmarklet version, please wait until the terrain has loaded before clicking on the bookmarklet. Otherwise you might have terrain collision bugs.</br>

*How to use the carrier catapults:*
Go to the flight deck of the USS John C. Stennis and taxi to the front end of the deck, then use "q" to lock/unlock the launch bar. Once the launch bar is locked, use "~" to launch the catapult. It is recommended to apply full power before launching. </br>
NOTE: You must be in a carrier-capable aircraft for the catapults to work (i.e. it needs a tailhook). </br>
*TUTORIAL:* https://www.youtube.com/watch?v=XWT7eGtNRl8 </br>

*How to use the clickable cockpits*</br>
For throttles, click on the throttle and hold until the throttle is at the desired position. At the max and idle settings, a detent keeps the lever in position for half a second so that setting max or idle thrust is slightly easier.
For anything else, click and hold for half a second. Try not to click and hold for more than half a second, because that would trigger the switch twice.<br>
*What clickable parts this addon includes:*<br>
- Piper Cub: mixture (toggles engine)
- Cessna 172: throttle, mixture (toggles engine)
- Embraer Phenom 100: throttle, landing gear, parking brake
- DHC-6 Twin Otter: flaps
- Douglas DC-3: flaps, throttle, mixture levers and magneto switches (both must be turned on in order for the engines to auto-start)
- Alisport Silent 2: speedbrake, flaps
- DHC-2 Beaver: flaps, throttle, mixture (toggles engine), water rudders
- Airbus A380: speedbrake

*Addon aircraft*<br>
I've recently added all of my addon aircraft to the Realism Pack. These aircraft do not have animated control surfaces, may not have cockpits, and may not have other animated parts, but the physics are as realistic as I can make them.<br>
Currently includes 8 new aircraft:
- F/A-18C, has tailhook and the paddle switch thing
- Sukhoi Su-27. Not a Sukhoi Su-35. Has cobra button.
- MiG-17.
- E-7 Wedgetail AWACS
- MiG-21. X key toggles a drop tank.
- Morane-Saulnier Type G.
- Lockheed F-117. Does not have working stealth.
- F-14A Tomcat. Not the same as the F-14B. Has a much more realistic physics model.

  *Spoilers arming*
  This allows you to "arm" the spoilers so they automatically deploy on touchdown. The key for this is Shift.

Some of these features were originally standalone addons by AriakimTaiyo; these have been marked with an asterisk (*).

What the Realism Pack adds:

- Button to toggle whether instruments show realistic KCAS or KTAS
- **NOTICE: CC aircraft HUDs/PFDs are badly bugged right now, I don't know if I will update this**</br>*All CC aircraft's PFDs and HUDs have been fixed to be the right size and display all information correctly*
- ILS autoland (if you're on an autopilot ILS approach, the plane will be able to land itself)
- **NOTICE: This is not in the addon yet, but I do have a working version that will be added once I fix the volume**</br>A rudimentary form of **multiplayer aircraft sounds**
- You black out when you pull more than 9 Gs (Now only in cockpit view)
- Condensation effects for fighters
- SSR shaders by AriakimTaiyo (*)
- A320/A220/A350, 737/777 immersion sound effects (*)
- If you strike the rotor blades of a helicopter on the ground, it crashes
- A basic implementation of propwash
- *Livery Selector by Kolos26*
- A bug fix for the F-14 and XB-70
- F-14 swing wing physics
- **8 addon aircraft**
- Clickable cockpits
- Minor F-16 sound tweak (sounds different in front vs rear)
- *Sonic booms*
- A couple of sounds for high Gs
- Carrier catapults (*)
- Stall buffet camera effect (*)
- Lift-based wingflex for most CC airliners (*)
- A massive realism fix for the HAL Tejas
- A similar fix for the F-15
- F-22 fix
- *Tricky Corsair startup* (you'll need to advance the throttle a little bit to get the engine to start)
- A brake parachute for the F-16
- Turbofan engines now take longer to spool up to full power between 10% and 70% RPM
- Advanced 2d Clouds Generation V1
- Autospoilers
- Ejection seats for fighter jets (press E while airborne)
- A machmeter on the HUD
- Lag reduction
- Other minor improvements

**IF YOU DISCOVER A BUG OR GLITCH WITH THE ADDON, OR IF YOU WANT TO SUBMIT FEEDBACK OR FEATURE SUGGESTIONS:**
You can contact me in three ways:
- Submit an issue under "Issues"
- Send me a message on my Fandom message wall ( https://geofs.fandom.com/wiki/Message_Wall:NVB9_2 )
- Send me an email ( coveljulian@gmail.com )

If you're alerting me to a bug/glitch, please let me know of the circumstances that cause the issue, and if it produces a console error please provide a screenshot.</br>
If you're submitting suggestions, please keep in mind that I may not be able or willing to implement them.
