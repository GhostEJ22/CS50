# RPG
#### Video Demo:  <URL HERE>
#### Description: Run the game on any browsesr supproting JavaScript
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For this project, I created a basic RPG game where the goal is to defeat a dragon and beat the game. There is a store where you can buy weapons and health, a cave where you can fight monsters and gain XP and gold, and a dungeon to fight the dragon. If beaten there is an additional hard mode that can be entered, where a new weapon is unlocked but for a higher cost, as well as much harder enemies. There is even a easter egg hidden, that if found can help make the game a lot easier, although it can also make it a lot harder.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The style.css file helps create a older looking RPG game format, making the background blue with a text color of black, game background of gray, and some additionals things to make the game look nice. There is also a class to hide buttons, which is used later. The text and buttons are formatted to having spacing between as well as borders to really make the game look nice.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Next is the index.html file. This uses all the classes in style.css to create visible and hidden buttons, as well as create the text that will show your location, your XP, your Health, and your gold. When fighting a enemy this section also defines a monsterStats class(which is defined in the .css file) to show the monster name and its health.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The JavaScript section is where the meat of the code is. This is where the variables are defined, functions controlling what each button does is, and more. There is an update system so that any time a button is clicked, it calls a specific dictionary within the locations array, making the code neater. Some of the features include:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; * **Player stats:** This controls their xp, their gold, their health.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; * **Inventory:** For now this contains only their weapons, although I may add magic items in the future.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; * **Combat:** This controls the monsters the user fights, the damage done, what the user can do, and what happens after the fight,

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; * **Location:** Going to different sections of the world

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; * **Store:** Being able to buy health and weapons

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; * **Easter egg:** Discover the chance to win some gold, at a cost.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; * **Hard mode:** Unlock more weapons, but also harder enemies.