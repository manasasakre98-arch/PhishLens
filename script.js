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


async function checkPhishing() {
  const input = document.getElementById("inputBox").value;

  document.getElementById("result").innerHTML = "⏳ Scanning...";

  try {
    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ input: input })
    });

    const data = await response.json();

    let color = "lightgreen";
    let icon = "✅";

    if (data.result === "Phishing") {
      color = "red";
      icon = "🚨";
    }

    let output = `<h2 style="color:${color}">${icon} ${data.result}</h2>`;

    // ✅ ADD REASONS (from your old logic)
    const analysis = analyzeInput(input);

    if (analysis.reasons.length > 0) {
      output += "<h4>🔍 Reasons:</h4><ul>";
      analysis.reasons.forEach(r => {
        output += `<li>⚠️ ${r}</li>`;
      });
      output += "</ul>";
    }

    // ✅ ADD LAWS
    const laws = getLegalInfo(data.result);

    if (laws.length > 0) {
      output += "<hr style='border:0.5px solid #1e293b; margin:15px 0;'>";

      output += "<h4>⚖️ Legal Implications:</h4><ul>";

      laws.forEach(l => {
        output += `<li>⚖️ ${l}</li>`;
      });

      output += "</ul>";
    }

    document.getElementById("result").innerHTML = output;

  } catch (error) {
    document.getElementById("result").innerHTML =
      "❌ Error connecting to ML model";
  }
}

function getLegalInfo(result) {
  if (result === "Phishing") {
    return [
      "IT Act Section 66D – Cheating by personation using computer",
      "IT Act Section 66C – Identity Theft",
      "IPC Section 420 – Cheating"
    ];
  }
  return [];
}