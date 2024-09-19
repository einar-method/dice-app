function updateCSSVariables(newVars) {
    const root = document.documentElement; // Reference to the :root element
    
    // Loop through the newVars object and update each CSS variable
    for (const [key, value] of Object.entries(newVars)) {
      root.style.setProperty(key, value);
      console.log("This is for the css root", key, value);
    }
};

function urlToCssVars() {
    const urlParams = getURLParams();
    const newStyles = {
        '--font-main': urlParams.fontMain,
        '--button-color': urlParams.buttonColor,
        '--btn-text-color': urlParams.btnTextColor,
        '--btn-shadow-color': urlParams.btnShadowColor,
        '--text-bright-color': urlParams.textBrightColor,
        '--text-dark-color': urlParams.textDarkColor,
        '--link-color': urlParams.linkColor,
        '--background-primary-color': urlParams.backgroundPrimaryColor,
        '--background-secondary-color': urlParams.backgroundSecondaryColor,
        '--background-results-color': urlParams.backgroundResultsColor,
        '--app-width': urlParams.appWidth,
        '--app-height': urlParams.appHeight,
    };
    return newStyles;
};

function getURLParams() {
    const params = new URLSearchParams(window.location.search);
    const result = {};
    for (const [key, value] of params.entries()) {
        result[key] = decodeURIComponent(value);
        console.log("This is for the URL Param", key, value);
        console.log("URL parse result:", result);
    }
    console.log("URL parse FINAL result:", result);
    return result;
};

// document.addEventListener("DOMContentLoaded", function() {
//     console.log("We are starting to try and parse now")
//     // Get URL parameters
//     const urlParams = urlToCssVars();
    
//     // Call updateCSSVariables with the URL parameters
//     updateCSSVariables(urlParams);
// });

document.addEventListener("DOMContentLoaded", function() {
    //const defaultUrl = "https://einar-method.github.io/dice-app/embed";
    const currentUrl = window.location.href;
    
    // Check if the current URL is not the default embed link and has user-defined parameters
    if (currentUrl.includes('?')) {
        console.log("We are starting to try and parse now");
        
        // Get URL parameters
        const urlParams = urlToCssVars();
        
        // Call updateCSSVariables with the URL parameters
        updateCSSVariables(urlParams);
    } else {
        console.log("No user-defined parameters found or default URL is in use.");
    }
});


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
    document.getElementById("d4-btn").onclick = () => {
        showDiceRoll(1, 4, "fr");
    };
    document.getElementById("d6-btn").onclick = () => {
        showDiceRoll(1, 6, "fr");
    };
    document.getElementById("d8-btn").onclick = () => {
        showDiceRoll(1, 8, "fr");
    };
    document.getElementById("d10-btn").onclick = () => {
        showDiceRoll(1, 10, "fr");
    };
    document.getElementById("d12-btn").onclick = () => {
        showDiceRoll(1, 12, "fr");
    };
    document.getElementById("d20-btn").onclick = () => {
        showDiceRoll(1, 20, "fr");
    };
    
    // document.getElementById("adv-btn").onclick = () => {
    //     showDiceRoll(2, 20, "kh");
    // };
    
    // document.getElementById("disAdv-btn").onclick = () => {
    //     showDiceRoll(2, 20, "kl");
    // };
    
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
