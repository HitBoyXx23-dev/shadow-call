const phoneInput = document.getElementById("phone");
const messageInput = document.getElementById("message");
const status = document.getElementById("status");

// Add digits from the dial pad
document.querySelectorAll(".digit").forEach(btn => {
  btn.addEventListener("click", () => {
    phoneInput.value += btn.textContent;
    phoneInput.focus();
  });
});

// Backspace and Clear
document.getElementById("backspaceBtn").addEventListener("click", () => {
  phoneInput.value = phoneInput.value.slice(0, -1);
});

document.getElementById("clearBtn").addEventListener("click", () => {
  phoneInput.value = "";
  messageInput.value = "";
  status.textContent = "";
});

// Make a call
document.getElementById("callBtn").addEventListener("click", async () => {
  const phone = phoneInput.value.trim();
  const message = messageInput.value.trim();

  if (!phone.startsWith("+")) {
    status.textContent = "❌ Number must start with + (country code).";
    return;
  }

  status.textContent = "📞 Calling...";
  try {
    const res = await fetch("/call", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to: phone, message })
    });
    const data = await res.json();
    status.textContent = data.success
      ? `✅ Call started! SID: ${data.sid}`
      : `❌ ${data.error}`;
  } catch (err) {
    status.textContent = "❌ " + err.message;
  }
});

// Only allow valid characters
phoneInput.addEventListener("input", () => {
  phoneInput.value = phoneInput.value.replace(/[^0-9+*#]/g, "");
});
