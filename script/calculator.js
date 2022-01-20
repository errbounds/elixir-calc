"use strict";
const camelize = s => s.replace(/-./g, x => x[1].toUpperCase());
// const calcInputs = document.querySelectorAll("#calculator input");
function parse() {
  const form = { elixir: [] };
  calcInputs.forEach(inputTag => {
    const inputTagId = camelize(inputTag.id);
    const inputTagValue = Number(inputTag.value);
    if (inputTagId.includes("elixir")) {
      form.elixir.push(inputTagValue);
    } else {
      form[inputTagId] = inputTagValue;
    }
  });

  return form;
}

function calculate({ userLevel, userPercent, elixir }) {
  let exp = expTable[userLevel] * userPercent / 100;
  const setExp = function (addExp) {
    const maxExp = expTable[userLevel];

    if (exp + addExp >= maxExp) {
      const former = maxExp - exp;
      const letter = addExp - former;

      userLevel += 1;
      exp = letter;
    } else {
      exp += addExp;
    }
  };

  const elixir_LIMITS = [209, 219, 229, 239, 249];
  for (let i = 0; i < elixir.length; i++) { // 성장의 비약 1 ~ 5
    for (let j = 0; j < elixir[i]; j++) { // 비약당 횟수 (0 ~ 3)
      if (userLevel < elixir_LIMITS[i]) {
        setExp(expTable[userLevel]);
      } else {
        setExp(expTable[elixir_LIMITS[i]]);
      }
      // addExp = userLevel < elixir_LIMITS[i] ? expTable[userLevel] : expTable[elixir_LIMITS[i]];
      // setExp(addExp);
    }
  }
  console.log("userLevel:", userLevel, "exp:", exp, "userPercent", exp / expTable[userLevel]);

  return { userLevel, userPercent: exp / expTable[userLevel] };
}


const btn = document.querySelector("#elixir-calc-btn");

btn.addEventListener("click", () => {
  const form = parse();
  const result = calculate(form);

  const labelUserLevel = document.querySelector("#elixir-calc-result span.user-level");
  const labelUserPercent = document.querySelector("#elixir-calc-result span.user-percent");

  labelUserLevel.textContent = result.userLevel;
  labelUserPercent.textContent = `${(result.userPercent * 100).toFixed(3)}%`;
});