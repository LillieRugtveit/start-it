// Model

// Elements
let appElement;
let startButtonElement;
let statElement;
let emojisElement;
let emojiElement;

// Game constants
const updateRate = 60;

const devilSpawnProbability = 50; // 50% chance
const defaultTickEmojiSpawnTime = 60;
const defaultTickReactionTime = 60;
const defaultTickPauseTime = 120;
const defaultDifficulty = 3;

const minTickEmojiSpawnTime = 30;
const minTickReactionTime = 30;
const minTickPauseTime = 50;
const maxDifficulty = 5;

// Emojis
const emojiAmount = 9;
const hitEmoji = "💥";
const deadEmoji = "⚰️";
const innocentEmoji = "😊";
const devilEmoji = "👹";
const defaultEmoji = "🪨";

// Game settings
let tickEmojiSpawnTime = defaultTickEmojiSpawnTime;
let tickReactionTime = defaultTickReactionTime;
let TickPauseTime = defaultTickPauseTime;

let hasGameStarted = false;
let isDevil = false;
let gameIntervalId;
let gameState = 0;
let emojiIndex = 0;
let firstTime = true;

// Game stats
let deaths = 0;
let defeats = 0;
let points = 0;
let difficulty = defaultDifficulty;

// View
renderApp();

function renderApp() {
	appElement = document.getElementById("app");
	appElement.innerHTML = `
    <header>
      <h1>Whack a devil</h1>
      <p class="subtitle">Slå djevelen når den kommer opp</p>
    </header>
    <div class="container">
      <div class="grid">
        <button id="startButton" class="primary" onclick="handleGameButton(this)">Start</button>
        <button onclick="handleIncreaseDifficulty()">Vanskligere</button>
        <button onclick="handleDecreaseDiffculty()">Enklere</button>
        <div id="emojis" class="emojis-grid">
          <div class="emoji" onclick="handleEmojiHit(this)" id="emojiBox1">${defaultEmoji}</div>
          <div class="emoji" onclick="handleEmojiHit(this)" id="emojiBox2">${defaultEmoji}</div>
          <div class="emoji" onclick="handleEmojiHit(this)" id="emojiBox3">${defaultEmoji}</div>
          <div class="emoji" onclick="handleEmojiHit(this)" id="emojiBox4">${defaultEmoji}</div>
          <div class="emoji" onclick="handleEmojiHit(this)" id="emojiBox5">${defaultEmoji}</div>
          <div class="emoji" onclick="handleEmojiHit(this)" id="emojiBox6">${defaultEmoji}</div>
          <div class="emoji" onclick="handleEmojiHit(this)" id="emojiBox7">${defaultEmoji}</div>
          <div class="emoji" onclick="handleEmojiHit(this)" id="emojiBox8">${defaultEmoji}</div>
          <div class="emoji" onclick="handleEmojiHit(this)" id="emojiBox9">${defaultEmoji}</div>
        </div>
        <div id="stats">
        </div>
      </div>
    </div>
  `;
	statElement = document.getElementById("stats");
	startButtonElement = document.getElementById("startButton");
	emojisElement = document.getElementById("emojis");
	renderStats();
}

function updateEmojiView(emojiId, emoji) {
	if (emojiId == null) return;
	let emojiElement = document.getElementById(emojiId);
	emojiElement.innerText = emoji;
}

function renderStats() {
	statElement.innerHTML = `
  <div class="stats-container">
    <div class="stats-label">Døde</div>
    <div class="stats-value">${deaths}</div>
  </div>
  <div class="stats-container">
    <div class="stats-label">Slått</div>
    <div class="stats-value">${defeats}</div>
  </div>
  <div class="stats-container">
    <div class="stats-label">Poenger</div>
    <div class="stats-value">${points}</div>
  </div>
  <div class="stats-container">
    <div class="stats-label">Vansklighet</div>
    <div class="stats-value">${difficulty}</div>
  </div>
  `;
}

