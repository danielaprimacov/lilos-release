# Lilo's release

🔗 [Click here to see the deployed game](https://danielaprimacov.github.io/lilos-release/)

## 📜 Description

**Lilo’s Release** is an exciting 2D action game where you take control of **Stitch**, battling against **Reuben** to rescue **Lilo**! Reuben has captured Lilo, and it's up to Stitch to fight his way through and defeat him. Use Stitch’s agility and combat skills to land powerful attacks while dodging Reuben’s counterattacks. Only by striking enough times will Stitch be able to bring Lilo to safety!

Can you help Stitch save his best friend? The fate of Lilo is in your hands!

## ⚡ MVP

The **MVP** of _Lilo’s Release_ is a basic yet functional version of the game that includes core gameplay mechanics, allowing players to experience the main objective—defeating Reuben to rescue Lilo. The focus is on establishing fundamental mechanics before expanding with additional content, polish, or extra features.

### 🎮 Main Functionalities

The game mechanics of _Lilo’s Release_ focus on dynamic movement, combat, and survival. Below are the key functionalities:

### 🕹️ Player Controls (Stitch)

- **Movement**: Stitch moves in the direction of an arrow, controlled by the **arrow keys**.
- **Jumping**: Press **Spacebar** to make Stitch jump.
- **Attacking**: Stitch attacks by jumping and colliding with Reuben.

### 🤖 Enemy Behavior (Reuben)

- **Circular Movement**: Reuben continuously moves in a circular path.
- **Random Jumps**: Reuben randomly is changing his position towards Stitch, making the battle unpredictable.

### ❤️ Health & Lives

- **Stitch’s Lives**: Stitch has **5 lives**. A life is lost if Reuben touches him.
- **Reuben’s Health**: Reuben has a certain amount of health, which decreases when Stitch successfully lands an attack.

### 🏆 Winning & Losing Conditions

- **Win**: Stitch wins when Reuben’s health is completely depleted.
- **Lose**: The game ends if Stitch loses all 3 lives.

## 🚀 Potential Next Steps After MVP

## 📦 Data Structure

### **1️⃣ Player Class (`Player.js`)**

The `Player` class defines the main character's **position, movement, rotation, jumping mechanics, and interactions** with the enemy.

#### **📝 Attributes**

- 📍 `left, top`: Coordinates of the player's position.
- 📏 `width, height`: Dimensions of the player character.
- 🔄 `characterRotation`: Rotation angle for character movement.
- 🎯 `arrowDirection, arrowRotation`: Controls the jump direction indicator.
- 🚀 `isJumping`: Boolean flag for jump state.
- 🖥️ `element`: DOM representation of the character.
- 🎯 `arrowElement`: DOM representation of the jump direction indicator.

#### **⚙️ Methods**

- 🔄 `updatePosition()`: Updates the character's position and rotation.
- 🎯 `updateArrowPosition()`: Updates the indicator's position based on rotation.
- 🏃 `move()`: Handles jumping and ensures movement along the circular path.
- 🎮 `moveArrow(key)`: Adjusts the direction indicator when the user presses left/right keys.
- ⚔️ `isPlayerTouchingEnemy(enemy)`: Detects if the player lands on the enemy.

---

### **2️⃣ Enemy Class (`Enemy.js`)**

The `Enemy` class defines the enemy’s **movement, collision detection, and jump behavior** within the battle arena.

#### **📝 Attributes**

- 📍 `left, top`: Enemy’s position in the battle arena.
- 📏 `width, height`: Dimensions of the enemy.
- 🔄 `angle`: Defines enemy movement along the circle.
- ⚡ `speed`: Speed at which the enemy moves around the circle.
- 🚀 `isJumping`: Boolean flag for enemy jumping.
- 👾 `enemyElement`: DOM representation of the enemy.
- 🛑 `hasCollied`: Boolean flag to prevent multiple collision detections.
- ⏳ `collisionCooldown`: Delay between consecutive collisions.

#### **⚙️ Methods**

- 🔄 `updatePosition()`: Moves the enemy along a circular path.
- 👣 `move()`: Updates the enemy’s position in small increments.
- 🚀 `jumpToTheOtherSide()`: Makes the enemy jump to the opposite side of the circle.
- ⚔️ `didCollide(player)`: Checks for collision with the player.
- 🔄 `resetCollision()`: Resets collision detection.
- 🏃‍♂️ `exitCollisionArea(player)`: Ensures enemy does not register multiple hits when leaving the player's area.

---

### **3️⃣ Game Class (`Game.js`)**

The `Game` class manages **game initialization, updates, and logic** such as **scoring, lives, and collision detection**.

#### **📝 Attributes**

- 🎮 `player`: Instance of `Player` controlling the main character.
- 👾 `enemy`: Instance of `Enemy` acting as the opponent.
- 🏆 `score, lives`: Track game progress.
- ⏳ `gameIntervalId`: Controls the game loop.
- 🛑 `gameIsOver`: Boolean to check if the game is over.

#### **⚙️ Methods**

- ▶️ `start()`: Initializes the game environment and begins the game loop.
- 🔄 `gameLoop()`: Updates player/enemy states and checks for game-ending conditions.
- 🏃 `update()`: Calls movement updates and checks for player-enemy interactions.
- 🛑 `endGame()`: Handles game-over logic.

---

## **🎮 Game Flow**

1️⃣ **Start the game** (`Game.start()`)  
2️⃣ **Player moves & jumps** using arrow keys.  
3️⃣ **Enemy moves in a circular pattern** and occasionally jumps to the opposite side.  
4️⃣ **Collision detection** determines if the player loses a life or scores a point.  
5️⃣ **Game ends** when the player's lives reach zero.

---

## **⚙️ Installation & Usage**

1️⃣ Clone the repository:

```sh
git clone https://github.com/your-username/game-project.git
cd game-project
2️⃣ Open index.html in a browser.
3️⃣ Use 🎯 arrow keys to aim and press 🚀 spacebar to jump.

```

## 🎮 Game States

_Lilo’s Release_ includes three main screens that guide the player through the game: the **Game Intro**, the **Main Game Screen**, and the **Game End** screen. Below is a description of each state:

### 1. **Game Intro**

- **Purpose**: The intro screen serves as the starting point of the game.
- **Features**:
- Displays the game title and start button.
- Brief instructions on how to play (controls, objectives).
- Option to quit or exit the game.

### 2. **Main Game Screen**

- **Purpose**: This is where the core gameplay happens.
- **Features**:
- Player (Stitch) and enemy (Reuben) are visible on the screen, with their health bars displayed.
- The environment/arena where the battle takes place.
- Background music and sound effects.
- The ability to move, jump, and attack with **arrow keys** and **spacebar**.
- Dynamic interactions between Stitch and Reuben (combat, dodging, health updates).

### 3. **Game End**

- **Purpose**: This screen appears when the game ends, either through victory or defeat.
- **Features**:
- Displays the outcome.
- Option to restart the game or exit.
- Option to return to the intro screen or quit.
- The total score or number of lives remaining, depending on the game’s design.


## 📌 Links

I'm tracking the development of _Lilo’s Release_ on Trello. You can check out my progress, upcoming features, and tasks here:

🔗 **[Lilo’s Release Trello Board](https://trello.com/b/wsbev5ND/my-kanban-board)**
```
