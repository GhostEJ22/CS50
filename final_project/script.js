let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];
let hard = 0;
let healthCost = 10;
let weaponCost = 30;
let zombieHealth = 15;
let beastHealth = 60;
let giantHealth = 150;
let dragonHealth = 300;
let winnersText = "You defeated the dragon and freed Emberhold!"

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

//All the weapons, which is a array of dictionaries(29-47)
const weapons = [
  {
    name: "stick",
    power: 5
  },
  {
    name: "dagger",
    power: 30
  },
  {
    name: "claw hammer",
    power: 50
  },
  {
    name: "sword",
    power: 75
  }
];

//All the mobs, which is a array of dictionaries(49-71)
const monsters = [
  {
    name: "zombie",
    level: 2,
    health: zombieHealth
  },
  {
    name: "beast",
    level: 8,
    health: beastHealth
  },
  {
    name: "giant",
    level: 12,
    health: giantHealth
  },
  {
    name: "dragon",
    level: 20,
    health: dragonHealth
  }
];

//All the locations. It is an array of dictionaries(key value pairs)(73-129)
const locations = [
  {
    name: "Town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon, restart],
    text: "You are in the town square. You see a sign that says \"store\"."
  },
  {
    name: "store",
    "button text": ["Buy 10 health(" + healthCost + " gold)", "" , "Go to town square"],
    "button functions": [buyHealth, BOS, goTown, restart],
    text: "You entered the store."
  },
  {
    name: "cave",
    "button text":["Fight zombie", "Fight beast", "Fight giant", "Go to town square"],
    "button functions": [fightZombie, fightBeast, fightGiant, goTown],
    text: "You enter the cave. You see some monsters."
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown, restart],
    text: "You are fighting a monster."
  },
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, easterEgg, restart],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold, and get closer to freeing the hopeless city.'
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart, restart],
     text: "You die..."
  },
  {
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?", "Free the neighboring city?"],
    "button functions": [restart, restart, restart, makeHard],
    text: winnersText
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square??"],
    "button functions": [pickTwo, pickEight, goTown, restart],
    text: "On your way back to town square you decided to stop by a local gambling house. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win! If not..."
  },
  {
    name: "Town Square challenging",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon, restart],
    text: "Welcome to Emberholm's neighboring city, Wingcrest. Although this city has had less attempted rescues, there is good reason for that. The dragon gaurding this place is an Ancient Dragon, meaning it, along with all the other monsters, is much more powerful. The only forunate news is that they have the best blacksmith in the land, if he is still alive that is. I'd check the store if I were you."
  }
]

// initalize buttons(131-135)
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;
button4.onclick = goTown;

//Where all the functions saying what to change goes. Uses the array location above which is made of dictionaries(137-149)
function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button4.innerText = location["button text"][3];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  button4.onclick = location["button functions"][3];
  text.innerText = location.text;
}

//Everything involving the basic choices on where to go(151-177)
function goTown() {
  button4.classList.add("hidden-button");
  update(locations[0]);
};

function goStore() {

  if(currentWeapon < weapons.length - 1) {
    locations[1]["button text"][1] = "Buy weapon(" + weaponCost + " gold)";
  }
  locations[1]["button text"][0] = "Buy 10 health(" + healthCost + " gold)";
  update(locations[1]);
}

function BOS() {
  if(currentWeapon < weapons.length - 1) {
    return buyWeapon();
  } else {
    return sellWeapon();
  }
}

function goCave() {
  button4.classList.remove("hidden-button");
  update(locations[2]);
}

//Everything in the store(179-220)
function buyHealth() {
    if(gold >= healthCost) {
      gold -= healthCost;
      health += healthCost;
      goldText.innerText = gold;
      healthText.innerText = health;
    } else {
      text.innerText = "You don't have enough gold to buy health";
    }
}

