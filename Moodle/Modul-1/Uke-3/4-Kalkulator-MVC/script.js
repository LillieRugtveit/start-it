// Model
let appElement = document.getElementById("app");
let resultTextElement;
let calcText = "";

// View
renderView();

function renderView() {
	appElement.innerHTML = `
    <div class="container">
      <div class="resultBox">
          <p id="resultText"></p>
      </div>
      <div class="calculator-grid">
        <button class="empty"> </button>
        <button class="empty"> </button>
        <button class="highlighted" onclick="handleButtonClick(this)">C</button>
        <button class="highlighted" onclick="handleButtonClick(this)">del</button>
        <button onclick="handleButtonClick(this)">7</button>
        <button onclick="handleButtonClick(this)">8</button>
        <button onclick="handleButtonClick(this)">9</button>
        <button class="highlighted" onclick="handleButtonClick(this)">÷</button>
        <button onclick="handleButtonClick(this)">4</button>
        <button onclick="handleButtonClick(this)">5</button>
        <button onclick="handleButtonClick(this)">6</button>
        <button class="highlighted" onclick="handleButtonClick(this)">×</button>
        <button onclick="handleButtonClick(this)">1</button>
        <button onclick="handleButtonClick(this)">2</button>
        <button onclick="handleButtonClick(this)">3</button>
        <button class="highlighted" onclick="handleButtonClick(this)">-</button>
        <button onclick="handleButtonClick(this)">0</button>
        <button class="" onclick="handleButtonClick(this)">.</button>
        <button class="highlighted" onclick="handleButtonClick(this)">=</button>
        <button class="highlighted" onclick="handleButtonClick(this)">+</button>
      </div>
    </div>
  `;
	resultTextElement = document.getElementById("resultText");
}

// Controller

function handleButtonClick(buttonElement) {
	if (buttonElement.innerText == "=") {
		calculateText();
	} else if (buttonElement.innerText == "C") {
		calcText = "";
	} else if (buttonElement.innerText == "del") {
    if(typeof calcText == "string") {
      calcText = calcText.slice(0, -1);
    } else {
      calcText = "";
    }
		
	} else {
		calcText += buttonElement.innerText;
	}

	resultTextElement.innerHTML = calcText;
}

function calculateText() {
	if (calcText === "") return;
	calcText = calcText.replaceAll("×", "*").replaceAll("÷", "/");
	calcText = eval(calcText);
}
