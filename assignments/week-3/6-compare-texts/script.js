// Model
let appElement = document.getElementById('app');
let infoElement;

let text1 = 'Per';
let text2 = 'Pål';
let text3 = 'Espen';


// View

View();

function View() {
  appElement.innerHTML = `
  <div class="container">
    <header>
      <h1>Sammenligne to tekster</h1>
      <p class="subtitle">Endre på tekstene! (Prøv å fylle ut tall også)</p>
    </header>
    <main>
      <div class="info-container" id="info"></div>
      <div class="inputs">
        <div>
          <p class="small">Tekst 1</p>
          <input type="text" oninput="text1 = this.value" onchange="handleChange()" value="${text1}">
        </div>
        <div>
          <p class="small">Tekst 2</p>
          <input type="text" oninput="text2 = this.value" onchange="handleChange()" value="${text2}">
        </div>
        <div>
          <p class="small">Tekst 3</p>
          <input type="text" oninput="text3 = this.value" onchange="handleChange()" value="${text3}">
        </div>
      </div>
    </main>
  </div>
  `
  infoElement = document.getElementById('info');
  handleChange();
}

function updateInfoView(innerHTMLText) {
  let updateInnerHTML = `<p>${innerHTMLText}</p>`
  infoElement.innerHTML = updateInnerHTML;
}

// Controller

function handleChange() {
  let infoTextHTML = '';
  infoTextHTML += textComparison();
  infoTextHTML += `<br>Første teksten: <br>`
  infoTextHTML += orderTexts();
  updateInfoView(infoTextHTML);
}

function textComparison() {
  let outputText = '';
  if(text1 == text2) outputText += `Tekst 1 og 2 er like <br>`
  if(text1 != text2) outputText += `<del>Tekst 1 og 2 er like</del><br>`

  if(text1 == text3) outputText += `Tekst 1 og 3 er like<br>`
  if(text1 != text3) outputText += `<del>Tekst 1 og 3 er like</del><br>`

  if(text2 == text3) outputText += `Tekst 2 og 3 er like<br>`
  if(text2 != text3) outputText += `<del>Tekst 2 og 3 er like</del><br>`
  return outputText;
}

function orderTexts() {
  let outputText = '';
  if(text1 <= text2) {
    if(text1 <= text3) outputText += text1;
    else outputText += text3;
  } else {
    if(text2 <= text3) outputText += text2;
    else outputText += text3;
  }
  return outputText;
} 
