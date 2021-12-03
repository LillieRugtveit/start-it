// Model
const app = document.getElementById("app");
let game = {
  currentPlayer: {
    id: 0,
    name: "Lillie",
    level: 1,
    scoreMultiplier: 10,
    score: 0,
    levelProgress: 0,
    autoClicksPerSecond: 0,
  },
  rules: {
    maxLevel: 100,
    defaultLevel: 1,
    defaultScore: 0,
    minLevelProgress: 0,
    maxLevelProgress: 100,
  },
  scores: [],

  upgrade: {
    multiplier: {
      cost: 100,
      defaultCost: 100,
      limit: 1000
    },
    autoclick: {
      cost: 1000,
      defaultCost: 1000,
      limit: 1000,
      intervalId: 0,
    }
  }
};
// View
View();
function View() {
  if (!app) return;
  let scoresHTML = ''
  for (let i = 0; i < game.scores.length; i++) {
    const element = game.scores[i];
    scoresHTML += `
    <li>
      <div>Name: ${element.playerName}</div>
      <div>Score: ${element.playerScore}</div>
    </li>`
  }
  app.innerHTML = `    
    <header>
      <h1>Heart Clicker</h1>
      <p class="subtitle">Press heart to gain hearts!</p>
      <p>You can buy upgrades, and get 1.5x score when leveling up</p>
    </header>
    <main>
      <section>
        <h2>Leaderboard</h2>
        <div class="input-container">
          <label>Username: </label>
          <div class="score-container">
            <input id="leaderboardInput"></input>
            <button class="score-button" onclick="AddScore()">Add Score</button>
          </div>
        </div>
        <ul>
          ${scoresHTML}
        </ul> 
      </section>
      <article class="game">
        <div class="user-level">
          <div id="userlevel" class="level">Level: ${game.currentPlayer.level}</div>
          <progress id="levelProgress" max="100" value="${game.currentPlayer.levelProgress}"></progress>
        </div>
        <div class="upgrade-stats">
          <div>autoCPS: ${game.currentPlayer.autoClicksPerSecond}</div>
          <div>scoreMultiplier: ${game.currentPlayer.scoreMultiplier}</div>
        </div>
        <div id="counter" class="counter">${game.currentPlayer.score}</div>
        <button onclick="handleClickerClicked()" class="heart">❤️</button> </article>
      <aside>
        <section>
          <h2>Upgrades</h2>
          <button class="upgrade" onclick="handleMultiplier()">Upgrade Multiplier(${game.upgrade.multiplier.cost})</button>
          <button class="upgrade" onclick="handleAutoClicker()">Add AutoClicker(${game.upgrade.autoclick.cost})</button>
        </section>
      </aside>
    </main>
    `;
  twemoji.parse(document.body);
}

function renderPlayerStats() {
  counter.innerText = game.currentPlayer.score;
  levelProgress.value = game.currentPlayer.levelProgress;
  userlevel.innerText = `Level: ${game.currentPlayer.level}`;
}upgradeAutoClicker

// Controller

function handleClickerClicked() {
  updatePlayerStats(game.currentPlayer);
}

function updatePlayerStats(playerObj) {
  updatePlayerScore(playerObj);
  updatePlayerLevelProgress(playerObj);
  updatePlayerLevel(playerObj);
  renderPlayerStats(playerObj);
}


function AddScore() {
  game.scores.push({playerName: leaderboardInput.value, playerScore: game.currentPlayer.score});
  game.scores.sort(function(a, b){
    return a.playerScore - b.playerScore;
  })
  game.scores = game.scores.reverse();
  View();
}



function setAutoClicker() {
  clearInterval(game.upgrade.autoclick.intervalId);
  const player = game.currentPlayer;
  let count = 1000/player.autoClicksPerSecond;
  game.upgrade.autoclick.intervalId = setInterval(() => updatePlayerStats(game.currentPlayer), count);
}

function handleMultiplier() {
  const player = game.currentPlayer;
  console.log(player);
  upgradeMultiplier(player);
  View();
}

function handleAutoClicker() {
  const player = game.currentPlayer;
  upgradeAutoClicker(player);
  View();
}

function upgradeMultiplier(playerObj) {
  if(playerObj.score < game.upgrade.multiplier.cost || playerObj.scoreMultiplier >= 1000) return;
  playerObj.score -= game.upgrade.multiplier.cost; 
  playerObj.scoreMultiplier++;
  game.upgrade.multiplier.cost = Math.round(game.upgrade.multiplier.cost *1.5);
}

function upgradeAutoClicker(playerObj) {
  if(playerObj.score < game.upgrade.autoclick.cost || playerObj.autoClicksPerSecond >= 1000) return;
  playerObj.score -= game.upgrade.autoclick.cost; 
  playerObj.autoClicksPerSecond++;
  game.upgrade.autoclick.cost = Math.round(game.upgrade.autoclick.cost * 1.5);
  setAutoClicker();
}



// Utility functions

function updatePlayerLevel(playerObj) {
  if(playerObj.level >= game.rules.maxLevel) {
    playerObj.level = game.rules.maxLevel;
    return;
  }
  if(playerObj.levelProgress < game.rules.maxLevelProgress) return;
  playerObj.level++;
  playerObj.score += Math.round(playerObj.score/2);
  playerObj.levelProgress = game.rules.minLevelProgress;
}

function updatePlayerScore(playerObj) {
  playerObj.score += 1 * playerObj.scoreMultiplier;
}

function updatePlayerLevelProgress(playerObj) {
  if (playerObj.levelProgress >= game.rules.maxLevelProgress) return game.rules.maxLevelProgress;
  playerObj.levelProgress += 10/playerObj.level; 
}
