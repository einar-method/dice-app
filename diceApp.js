const rollLog = [];

const RollEntry = function(user, entry) {
    this.user = user;
    this.time = new Date();
    this.entryTxt = entry;
    this.id = null;
    this.final = "final";

    // Assign an id based on the last entry in rollLog
    const pushToLog = () => {
        this.id = rollLog.length > 0 ? rollLog[rollLog.length - 1].id + 1 : 1;
        
        // Push this entry to the rollLog
        rollLog.push(this);
    };

    // Automatically push the entry when created
    pushToLog();
};
// new RollEntry("tom", "rolled a rnd int");
// new RollEntry("bob", "rolled a rnd int");
// new RollEntry("sue", "rolled a rnd int");
// new RollEntry("joe", "rolled a rnd int");
// new RollEntry("sam", "rolled a rnd int");
// new RollEntry("pam", "rolled a rnd int");
// console.log("This is the roll log", rollLog);

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
    // const newStyles = {
    //     '--font-main': urlParams.fontMain,
    //     '--button-color': urlParams.buttonColor,
    //     '--btn-text-color': urlParams.btnTextColor,
    //     '--btn-shadow-color': urlParams.btnShadowColor,
    //     '--text-bright-color': urlParams.textBrightColor,
    //     '--text-dark-color': urlParams.textDarkColor,
    //     '--link-color': urlParams.linkColor,
    //     '--background-primary-color': urlParams.backgroundPrimaryColor,
    //     '--background-secondary-color': urlParams.backgroundSecondaryColor,
    //     '--background-results-color': urlParams.backgroundResultsColor,
    //     '--app-width': urlParams.appWidth,
    //     '--app-height': urlParams.appHeight,
    // };
    const newStyles = {
        '--font-main': urlParams.fontMain,
        '--button-color': urlParams.buttonColor,
        '--btn-text-color': urlParams.btnTextColor,
        '--text-bright-color': urlParams.textBrightColor,
        '--text-dark-color': urlParams.textDarkColor,
        '--background-primary-color': urlParams.backgroundPrimaryColor,
        '--background-secondary-color': urlParams.backgroundSecondaryColor,
        '--background-tertiary-color': urlParams.backgroundResultsColor,
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

function setupLogBtn() {
    const rollLogDisplay = document.getElementById("🎲🎲");
    if (rollLogDisplay) {
        //console.log("not empty");
        rollLogDisplay.style.cursor = "pointer";
        rollLogDisplay.addEventListener("click", function() {
            console.log("User wants to see the entire roll log");
            openForm();
            // getEntireRollLog();
        });
    };
};


//TODO - we need to remove certian variables no longer used
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

    //document.getElementById("🎲🎲")? setupLogBtn() : null;
   

    // document.getElementById("🎲🎲")?.addEventListener("click", function() {
    //     console.log("User wants to see the entire roll log");
    // });
});


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}; // Easy random int between two numbers. 

// function fadeInElements(elementIds) {
//     requestAnimationFrame(function () {
//         elementIds.forEach(function (elementId) {
//         // Check the computed style to ensure the initial styles are applied
//         window.getComputedStyle(document.getElementById(elementId)).opacity;
  
//         // Set opacity to 1 after the initial styles are applied
//         document.getElementById(elementId).style.opacity = 1;
//       });
//     });
// };

// function clearDiceResults() {
//     document.getElementById("formula-input").value = "";
//     dialogFade(document.getElementById("🎲🎲"), 0)
//     dialogFade(document.getElementById("🎲"), 0)
// };

/// WAY TOO MUCH CODE FOR A TRANSITION ///
// function dialogFade(element, opacity) {
//     element.style.opacity = opacity;
//     element.style.transition = "none"; // Disable transition temporarily
//     requestAnimationFrame(() => {
//       element.style.transition = ""; // Re-enable transition
//     });
// };

// THIS IS THE HEART OF THE DICE BRAIN
function rollDice() {
    //const dice = document.getElementById("dice");
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    //dice.innerHTML = diceRoll;
    console.log("Dice rolled: " + diceRoll);
};

