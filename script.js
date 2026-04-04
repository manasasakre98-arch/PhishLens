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

  // ⏳ STEP 1: Show loading
  document.getElementById("result").innerHTML = "⏳ Scanning...";

  // ⏱️ STEP 2: Delay (fake processing)
  setTimeout(() => {

    const analysis = analyzeInput(input);
    const laws = getLegalInfo(analysis.result);

    // 🎨 Color logic
    let color = "white";

    if (analysis.result === "Phishing") color = "red";
    else if (analysis.result === "Suspicious") color = "orange";
    else color = "lightgreen";

   let icon = "✅";

if (analysis.result === "Phishing") icon = "🚨";
else if (analysis.result === "Suspicious") icon = "⚠️";

let output = `<h2 style="color:${color}">${icon} ${analysis.result}</h2>`;

    output += "<hr style='border:0.5px solid #1e293b; margin:15px 0;'>";

    // 📊 STEP 3: Risk meter
    let percentage = analysis.score * 30;
    let barColor = "green";

if (analysis.result === "Phishing") barColor = "red";
else if (analysis.result === "Suspicious") barColor = "orange";

    output += `
      <div style="margin-top:10px;">
        <div style="background:#1e293b; height:10px; border-radius:5px;">
          <div style="width:${percentage}%; background:${barColor}; height:10px; border-radius:5px;"></div>
        </div>
        <p>Risk Score: ${percentage}%</p>
      </div>
    `;

    // 📦 STEP 4: Reasons
    if (analysis.reasons.length > 0) {
      output += "<h4>🔍 Reasons:</h4><ul>";
      analysis.reasons.forEach(r => {
        output += `<li>${r}</li>`;
      });
      output += "</ul>";
    }

    // ⚖️ STEP 5: Laws
    if (laws.length > 0) {
      output += "<h4>⚖️ Applicable Laws:</h4><ul>";
      laws.forEach(l => {
        output += `<li>${l}</li>`;
      });
      output += "</ul>";
    }

    // ✅ FINAL: Show result
    document.getElementById("result").innerHTML = output;

  }, 1000); // 1 second delay
}