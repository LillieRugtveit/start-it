// Model
let appElement = document.getElementById('app');
let sum = 0;
let count = 0;
let inputValue = 0;

let sumNumberElement;
let countElement;
let averageNumberElement;
let inputNumberElement; 


// View
View();
function View() {
  appElement.innerHTML = `

  <div class="container">
    <header>
      <h1>Enkel Statistikk</h1>
      <p class="subtitle">Skriv tall i feltet og få summen, gjennomsnitt og antall.</p>
    </header>

    <main>
      
      <section>
          <h2>Input</h2>
          <div class="inputs-container">
            <input id="inputNumber"type="number" value="0" oninput="inputValue = this.value">
            <button onclick="handleClickAdd()">Legg til</button>
            <button onclick="handleClickReset()">Nullstill</button>
          </div>
      </section>

      
      <section>
      <h2>Statistikk</h2>
        <div class="stats-container">
          <div class="stat-container">
            <p class="text">Sum:</p>
            <p class="stats" id="sumNumber">0</p>
          </div>
          <div class="stat-container">
            <p class="text">Gjennomsnitt:</p>
            <p class="stats" id="averageNumber">0</p>
          </div>
          <div class="stat-container">
            <p class="text">Antall:</p>
            <p class="stats" id="countNumber">0</p>
          </div>
        </div>
      </section>
    </main>
  </div>
  `

  sumNumberElement = document.getElementById('sumNumber');
  averageNumberElement = document.getElementById('averageNumber');
  countElement = document.getElementById('countNumber');
  inputNumberElement = document.getElementById('inputNumber');
}

// Controller

function handleClickAdd() {
  let inputNumber = parseInt(inputValue);
  if(inputNumber > 0)  {
    count++;
    sum += inputNumber;
  }
  renderElements();
}

function renderElements() {
  sumNumberElement.innerText = sum;
  averageNumberElement.innerText = count == 0 ? "0" : Math.round(sum/count * 100) / 100;
  countElement.innerText = count;
  inputNumberElement.value = inputValue;
}

function handleClickReset() {
  sum = 0;
  count = 0;
  inputValue = 0;
  renderElements();
}


