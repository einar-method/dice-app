function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}; // Easy random int between two numbers. 

function fadeInElements(elementIds) {
    requestAnimationFrame(function () {
        elementIds.forEach(function (elementId) {
        // Check the computed style to ensure the initial styles are applied
        window.getComputedStyle(document.getElementById(elementId)).opacity;
  
        // Set opacity to 1 after the initial styles are applied
        document.getElementById(elementId).style.opacity = 1;
      });
    });
};

/// WAY TOO MUCH CODE FOR A TRANSITION ///
function dialogFade(element, opacity) {
    element.style.opacity = opacity;
    element.style.transition = "none"; // Disable transition temporarily
    requestAnimationFrame(() => {
      element.style.transition = ""; // Re-enable transition
    });
};

function rollDice() {
    //const dice = document.getElementById("dice");
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    //dice.innerHTML = diceRoll;
    console.log("Dice rolled: " + diceRoll);
};

function clearDiceResults() {
    document.getElementById("formula-input").value = "";
    dialogFade(document.getElementById("🎲🎲"), 0)
    dialogFade(document.getElementById("🎲"), 0)
};

function showDiceRoll(num, face, type) {
    const die = { amount: num, face: face, type: type };
    const rolls = [];

    for (let i = 0; i < die.amount; i++) {
        rolls.push(getRndInteger(1, die.face));
    }

    let finalRoll = 0;

    if (die.type == "fr") {
        finalRoll = rolls.reduce((sum, roll) => sum + roll, 0);
        console.log("The final roll is:", finalRoll);
    } else if (die.type == "kh") {
        finalRoll = Math.max(...rolls);
        console.log("With a boon, final roll is:", finalRoll);
    } else if (die.type == "kl") {
        finalRoll = Math.min(...rolls);
        console.log("With a bane, final roll is:", finalRoll);
    } else {
        console.error("Invalid die type");
    }

    const innerAllRolls = document.getElementById("all-roll");
    const innerFinalRoll = document.getElementById("final-roll");
    innerAllRolls.innerHTML = rolls.join(", ");
    innerFinalRoll.innerHTML = finalRoll;
    document.getElementById("🎲🎲").open = true;
    document.getElementById("🎲").open = true;

    // Below is needed to get the first transition to work
    // There must be an easier way, have not figured it out yet
    fadeInElements(["🎲", "🎲🎲"])
};

window.onload = function() {
    setDiceListeners();
}

function setDiceListeners() {
    document.getElementById("d6-btn").onclick = () => {
        showDiceRoll(1, 6, "fr");
    };
    
    document.getElementById("boon-btn").onclick = () => {
        showDiceRoll(2, 6, "kh");
    };
    
    document.getElementById("bane-btn").onclick = () => {
        showDiceRoll(2, 6, "kl");
    };

    document.getElementById("d20-btn").onclick = () => {
        showDiceRoll(1, 20, "fr");
    };
    
    document.getElementById("adv-btn").onclick = () => {
        showDiceRoll(2, 20, "kh");
    };
    
    document.getElementById("disAdv-btn").onclick = () => {
        showDiceRoll(2, 20, "kl");
    };
    
    document.getElementById("formula-input").addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
          event.preventDefault(); // Prevent default form submission
          document.getElementById('formula-btn').click(); // Programmatically click the button
        }
    });
    
    document.getElementById("formula-btn").onclick = () => {
        const form = document.getElementById('formula-input');
        
        if (!form.value) { 
            alert("Please enter a dice formula, such as 2d20");    
        } else if (form.value.length > 12) { 
            alert("Entry too long or incorrect formula.");
        } else {
            const die = { amount: 1, face: 6, type: "fr" };
    
            // Parse the input string to get amount, face, and type
            const matches = form.value.match(/^(\d+)d(\d+)(kl|kh|fr)?$/);
            
            if (matches) {
                die.amount = parseInt(matches[1], 10);
                die.face = parseInt(matches[2], 10);
                die.type = matches[3] || "fr";
    
                console.log("Dice formula was accepted:", die);
    
                showDiceRoll(die.amount, die.face, die.type)
    
                // const buttonAudio = new Audio("Assets/dice.mp3");
                // buttonAudio.volume = 0.2;
                // buttonAudio.play();
            } else {
                alert("Incorrect formula format. Please use a format like '2d20', '4d4kh', '3d6kl', etc.");
            }
        }
    };
    
    document.getElementById("dice-reset").onclick = () => {
        clearDiceResults();
    };
};

document.getElementById("exportAppBtn")?.addEventListener('click', function () {
    const width = document.getElementById("exportWidth")?.value || '600';
    const height = document.getElementById("exportHeight")?.value || '400';
    
    const embedCode = `<iframe src="https://einar-method.github.io/dice-app/embed" width="${width}" height="${height}" frameborder="0" allowfullscreen></iframe>`;
    
    //document.getElementById('embed-code').value = embedCode;
    document.getElementById("codeToCopy").textContent = embedCode;
});

function copyCode() {
    const code = document.getElementById("codeToCopy").innerText;

    const copyBtn = document.querySelector(".export__section_copyBtn");
    // Copy the code block content to the clipboard
    navigator.clipboard.writeText(code).then(() => {
    // Change button text to "Copied"
    copyBtn.textContent = "code copied!";
    copyBtn.classList.add("copied");

    // Change text back to "Copy" after 2 seconds
    setTimeout(() => {
        copyBtn.textContent = "copy to clipboard";
        copyBtn.classList.remove("copied");
    }, 2000);
    }).catch(err => {
        console.error("Failed to copy: ", err);
    });
}
