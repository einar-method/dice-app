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
};

function updateCSSVariables(newVars) {
  const root = document.documentElement; // Reference to the :root element
  
  // Loop through the newVars object and update each CSS variable
  for (const [key, value] of Object.entries(newVars)) {
    root.style.setProperty(key, value);
  }
};

// // Example usage:
// updateCSSVariables({
//   '--primary-color': '#ff5733',   // Change primary color to a new value
//   '--secondary-color': '#333399', // Change secondary color
//   '--font-main': '"Arial", sans-serif' // Change the main font
// });

document.getElementById("styleForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Get all the input values from the form
    const newStyles = {
        '--font-main': document.getElementById("fontMain").value,
        '--button-color': document.getElementById("buttonColor").value,
        '--btn-text-color': document.getElementById("btnTextColor").value,
        '--btn-shadow-color': document.getElementById("btnShadowColor").value,
        '--text-bright-color': document.getElementById("textBrightColor").value,
        '--text-dark-color': document.getElementById("textDarkColor").value,
        '--link-color': document.getElementById("linkColor").value,
        '--background--primary-color': document.getElementById("backgroundPrimaryColor").value,
        '--background--secondary-color': document.getElementById("backgroundSecondaryColor").value,
        '--background--results-color': document.getElementById("backgroundResultsColor").value,
        '--app-width': `${document.getElementById("appWidth").value}px`,
        '--app-height': `${document.getElementById("appHeight").value}px`,
    };

    // // Update the CSS variables with the new values
    // for (const [key, value] of Object.entries(newStyles)) {
    //     document.documentElement.style.setProperty(key, value);
    // }
    updateCSSVariables(newStyles);

    // Get all the input values from the form
    const fontMain = document.getElementById("fontMain").value;
    const buttonColor = document.getElementById("buttonColor").value;
    const btnTextColor = document.getElementById("btnTextColor").value;
    const btnShadowColor = document.getElementById("btnShadowColor").value;
    const textBrightColor = document.getElementById("textBrightColor").value;
    const textDarkColor = document.getElementById("textDarkColor").value;
    const linkColor = document.getElementById("linkColor").value;
    const backgroundPrimaryColor = document.getElementById("backgroundPrimaryColor").value;
    const backgroundSecondaryColor = document.getElementById("backgroundSecondaryColor").value;
    const backgroundResultsColor = document.getElementById("backgroundResultsColor").value;
    const appWidth = document.getElementById("appWidth").value;
    const appHeight = document.getElementById("appHeight").value;

    // Build the query string
    const queryParams = new URLSearchParams({
        fontMain: encodeURIComponent(fontMain),
        buttonColor: encodeURIComponent(buttonColor),
        btnTextColor: encodeURIComponent(btnTextColor),
        btnShadowColor: encodeURIComponent(btnShadowColor),
        textBrightColor: encodeURIComponent(textBrightColor),
        textDarkColor: encodeURIComponent(textDarkColor),
        linkColor: encodeURIComponent(linkColor),
        backgroundPrimaryColor: encodeURIComponent(backgroundPrimaryColor),
        backgroundSecondaryColor: encodeURIComponent(backgroundSecondaryColor),
        backgroundResultsColor: encodeURIComponent(backgroundResultsColor),
        appWidth: encodeURIComponent(appWidth),
        appHeight: encodeURIComponent(appHeight)
    }).toString();

    // Build the iframe URL
    const iframeUrl = `https://einar-method.github.io/dice-app/embed?${queryParams}`;

    // Create the code snippet
    const codeSnippet = `<iframe src="${iframeUrl}" width="${appWidth}" height="${appHeight}" frameborder="0" allowfullscreen></iframe>`;

    // Display the code snippet in the DOM element with id codeToCopy
    document.getElementById("codeToCopy").textContent = codeSnippet;
});

