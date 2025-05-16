// document.getElementById('url-form').addEventListener('submit', async (e) => {
//   e.preventDefault();
//   const input = document.getElementById('url-input').value.trim();
//   const resultDiv = document.getElementById('result');

//   if (!input) {
//     resultDiv.textContent = "Please enter a URL.";
//     return;
//   }

//   resultDiv.textContent = "Checking...";

//   try {
//    const response = await fetch('https://phishsense.onrender.com', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({  input })
// });
//     const data = await response.json();
//     if (data.isUnsafe) {
//       resultDiv.innerHTML = '<span class="phishing">⚠️ Warning: This URL is unsafe!</span>';
//     } else {
//       resultDiv.innerHTML = '<span class="safe">✅ Safe: No threats found.</span>';
//     }
//   } catch (err) {
//     resultDiv.textContent = "Error checking URL. Please try again later.";
//     console.error(err);
//   }
// });

document.getElementById("urlForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const url = document.getElementById("urlInput").value.trim();
  const resultText = document.getElementById("result");
  resultText.textContent = "Checking...";

  const API_KEY = "AIzaSyDx_XaWHn5ZYu1MoXAx42sa9RYSLOddXv8";

  const requestBody = {
    client: {
      clientId: "phishsense",
      clientVersion: "1.0"
    },
    threatInfo: {
      threatTypes: [
        "MALWARE",
        "SOCIAL_ENGINEERING",
        "UNWANTED_SOFTWARE",
        "POTENTIALLY_HARMFUL_APPLICATION"
      ],
      platformTypes: ["ANY_PLATFORM"],
      threatEntryTypes: ["URL"],
      threatEntries: [{ url }]
    }
  };

  try {
    const response = await fetch(`https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();

    if (data.matches && data.matches.length > 0) {
      resultText.textContent = "⚠️ This URL is unsafe!";
      resultText.style.color = "red";
    } else {
      resultText.textContent = "✅ This URL is safe.";
      resultText.style.color = "green";
    }
  } catch (error) {
    console.error("Error:", error);
    resultText.textContent = "❌ Failed to check the URL.";
    resultText.style.color = "gray";
  }
});

