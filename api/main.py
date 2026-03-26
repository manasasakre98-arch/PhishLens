from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "PhishLens API is running!"}

@app.get("/check")
def check_url(url: str):
    risk = 0
    reasons = []

    url_lower = url.lower()

    # 1. HTTP instead of HTTPS
    if url.startswith("http://") and not url.startswith("https://"):
        risk += 20
        reasons.append("Not using HTTPS")

    # 2. Suspicious keywords
    keywords = ["login", "verify", "bank", "secure", "account"]
    for word in keywords:
        if word in url_lower:
            risk += 10
            reasons.append(f"Contains '{word}' keyword")

    # 3. Suspicious domain endings
    suspicious_tlds = [".xyz", ".tk", ".click", ".buzz"]
    for tld in suspicious_tlds:
        if tld in url_lower:
            risk += 20
            reasons.append("Suspicious domain extension")

    # 4. Too many dots (subdomain trick)
    if url.count('.') > 3:
        risk += 15
        reasons.append("Too many subdomains")

    # 5. Very long URL
    if len(url) > 50:
        risk += 10
        reasons.append("URL is unusually long")

    # Final status
    if risk >= 60:
        status = "🚨 High Risk"
    elif risk >= 30:
        status = "⚠️ Medium Risk"
    else:
        status = "✅ Safe"

    return {
        "status": status,
        "risk_score": risk,
        "reasons": reasons
    }
