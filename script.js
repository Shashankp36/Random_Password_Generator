function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

const generate = document.getElementById("generateBtn");
generate.addEventListener("click", () => {
  const length = document.getElementById("Passwordlength").value;
  const hasUpper = document.getElementById("uppercase").checked;
  const hasLower = document.getElementById("lowercase").checked;
  const hasNumber = document.getElementById("numbers").checked;
  const hasSymbol = document.getElementById("symbols").checked;
  const result = document.getElementById("PasswordResult");
  result.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
});


function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = "";
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
      (item) => Object.values(item)[0]
    );
    for (let i = 0; i < length; i += typesCount) {
      typesArr.forEach((type) => {
        const funcName = Object.keys(type)[0];
        generatedPassword += randomFunc[funcName]();
      });
    }
    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
  }
  
 /*  it is for copy text without popup //copy to clipboard
let button = document.getElementById("clipboardBtn");
// add click event listner on button
button.addEventListener("click", (e) => {
  e.preventDefault();
  document.execCommand(
    "copy",
    false,
    document.getElementById("PasswordResult").select()
  );
});                                       */
let button = document.getElementById("clipboardBtn");
button.addEventListener("click", (e) => {
    e.preventDefault();
    const passwordResult = document.getElementById("PasswordResult").value;
    openPopup(passwordResult);
    document.execCommand("copy", false, passwordResult);
});

function openPopup(text) {
    const popupContainer = document.getElementById("popupContainer");
    const popupText = document.getElementById("popupText");
    popupText.value = "Text Copied";
    popupContainer.style.display = "flex";
    setTimeout(() => {
        closePopup();
    }, 3000);
}

function closePopup() {
    const popupContainer = document.getElementById("popupContainer");
    popupContainer.style.display = "none";
}