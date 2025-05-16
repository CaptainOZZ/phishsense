document.getElementById('url-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const input = document.getElementById('url-input').value.trim();
  const resultDiv = document.getElementById('result');

  if (!input) {
    resultDiv.textContent = "Please enter a URL.";
    return;
  }

  resultDiv.textContent = "Checking...";

  try {
   const response = await fetch('https://phishsense.onrender.com', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ input })
});
    const data = await response.json();
    if (data.isUnsafe) {
      resultDiv.innerHTML = '<span class="phishing">⚠️ Warning: This URL is unsafe!</span>';
    } else {
      resultDiv.innerHTML = '<span class="safe">✅ Safe: No threats found.</span>';
    }
  } catch (err) {
    resultDiv.textContent = "Error checking URL. Please try again later.";
    console.error(err);
  }
});
