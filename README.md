# Realism-pack
*Notice: the Tampermoney version may not work properly. If this is the case, please try the bookmarklet version if you are able to.*

**This addon needs several updates and an implementation of toggleable features. I've basically neglected this addon for months now, I'm sorry, I may have to find someone else to take over development. If you would like to do that, please contact me.**
//It's just not really fun to work on anymore...</br>

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

Addon aircraft are available <a href="https://github.com/NVB9ALT/Addon-Aircraft-and-Parts">here.</a> They do not have animated control surfaces and some may be lacking animated speedbrakes/flaps as well, but the physics models are as realistic as I can make them. I may work on making the addon aircraft easier to run later.</br>
</br>

Some of these features were originally standalone addons by AriakimTaiyo; these have been marked with an asterisk (*).

What the Realism Pack adds:

- Button to toggle whether instruments show realistic KCAS or KTAS
- *All CC aircraft's PFDs and HUDs have been fixed to be the right size and display all information correctly*
- ILS autoland (if you're on an autopilot ILS approach, the plane will be able to land itself)
- A rudimentary form of **multiplayer aircraft sounds**
- You black out when you pull more than 9 Gs
- Condensation effects for fighters
- A320 (applies to A220 as well), 737 and 777 immersion sound effects (*)
- If you strike the rotor blades of a helicopter on the ground, it crashes
- A basic implementation of propwash
- A bug fix for the F-14 and XB-70
- F-14 swing wing physics
- Clickable cockpits
- Minor F-16 sound tweak (sounds different in front vs rear)
- *Sonic booms*
- A couple of sounds for high Gs
- Carrier catapults (*)
- Stall buffet camera effect (*)
- Sixteen 3d landmarks around the world
- Lift-based wingflex for most CC airliners (*)
- Falcon 9 control fix
- A massive realism fix for the HAL Tejas
- A similar fix for the F-15
- F-22 fix
- *Tricky Corsair startup* (you'll need to advance the throttle a little bit to get the engine to start)
- A brake parachute for the F-16
- Turbofan engines now take longer to spool up to full power between 10% and 70% RPM
- Advanced 2d Clouds Generation V1
- Autospoilers (use Shift+B to arm the spoilers so they automatically deploy on touchdown)
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