function setMainButtonState(state) {
	let buttonText = "";
	let toggle;
	if (state == "Start") {
		buttonText = "Start";
		toggle = true;
	} else if (state == "Stop") {
		buttonText = "Stop";
		toggle = false;
	}
	startButtonElement.innerText = buttonText;
	startButtonElement.classList.toggle("primary", toggle);
	startButtonElement.classList.toggle("secondary", !toggle);
}

// Controller

function handleGameButton() {
	hasGameStarted ? stopGame() : startGame();
}

function handleIncreaseDifficulty() {
	setDifficulty(difficulty + 1);
	restartGame();
}

function handleDecreaseDiffculty() {
	setDifficulty(difficulty - 1);
	restartGame();
}

function handleEmojiHit(emojiElement) {
	console.log(`Emoji: ${emojiElement.innerText}, isDevil: ${isDevil}`);
	if (emojiElement.innerText != defaultEmoji) {
		isDevil ? hitDevil(true) : hitDevil(false);
		spawnHitEmoji(emojiElement.id);
		gameState == 2;
		tick = 0;
		renderStats();
	}
}

// Game functions

function startGame() {
	resetStats();
	gameIntervalId = setInterval(tickUpdate, 1000 / updateRate);
	setMainButtonState("Stop");
	hasGameStarted = true;
}

function stopGame() {
	clearInterval(gameIntervalId);
	renderApp();
	setMainButtonState("Start");
	hasGameStarted = false;
}

function restartGame() {
	if (!hasGameStarted) return;
	stopGame();
	startGame();
}

function resetStats() {
	tick = 0;
	deaths = 0;
	points = 0;
	defeats = 0;
	renderStats();
}

function tickUpdate() {
	tick++;
	tickGameUpdate();
}

function tickGameUpdate() {
	if (isGameState(tickEmojiSpawnTime, 0)) {
		spawnDevilOrInnocent();
		gameState++;
		return;
	}

	if (isGameState(tickReactionTime, 1)) {
		despawnRandomEmoji();
		gameState++;
		return;
	}

	if (isGameState(TickPauseTime, 2)) {
		gameState = 0;
		tick = 0;
		return;
	}
}

// Math Utils

function hasRolledNumberUnder(number) {
	let rolledNumber = Math.floor(Math.random() * 100);
	return rolledNumber < number;
}

function getRandomIndex(min, max) {
	return min + Math.floor(Math.random() * max);
}

function isModulo(value, modulo) {
	return value % modulo == 0;
}

function calculateDifficultyTime(minTick, defaultTick) {
	let diffTick = defaultTick - minTick;
	return defaultTick - (diffTick / (maxDifficulty - 1)) * (difficulty - 1);
}

// Game Utilities

function isGameState(tickSpeed, state) {
	return isModulo(tick, tickSpeed) && gameState == state;
}

function setDifficulty(diff) {
	if (diff == null || diff > maxDifficulty || diff < 1) return;
	difficulty = diff;
	tickEmojiSpawnTime = calculateDifficultyTime(
		minTickEmojiSpawnTime,
		defaultTickEmojiSpawnTime
	);
	tickReactionTime = calculateDifficultyTime(
		minTickReactionTime,
		defaultTickReactionTime
	);
	TickPauseTime = calculateDifficultyTime(
		minTickPauseTime,
		defaultTickPauseTime
	);
	renderStats();
}

function hitDevil(isDevil) {
	if (isDevil) {
		points += 10;
		defeats++;
		return;
	}

	points -= 10;
	deaths++;
}

// Emoji utilities

function spawnRandomEmoji(emoji) {
	emojiIndex = getRandomIndex(1, emojiAmount);
	updateEmojiView(`emojiBox${emojiIndex}`, emoji);
}

function despawnRandomEmoji() {
	updateEmojiView(`emojiBox${emojiIndex}`, defaultEmoji);
}

function spawnHitEmoji(emojiId) {
	let emoji = isDevil ? hitEmoji : deadEmoji;
	updateEmojiView(emojiId, emoji);
}

function spawnDevilOrInnocent() {
	isDevil = hasRolledNumberUnder(devilSpawnProbability);
	let emoji = isDevil ? devilEmoji : innocentEmoji;
	spawnRandomEmoji(emoji);
}