function showDiceRoll(roll) {
    //roll = { amount: 1, face: 6, math: "+", mod: 0, type: "frRollType" }
    console.log("roll", roll);
    const rolls = [];

    for (let i = 0; i < roll.amount; i++) {
        rolls.push(getRndInteger(1, roll.face));
    }

    let finalRoll = 0;
    let rollText = "";

    if (roll.type == "fr") {
        finalRoll = rolls.reduce((sum, roll) => sum + roll, 0);
        rollText = `Rolling a flat ${roll.amount}d${roll.face} resulted in a ${rolls.join(", ")}, with a total of ${finalRoll}.`;
        console.log(rollText);
    } else if (roll.type == "kh") {
        finalRoll = Math.max(...rolls);
        rollText = `Rolling ${roll.amount}d${roll.face} resulted in: ${rolls.join(", ")}. Keeping the highest gives a total of ${finalRoll}.`;
        console.log(rollText);
    } else if (roll.type == "kl") {
        finalRoll = Math.min(...rolls);
        rollText = `Rolling ${roll.amount}d${roll.face} resulted in: ${rolls.join(", ")}. Keeping the lowest gives a total of ${finalRoll}.`;
        console.log(rollText);
    } else {
        console.error("Invalid roll type");
    }
    // if (roll.type == "frRollType") {
    //     finalRoll = rolls.reduce((sum, roll) => sum + roll, 0);
    //     console.log("The final roll is:", finalRoll);
    // } else if (roll.type == "khRollType") {
    //     finalRoll = Math.max(...rolls);
    //     console.log("With a boon, final roll is:", finalRoll);
    // } else if (roll.type == "klRollType") {
    //     finalRoll = Math.min(...rolls);
    //     console.log("With a bane, final roll is:", finalRoll);
    // } else {
    //     console.error("Invalid roll type");
    // }

    if (roll.mod != null) {
        if (roll.math == "-") {
            finalRoll = finalRoll - roll.mod;
        } else if (roll.math == "+") {
            finalRoll = finalRoll + roll.mod;
        } else {
            console.error("Invalid math operator");
        }
        console.log("With a modifier, final roll is:", finalRoll);
    }

    new RollEntry("default", rollText)
    console.log("rollLog", rollLog);

    displayRolls(finalRoll, rollText);
};

function displayRolls(final, rolls) {
    const innerAllRolls = document.getElementById("🎲🎲");
    if (innerAllRolls.innerHTML == "") {
        setupLogBtn();
    };
    const innerFinalRoll = document.getElementById("🎲");
    innerAllRolls.innerText = rolls;
    // innerAllRolls.innerHTML = rolls.join(", ");
    innerFinalRoll.innerText = final;
    //document.getElementById("🎲🎲").open = true;
    //document.getElementById("🎲").open = true;

    // Below is needed to get the first transition to work
    // There must be an easier way, have not figured it out yet
    //fadeInElements(["🎲", "🎲🎲"])
    
};

window.onload = function() {
    setDiceListeners();
}

function checkAndInitiateRoll(faceSent) {
    const rollType = checkToggle();
    const amount = rollType == "fr" ? 1 : 2;
    //console.log("dice rolled:", amount);
    const die = { amount: amount, face: faceSent, math: null, mod: null, type: rollType }
    showDiceRoll(die);
}

