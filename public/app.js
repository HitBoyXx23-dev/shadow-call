const phoneInput = document.getElementById("phone");
const status = document.getElementById("status");

// add characters from dial pad
document.querySelectorAll(".digit").forEach(btn => {
  btn.addEventListener("click", () => {
    phoneInput.value += btn.textContent;
    phoneInput.focus();
  });
});

// allow backspace and clear
document.getElementById("backspaceBtn").addEventListener("click", () => {
  phoneInput.value = phoneInput.value.slice(0, -1);
});
document.getElementById("clearBtn").addEventListener("click", () => {
  phoneInput.value = "";
  status.textContent = "";
});

// make the call
document.getElementById("callBtn").addEventListener("click", async () => {
  const phone = phoneInput.value.trim();
  if (!phone.startsWith("+")) {
    status.textContent = "❌ Number must start with + (country code).";
    return;
  }

  status.textContent = "Calling...";
  try {
    const res = await fetch("/call", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to: phone })
    });
    const data = await res.json();
    status.textContent = data.success
      ? `✅ Call started! SID: ${data.sid}`
      : `❌ ${data.error}`;
  } catch (err) {
    status.textContent = "❌ " + err.message;
  }
});

// only filter out disallowed characters (letters, spaces, etc.)
phoneInput.addEventListener("input", () => {
  phoneInput.value = phoneInput.value.replace(/[^0-9+*#]/g, "");
});
