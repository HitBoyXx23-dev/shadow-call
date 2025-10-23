document.getElementById("callBtn").addEventListener("click", async () => {
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();
  const status = document.getElementById("status");

  if (!phone) {
    status.textContent = "❌ Please enter a phone number.";
    return;
  }

  status.textContent = "Calling...";
  try {
    const res = await fetch("/call", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to: phone, message })
    });
    const data = await res.json();
    if (data.success) {
      status.textContent = `✅ Call started! SID: ${data.sid}`;
    } else {
      status.textContent = `❌ ${data.error}`;
    }
  } catch (err) {
    status.textContent = "❌ " + err.message;
  }
});