function buyWeapon() {
  if(currentWeapon >= weapons.length - 2 && gold >= weaponCost) {
    console.log("success")
    locations[1]["button text"][1]  = "Sell weapon(15 gold)";
    button2.innerText = locations[1]["button text"][1];
  }
  if (gold >= weaponCost){
    gold -= weaponCost;
    goldText.innerText = gold;
    currentWeapon++;
    let newWeapon = weapons[currentWeapon].name
    text.innerText = "You got a " + newWeapon + ".";
    inventory.push(newWeapon);
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "You don't have enough gold to buy a weapon.";
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else{
    text.innerText = "You can't sell your only weapon."
  }
}

//What happens when you click on each enemy(222-255)
function fightZombie() {
  fighting = 0;
  if(hard === 1) {
    monsters[0].health = 50;
    zombieHealth = 50;
  }
  goFight();
}

function fightBeast() {
  fighting = 1;
  if(hard === 1) {
    monsters[1].health = 150;
    beastHealth = 150;
  }
  goFight();
}
function fightGiant() {
  fighting = 2;
  if(hard === 1) {
    monsters[2].health = 300;
    giantHealth = 300;
  }
  goFight();
}
function fightDragon() {
  fighting = 3;
  if(hard === 1) {
    monsters[3].health = 500;
    dragonHealth = 500;
  }
  goFight();
}

//Controls everything involving fighting (257-338)
function goFight() {
  console.log(zombieHealth);
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  button4.classList.add("hidden-button");
  monsterNameText.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  if (isMonsterHit()) {
    let damage = weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    monsterHealth -= damage;
    if(fighting === 3) {
      dragonHealth -= damage;
    } else if(fighting === 2) {
      giantHealth -= damage;
    } else if(fighting === 1) {
      beastHealth -= damage;
    } else if(fighting === 0) {
      zombieHealth -= damage;
    }
  } else{
    text.innerText += "You missed...";
  }
  health -= getMonsterAttackValue(monsters[fighting].level);

  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
      defeatMonster();
    }
    //Same as lines 290-294: fighting === 2 ? winGame() : defeatMonster();


  if (Math.random() <= 0.1 && inventory.length !==  1) {
    text.innerText += " Your " + inventory.pop() + " broke!";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  if(hard===0) {
    let hit = (level * 6) - (Math.floor(Math.random() * 2) * xp);
    if (hit > 0) {
      return hit;
    }
    return 0;

  }
  let hit = (level * 10) - (Math.floor(Math.random() * 3) * xp);
  if (hit > 0) {
      return hit;
    }
  return 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText  = "You dodge the attack from the " + monsters[fighting].name + ".";
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  if(fighting===3) {
    winGame();
  } else{
    update(locations[4]);
  }
}

//Controls what happens at end game(340-356)
function lose() {
  update(locations[5]);
}

function winGame() {
  if(hard === 0) {
    button4.classList.remove("hidden-button");
  } else {
    locations[6].text = winnersText;
  }
  update(locations[6]);
}

function restart() {
  location.reload()
}

//controls the additions to hard mode(358-383)
function makeHard() {
  if(dragonHealth > 0 || hard === 1) {
    goTown();
    return;
  }
  hard = 1;
  healthText.innerText = health;
  xpText.innerText = xp;
  goldText.innerText = gold;
  weapons.push({name: "Leviathan Axe", power: 150});
  button4.classList.add("hidden-button");
  healthCost = 20;
  weaponCost = 100;
  zombieHealth = 50;
  beastHealth = 150;
  giantHealth = 300;
  dragonHealth = 500;
  button4.classList.add("hidden-button");
  winnersText = "Congrats, you freed Wingcrest. Thankfully, there are no more cities to rescue. Guess there's nothing left to do but retire and reminisce on your dragon hunting career."
  goTownHard();
}

function goTownHard() {
  update(locations[8]);
}

//hidden secret(385-422)
function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  let numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }

  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";

  for (let i = 0; i < numbers.length; i++) {
    text.innerText += numbers[i] + "\n";
  }

  if (numbers.indexOf(guess) != -1) {
    text.innerText += "Right! You win 20 gold!"
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText = "You chose wrong and lost 10 health...";
    health -= 10;
    healthText.innerText = health;
    if(health <= 0) {
      lose();
    }
  }
}