function setDiceListeners() {
    document.getElementById("d4-btn").onclick = () => {
        // const rollType = checkToggle();
        // const amount = rollType == "frRollType" ? 1 : 2;
        // console.log("dice rolled:", amount);
        // showDiceRoll(amount, 4, rollType);
        checkAndInitiateRoll(4);
    };
    document.getElementById("d6-btn").onclick = () => {
        checkAndInitiateRoll(6);
    };
    document.getElementById("d8-btn").onclick = () => {
        checkAndInitiateRoll(8);
    };
    document.getElementById("d10-btn").onclick = () => {
        checkAndInitiateRoll(10);
    };
    document.getElementById("d12-btn").onclick = () => {
        checkAndInitiateRoll(12);
    };
    document.getElementById("d20-btn").onclick = () => {
        checkAndInitiateRoll(20);
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
        
        const errLine1 = "Please enter a dice formula, such as 2d20."
        const errLine2 = "The largest die face is a 10 digit number (9,999,999,999)."
        const errLine3 = "The largest die amount is 999."
        const errLine4 = "You can add or subtract a modifier up to 99."
        const errLine5 = "Examples include:\n  2d20\n  2d20+3\n  2d20-3\n  2d20kh (advantage)\n  2d20kl (disadvantage)\n  2d20fr (sum of rolls, same as 2d20)"
        const errorMessage0 = errLine1;
        const errorMessage1 = errLine1 + "\n" + errLine2 + "\n" + errLine3 + "\n" + errLine4 + "\n" + errLine5;

        if (!form.value) { 
            alert(errorMessage0);    
        } //else if (form.value.length > 12) { 
        //     alert("Entry too long or incorrect formula.");
        // } 
        else {
            const die = { amount: 1, face: 6, math: "+", mod: 0, type: "fr" };
    
            // Parse the input string to get amount, face, and type
            const matches = form.value.match(/^(\b[1-9][0-9]{0,2})d([1-9][0-9]{0,9})((\+|\-)(\b[1-9][0-9]{0,1}))?(kl|kh|fr)?$/);
            // const matches = form.value.match(/^(\b[1-9][0-9]{2}\b)d(\d+)((\+|\-)(\d+))?(kl|kh|fr)?$/);
            // const matches = form.value.match(/^(\d+)d(\d+)((\+|\-)(\d+))?(kl|kh|fr)?$/);
            // const matches = form.value.match(/^(\d+)d(\d+)(kl|kh|fr)?$/);
            console.log("matches:", matches);
            if (matches) {
                die.amount = parseInt(matches[1], 10);
                console.log("faces:", matches[2]);
                die.face = parseInt(matches[2], 10);
                die.math = matches[4] || null;
                die.mod = parseInt(matches[5], 10) || null;
                die.type = matches[6] || "fr";

                // if (die.math == "-") {
                //     die.mod = -die.mod;
                // }
                if (die.math) {
                    console.log("math is:", die.math);
                } else { console.log("we have no math") }

                // if (die.type == "kl") {
                //     die.type = "klRollType";
                // } else if (die.type == "kh") {
                //     die.type = "khRollType";
                // } else {
                //     die.type = "frRollType";
                // } // we need this because I changed the form value
                // // to the longer string type, and the regex is
                // // working with the shorter string type
    
                console.log("Dice formula was accepted:", die);
    
                showDiceRoll(die)
                // showDiceRoll(die.amount, die.face, die.type)
    
                // const buttonAudio = new Audio("Assets/dice.mp3");
                // buttonAudio.volume = 0.2;
                // buttonAudio.play();
            } else {
                alert(errorMessage1);
            }
        }
    };
    
    // document.getElementById("dice-reset").onclick = () => {
    //     clearDiceResults();
    // };
};






/// SWITCH BETWEEN TOOL TABS ///
const tabToggle = document.getElementById("roll-type-toggles");
const tabBtns = document.querySelectorAll('input[name="diceTypeToggle"]');
// tabToggle.onclick = () => {
//     assignTab()
// };

function checkToggle() {
    for (const radioButton of tabBtns) {
        if (radioButton.checked) {
          return radioButton.value;
        }
}}; // Finds which tab is toggled

// function assignTab() {
//     if (checkToggle() == "klRollType") {
//         //klRollType
//         console.log("klRollType");
//     } else if (checkToggle() == "frRollType") {
//         //frRollType
//         console.log("frRollType");
//     } else if (checkToggle() == "khRollType") {
//         //khRollType
//         console.log("khRollType");
//     } else {
//         console.error("Failed to find a roll type tab. Please refresh the page. ERROR CODE: 278");
// }};

// assignTab();

function getEntireRollLog() {
    const outputElm = document.getElementById("rollLogDisplay");
    outputElm.innerHTML = "";

    rollLog.forEach(entry => {
        const article = document.createElement("article");
        article.classList.add("roll__log_article");
        
        // user info
        const userElement = document.createElement("h3");
        userElement.textContent = `User: ${entry.user}`;
        
        // entry text
        const entryTextElement = document.createElement("p");
        entryTextElement.textContent = `Entry: ${entry.entryTxt}`;

        // time element
        const timeElement = document.createElement("time");
        //timeElement.textContent = `Time: ${new Date(entry.time).toLocaleString()}`;
        const formattedTime = new Date(entry.time).toLocaleString("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
        timeElement.textContent = `${formattedTime}`;
        
        // id element (optional)
        //const idElement = document.createElement("span");
        //idElement.textContent = `ID: ${entry.id}`;
        
        // Append all elements to the article
        article.appendChild(timeElement);
        article.appendChild(userElement);
        article.appendChild(entryTextElement);
        //article.appendChild(idElement);
        
        // Append the article to the container
        outputElm.appendChild(article);
    });

}

function openForm() {
    getEntireRollLog();
    document.getElementById("rollLogContainer").style.display = "block";
};

function closeForm() {
    document.getElementById("rollLogContainer").style.display = "none";
};