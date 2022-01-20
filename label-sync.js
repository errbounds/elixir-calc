"use strict";
const calcInputs = document.querySelectorAll("#elixir-calculator input");

calcInputs.forEach((inputTag) => {
    // Initialize
    (function () {
        const parent = inputTag.closest(".row");
        const label = parent.querySelector(".label-sync");
        label.textContent = inputTag.value;
    })();

    // Event handler
    inputTag.addEventListener("input", (event) => {
        const parent = event.target.closest(".row");
        const label = parent.querySelector(".label-sync");
    
        label.textContent = event.target.value;
    });
});
