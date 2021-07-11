const tipPerson = document.querySelector("#tipPerson");
const totalPerson = document.querySelector("#totalPerson");
const customTip = document.querySelector("#tipCustom");
const tipsOptions = document.querySelectorAll(".tip-selector__tips__tip");
const tipSelector = document.querySelector(".person-selector");
const amountInput = document.querySelector("#amount");
const peopleInput = document.querySelector("#people");
const button = document.querySelector("button");
const tip15 = document.querySelector("#tip15");
var tip = 0,
  people = 0,
  amount = 0;

const disableButton = () => {
  button.disabled = true;
};

const enableButton = () => {
  button.disabled = false;
};

const setValues = (tip, amount) => {
  tipPerson.textContent = tip.toFixed(2);
  totalPerson.textContent = amount.toFixed(2);
};

const setError = () => {
  tipSelector.classList.add("error");
};
const removeError = () => {
  tipSelector.classList.remove("error");
};

const calculateTip = () => {
  enableButton();
  if (!people || people === 0) {
    setError();
    return;
  }
  removeError();
  const tipAmount = amount * (tip / 100);
  const actualAmount = (amount + tipAmount) / people;
  const actualTip = tipAmount / people;
  setValues(actualTip, actualAmount);
};

const resetTipOptions = () => {
  tipsOptions.forEach((tipOption) => {
    tipOption.checked = false;
  });
};

const resetCustomTip = () => {
  customTip.value = "";
};

customTip.addEventListener("input", (e) => {
  const { value } = e.target;
  if (value !== "") {
    resetTipOptions();
    tip = parseFloat(value);
    calculateTip();
  }
});

amountInput.addEventListener("input", (e) => {
  const { value } = e.target;
  amount = parseFloat(value);
  calculateTip();
});

peopleInput.addEventListener("input", (e) => {
  const { value } = e.target;
  people = parseFloat(value);
  if (!people || people === 0) {
    setError();
    return;
  }
  calculateTip();
});

tipsOptions.forEach((tipOption) => {
  tipOption.addEventListener("click", () => {
    resetCustomTip();
    tip = parseFloat(tipOption.value);
    calculateTip();
  });
});

const resetValues = () => {
  tip = 15;
  people = 0;
  amount = 0;
  setValues(0, 0);
  amountInput.value = "";
  peopleInput.value = "";
  resetCustomTip();
  resetTipOptions();
  tip15.checked = true;
  removeError();
  disableButton();
};

resetValues();
