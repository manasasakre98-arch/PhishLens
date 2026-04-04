function analyzeInput(input) {
  let score = 0;
  let reasons = [];

  if (input.includes("@")) {
    score++;
    reasons.push("Contains '@' symbol");
  }

  if (!input.startsWith("https")) {
    score++;
    reasons.push("No HTTPS encryption");
  }

  if (input.length > 75) {
    score++;
    reasons.push("URL is unusually long");
  }

  if (input.includes("-")) {
    score++;
    reasons.push("Suspicious '-' in domain");
  }

  let result = "Safe";

  if (score >= 3) result = "Phishing";
  else if (score === 2) result = "Suspicious";

  return { result, reasons };
}

function getLegalInfo(result) {
  if (result === "Phishing") {
    return [
      "Section 66C - Identity Theft",
      "Section 66D - Cheating by Personation",
      "IPC 420 - Cheating"
    ];
  }
  return [];
}

function checkPhishing() {
  const input = document.getElementById("inputBox").value;

  const analysis = analyzeInput(input);
  const laws = getLegalInfo(analysis.result);

  let color = "white";

if (analysis.result === "Phishing") color = "red";
else if (analysis.result === "Suspicious") color = "orange";
else color = "lightgreen";

let output = `<h2 style="color:${color}">${analysis.result}</h2>`;

  if (analysis.reasons.length > 0) {
    output += "<p><b>Reasons:</b></p><ul>";
    analysis.reasons.forEach(r => {
      output += `<li>${r}</li>`;
    });
    output += "</ul>";
  }

  if (laws.length > 0) {
    output += "<p><b>⚖️ Laws:</b></p><ul>";
    laws.forEach(l => {
      output += `<li>${l}</li>`;
    });
    output += "</ul>";
  }

  document.getElementById("result").innerHTML = output;
}